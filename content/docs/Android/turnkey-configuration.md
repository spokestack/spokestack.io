---
title: Spokestack Configuration
navId: Spokestack Configuration (Android)
description: An in-depth guide to configuring all of Spokestack's Android modules in a single class.
draft: false
---

As of version 9.0.0, Spokestack offers a single class that centralizes setup and configuration for all of its individual modules (ASR, NLU, TTS, etc.). This guide details the configuration options available when setting up that class as well as tips for runtime usage.

## Builders everywhere

Each Spokestack module can be used independently and comes with its own builder interface for configuration. The other guides in this section detail those builders, and the `Spokestack.Builder` uses them internally to configure the modules. If you prefer to use the `Spokestack` class but configure each module individually, that can be done via the `get***Builder` methods. You'll also need these builders to perform low-level customization (for example, changing ASR provider). If you don't need anything quite that advanced and would rather configure `Spokestack` directly, read on.

### Speech pipeline

The [speech pipeline](speech-pipeline) is the first piece of the puzzle in any voice interaction and is responsible for capturing user audio and translating it into text. Configuring it entails choices about whether or not to use a wakeword to activate ASR, what kind of preprocessing to perform on audio before sending it to ASR, and which ASR service to use. These choices can all be made individually or through the use of configuration profiles, as mentioned in the pipeline guide linked above.

By default, the `Spokestack` class uses the `TFWakewordAndroidASR` profile, which expects paths to [TensorFlow Lite](https://www.tensorflow.org/lite) model files to be added to the builder:

```kotlin
val spokestack = Spokestack.Builder()
  .setProperty("wake-detect-path", "path-to-detect.tflite")
  .setProperty("wake-encode-path", "path-to-encode.tflite")
  .setProperty("wake-filter-path", "path-to-filter.tflite")
  // ...
  .build()
```

Wakeword models that respond to the "Spokestack" wakeword can be found here: [detect](https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/detect.tflite) | [encode](https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/encode.tflite) | [filter](https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/filter.tflite)

**Note**: configurations using Android's ASR must also provide an Android application context via `withAndroidContext()`.

If you would prefer to manually activate ASR, you can disable wakeword using the builder's `withoutWakeword()` method, which will activate the `PushToTalkAndroidASR` profile and remove the need to supply wakeword model files, or you can select your own profile via `getPipelineBuilder().useProfile()`.

To disable wakeword and ASR altogether, use the builder's `withoutSpeechPipeline()` method.

### NLU

Once a user's speech has been transcribed, it's useful to know what to _do_ with it. That's where [Natural Language Understanding](nlu) comes in. You'll need an NLU model and supporting files to use this feature; see our [model export guide](/docs/Concepts/export) for some easy ways to create your own. You'll supply the `Spokestack` builder with paths to these files just like you would wakeword files:

```kotlin
val spokestack = Spokestack.Builder()
  .setProperty("nlu-model-path", "path-to-nlu.tflite")
  .setProperty("nlu-metadata-path", "path-to-metadata.json")
  .setProperty("wordpiece-vocab-path", "path-to-vocab.txt")
  // ...
  .build()
```

Once configured, all ASR transcripts will automatically be sent through NLU; see [Receiving events](#receiving-events) below for information on how to see the results.

For certain domains, though, relying completely on ASR can be problematic. Sometimes the most likely transcription of a given sound isn't the most likely transcription _for your app_. We experienced this ourselves during development of our [Bartender app](https://play.google.com/store/apps/details?id=com.spokestack.bartender), where ASR consistently misheard "gin" as "Jen".

Errors like this can cause cascading problems in processing user requests, so `Spokestack` allows you to edit ASR transcripts before they're sent to NLU. Just supply an instance of a class that implements `TranscriptEditor` at build time:

```kotlin
val spokestack = Spokestack.Builder()
  .withTranscriptEditor(myEditor)
  // ...
  .build()
```

With that in place, every final ASR transcript will be sent through `myEditor.edit()` before being sent to NLU. Any listeners receiving speech events can access the unedited transcript via `RECOGNIZE` events, but NLU results will contain the edited version in the `utterance` field.

We recommend that you use this feature sparingly and only after testing interactions with a variety of voices.

As with the speech pipeline, NLU features can also be disabled with builder methods:

- `withoutAutoClassification()`: Don't automatically send ASR transcripts to the NLU. If models are supplied, the NLU will still be available at runtime via `Spokestack`'s `getNlu()` and `classify()` methods.
- `withoutNlu()`: Disable NLU entirely. This removes the need to supply NLU file paths to the builder.

### TTS

Once your app has processed the user's request, you'll likely want to respond via the same input modality that request came from—audio. That's where [text-to-speech](tts) comes in. By default, `Spokestack` handles sending text responses to a cloud service for synthesis and playing the resulting audio. The only configuration necessary are your Spokestack credentials (client ID and secret key, available from the [account settings](/account/settings) dashboard) and a couple Android system components:

```kotlin
val spokestack = Spokestack.Builder()
  .setProperty("spokestack-id", "your-client-id")
  .setProperty("spokestack-secret", "your-secret-key")
  .withAndroidContext(applicationContext)
  .withLifecycle(lifecycle)
  // ...
  .build()
```

With TTS enabled, you can use `Spokestack`'s `synthesize()` method to respond to your users. Spokestack uses [ExoPlayer](https://exoplayer.dev/) to play back synthesized audio. If you'd rather manage playback yourself, call `withoutAutoPlayback()` on the builder and see the next section for information on handling TTS events.

To disable TTS entirely at build time, eliminating the need to add your Spokestack credentials to the builder (unless you've switched ASR providers to Spokestack ASR), call `withoutTts()`.

## Receiving events

So far we've talked mostly about how to get Spokestack running and turn some knobs to make it work just the way you'd like. We've touted all the things it does without any intervention from an app that's using it . . . but at some point, you're going to want to interact with your user's requests. Once a transcript goes through NLU, you'll need the results of that classification in order to actually respond to the user.

Events from all Spokestack modules are dispatched to a listener registered at build time. This listener must inherit from the `SpokestackAdapter` class, which has been designed to allow clients to handle only the events they're interested in.

`SpokestackAdapter` implements listener interfaces for all individual Spokestack modules, so those listeners' methods can be overridden and used as event handlers. Since these methods were originally designed for separate modules, though, their names don't look great all together in the same class. For that reason, we've also (since version 9.1.0) provided convenience methods that specify the module where the event originated. The new methods are:

- `speechEvent()`: Receives events from the speech pipeline—activation, deactivation, ASR results, etc. Trace events are also sent to the `log()` method (see below).
- `nluResult()`: Receives classifications from the NLU module.
- `ttsEvent()`: Receives events from the TTS subsystem. If you're managing TTS playback manually, the `AUDIO_AVAILABLE` event will let you know when your TTS response is ready to play. Be sure to download or play the audio within 60 seconds of this event, or it will become unavailable.
- `trace()`: Receives trace events from all modules, specifying the module that originated the event. These events are also sent to the handlers related to individual modules, so it's up to you where to handle them. Overriding `trace()`, just like any of the other methods, is optional.
- `error()`: Like `trace()`, this method receives errors from all modules, specifying the module that originated the error.
