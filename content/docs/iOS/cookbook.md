---
title: Cookbook
navId: Cookbook (iOS)
description: Code snippets and tips for iOS
draft: false
---

This is a collection of code snippets and brief descriptions designed to help you be as productive as possible as quickly as possible. Check out the Concepts section on the left for more detailed discussions about the techniques mentioned here.

### Set up a default `SpeechPipeline`

```swift
import Spokestack

...

// The default configuration uses Apple's ASR as both a
// wakeword recognizer and speech recognizer
// `self` adopts the `SpeechEventListener` protocol
lazy public var pipeline: SpeechPipeline = {
    return SpeechPipelineBuilder()
    .setListener(self)
    .useProfile(.appleWakewordAppleSpeech)
    .build()
  }()

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

This example uses the same profile as the previous recipe, which is to say that Apple ASR is used as a wakeword detector. This may or may not perform well for your specific wakeword, but it should be suitable for demo purposes. Contact us for more information about developing a custom wakeword for your app.

```swift
import Spokestack

...

  lazy public var pipeline: SpeechPipeline = {
          return SpeechPipelineBuilder()
          .setListener(self)
          .useProfile(.appleWakewordAppleSpeech)
          .setProperty("wakewords", "custom,phrase")
          .build()
        }()
```

### Recognize Wakewords On-Device

To use the demo "Spokestack" wakeword, download the TensorFlow Lite models: [detect](https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/detect.lite) | [encode](https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/encode.lite) | [filter](https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/filter.lite)

```swift
import Spokestack

...

// `self` adopts the `SpeechEventListener`  protocol
// `*Path` variables are string paths to the models downloaded above
lazy public var pipeline = SpeechPipelineBuilder()
            .setListener(self)
            .setDelegateDispatchQueue(DispatchQueue.main)
            .useProfile(.tfLiteWakewordAppleSpeech)
            .setProperty("tracing", ".PERF")
            .setProperty("detectModelPath", detectPath)
            .setProperty("encodeModelPath", encodePath)
            .setProperty("filterModelPath", filterPath)
            .build()
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

### Regex-based NLU

Let's say you're creating a voice-controlled timer and wish to perform simplistic natural language processing to respond to a handful of commands: `start, stop, reset, start over`. `SpeechEventListener`'s' `didRecognize` might look something like this:

```swift
class MyViewController: UIViewController, SpeechEventListener {

    // ...other SpeechEventListener functions...

    func didRecognize(_ result: SpeechContext) {
        let userText = result.transcript
        if userText.range(of: "(?i)start",
                          options: .regularExpression) != nil {
            // start the timer and change the UI accordingly
            return
        }
        if userText.range(of: "(?i)stop",
                          options: .regularExpression) != nil {
            // stop the timer and change the UI accordingly
            return
        }
        if userText.range(of: "(?i)reset|start over",
                          options: .regularExpression) != nil {
            // reset the timer and change the UI accordingly
            return
        }
    }
}
```

### Extracting an intent slot value from `NLUResult`

Sticking with the timer app example, here's how to extract a slot value from an `NLUResult`, like one delivered to `NLUDelegate`'s `classification` event. Note that the intent and slot names are pre-determined by the NLU model metadata.

```swift
class MyViewController: UIViewController, SpeechEventListener, NLUDelegate {

    // ...other delegate functions...

    func classification(result: NLUResult) {
        switch result.intent {
        // using the example of a timer
        case "start":
            // the "start" intent can have slots named "duration" and "units"
            let duration = result.slots!["duration"]!.value as! Int
            let units = result.slots!["units"]!.value
            // start a timer for `duration` `units` (eg 60 seconds) and change the UI accordingly
            return
        }
    }
}
```

### Play back synthesis result using your own `AVPlayer`

```swift
 class MyViewController: UIViewController, SpeechEventListener, TextToSpeechDelegate {

    // with your properties
    let player = AVPlayer()

    ...

    func success(url: URL) {
        let playerItem = AVPlayerItem(url: url)
        player.replaceCurrentItem(with: playerItem)
        player.play()
     }

    // implement the other functions of the TextToSpeechDelegate protocol...
```

Note that you'll need a strong reference to the `AVPlayer`; you can't just create it inside your `success` implementation.

At runtime, you'll send your text to Spokestack:

```swift
// with your properties
// assumes `self` adopts `TextToSpeechDelegate`
// uses default SpeechConfiguration values for api access.
let tts = TextToSpeech(self, configuration: SpeechConfiguration())

...

func speak(_ text: String) {
    let input = TextToSpeechInput(text)
    tts.synthesize(input)
}
```
