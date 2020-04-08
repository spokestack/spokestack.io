---
title: Cookbook
navId: Cookbook (Android)
description: Code snippets and tips for Android
draft: false
---

This is a collection of code snippets and brief descriptions designed to help you be as productive as possible as quickly as possible. Check out the Concepts section on the left for more detailed discussions about the techniques mentioned here, in particular the [configuration guide](/docs/Concepts/pipeline-configuration) for descriptions of properties used for the various configurations.

Most configuration tuning is done at pipeline build time, so the majority of these examples simply demonstrate a different build process. For simplicity, these examples assume that the class containing the pipeline also implements the `OnSpeechEventListener` interface (hence the references to `this`); adjust as necessary for your project.

### Set up a default `SpeechPipeline`

No wakeword is used in this base configuration; the ASR portion of the pipeline is started in a function designed to be called by a button.

```kotlin
private var pipeline: SpeechPipeline? = null

// later on, in a setup function
pipeline = SpeechPipeline.Builder()
    .useProfile("io.spokestack.spokestack.profile.VADTriggerGoogleASR")
    .setProperty("google-credentials", "<google-credentials>")
    .setProperty("locale", "en-US")
    .addOnSpeechEventListener(this)
    .build();

fun onMicButtonTap(view: View) {
    // Spokestack will send any audio recognized as speech to Google ASR
    pipeline.start()
}
```

### Wakeword activation

To use the demo "Spokestack" wakeword, download the TensorFlow Lite models: [detect](https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/detect.lite) | [encode](https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/encode.lite) | [filter](https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/filter.lite)

```kotlin
pipeline = SpeechPipeline.Builder()
    .useProfile("io.spokestack.spokestack.profile.TFWakewordAndroidASR")
    .setProperty("wake-filter-path", "<tensorflow-lite-filter-path>")
    .setProperty("wake-encode-path", "<tensorflow-lite-encode-path>")
    .setProperty("wake-detect-path", "<tensorflow-lite-detect-path>")
    .setAndroidContext(applicationContext)
    .addOnSpeechEventListener(this)
    .build();
```

The wakeword models need to be loaded from regular files at runtime. We recommend compressing them in the `assets` directory to reduce the overall size of your app, which means you'll need to decompress them (ideally only once, perhaps by storing them in the cache directory and unconditionally decompressing on app upgrade), then reference the decompressed versions. Here's one way to decompress to the app's cache directory:

```kotlin
private fun decompress(modelName: String) {
    val filterFile = File("$cacheDir/$modelName")
    val inputStream = assets.open(modelName)
    val size = inputStream.available()
    val buffer = ByteArray(size)
    inputStream.read(buffer)
    inputStream.close()
    val fos = FileOutputStream(filterFile)
    fos.write(buffer)
    fos.close()
}
```

### Tap-to-talk + ASR

If you need the pipeline to be started in order to recognize a wakeword, but you still want to allow the user to manually activate ASR via a button, call this inside your button handler:

```kotlin
// assumes `pipeline` is a `SpeechPipeline`, and `start` has already been called on it
fun onMicButtonTap(view: View) {
    pipeline.activate()
}
```

### Cancel ASR

If you need to stop ASR before the timeout is reached (for example, your app has a "close" button that stops the current voice interaction but leaves wakeword detection active), do the following:

```kotlin
// `pipeline` is a `SpeechPipeline` instance
func cancelAsr() {
    pipeline.deactivate()
}
```

If speech is being processed when the `DEACTIVATE` event is received, the transcript will still be delivered to your `OnSpeechEventListener` via a `RECOGNIZE` event when processing is complete.

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

Using regexes for NLU is only advised if you only want to support a narrow range of user utterances (perhaps keywords/simple commands), but it's simple enough to implement. Remember that an `OnSpeechEventListener` will receive the transcript of a user utterance in a `RECOGNIZE` event. From there, it's as easy as feeding the transcript through a series of regexes (make sure they're ordered in such a way that a more generic expression doesn't accidentally capture text meant for a more specific one).

Let's imagine you're creating a voice-controlled timer. It's probably not the best idea to put your NLU directly in your main Activity, but we'll do it here so you can see all the relevant code, starting with the event listener:

```kotlin
class MyActivity : AppCompatActivity(), OnSpeechEventListener {

    // ...

    override fun onEvent(event: SpeechContext.Event?, context: SpeechContext?) {
        when (event) {
            // ...
            SpeechContext.Event.RECOGNIZE -> context?.let { handleSpeech(it.transcript) }
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
