---
title: Getting Started
navId: Getting Started (Android)
description: Getting started with the Spokestack API
draft: false
---

This guide will get you up and running with Spokestack for Android, and you'll be hearing and talking to your users in no time.

One caveat before we start, though: _This is not a collection of best practices_. We're going to be trading thoughtful organization for convenience here, so when we say something like "put this in your main activity", just know that you might not want to leave it there long-term. OK, now that that's out of the way, let's jump right in.

## Prerequisites

Your app needs to target Android 8.0 (API level 26) or higher in order to use speech recognition.

## Installation

First, you'll need to declare the Spokestack dependencies in your project. Because Spokestack includes native libraries, this is slightly more involved than a normal dependency. You'll need to add the following to your app's top-level `build.gradle`:

```gradle
// inside the buildscript block
dependencies {
    // (other dependencies)
    classpath 'com.nabilhachicha:android-native-dependencies:0.1.2+'
}
```

and this to your module's `build.gradle`:

```gradle
// before the android block:
apply plugin: 'android-native-dependencies'

// in the existing dependencies block
dependencies {
    // (other dependencies)
    implementation 'io.spokestack:spokestack-android:3.0.1'

    // if you plan to use Google ASR, also include these
    implementation 'com.google.cloud:google-cloud-speech:1.22.1'
    constraints {
        compile('com.google.protobuf:protobuf-java:3.11.0')
    }
    implementation 'io.grpc:grpc-okhttp:1.25.0'

    // if you plan to use Microsoft ASR instead
    implementation 'com.squareup.okhttp3:okhttp:3.11.0'

    // for TensorFlow Lite-powered wakeword detection, add this one too
    implementation 'org.tensorflow:tensorflow-lite:1.14.0'
}

// a new top-level block if you don't already have native dependencies
native_dependencies {
    artifact 'io.spokestack:spokestack-android:3.0.1'
}
```

Note the constraint in the Google Speech dependency; at the time of writing, the latest version of `google-cloud-speech` will limit dependent apps' compatibility to Android API 26 or later. This is fixed in `protobuf-java` v. 3.11.0 and may be fixed in future versions of the Google library; the constraint could then be removed.

## Integration

To enable voice control, your app needs three things:

1. the proper system permissions
2. an instance of Spokestack's `SpeechPipeline`
3. a place to receive speech events from the pipeline

### 1. Permissions

To accept voice input, you need _at least_ the `RECORD_AUDIO` permission, and to perform speech recognition and TTS, you'll need to network access, so add these lines to the `manifest` elment of your app's `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
```

