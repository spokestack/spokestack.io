---
title: SpeechPipeline in iOS
navId: Speech Pipeline (iOS)
description: Documentation for the SpeechPipeline class in iOS
draft: false
---

If you've read any of our other documentation, you know that the speech pipeline is the main way you interact with Spokestack's speech recognition and wakeword. This guide is here to explain in a little more detail how the iOS version of Spokestack uses this collection of components to recognize wakewords and user speech.

## What _is_ it?

As the name implies, `SpeechPipeline` is a collection of distinct modular components that work together to process user speech. All components are established at initialization time and can be broken down into two main areas of functionality: processing audio and communicating with your app. It uses the [Builder pattern](https://en.wikipedia.org/wiki/Builder_pattern) (via the `SpeechPipelineBuilder` class) to handle its potentially complex configuration. In short, the pipeline receives audio via on-device sources and sends it through a variable number of _stages_, each of which performs some form of processing and optionally dispatches events back through the pipeline. The stages interact with the pipeline via a shared `SpeechContext`; each stage may alter this context; for example, a voice activity detector may set `isSpeech` to `true`, signalling that the last frame of audio represented speech.

## How does it work?

This is the speech pipeline's state machine:

![](images/speech_pipeline_android.png 'Android speech pipeline')

As you can see, once the pipeline has been is built (after the return of `SpeechPipeline.Builder.build()`), calling `start()` puts it into a passive listening state—or it will if the pipeline has been properly configured. You _could_ have an ASR class as the only stage, in which case an ASR request would start immediately upon calling `start()`. This is almost certainly not what you want.

While the pipeline is listening passively, it sends audio through its stages a frame at a time (a "frame" defaults to 20 ms of audio, but [it's configurable](/docs/Concepts/pipeline-configuration)). That audio is not leaving the device, though; it's waiting for a stage to recognize a trigger word or phrase and set the pipeline's `SpeechContext` to `active`. The classes that do this in Spokestack typically have names that end in `Trigger`; see `WakewordTrigger` and `VoiceActivityTrigger` for examples.

The pipeline can also be activated by calling its `activate` method. This is what you'd do to implement push-to-talk. Once activated, it can be deactivated by calling `deactivate`, or it will remain active until a pre-set timeout is triggered (see `active-min` and `active-max` in the [configuration documentation](/docs/Concepts/pipeline-configuration)).

When active, audio frames are not processed on-device but are instead sent to an ASR service to be transcribed (if an ASR component is registered in the pipeline; these components have names that end in `SpeechRecognizer`). These ASR requests end when a pre-set timeout is reached or when the pipeline's `SpeechContext` is manually set to inactive. At that point, the ASR service's best effort at a transcription is delivered via a speech event to any registered listeners.

## How do I set it up?

```swift
     let pipeline = SpeechPipelineBuilder()
         .useProfile(.tfLiteWakewordAppleSpeech)       // 1
         .setListener(self)                            // 2
         .setProperty("tracing", ".PERF")              // 3
         .setProperty("detectModelPath", detectPath)
         .setProperty("encodeModelPath", encodePath)
         .setProperty("filterModelPath", filterPath)
         .build()
     pipeline.start()
```

### 1. `useProfile`

Spokestack offers several pre-built "profiles" that bundle stage classes and in some cases configuration properties tuned to support different app configurations. See the [API reference](https://spokestack.github.io/spokestack-ios/Classes/SpeechPipeline.html) for for a complete listing, but here's a brief summary:

- Profiles whose names begin with `vadTrigger` send any detected speech straight to the chosen speech recognizer.
- `Wakeword` profiles use either [TensorFlow Lite](https://www.tensorflow.org/lite) or an ASR-filtered wakeword triggered pipeline activation. [See an explainer](https://spokestack.io/blog/choosing-the-right-ios-wakeword-service) for how to choose between wakeword profiles.
- `pushToTalk` profiles have no automatic triggering; the pipeline's `activate` method must be called to perform speech recognition.

The wakeword service is in charge of, you guessed it, recognizing that the user has said your app's wakeword. On iOS, this defaults to using Apple's built-in ASR to detect your chosen wakeword, but for better performance you might want to experiment with a customized TensorFlow Lite model. Spokestack comes with a set of models trained to detect "Spokestack" as a wakeword, but you're also free to train your own and configure Spokestack to use them at runtime. You can find descriptions of the models' requirements in our [wakeword models guide](wakeword-models), but if building and training them isn't something you want to take on, [send us an email](mailto:hello@spokestack.io), and we can discuss customization options.

The speech service is responsible for performing Automatic Speech Recognition (ASR) on arbitrary user audio. It's the component that calls `didRecognize` on your `SpeechEventListener` (which we'll talk about later). Currently, Spokestack only supports Apple's built-in ASR, via the `AppleSpeechRecognizer` class.

Profiles take care of all configuration that can be managed in a one-size-fits-all fashion, but note that some components require additional configuration, such as third-party API keys, paths to TensorFlow models, or the `DispatchQueue` for sending events that are recieved on the UI thread.

Any configuration properties set after a profile is applied will override configuration set by that profile.

### 2. `setListener`

All pipeline activity, including activations, deactivations, ASR timeouts, receipt of ASR transcriptions, and tracing messages/errors are delivered asynchronously to components that implement the `SpeechEventListener` protocol and are registered in the pipeline via `setListener` at build time.

- `SpeechDelegate.didActivate`: called immediately after a wakeword has been recognized.
- `SpeechDelegate.didDeactivate`: called after ASR has completed or timed out.
- `SpeechDelegate.didRecognize`: called after ASR has successfully recognized an utterance. `SpeechDelegate.didDeactivate` will also be called.
- `SpeechDelegate.didTimeout`: called after ASR timed out while listening for an utterance. `SpeechDelegate.didDeactivate` will also be called.

Your implementations of all these methods will be very important to how your app handles voice interactions, because the delegate acts as a kind of gatekeeper between speech events and pipeline operation. You'll recall that earlier we mentioned a UI "listening" indicator would go in `speechDelegate`'s `didActivate` method, and that's true in many cases — often you'll want to alert the user that you're expecting a voice command from them (that the ASR component is active and interpreting their speech). If, however, you want to let the user know that the device's microphone _itself_ is active (which it naturally will be when waiting for a wakeword), you'll want to condition that indicator on the pipeline's `start` and `stop` events. The types of events it receives depends on whether the ASR has been activated from a wakeword or by using `pipeline.activate()`.

**Wakeword with ASR**

If you want ASR to start after your app hears the wakeword, you must call `pipeline.activate()` in your delegate's `activate` implementation so the pipeline can activate the ASR component. You may also wish to display a "listening" indicator in your UI when you receive `activate` and remove it when `deactivate` is called.

**Wakeword without ASR**

If you're using Spokestack's wakeword feature _without_ ASR, you should not call `pipeline.activate()` in your delegate's `activate` implementation.

**Push to Talk**

If you start the pipeline from a user interaction like a button press that calls `pipeline.activate()`, `SpeechDelegate.activate` will not be called. If you wish to display a "listening" indicator in your UI, you should do so in the same method that calls `pipeline.activate()` but remove it when `SpeechDelegate.deactivate` is called.

### 3. `setProperty`

The speech configuration is comprehensive enough to have its own guide, but in summary, this is where most of the fine-tuning for both wakeword and ASR happens. See the [configuration guide](/docs/Concepts/pipeline-configuration) or [API reference](https://spokestack.github.io/spokestack-ios/) for more details on each of these, but here are a few examples of the parameters you can change:

- `tracing`: If you want more verbose debug logging from Spokestack components, setting this to `.TRACE` or `.DEBUG` will make you satisfied.
- `wakewords`: If you're using ASR-based wakeword detection, these properties let you change your app's wakeword(s).
- `wakeActiveMax`: The maximum amount of time (in milliseconds) that ASR will remain active to capture a single user utterance.
- (`filter`|`detect`|`encode`)`ModelName`: Names for custom [TensorFlow Lite](https://www.tensorflow.org/lite) wakeword models. Training custom models is outside the scope of this guide, but you can find a description of their requirements in our [wakeword models guid](wakeword-models).

## Other methods

OK, so that covers pipeline construction. What about the other methods available?

### `activate`/`deactivate`

As mentioned before, these methods control the pipeline's ASR component. `pipeline.activate()` starts ASR. `pipeline.deactivate()` stops ASR. You should call `pipeline.activate()` after a user interaction like a button press or from `SpeechDelegate.didActivate` as a response to hearing a wakeword. To stop ASR in progress (e.g. in response to a cancel button push), call `pipeline.deactivate()`.

### `start`/`stop`

These methods control the pipeline as a whole. When stopped, the pipeline consumes fewer resources, but no speech recognition, either wakeword or ASR, can happen. Call `start` to begin listening for a wakeword, and follow it immediately with a call to `activate` if you want to jump straight to ASR (this is most likely to be useful in an app that doesn't use the wakeword feature at all). Call `stop` to deactivate the microphone.

Once created, a single instance of `SpeechPipeline` can be stopped and restarted at will; just remember that Spokestack cannot use the device's microphone when it is stopped, and that stopping and starting require much more resources than `activate`/`deactivate`.
