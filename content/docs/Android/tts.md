---
title: Text-to-speech for Android
navId: TTS (Android)
description: Documentation for Spokestack's Android TTS subsystem.
draft: false
---

Text-to-speech is a broad topic, but as far as Spokestack is concerned, there are two things your app has to handle: sending text or SSML to be synthesized, and playing the resulting audio for your users. This guide will cover both.

## Generating the audio

The best way to synthesize speech in Spokestack is to use the `TTSManager` subsystem. This small collection of components is built similarly to the `SpeechPipeline`, but it operates completely independently.

Here's how to initialize a `TTSManager` using Spokestack's TTS synthesis API:

```kotlin
private var tts: TTSManager? = null

// ...

tts = TTSManager.Builder()
    .setTTSServiceClass("io.spokestack.spokestack.tts.SpokestackTTSService")
    .setProperty("spokestack-id", "f0bc990c-e9db-4a0c-a2b1-6a6395a3d97e")
    .setProperty("spokestack-secret",
                 "5BD5483F573D691A15CFA493C1782F451D4BD666E39A9E7B2EBE287E6A72C6B6")
    .addTTSListener(this)
    .build()
```

In this example, `spokestack-id` and `spokestack-secret` are set to sample values that let you try Spokestack TTS without creating an account. [Create an account](https://spokestack.io/create) or [sign in](https://spokestack.io/login) to get your own free API credentials.

Note also the `TTSListener` established here. This component will receive events from the TTS subsystem, including errors and audio URLs resulting from synthesis requests. If you're using Spokestack's built-in media player (described in the next section), you won't need to handle the URLs yourself, but you might still wish to log errors.

Once set up, synthesizing audio requires a single call to the TTS manager:

```kotlin
fun speak(text: String, mode: SynthesisRequest.Mode) {
  val synthRequest = SynthesisRequest.Builder(text).withMode(mode).build()
  tts?.synthesize(synthRequest)
}
```

The `mode` parameter is included here as a reminder that Spokestack supports a subset of the [SSML](https://www.w3.org/TR/speech-synthesis11) spec for specifying pronunciation and specific pause times. See [the TTS concept guide](/docs/Concepts/tts) for more information on providing SSML input. If you don't need this level of control, simply omit `mode`; the default mode of `SynthesisRequest`is plain text.

## Playing it

Spokestack lets you choose how you manage the audio for your app's voice, and the right option for you will likely depend on your app's category and feature set. There are two main categories of interest here:

### 1. I'm building a media app.

If your app makes heavy use of media already, you likely have a preferred media player, and you've developed (or will soon develop) a strategy for integrating it into the Android lifecycle. You probably want the maximum level of control over the audio Spokestack produces, and that's fine. All you have to do is establish a `TTSManager` and subscribe whatever class you want to receive audio URLs by adding `.addTTSEventListener()` to your builder call chain. You could even use the `SpokestackTTSClient` directly instead of the manager and register the URL handler as its callback. Whichever path you choose, the listener will receive any audio URLs produced by Spokestack's TTS service, and you can use them as you wish—just make sure to play or download the audio within 60 seconds of receiving the URL, or it will become inaccessible.

### 2. What's a `MediaPlayer`?

If, on the other hand, your voice interaction will be the _only_ audio your app uses, you likely don't want the hassle of managing a media player's lifecycle and the resources it controls. If that's the case, Spokestack can handle playback internally so you don't have to become an Android audio expert.

Note that this method provides your app with a headless media player; there are no UI elements to manage, but that also means that the user won't have a way to pause your app's voice. We'll consider adding a managed UI option based on demand, so if this is something you need, [join the discussion](https://github.com/spokestack/spokestack-android) on GitHub.

#### Prerequisites

Spokestack uses [ExoPlayer](https://exoplayer.dev/) for audio playback, which requires that your app to target API level 16 or above.

You'll also need to add the following dependencies to your app's `build.gradle`:

```groovy
dependencies {
  // ...

  implementation 'androidx.lifecycle:lifecycle-common-java8:2.1.0'
  implementation 'androidx.media:media:1.1.0'
  implementation 'com.google.android.exoplayer:exoplayer-core:2.11.0'
}
```

#### Usage

To use the built-in audio player to manage TTS responses, add the following to your `TTSManager` builder:

```kotlin
tts = TTSManager.Builder()
    // ...
    .setOutputClass("io.spokestack.spokestack.tts.SpokestackTTSOutput")
    .setAndroidContext(applicationContext)
    .setLifecycle(lifecycle)
    .build()
```

`SpokestackTTSOutput` is [lifecycle-aware](https://developer.android.com/topic/libraries/architecture/lifecycle.html), so it deals with releasing system resources automatically based on lifecycle events such as screen rotations, activity transitions, etc.

Handling the media player is _most_ of the work, but as you may have guessed, there are no totally free rides in mobile development. In order to track the lifecycle properly, you still have to tell Spokestack which component's lifecycle to track. Notice the `this` in the previous snippet—we're assuming that the component creating the `TTSManager` is what Android calls a `LifecycleOwner`. This doesn't _have_ to be the case; the class creating the manager might just hold a reference to a `LifecycleOwner`, in which case you'd pass the manager the lifecycle accessible from that reference instead. When the `Activity` in focus changes, simply register its lifecycle with the TTS subsystem:

```kotlin
class MyActivity : AppCompatActivity() {

    // tts is a TTSManager established elsewhere
    override fun onResume(){
        tts.registerLifecycle(lifecycle)
    }
}
```
