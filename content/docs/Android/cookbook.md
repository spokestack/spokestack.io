---
title: Cookbook
navId: Cookbook (Android)
description: Code snippets and tips for Android
draft: false
---

This is a collection of code snippets and brief descriptions designed to help you be as productive as possible as quickly as possible. Check out the Concepts section for more detailed discussions about the techniques mentioned here, in particular the [configuration guide](/docs/Concepts/pipeline-configuration) for descriptions of properties used for the various configurations.

Most configuration tuning is done at build time, so the majority of these examples simply demonstrate a different build process. For simplicity, these examples assume that the class containing the pipeline has a reference to a subclass of `SpokestackAdapter` (which we've creatively named `adapter`); adjust as necessary for your project.

Client IDs and secret keys can be created in the [account](/account/settings) section.

### Activate ASR with any speech

No wakeword is used in this base configuration; any audio recognized as speech will be sent to ASR.

```kotlin
private lateinit var spokestack: Spokestack

// later on, in a setup function
val builder = Spokestack.Builder()
    .setProperty("spokestack-id", "your-client-id")
    .setProperty("spokestack-secret", "your-secret")
    .withAndroidContext(applicationContext)
    .withLifecycle(lifecycle)
    .addListener(adapter)

builder
    .getPipelineBuilder()
    .useProfile("io.spokestack.spokestack.profile.VADTriggerAndroidASR")

spokestack = builder.build()

// Spokestack will send any audio recognized as speech through ASR
spokestack.start()
```

Note the use of `useProfile()`. Available profiles can be found [here](https://www.javadoc.io/static/io.spokestack/spokestack-android/%ANDROID_VERSION/io/spokestack/spokestack/profile/package-summary.html)

### Tap-to-talk + ASR

If you want to allow the user to manually activate ASR via a button as well as with a wakeword, call this inside your button handler:

```kotlin
// assumes `start()` has already been called on `spokestack`
fun onMicButtonTap(view: View) {
    spokestack.activate()
}
```

### Cancel ASR

If you need to stop ASR before the timeout is reached (for example, your app has a "close" button that stops the current voice interaction but leaves wakeword detection active so that ASR can be reactivated), do the following:

```kotlin
func cancelAsr() {
    spokestack.deactivate()
}
```

If speech is being processed when the `DEACTIVATE` event is received, the transcript will still be delivered to your event listener via a `RECOGNIZE` event when processing is complete.

If you want to stop Spokestack entirely (including wakeword detection), you can call:

```kotlin
pipeline.stop()
```

After calling this, you'll need to call

```kotlin
pipeline.start()
```

before you'll be able to recognize a wakeword again. In-flight ASR requests will produce transcripts here as well.

### Regex-based NLU

Using regexes for NLU is only advised if you only want to support a narrow range of user utterances (perhaps keywords/simple commands), but it's simple enough to implement. Remember that a `SpokestackAdapter` will receive the transcript of a user utterance in a `RECOGNIZE` speech event. From there, it's as easy as feeding the transcript through a series of regexes (make sure they're ordered in such a way that a more generic expression doesn't accidentally capture text meant for a more specific one).

Let's imagine you're creating a voice-controlled timer. Your `SpokestackAdapter` implementation could contain the following:

```kotlin
class MyAdapter : SpokestackAdapter {

    // ...
  override fun speechEvent(event: SpeechContext.Event, context: SpeechContext) {
    when (event) {
      // ...
      SpeechContext.Event.RECOGNIZE -> handleSpeech(context.transcript)
      else -> {
          // ...
      }
    }
  }

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
}
```
