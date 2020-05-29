---
title: SpeechPipeline in iOS
navId: Speech Pipeline (iOS)
description: Documentation for the SpeechPipeline class in iOS
draft: false
---

If you've read any of our other documentation, you know that the speech pipeline is the main way you interact with Spokestack. This guide is here to explain in a little more detail how the iOS version of Spokestack uses this collection of components to recognize wakewords and user speech.

## What _is_ it?

As the name implies, `SpeechPipeline` is a collection of distinct modular components that work together to process user speech. All components are established at initialization time and can be broken down into two main areas of functionality: processing audio and communicating with your app.

Here's a simple picture of how the components and callbacks work together:

![](images/speech_pipeline.png 'iOS speech pipeline')

Now let's look at the `SpeechPipeline` initializer and talk about each component one at a time. For historical reasons, the initializer lists components in a different order than the one laid out in the previous diagram.

```swift
@objc public init(
    _ speechService: SpeechProcessor,          // 1
    speechConfiguration: SpeechConfiguration,  // 2
    speechDelegate: SpeechEventListener,       // 3
    wakewordService: SpeechProcessor,          // 4
    pipelineDelegate: PipelineDelegate         // 5
)
```

### 1. `speechService`

The speech service is responsible for performing Automatic Speech Recognition (ASR) on arbitrary user audio. It's the component that calls `didRecognize` on your `SpeechEventListener` (which we'll talk about later). Currently, Spokestack only supports Apple's built-in ASR, via the `AppleSpeechRecognizer` class.

Note that `speechService` can be any class that adopts the `SpeechProcessor` protocol, so you're free to incorporate any ASR provider you choose. Singleton instances of all `SpeechProcessor`s provided by Spokestack are available via the `SpeechProcessors` enum; for the default Apple ASR, simply pass `SpeechProcessors.appleSpeech` to the initializer above.

### 2. `speechConfiguration`

The speech configuration is comprehensive enough to have its own guide, but in summary, this is where most of the fine-tuning for both wakeword and ASR happens. See the [configuration guide](/docs/Concepts/pipeline-configuration) or [API reference](https://spokestack.github.io/spokestack-ios/) for more details on each of these, but here are a few examples of the parameters you can change (by instantiating the class and setting the relevant property):

- `tracing`: If you want more verbose debug logging from Spokestack components, setting this to `.TRACE` or `.DEBUG` will make you satisfied.
- `wakewords`: If you're using ASR-based wakeword detection, these properties let you change your app's wakeword(s).
- `wakeActiveMax`: The maximum amount of time (in milliseconds) that ASR will remain active to capture a single user utterance.
- (`filter`|`detect`|`encode`)`ModelName`: Names for custom [TensorFlow Lite](https://www.tensorflow.org/lite) wakeword models. Training custom models is outside the scope of this guide, but you can find a description of their requirements in our [wakeword models guid](wakeword-models).

### 3. `speechDelegate`

The speech delegate receives most of the interesting system events from the pipeline. The types of events it receives depends on whether the ASR has been activated from a wakeword or by using `pipeline.activate()`.

- `SpeechDelegate.didActivate`: called immediately after a wakeword has been recognized. Note that this is not called after a manual `pipeline.activate()`.
- `SpeechDelegate.didDeactivate`: called after ASR has completed or timed out. Note that this is not called after a manual `pipeline.deactivate()`.
- `SpeechDelegate.didRecognize`: called after ASR has successfully recognized an utterance. `SpeechDelegate.didDeactivate` will also be called.
- `SpeechDelegate.didTimeout`: called after ASR timed out while listening for an utterance. `SpeechDelegate.didDeactivate` will also be called.

Your implementations of all these methods will be very important to how your app handles voice interactions, because the delegate acts as a kind of gatekeeper between speech events and pipeline operation.

**Wakeword with ASR**

If you want ASR to start after your app hears the wakeword, you must call `pipeline.activate()` in your delegate's `activate` implementation so the pipeline can activate the ASR component. You may also wish to display a "listening" indicator in your UI when you receive `activate` and remove it when `deactivate` is called.

**Wakeword without ASR**

If you're using Spokestack's wakeword feature _without_ ASR, you should not call `pipeline.activate()` in your delegate's `activate` implementation.

**Push to Talk**

If you start the pipeline from a user interaction like a button press that calls `pipeline.activate()`, `SpeechDelegate.activate` will not be called. If you wish to display a "listening" indicator in your UI, you should do so in the same method that calls `pipeline.activate()` but remove it when `SpeechDelegate.deactivate` is called.

### 4. `wakewordService`

The wakeword service is in charge of, you guessed it, recognizing that the user has said your app's wakeword. On iOS, this defaults to using Apple's built-in ASR to detect your chosen wakeword, but for better performance you might want to experiment with a customized TensorFlow Lite model. Spokestack comes with a set of models trained to detect "Spokestack" as a wakeword, but you're also free to train your own and configure Spokestack to use them at runtime. You can find descriptions of the models' requirements in our [wakeword models guide](wakeword-models), but if building and training them isn't something you want to take on, [send us an email](mailto:hello@spokestack.io), and we can discuss customization options.

### 5. `pipelineDelegate`

The pipeline delegate receives system events from the pipeline itself, including notifications of both successful initialization and errors during setup. This is where any error handling will occur, and the `start` and `stop` methods tell you when Spokestack is using the microphone. You'll recall that earlier we mentioned a UI "listening" indicator would go in `speechDelegate`'s `didActivate` method, and that's true in many cases — often you'll want to alert the user that you're expecting a voice command from them (that the ASR component is active and interpreting their speech). If, however, you want to let the user know that the device's microphone _itself_ is active (which it naturally will be when waiting for a wakeword), you'll want to condition that indicator on the pipeline's `start` and `stop` events.

## Other methods

OK, so that covers pipeline construction. What about the other methods available?

### `status`

This acts as a health check for the pipeline, letting you know whether its delegates are properly set so that speech events can be processed appropriately.

### `setDelegates`

The `SpeechPipeline` itself, as a manager of shared resources, is a prime candidate for [the singleton pattern](https://en.wikipedia.org/wiki/Singleton_pattern). Its delegates, however, might change as the user's context in the app itself changes. Thus, the delegates can be swapped out at will if desired.

### `activate`/`deactivate`

As mentioned before, these methods control the pipeline's ASR component. `pipeline.activate()` starts ASR. `pipeline.deactivate()` stops ASR. You should call `pipeline.activate()` after a user interaction like a button press or from `SpeechDelegate.didActivate` as a response to hearing a wakeword. To stop ASR in progress (e.g. in response to a cancel button push), call `pipeline.deactivate()`.

### `start`/`stop`

These methods control the pipeline as a whole. When stopped, the pipeline consumes fewer resources, but no speech recognition, either wakeword or ASR, can happen. Call `start` to begin listening for a wakeword, and follow it immediately with a call to `activate` if you want to jump straight to ASR (this is most likely to be useful in an app that doesn't use the wakeword feature at all). Call `stop` to deactivate the microphone.

Once created, a single instance of `SpeechPipeline` can be stopped and restarted at will; just remember that Spokestack cannot use the device's microphone when it is stopped.
