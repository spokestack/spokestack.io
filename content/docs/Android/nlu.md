---
title: NLU on Android
navId: NLU (Android)
description: Understanding the Android NLU API
draft: false
---

This is a companion to the [NLU concept guide](/docs/Concepts/nlu), which discusses the NLU subsystem holistically. Here we'll talk about usage issues specific to the Android client library.

## Usage

As mentioned in the [Getting Started](getting-started) guide, initializing the Spokestack NLU is done using a fluent interface, just like other Spokestack components:

```kotlin
val nlu = TensorflowNLU.Builder()
    .setProperty("nlu-model-path", "$cacheDir/nlu.tflite")
    .setProperty("nlu-metadata-path", "$cacheDir/metadata.json")
    .setProperty("wordpiece-vocab-path", "$cacheDir/vocab.txt")
    .addTraceListener(this)
    .build()
```

The configuration properties above refer to the three required files for the Spokestack NLU model you're using. They're stored at the root of the app's cache directory here for convenience.

When it comes time to classify an utterance, Spokestack's NLU does all the heavy lifting on a background thread and returns an [`AsyncResult`](https://www.javadoc.io/doc/io.spokestack/spokestack-android/latest/io/spokestack/spokestack/util/AsyncResult.html) that wraps the eventual classification data. This custom version of [`Future`](https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/Future.html) exists to enable different approaches to retrieving the classification:

### 1) Blocking call

An `AsyncResult` can be used in a synchronous context by calling its `get()` method, which blocks until the result is available. This can be useful if you're already working on a background thread and don't wish to complicate things further to get the classifier's answer. We'll simulate that situation below via Kotlin's [coroutine context](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/with-context.html).

```kotlin
GlobalScope.launch(Dispatchers.Default) {
    // other background tasks

    nlu?.let {
        val nluResult = it.classify(utterance).get()

        // go back to the main context to update the UI
        withContext(Dispatchers.Main) {
            // nluResult.intent contains the user's intent
            // nluResult.slots contains slots detected in the utterance
        }
    }
}
```

### 2) Callback

Where `AsyncResult` differs from a vanilla `Future` is in its ability to notify a registered callback when the result is available. Note that the callback is invoked from the NLU's background thread, so any updates to the UI will need to be wrapped appropriately. The example below creates an anonymous class/object expression to represent the callback; it might be cleaner to have a separate class for this depending on your use case.

```kotlin
val asyncResult = nlu?.classify(utterance)
asyncResult?.registerCallback(object : Callback<NLUResult> {
    override fun call(nluResult: NLUResult?) {
        runOnUiThread {
            // update UI with nluResult
        }
    }

    override fun onError(err: Throwable?) {
        // handle error
    }
})
```
