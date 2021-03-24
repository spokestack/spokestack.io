---
title: SpeechPipeline in Android
navId: Speech Pipeline (Android)
description: Documentation for the SpeechPipeline class in Android
draft: false
tags: Android, ASR, Wake Word
---

**Note**: As of version 9.0.0, the speech pipeline is included in the turnkey `Spokestack` object. This guide is still valid as an in-depth introduction to the pipeline module itself, but see [the configuration guide](turnkey-configuration) for more information about how it's integrated in newer versions of Spokestack.

---

If you've read any of our other documentation, you know that the speech pipeline is the main way you interact with Spokestack's speech recognition and wake word. This guide is here to explain in a little more detail how the Android version of Spokestack uses this architecture to recognize wake words and user speech.

## What _is_ it?

As the name implies, `SpeechPipeline` is a collection of distinct modular components that work together to process user speech. It uses the [Builder pattern](https://en.wikipedia.org/wiki/Builder_pattern) (via the `SpeechPipeline.Builder` class) to handle its potentially complex configuration. In short, the pipeline receives audio via an _input class_ and sends it through a variable number of _stages_, each of which performs some form of processing and optionally dispatches events back through the pipeline. The stages interact with the pipeline via a shared `SpeechContext`; each stage may alter this context; for example, a voice activity detector may set `isSpeech` to `true`, signalling that the last frame of audio represented speech.

All pipeline processing is done on a background thread to avoid blocking the UI.

## How do I set it up?

Configuration available at build time include properties, described in [the configuration guide](/docs/concepts/pipeline-configuration) and the [Javadoc](https://www.javadoc.io/doc/io.spokestack/spokestack-android) for the various pipeline stages; and the designated speech event listener(s), which we'll talk about a bit later.

Stage order matters in the build process; audio is processed by each stage in turn, according to the order in which it's declared at build time. For example, a stage that activates ASR based on the presence of the wake word needs to be placed before the ASR stage, and any stages that process audio to make the wake word detector's job easier (for example, gain control) must be declared before the wake word detection stage. The order of configuration properties, on the other hand, does not matter, and their declarations can be placed before or after those of processing stages.

Spokestack offers several pre-built "profiles" that bundle input class, stage classes, and in some cases configuration properties tuned to support different app configurations. See the [Javadoc](https://www.javadoc.io/doc/io.spokestack/spokestack-android) for the `io.spokestack.spokestack.profile` package for a complete listing, but here's a brief summary:

- Profiles whose names begin with `VADTrigger` send any detected speech straight to the chosen speech recognizer.
- `TFWakeword` profiles use [TensorFlow Lite](https://www.tensorflow.org/lite) for wake word recognition.
- `PushToTalk` profiles have no automatic triggering; the pipeline's `activate` method must be called to perform speech recognition.

Profiles take care of all configuration that can be managed in a one-size-fits-all fashion, but note that some components require additional configuration, such as third-party API keys, paths to TensorFlow models, or runtime objects from an Android application. See the javadoc for your chosen profile to see if anything else is required.

Any configuration properties set after a profile is applied will override configuration set by that profile, but any processing stages added after the profile will be added to those established by the profile, just as if the profile's configuration had been performed directly as chained calls to the pipeline builder.

Input classes, processing stages, and profiles are all loaded dynamically via their class names, making it straightforward to create a custom profile or pipeline component to fit your specific needs: Just have your class implement the `PipelineProfile` interface to create a profile, the `SpeechInput` interface to create an input class, or the `SpeechProcessor` interface to create a processing stage. Note that descriptions of the various processing stages below assume well-behaved implementations; custom implementations can of course do whatever they want in their `process` method, regarless of whether it meets the pipeline's general expectations.

## How does it work?

`youtube: [Build your own voice interface to talk directly to your customers](https://www.youtube.com/watch?v=AvhQ6-9nCrQ)`

This is the speech pipeline's state machine:

![](images/speech_pipeline_android.png 'Android speech pipeline')

As you can see, once the pipeline has been built (after the return of `SpeechPipeline.Builder.build()`), calling `start()` puts it into a passive listening state—or it will if the pipeline has been properly configured. You _could_ have an ASR class as the only stage, in which case an ASR request would start immediately upon calling `start()`. This is almost certainly not what you want.

While the pipeline is listening passively, it sends audio through its stages a frame at a time (a "frame" defaults to 20 ms of audio, but [it's configurable](/docs/concepts/pipeline-configuration)). That audio is not leaving the device, though; it's waiting for a stage to recognize a trigger word or phrase and set the pipeline's `SpeechContext` to `active`. The classes that do this in Spokestack typically have names that end in `Trigger`; see `WakewordTrigger` and `VoiceActivityTrigger` for examples.

The pipeline can also be activated by calling its `activate` method. This is what you'd do to implement push-to-talk. Once activated, it can be deactivated by calling `deactivate`, or it will remain active until a pre-set timeout is triggered (see `active-min` and `active-max` in the [configuration documentation](/docs/concepts/pipeline-configuration)).

When active, audio frames are not processed on-device but are instead sent to an ASR service to be transcribed (if an ASR component is registered in the pipeline; these components have names that end in `SpeechRecognizer`). These ASR requests end when a pre-set timeout is reached or when the pipeline's `SpeechContext` is manually set to inactive. At that point, the ASR service's best effort at a transcription is delivered via a speech event to any registered listeners.

## What's a speech event listener?

All pipeline activity, including activations, deactivations, ASR timeouts, receipt of ASR transcriptions, and tracing messages/errors are delivered asynchronously to components that implement the `OnSpeechEventListener` interface and are registered in the pipeline via `addOnSpeechEventListener(OnSpeechEventListener)` at build time.

These listeners only have to implement a single method, `onEvent(SpeechContext.Event, SpeechContext)`. For simple apps, the main event of interest is `RECOGNIZE`; `TRACE` and `ERROR` may also be useful if you're running into configuration issues. When your listener receives this event, the `SpeechContext`'s `transcript` field will contain the full text of the user's last utterance. This can be sent to an NLU service, or it can be processed directly in the app to determine the app's next action.

## And the cycle continues...

Once the ASR stage has completed its request and fired a `RECOGNIZE` event, it signals the pipeline to return to listening passively for the wake word. If a multi-turn interaction is desired, the pipeline can be manually reactivated after a system response via its `SpeechContext`:

```kotlin
pipeline.context.isActive = true
pipeline.context.dispatch(SpeechContext.Event.ACTIVATE)
```

To stop the pipeline completely, call its `stop()` method. As long as you retain a reference to its built instance, you can call `start()` again at any time without rebuilding it.
