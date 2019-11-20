---
title: Cookbook
date: '2019-11-19T19:06:43.000Z'
description: Code snippets and tips
draft: false
---

This is a collection of code snippets and brief descriptions designed to help you be as productive as possible as quickly as possible. Check out the [Concepts](/docs/Concepts) section for more detailed discussions about the techniques mentioned here.

### Set up a default `SpeechPipeline`

```swift
import Spokestack

...

// The default configuration uses Apple's ASR as both a
// wakeword recognizer and speech recognizer
// `self` adopts the `SpeechEventListener` and
// `PipelineDelegate` protocols
let pipeline = SpeechPipeline(self, pipelineDelegate: self)

...

func startListening() {
    // Spokestack will start listening for its wakeword
    pipeline.start()
}
```

### Tap to talk

```swift
// `pipeline` is a `SpeechPipeline` instance as before
func onTalkButtonPressed() {
    // if the pipeline has been started elsewhere, you
    // don't need this line
    pipeline.start()

    // skips the wakeword activation and sends the pipeline
    // straight to ASR
    pipeline.activate()
}
```

### Use a custom wakeword

This example uses the default configuration, which is to say that Apple ASR is used as a wakeword detector. This may or may not perform well for your specific wakeword, but it should be suitable for demo purposes. Contact us for more information about developing a custom wakeword for your app.

```swift
import Spokestack

...

let pipeline: SpeechPipeline?

func initPipeline() {
    var config = SpeechConfiguration()
    config.wakewords = "custom,phrase"
    config.wakePhrases = "custom phrase"

    // `self` adopts the `SpeechEventListener` and
    // `PipelineDelegate` protocols
    self.pipeline = SpeechPipeline(
        SpeechProcessors.appleSpeech.processor,
        speechConfiguration: config,
        speechDelegate: self,
        wakewordService: SpeechProcessors.tfLiteWakeword,
        pipelineDelegate: self
    )
}
```

### Recognize Wakewords with [TFLite](https://www.tensorflow.org/lite)

```swift
import Spokestack

...

// `self` adopts the `SpeechEventListener` and
// `PipelineDelegate` protocols
let pipeline = SpeechPipeline(
    SpeechProcessors.appleSpeech.processor,
    speechConfiguration: SpeechConfiguration(),
    speechDelegate: self,
    wakewordService: SpeechProcessors.tfLiteWakeword,
    pipelineDelegate: self
)
```

### Cancel ASR (before the timeout is reached)

```swift
// `pipeline` is a `SpeechPipeline` instance
func cancelAsr() {
    pipeline.deactivate()
}
```

When `deactivate` is called, Spokestack will continue listening for the next wakeword activation. To stop listening entirely, call

```swift
pipeline.stop()
```

After calling this, you'll need to call

```swift
pipeline.start()
```

before you'll be able to recognize a wakeword again.

If speech is being processed when `deactivate` is called, it will still be delivered to your `SpeechEventListener`'s `didRecognize` method when processing is complete.
