---
title: Getting Started
navId: Getting Started (Android)
description: Getting started with the Spokestack Android API
draft: false
tags: Android
---

This guide will get you up and running with Spokestack for Android, and you'll be hearing and responding to your users in no time.

One caveat before we start, though: _This is not a collection of best practices_. We're going to be trading thoughtful organization for convenience here, so when we say something like "put this in your main activity", just know that you might not want to leave it there long-term. OK, now that that's out of the way, let's jump in.

To follow along with these snippets in the context of a full project, download our [Android skeleton](https://github.com/spokestack/android-skeleton) app. Its UI doesn't offer much to look at, but it might be easier than copying and pasting code snippets from this guide as we list them.

You'll also need API credentials to use some Spokestack services. Click [here](/create) to create your free account; API keys can be found in [account settings](/account/settings).

## Installation

First, you'll need to declare the Spokestack dependencies in your project. Add the following to your app's `build.gradle`:

```groovy
android {

  // ...

  compileOptions {
      sourceCompatibility JavaVersion.VERSION_1_8
      targetCompatibility JavaVersion.VERSION_1_8
  }
}

// ...

dependencies {
  // ...

  implementation 'io.spokestack:spokestack-android:%ANDROID_VERSION'

  // for TensorFlow Lite-powered wakeword detection and/or NLU, add this one too
  implementation 'org.tensorflow:tensorflow-lite:2.3.0'

  // for automatic playback of TTS audio
  implementation 'androidx.media:media:1.2.1'
  implementation 'com.google.android.exoplayer:exoplayer-core:2.11.7'

  // if you plan to use Google ASR, include these
  implementation 'com.google.cloud:google-cloud-speech:1.22.2'
  implementation 'io.grpc:grpc-okhttp:1.28.0'

  // if you plan to use Azure Speech Service, include these
  // - note that you'll also need to add the following to your top-level
  //   build.gradle's `repositories` block:
  // maven { url 'https://csspeechstorage.blob.core.windows.net/maven/' }
  implementation 'com.microsoft.cognitiveservices.speech:client-sdk:1.9.0'
}
```

## Integration

To enable voice control, your app needs three things:

1. the proper system permissions
2. an instance of `Spokestack`
3. a place to receive Spokestack events

### 1. Permissions

To accept voice input, you need _at least_ the `RECORD_AUDIO` permission, and to perform speech recognition and TTS, you'll need to network access. These permissions are added automatically by the manifest included with the Spokestack library as of version 5.0.0, so you shouldn't need to add them explicitly.

Starting with Android 6.0, however, the `RECORD_AUDIO` permission requires you to request it from the user at runtime. Please see the [Android developer documentation](https://developer.android.com/training/permissions/requesting.html) for more information on how to do this. You'll also have to deal with the user potentially denying these permissions (or granting them at first and removing them later), but that's outside the scope of this guide.

Note that sending audio over the network can use a considerable amount of data, so you may also want to look into WiFi-related permissions and allow the user to disable voice control when using cellular data.

Also note that [the Android emulator cannot record audio](https://developer.android.com/guide/topics/media/mediarecorder). You'll need to test the voice input parts of your app on a real device.

### 2. `Spokestack`

`youtube: [Build your own voice interface to talk directly to your customers](https://www.youtube.com/watch?v=AvhQ6-9nCrQ)`

With the proper permissions in place, it's time to decide where you'd like to receive and process speech input. In a single-activity app, the easiest place for this is going to be your main activity. `import io.spokestack.spokestack.Spokestack` at the top of the file, and add a `Spokestack` member:

```kotlin
private lateinit var spokestack: Spokestack
```

You'll probably want to build the pipeline when the activity is created. Remember that you'll need to have the `RECORD_AUDIO` permission for this, so make sure you check that permission before trying to _start_ Spokestack.

```kotlin
spokestack = Spokestack.Builder()
  .setProperty("wake-detect-path", "$cacheDir/detect.tflite")
  .setProperty("wake-encode-path", "$cacheDir/encode.tflite")
  .setProperty("wake-filter-path", "$cacheDir/filter.tflite")
  .setProperty("nlu-model-path", "$cacheDir/nlu.tflite")
  .setProperty("nlu-metadata-path", "$cacheDir/metadata.json")
  .setProperty("wordpiece-vocab-path", "$cacheDir/vocab.txt")
  .setProperty("trace-level", EventTracer.Level.DEBUG.value())
  .setProperty("spokestack-id", "your-client-id")
  .setProperty("spokestack-secret", "your-secret-key")
  // `applicationContext` is available inside all `Activity`s
  .withAndroidContext(applicationContext)
  // see the next section; `listener` here inherits from `SpokestackAdapter`
  .addListener(listener)
  .build()
```

This is a complete example and uses wakeword activation, on-device [ASR](/docs/Concepts/asr), [NLU](/docs/Concepts/nlu), and [TTS](/docs/Concepts/tts), hence the properties that point Spokestack to [TensorFlow Lite](https://www.tensorflow.org/lite) model files. We've assumed that these files are stored in the app's cache directory for convenience, but they can be kept wherever it makes sense for your app.

See [the `Spokestack` guide](turnkey-configuration) for more information on downloading wakeword and NLU models.

Once a `Spokestack` instance has been built, it begins processing audio when `start()` is called. If the wakeword component is enabled (as it is by default), this processing is entirely on-device until the wakeword is recognized. After wakeword recognition, Spokestack begins "actively" listening, sending audio through ASR for transcription. Depending on which ASR provider is used, this may also be done on-device (the default Android ASR currently processes on-device).

There are many options for configuring Spokestack beyond what we've described here. For example, to spin up a quick demo that just uses ASR and TTS, you can avoid downloading/storing neural models and set up Spokestack like this:

```kotlin
spokestack = Spokestack.Builder()
  .withoutWakeword()
  .withoutNlu()
  .setProperty("trace-level", EventTracer.Level.DEBUG.value())
  .setProperty("spokestack-id", "your-client-id")
  .setProperty("spokestack-secret", "your-secret-key")
  .withAndroidContext(applicationContext)
  .addListener(listener)
  .build()
```

Using this configuration, you'll still need to call `spokestack.start()` to begin processing, but ASR won't start until you call `spokestack.activate()`.

That's still just scratching the surface, though. Here are some useful links for more details on configuration:

- [Spokestack configuration guide](turnkey-configuration)
- [Speech pipeline configuration guide](speech-pipeline)
- [Available pipeline profiles](https://www.javadoc.io/doc/io.spokestack/spokestack-android/latest/io/spokestack/spokestack/profile/package-summary.html)

Note the `withListener(listener)` line. This is necessary to receive events from Spokestack, which is our next step.

### 3. `SpokestackAdapter`

Once we've recognized user speech, we want to be able to _do_ something with it. Spokestack's audio processing happens continuously while the pipeline is running, and it happens on a background thread to avoid bogging down the UI. Because of this, Spokestack implements the Observer pattern, dispatching relevant events to registered listeners. A listener must extend the `SpokestackAdapter` class and can override any or all of its methods, depending what events it's interested in.

Below is a sample implementation for the `speechEvent` function, called when Spokestack's speech pipeline changes state or emits a message (including ASR transcripts); see [the skeleton project](https://github.com/spokestack/android-skeleton) mentioned above for examples of the other functions.

```kotlin
override fun speechEvent(event: SpeechContext.Event, context: SpeechContext) {
  when (event) {
    SpeechContext.Event.ACTIVATE -> println("Pipeline activated")
    SpeechContext.Event.DEACTIVATE -> println("Pipeline deactivated")
    SpeechContext.Event.RECOGNIZE -> println("ASR result: ${context.transcript}")
    SpeechContext.Event.TIMEOUT -> println("ASR timeout")
    SpeechContext.Event.ERROR -> println("ASR Error: ${context.error}")
    SpeechContext.Event.TRACE -> println("TRACE: ${context.message}")
    SpeechContext.Event.PARTIAL_RECOGNIZE -> println("partial ASR result: ${context.transcript}")
  }
}
```

We've listed all possible speech events here; see [the documentation](https://www.javadoc.io/doc/io.spokestack/spokestack-android/latest/io/spokestack/spokestack/SpeechContext.Event.html) for a description of what each event means. Briefly, though, `ACTIVATE` and `DEACTIVATE` reflect the state of ASR—if you want to show any special UI components while your app is actively listening to the user, these events would be useful for showing/hiding them.

## From text to meaning

If the event is `RECOGNIZE`, `context.transcript` will give you the raw text of what the user just said. Translating that raw text into an action in your app is the job of an NLU, or natural language understanding, component. Spokestack offers custom NLU models that run entirely on-device, removing a network request from the equation. There are also a variety of cloud NLU providers: [DialogFlow](https://dialogflow.com/), [LUIS](https://www.luis.ai/home), or [wit.ai](https://wit.ai/), to name a few. If your app is simple enough, you can even make your own with string matching or regular expressions (see the [cookbook](cookbook) for an example).

If you supply the `Spokestack` builder with NLU files, each speech transcript will automatically be classified using Spokestack's NLU. The results of the classification are dispatched via the `SpokestackAdapter.nluResult()` method:

```kotlin
override fun nluResult(result: NLUResult) {
  Log.i(logTag, "NLU classification: ${result.intent}")
  Log.i(logTag, "\tintent: ${result.intent} (confidence: ${result.confidence})")
  Log.i(logTag, "\tslots:")
  result.slots.forEach { slot ->
    Log.i(logTag, "\t\t${slot.key}: ${slot.value.value}")
  }
  respond(result.utterance)
}

private fun respond(utterance: String) {
  // A (too-) simple response generator that parrots back what the user just said. With
  // the default TTS setup, this response will be automatically played when the audio is
  // available.
  val request = SynthesisRequest.Builder("Why do you feel that $utterance?").build()
  spokestack.synthesize(request)
}
```

Some useful links for configuring Spokestack's NLU:

- [high-level NLU guide](/docs/Concepts/nlu)
- [Android NLU module documentation](nlu)
- [converting an Alexa or Dialogflow NLU model](/docs/Concepts/export)

## Talking back to your users

If you want full hands- and eyes-free interaction, you'll want to deliver responses via voice as well. This requires a text-to-speech (TTS) component, and Spokestack has one of these too!

In fact, we just used it in the previous section; it's as simple as building a `SynthesisRequest` and calling `synthesize`. For more details about controlling pronunciation, see [the TTS concept guide](/docs/Concepts/tts).

By default, Spokestack handles playback of the synthesized audio; see the [configuration guide](turnkey-configuration) for instructions on handling it yourself. Spoiler alert—it involves the `ttsEvent()` listener method:

```kotlin
override fun ttsEvent(event: TTSEvent) {
  when (event.type) {
    TTSEvent.Type.ERROR -> println(event.error)
    // If you're managing playback yourself, this is where you'd receive the URL to your
    // synthesized audio
    TTSEvent.Type.AUDIO_AVAILABLE -> println("Audio received: ${event.ttsResponse.audioUri}")
    // If you want to restart ASR in anticipation of an immediate user response (for
    // example, as a response to a question from the app), you'd call pipeline?.activate()
    // here
    TTSEvent.Type.PLAYBACK_COMPLETE -> println("TTS playback complete")
    // If you want your UI to respond to playing audio
    TTSEvent.Type.PLAYBACK_STARTED -> println("TTS playback started")
    TTSEvent.Type.PLAYBACK_STOPPED -> println("TTS playback stopped")
  }
}
```

## Conclusion

That's all there is to it! Your app is now configured to accept and respond to voice commands. Obviously there's more we could tell you, and you can have much more control over the speech recognition process (including, but not limited to, configuring the pipeline's sensitivity and adding your own custom wakeword models). If you're interested in these advanced topics, check out our other guides. We'll be adding to them as Spokestack grows.

Thanks for reading!
