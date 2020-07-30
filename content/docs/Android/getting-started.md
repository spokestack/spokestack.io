---
title: Getting Started
navId: Getting Started (Android)
description: Getting started with the Spokestack Android API
draft: false
---

This guide will get you up and running with Spokestack for Android, and you'll be hearing and responding to your users in no time.

One caveat before we start, though: _This is not a collection of best practices_. We're going to be trading thoughtful organization for convenience here, so when we say something like "put this in your main activity", just know that you might not want to leave it there long-term. OK, now that that's out of the way, let's jump in.

To follow along with these snippets in the context of a full project, download our [Android skeleton](https://github.com/spokestack/android-skeleton) app. Its UI doesn't offer much to look at, but it might be easier than copying and pasting code snippets from this guide as we list them.

## Installation

First, you'll need to declare the Spokestack dependencies in your project. Because Spokestack includes native libraries, this is slightly more involved than a normal dependency. You'll need to download the Android NDK (available from the `SDK Manager` -> `SDK Tools` tab in Android Studio or at [developer.android.com/ndk/downloads](https://developer.android.com/ndk/downloads)) and add the following to your project's top-level `build.gradle`:

```groovy
// inside the buildscript block
dependencies {
    // (other dependencies)
    classpath 'com.nabilhachicha:android-native-dependencies:0.1.2'
}

// if you're using Azure Speech Service, this goes in the allProjects block
repositories {
    // (other repositories)
    maven { url 'https://csspeechstorage.blob.core.windows.net/maven/' }
}
```

and add this to your module's `build.gradle`:

```groovy
// before the android block:
apply plugin: 'android-native-dependencies'

// in the android block:
ndkVersion "your.version.here"
compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
}

// in the dependencies block
dependencies {
    // (other dependencies)
    implementation 'io.spokestack:spokestack-android:7.0.0'

    // if you plan to use Google ASR, also include these
    implementation 'com.google.cloud:google-cloud-speech:1.22.2'
    implementation 'io.grpc:grpc-okhttp:1.28.0'

    // for TensorFlow Lite-powered wakeword detection, add this one too
    implementation 'org.tensorflow:tensorflow-lite:1.14.0'

    // for Azure Speech Service
    implementation 'com.microsoft.cognitiveservices.speech:client-sdk:1.9.0'
}

// a new top-level block if you don't already have native dependencies
native_dependencies {
    artifact 'io.spokestack:spokestack-android:7.0.0'
}
```

## Integration

To enable voice control, your app needs three things:

1. the proper system permissions
2. an instance of Spokestack's `SpeechPipeline`
3. a place to receive speech events from the pipeline

### 1. Permissions

To accept voice input, you need _at least_ the `RECORD_AUDIO` permission, and to perform speech recognition and TTS, you'll need to network access. These permissions are added automatically by the manifest included with the Spokestack library as of version 5.0.0, so you shouldn't need to add them explicitly.

Starting with Android 6.0, however, the `RECORD_AUDIO` permission requires you to request it from the user at runtime. Please see the [Android developer documentation](https://developer.android.com/training/permissions/requesting.html) for more information on how to do this. You'll also have to deal with the user potentially denying these permissions (or granting them at first and removing them later), but that's outside the scope of this guide.

Note that sending audio over the network can use a considerable amount of data, so you may also want to look into WiFi-related permissions and allow the user to disable voice control when using cellular data.

Also note that [the Android emulator cannot record audio](https://developer.android.com/guide/topics/media/mediarecorder). You'll need to test the voice input parts of your app on a real device.

### 2. `SpeechPipeline`

With the proper permissions in place, it's time to decide where you'd like to receive and process speech input. In a single-activity app, the easiest place for this is going to be your main activity. `import io.spokestack.spokestack.SpeechPipeline` at the top of the file, and add a `SpeechPipeline` member:

```kotlin
private var pipeline: SpeechPipeline? = null
```

You'll probably want to build the pipeline when the activity is created. Remember that you'll need to have the `RECORD_AUDIO` permission for this, so make sure you check that permission before trying to start a pipeline.

```kotlin
pipeline = SpeechPipeline.Builder()
    .useProfile("io.spokestack.spokestack.profile.VADTriggerAndroidASR")
    .setAndroidContext(applicationContext)
    .addOnSpeechEventListener(this)
    .build();
```

There are many options for configuring the speech pipeline. This particular setup will begin capturing audio when `pipeline.start()` is called and use a Voice Activity Detection (VAD) component to send any audio determined to be speech through on-device ASR using Android's `SpeechRecognizer` API. In other words, the app is always actively listening, and no wakeword detection is performed. Using a `VADTrigger*` profile is a good way to test out ASR without having to tap a button to activate it or downloading and configuring wakeword models. Consider your use-case fully before using it in production, however, since it will capture all speech it hears, not just what's directed at your app.

Some useful links:

- [Speech pipeline configuration guide](/docs/Android/speech-pipeline)
- [Available pipeline profiles](https://www.javadoc.io/static/io.spokestack/spokestack-android/5.6.0/io/spokestack/spokestack/profile/package-summary.html)
- [ASR provider documentation](/docs/Concepts/asr)

Note also the `addOnSpeechEventListener(this)` line. This is necessary to receive speech events from the pipeline, which is our next step.

### 3. `OnSpeechEventListener`

We've declared that the class housing the speech pipeline will also receive its events, so scroll back to the top and make sure it implements the `OnSpeechEventListener` interface.

```kotlin
class MyActivity : AppCompatActivity(), OnSpeechEventListener {

    // ...

    override fun onEvent(event: SpeechContext.Event?, context: SpeechContext?) {
        when (event) {
            SpeechContext.Event.ACTIVATE -> println("ACTIVATED")
            SpeechContext.Event.DEACTIVATE -> println("DEACTIVATED")
            SpeechContext.Event.RECOGNIZE -> context?.let { handleSpeech(it.transcript) }
            SpeechContext.Event.TIMEOUT -> println("TIMEOUT")
            SpeechContext.Event.ERROR -> context?.let { println("ERROR: ${it.error}") }
            else -> {
                // do nothing
            }
        }
    }

    private fun handleSpeech(transcript: String) {
        // do something with the text
    }
}
```

We've listed all possible speech events here; see [the documentation](https://www.javadoc.io/doc/io.spokestack/spokestack-android/latest/io/spokestack/spokestack/SpeechContext.Event.html) for a description of what each event means. Briefly, though, `ACTIVATE` and `DEACTIVATE` reflect the state of ASR—if you want to show any special UI components while your app is actively listening to the user, these events would be useful for showing/hiding them.

## From text to meaning

If the event is `RECOGNIZE`, `context.transcript` will give you the raw text of what the user just said. Translating that raw text into an action in your app is the job of an NLU, or natural language understanding, component. Spokestack offers custom NLU models that run entirely on-device, removing a network request from the equation. There are also a variety of cloud NLU providers: [DialogFlow](https://dialogflow.com/), [LUIS](https://www.luis.ai/home), or [wit.ai](https://wit.ai/), to name a few. If your app is simple enough, you can even make your own with string matching or regular expressions (see the [cookbook](cookbook) for an example).

We'll briefly cover setup and use of the Spokestack NLU component here, but see the [NLU guide](nlu) for more details on its design and use.

```kotlin
val nlu = TensorflowNLU.Builder()
    .setProperty("nlu-model-path", "$cacheDir/nlu.tflite")
    .setProperty("nlu-metadata-path", "$cacheDir/metadata.json")
    .setProperty("wordpiece-vocab-path", "$cacheDir/vocab.txt")
    .addTraceListener(this)
    .build()

// ...

GlobalScope.launch(Dispatchers.Default) {
    nlu?.let {
        val result = it.classify(utterance).get()
        withContext(Dispatchers.Main) {
            // result.intent contains the user's intent
            // result.slots contains slots detected in the utterance
        }
    }
}
```

**Note**: This example uses NLU model files you'll need to obtain elsewhere. See our [export guide](/docs/Concepts/export) for instructions on converting an Alexa or Dialogflow interaction model into Spokestack's format. See the [skeleton project](https://github.com/spokestack/android-skeleton) mentioned at the beginning of the guide or our [skill conversion tutorial](/blog/porting-the-alexa-minecraft-skill-to-android-using-spokestack) for one approach for putting the models in your app's `$cacheDir`.

We've used Kotlin's [coroutine context](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/with-context.html) to force the waiting for the classification result onto a background thread. Classification itself always runs on a background thread, but the result must be retrieved either by a blocking call or a callback registered to the return of `classify()`. We chose the former here for simplicity. Any UI changes needed to react to the result should happen on the main thread, which is why we switch back to `Dispatchers.Main` once the result is available. Again, the [NLU guide](nlu) explains all this in more depth.

## Talking back to your users

If you want full hands- and eyes-free interaction, you'll want to deliver responses via voice as well. This requires a text-to-speech (TTS) component, and Spokestack has one of these too!

The most basic usage of the TTS subsystem looks like this:

```kotlin
val tts = TTSManager.Builder()
    .setTTSServiceClass("io.spokestack.spokestack.tts.SpokestackTTSService")
    .setOutputClass("io.spokestack.spokestack.tts.SpokestackTTSOutput")
    .setProperty("spokestack-id", "f0bc990c-e9db-4a0c-a2b1-6a6395a3d97e")
    .setProperty("spokestack-secret",
                 "5BD5483F573D691A15CFA493C1782F451D4BD666E39A9E7B2EBE287E6A72C6B6")
    .setAndroidContext(applicationContext)
    .setLifecycle(lifecycle)
    .build()

// ...

val request = SynthesisRequest.Builder("hello world").build()
tts.synthesize(request)
```

**Note**: This example uses a media player to automatically play the synthesized audio. This is an optional dependency that you'll have to add in your `build.gradle` file. See [the TTS guide](tts) for more details; if you're just interested in getting those dependencies, here they are. You may already have one or more of them depending on the project you started with in the IDE.

```groovy
  implementation 'androidx.lifecycle:lifecycle-common-java8:2.1.0'
  implementation 'androidx.media:media:1.1.0'
  implementation 'com.google.android.exoplayer:exoplayer-core:2.11.0'
```

The API credentials in this example set you up to use the demo voice available for free with Spokestack; for more configuration options and details about controlling pronunciation, see [the TTS concept guide](/docs/Concepts/tts).

## Conclusion

That's all there is to it! Your app is now configured to accept and respond to voice commands. Obviously there's more we could tell you, and you can have much more control over the speech recognition process (including, but not limited to, configuring the pipeline's sensitivity and adding your own custom wakeword models). If you're interested in these advanced topics, check out our other guides. We'll be adding to them as Spokestack grows.

Thanks for reading!
