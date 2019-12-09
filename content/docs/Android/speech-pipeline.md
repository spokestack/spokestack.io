---
title: SpeechPipeline in Android
navId: Android Speech Pipeline
description: A detailed discussion of `SpeechPipeline`
draft: false
---

If you've read any of our other documentation, you know that the speech pipeline is the main way you interact with Spokestack. This guide is here to explain in a little more detail how the Android version of Spokestack uses this architecture to recognize wakewords and user speech.

## What _is_ it?

As the name implies, `SpeechPipeline` is a collection of distinct modular components that work together to process user speech. It uses the [Builder pattern](https://en.wikipedia.org/wiki/Builder_pattern) (via the `SpeechPipeline.Builder` class) to handle its potentially complex configuration. In short, the pipeline receives audio via an _input class_ and sends it through a variable number of _stages_, each of which performs some form of processing and optionally dispatches events back through the pipeline. The stages interact with the pipeline via a shared `SpeechContext`; each stage may alter this context; for example, a wakeword detector may set `isSpeech` to `true`, signalling that the last frame of audio represented speech.

Other configuration available at build time include properties, described in [the configuration guide](/docs/Concepts/pipeline-configuration) and the [Javadoc](https://www.javadoc.io/doc/io.spokestack/spokestack-android) for the various pipeline stages; and the designated speech event listener(s), which we'll talk about a bit later.

Stage order matters in the build process; audio is processed by each stage in turn, according to the order in which it's declared at build time. For example, a stage that activates ASR based on the presence of the wakeword needs to be placed before the ASR stage, and any stages that process audio to make the wakeword detector's job easier must be declared before the wakeword detection stage. The order of configuration properties, on the other hand, does not matter, and their declarations can be placed before or after those of processing stages.

Both the input classes and processing stages are loaded dynamically via reflection on their class names, making it straightforward to implement a custom pipeline component to fit your specific needs: Just implement the `SpeechProcessor` interface (or `SpeechInput` if you need to accept input from a source other than the Android microphone) and include its full class name in the pipeline builder at the appropriate location. Note that descriptions of the various stages below assume well-behaved implementations; custom implementations can of course do whatever they want in their `process` method, regarless of whether it meets the pipeline's general expectations.

## How does it work?

This is the speech pipeline's state machine:

![](images/speech_pipeline_android.png 'Android speech pipeline')

As you can see, once the pipeline has been is built (after the return of `SpeechPipeline.Builder.build()`), calling `start()` puts it into a passive listening state—or it will if the pipeline has been properly configured. You _could_ have an ASR class as the only stage, in which case an ASR request would start immediately upon calling `start()`. This is almost certainly not what you want.

While the pipeline is listening passively, it's still sending audio through its stages a frame at a time (a "frame" defaults to 20 ms of audio, but [it's configurable](/docs/Concepts/pipeline-configuration)). That audio is not leaving the device, though; it's waiting for a stage to recognize a trigger word or phrase and set the pipeline's `SpeechContext` to `active`. The classes that do this in Spokestack typically have names that end in `Trigger`; see `WakewordTrigger` and `VoiceActivityTrigger` for examples.

When active, audio frames are not processed on-device but are instead sent to an ASR service to be transcribed (if an ASR component is registered in the pipeline; these components have names that end in `SpeechRecognizer`). These ASR requests end when a pre-set timeout is reached or when the pipeline's `SpeechContext` is manually set to inactive. At that point, the ASR service's best effort at a transcription is delivered via a speech event to any registered listeners.

## What's a speech event listener?

All pipeline activity, including activations, deactivations, ASR timeouts, receipt of ASR transcriptions, and tracing messages/errors are delivered to components that implement the `OnSpeechEventListener` interface and are registered in the pipeline via `addOnSpeechEventListener(OnSpeechEventListener)` at build time.

These listeners only have to implement a single method, `onEvent(SpeechContext.Event, SpeechContext)`. For simple apps, the main event of interest is `RECOGNIZE`; `TRACE` and `ERROR` may also be useful if you're running into configuration issues. When your listener receives this event, the `SpeechContext`'s `transcript` field will contain the full text of the user's last utterance. This can be sent to an NLU service, or it can be processed directly in the app to determine the app's next action.

## And the cycle continues...

Once the ASR stage has completed its request and fired a `RECOGNIZE` event, it signals the pipeline to return to listening passively for the wakeword. If a multi-turn interaction is desired, the pipeline can be manually reactivated after a system response via its `SpeechContext`:

```kotlin
pipeline.context.isActive = true
pipeline.context.dispatch(SpeechContext.Event.ACTIVATE)
```

To stop the pipeline completely, call its `stop()` method. As long as you retain a reference to its built instance, you can call `start()` again at any time without rebuilding it.