Starting with Android 6.0, the `RECORD_AUDIO` permission requires you to request it from the user at runtime; see the [Android developer documentation](https://developer.android.com/training/permissions/requesting.html) for more information on how to do this.

Note that sending audio over the network can use a fair amount of data, so you may also want to look into WiFi-related permissions and allow the user to disable voice control when using cellular data.

### 2. `SpeechPipeline`

With the proper permissions in place, it's time to decide where you'd like to receive and process speech input. In a single-activity app, the easiest place for this is going to be your main activity. `import io.spokestack.spokestack.SpeechPipeline` at the top of the file, and add a `SpeechPipeline` member:

```kotlin
private var pipeline: SpeechPipeline? = null
```

You'll probably want to build the pipeline when the activity is created. Remember that you'll need to have the `RECORD_AUDIO` permission for this, so make sure you check that permission before trying to start a pipeline.

```kotlin
pipeline = SpeechPipeline.Builder()
    .setInputClass("io.spokestack.spokestack.android.MicrophoneInput")
    .addStageClass("io.spokestack.spokestack.webrtc.AutomaticGainControl")
    .addStageClass("io.spokestack.spokestack.webrtc.VoiceActivityDetector")
    .addStageClass("io.spokestack.spokestack.webrtc.VoiceActivityTrigger")
    .addStageClass("io.spokestack.spokestack.google.GoogleSpeechRecognizer")
    .setProperty("google-credentials", "<google-credentials>")
    .setProperty("locale", "en-US")
    .addOnSpeechEventListener(this)
    .build();
```

There are many options for configuring the speech pipeline. This particular setup will start begin capturing audio when `pipeline.start()` is called and use a Voice Activity Detection (VAD) component to send any audio determined to be speech through the Google Speech API. In other words, no wakeword detection is performed. See [the configuration guide](/docs/Android/pipeline-configuration) for more information about pipeline building options.

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

We've listed all possible speech events here; see [the documentation](https://www.javadoc.io/doc/io.spokestack/spokestack-android/latest/io/spokestack/spokestack/SpeechContext.Event.html) for a description of what each event means. Briefly, though, `ACTIVATE` and `DEACTIVATE` reflect the state of ASR—if you want to show any special UI components while your app is actively "listening" to the user, these events would be useful for showing/hiding them.

If the event is `RECOGNIZE`, `context.transcript` will give you the raw text of what the user just said. Translating that raw text into an action in your app is the job of an NLU, or natural language understanding, component. Spokestack currently leaves the choice of NLU up to the app: There's a variety of NLU services out there ([DialogFlow](https://dialogflow.com/), [LUIS](https://www.luis.ai/home), or [wit.ai](https://wit.ai/), to name a few), or, if your app is simple enough, you can make your own with string matching or regular expressions.

We know that NLU is an important piece of the puzzle, and we're working on a full-featured NLU component for Spokestack based on years of research and lessons learned from working with the other services; [sign up for our newsletter](LINK) to be the first to know when it's ready.

For the sake of our demo, though, let's say you're creating a voice-controlled timer. `handleSpeech` might look something like this:

```kotlin
private fun handleSpeech(transcript: String) {
    when {
        Regex("(?i)start").matches(transcript) -> {
            // start the timer and change the UI accordingly
        }
        Regex("(?i)stop").matches(transcript) -> {
            // stop the timer and change the UI accordingly
        }
        Regex("(?i)reset|start over").matches(transcript) -> {
            // reset the timer and change the UI accordingly
        }
    }
}
```

It's important to note that the speech pipeline runs on a background thread, so any UI changes related to speech events should be wrapped in a `runOnUiThread { }` block.

## Talking back to your users

If you want full hands-free and eyes-free interaction, you'll want to deliver responses via voice as well. This requires a text-to-speech (TTS) component, and Spokestack has one of these too!

It's completely separate from the speech pipeline, so you can talk to a user at any point, regardless of whether the pipeline is running. First, you'll need to set up a `TTSCallback` to receive audio URLs from Spokestack. Again, we'll just do this in the main activity.

```kotlin
class MyActivity : AppCompatActivity(), OnSpeechEventListener, TTSCallback {

    // ...

    override fun onError(message: String?) {
        // handle / communicate error
    }

    override fun onUrlReceived(url: String) {
        // use the Android MediaPlayer to play the url
    }
}
```

There are a few different options for handling media playback in Android, and media management is outside the scope of this guide. Stay tuned, though: A future version of Spokestack will handle playback internally, removing the burden from your app if TTS is the only audio you plan to use. In the meantime, see the Android documentation on [media app architecture](https://developer.android.com/guide/topics/media-apps/media-apps-overview) or its [MediaPlayer API](https://developer.android.com/guide/topics/media/mediaplayer).

In order to get the audio in the first place, though, you'll need to send your text to Spokestack. The code for this can go — you guessed it — in your main activity:

```kotlin
class MyActivity : AppCompatActivity(), OnSpeechEventListener, TTSCallback {
    // with your properties
    private var tts: SpokestackTTSClient? = null

    // ...

    override fun onCreate(savedInstanceState: Bundle?) {
        // ...

        tts = SpokestackTTSClient(this)
        tts!!.setApiKey("f854fbf30a5f40c189ecb1b38bc78059")
    }

    // then, when you need to say something
    private fun saySomething(text: String) {
        tts?.synthesize(text)
    }
}
```

The API key in this example sets you up to use the demo voice available for free with Spokestack; for more configuration options and details about controlling pronunciation, see [the TTS guide](tts).

## Conclusion

That's all there is to it! Your app is now configured to accept and respond to voice commands. Obviously there's more we could tell you, and you can have much more control over the speech recognition process (including, but not limited to, configuring the pipeline's sensitivity and adding your own custom wakeword model). If you're interested in these advanced topics, check out our other guides. We'll be adding to them as Spokestack grows.

Thanks for reading!
