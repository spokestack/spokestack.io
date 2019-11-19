---
title: Getting Started
date: '2019-11-15T15:20:34.735Z'
description: Getting started with the Spokestack API
draft: false
---

This guide will get you up and running with Spokestack, and you'll be hearing your users in no time.

One caveat before we start, though: _This is not a collection of best practices_. We're going to be trading thoughtful organization for convenience here, so when we say something like "put this in your view controller", just know that you might not want to leave it there long-term. OK, now that that's out of the way, let's jump right in.

## Installation

The rest of the guide will assume you already have the Spokestack framework installed in your project. See [the README](https://github.com/spokestack/spokestack-ios/blob/master/README.md) for more information, but if you're using [CocoaPods](https://cocoapods.org/), it's as easy as adding

```bash
pod 'Spokestack-iOS'
```

to your `Podfile` and running

```bash
pod install
```

## Integration

In order for your app to accept voice input via Spokestack, it needs three things:

1. the proper iOS permissions
2. a delegate to receive user input from Spokestack's `SpeechPipeline`
3. an instance of `SpeechPipeline` itself

### Permissions

For the first one, head over to `Info.plist` in your project and add a couple keys. Here are the raw values you'll need (the keys, at least; feel free to substitute your own values):

```xml
<key>NSMicrophoneUsageDescription</key>
<string>The microphone is used to receive user commands via voice.</string>
<key>NSSpeechRecognitionUsageDescription</key>
<string>Speech recognition is used to translate user voice input into text for further processing.</string>
```

If you're not using "Raw Keys & Values" mode in Xcode, the keys are `Privacy - Microphone Usage Description` and `Privacy - Speech Recognition Usage Description`, respectively. Having these description strings means that your app will prompt the user for the appropriate permissions the first time you activate the speech pipeline. Setting up that pipeline is our next step.

### Delegate methods

With the usage descriptions in place, it's time to decide where you'd like to receive and process speech input. In a single-view app, the easiest place for this is going to be your main view controller. `import Spokestack` at the top of the file, and either set it up to adopt the `PipelineDelegate` and `SpeechEventListener` protocols, or add extensions for them.

If you want to disable any buttons or show a special "listening" indicator while recording, put those things in the `PipelineDelegate`'s `didStart` and `didStop` methods; otherwise, the main thing you'll want to implement is `SpeechEventListener`'s' `didRecognize`.

Inside `didRecognize`, `result.transcript` will give you the raw text of what the user just said. Translating that raw text into an action in your app is the job of an NLU, or natural language understanding, component. Spokestack currently leaves the choice of NLU up to the app: There's a variety of NLU services out there ([DialogFlow](https://dialogflow.com/), [LUIS](https://www.luis.ai/home), or [wit.ai](https://wit.ai/), to name a few), or, if your app is simple enough, you can make your own with string matching or regular expressions.

We know that NLU is an important piece of the puzzle, and we're working on a full-featured NLU component for Spokestack based on years of research and lessons learned from working with the other services; [sign up for our newsletter](LINK) to be the first to know when it's ready.

For the sake of our demo, though, let's say you're creating a voice-controlled timer. `didRecognize` might look something like this:

```swift
extension MyViewController: SpeechEventListener {

    ...

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
        if userText.range(of: "(?i)(?:reset|start over)",
                          options: .regularExpression) != nil {
            // reset the timer and change the UI accordingly
            return
        }
    }
}
```

### `SpeechPipeline`

OK, so we've set up somewhere for speech to _go_; now how do we _get_ it? This part's easy:

```swift
private let pipeline = SpeechPipeline(self, pipelineDelegate: self)
```

then, after things are loaded:

```swift
pipeline.start()
```

The `self` in this example means that the class containing this pipeline also adopts `PipelineDelegate` and `SpeechEventListener`, like we arranged in the previous step. Note also that we're using a convenience initializer for `SpeechPipeline` that makes a variety of configuration decisions on our behalf. There's more to talk about here, but they're topics for another guide.

So now that you _have_ it, how do you _use_ it? It's easy, but the answer depends on your use case:

#### I want to use a wakeword

If you want your app to be controllable purely by voice, you need a wakeword -- a word (or short phrase) that tells your app "the next thing the user says is meant for you". Spokestack comes with a default wakeword ("Spokestack", believe it or not), and that's enabled by default in the `SpeechPipeline` we just set up. To begin listening for it, just call `pipeline.start()`.

Note that, as we mentioned earlier, the very first time you start a speech pipeline, the microphone is activated, so your user will be presented with permissions modals for the microphone and speech recognition; you may want to plan for this in your designs.

#### I want the user to tap a button before talking

If a wakeword-driven experience isn't for you, or if you want to give users a tap-to-talk option, just call `pipeline.start()` followed by `pipeline.activate()` in the action of whatever button you want to activate the microphone. This skips the wakeword step of the pipeline and starts the automatic speech recognition (ASR) component directly. ASR will stop automatically after the user is silent for a few seconds (how _many_ seconds is one of the configuration parameters we hinted at earlier) or after a preconfigured timeout is reached, but if you need to stop listening immediately for any reason, just call `pipeline.stop()`.

## Conclusion

That's all there is to it! Your app is now configured to accept voice commands. Obviously there's more we could tell you, and you can have much more control over the speech recognition process (including, but not limited to, configuring the pipeline's sensitivity, using a different ASR provider, or adding your own custom wakeword model). If you're interested in these advanced topics, check out our other guides. We'll be adding to them as Spokestack grows.

Thanks for reading!
