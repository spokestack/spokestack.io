---
title: Getting Started
description: Getting started with the Spokestack API
draft: false
---

This guide will get you up and running with Spokestack for iOS, and you'll be hearing and talking to your users in no time.

One caveat before we start, though: _This is not a collection of best practices_. We're going to be trading thoughtful organization for convenience here, so when we say something like "put this in your view controller", just know that you might not want to leave it there long-term. OK, now that that's out of the way, let's jump right in.

## Prerequisites

Your app needs to target iOS 11 or higher in order to use speech recognition.

## Installation

The rest of the guide will assume you already have the Spokestack framework installed in your project. See [the README](https://github.com/spokestack/spokestack-ios/blob/master/README.md) for more information, but if you're using [CocoaPods](https://cocoapods.org/), it's as easy as adding

```bash
pod 'Spokestack-iOS'
```

to your `Podfile` and running

```bash
pod install
```

in your terminal.

## Integration

In order for your app to accept voice input via Spokestack, it needs three things:

1. the proper iOS permissions
2. An active `AVAudioSession`
3. an instance of Spokestack's `SpeechPipeline`
4. a delegate to receive system events and user input from `SpeechPipeline`

### 1. Permissions

For the first one, head over to `Info.plist` in your project and add a couple keys. Here are the raw values you'll need (the keys, at least; feel free to substitute your own values):

```xml
<key>NSMicrophoneUsageDescription</key>
<string>The microphone is used to receive user commands via voice.</string>
<key>NSSpeechRecognitionUsageDescription</key>
<string>Speech recognition is used to translate user voice input into text for further processing.</string>
```

If you're not using "Raw Keys & Values" mode in Xcode, the keys are `Privacy - Microphone Usage Description` and `Privacy - Speech Recognition Usage Description`, respectively. Having these description strings means that your app will prompt the user for the appropriate permissions the first time you activate the speech pipeline. Setting up that pipeline is our next step.

###2. `AVAudioSession`

Apple manages the various demands on a phone's audio system via [audio sessions](https://developer.apple.com/library/archive/documentation/Audio/Conceptual/AudioSessionProgrammingGuide/Introduction/Introduction.html). See their documentation for more details, but here's the minimum configuration you'll need in order to record user speech. A good place for it is likely your `AppDelegate`'s `application(_:didFinishLaunchingWithOptions)` method.

```swift
import AVFoundation

...

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions:
    [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    let audioSession = AVAudioSession.sharedInstance()
    do {
        try audioSession.setCategory(AVAudioSession.Category.playAndRecord, mode: AVAudioSession.Mode.default,
                                     options: AVAudioSession.CategoryOptions.defaultToSpeaker)
        try audioSession.setActive(true)
    } catch let error as NSError {
        // handle error
    }
}
```

### 3. `SpeechPipeline`

With the proper permissions in place, it's time to decide where you'd like to receive and process speech input. In a single-view app, the easiest place for this is going to be your main view controller. `import Spokestack` at the top of the file, and add a `SpeechPipeline` member:

```swift
private let pipeline = SpeechPipeline(self, pipelineDelegate: self)
```

then, after things are loaded:

```swift
pipeline.start()
```

Note that we're using a convenience initializer for `SpeechPipeline` that makes a variety of configuration decisions on our behalf. There's more to talk about here, but they're topics for another guide.

The `self` in this example means that the class containing this pipeline also adopts `PipelineDelegate` and `SpeechEventListener`, which, conveniently enough, is the next step.

### 4. Delegate methods

Now that we have a pipeline, we need to either adopt the `PipelineDelegate` and `SpeechEventListener` protocols or add extensions for them. We'll do that in the same class we used in the previous step.

If you want to disable any buttons or show a special "listening" indicator while recording, put those things in the `PipelineDelegate`'s `didStart` and `didStop` methods; otherwise, the main methods you'll want to implement are `SpeechEventListener`'s' `activate`, `deactivate`, and `didRecognize`. The basic layout for the first two would be:

```swift
// assumes `self` is the class from before; it
// has a `SpeechPipeline` member
func activate() {
    self.pipeline.activate()
}

func deactivate() {
    self.pipeline.deactivate()
}
```

All we're doing here is reflecting system events back to the main pipeline. See [the `SpeechPipeline` guide](/docs/Concepts/speech-pipeline) in the Concepts section for more discussion.

Inside `didRecognize`, `result.transcript` will give you the raw text of what the user just said. Translating that raw text into an action in your app is the job of an NLU, or natural language understanding, component. Spokestack currently leaves the choice of NLU up to the app: There's a variety of NLU services out there ([DialogFlow](https://dialogflow.com/), [LUIS](https://www.luis.ai/home), or [wit.ai](https://wit.ai/), to name a few), or, if your app is simple enough, you can make your own with string matching or regular expressions.

We know that NLU is an important piece of the puzzle, and we're working on a full-featured NLU component for Spokestack based on years of research and lessons learned from working with the other services; [sign up for our newsletter](LINK) to be the first to know when it's ready.

For the sake of our demo, though, let's say you're creating a voice-controlled timer. `didRecognize` might look something like this:

```swift
class MyViewController: UIViewController, SpeechEventListener {

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

## To wake or not to wake

Now that you _have_ the pipeline all set up, how do you _use_ it? It's easy, but the answer depends on your app's needs:

#### I want to use a wakeword

If you want your app to be controllable purely by voice, you need a wakeword -- a word (or short phrase) that tells your app "the next thing the user says is meant for you". Spokestack comes with a default wakeword ("Spokestack", believe it or not), and that's enabled by default in the `SpeechPipeline` we just set up. To begin listening for it, just call `pipeline.start()`.

Note that, as we mentioned earlier, the very first time you start a speech pipeline, the microphone is activated, so your user will be presented with permissions modals for the microphone and speech recognition; you may want to plan for this in your designs.

#### I want the user to tap a button before talking

If a wakeword-driven experience isn't for you, or if you want to give users a tap-to-talk option, just call `pipeline.start()` followed by `pipeline.activate()` in the action of whatever button you want to activate the microphone. This skips the wakeword step of the pipeline and starts the automatic speech recognition (ASR) component directly. ASR will stop automatically after the user is silent for a few seconds (how _many_ seconds is one of the configuration parameters we hinted at earlier) or after a preconfigured timeout is reached, but if you need to stop listening immediately for any reason, just call `pipeline.stop()`.

## Talking back to your users

If you want full hands-free and eyes-free interaction, you'll want to deliver responses via voice as well. This requires a text-to-speech (TTS) component, and Spokestack has one of these too!

It's completely separate from the `SpeechPipeline`, so you can even use it to talk to a user at any point. First, you'll need to adopt the `TextToSpeechDelegate` protocol somewhere—say, your view controller:

```swift
import AVFoundation

...

class MyViewController: UIViewController, SpeechEventListener, TextToSpeechDelegate {

    // with your properties
    let player = AVPlayer()

    ...

    func success(url: URL) {
        let playerItem = AVPlayerItem(url: url)
        player.replaceCurrentItem(with: playerItem)
        player.play()
    }

    func failure(error: Error) {
        // handle error
    }

    func didTrace(_ trace: String) {
        // log trace
    }
```

Note that you'll need a strong reference to the `AVPlayer`; you can't just create it inside your `success` implementation.

At runtime, you'll need to send your text to Spokestack:

```swift
// with your properties
// assumes `self` adopts `TextToSpeechDelegate`
let tts = TextToSpeech(self, configuration: SpeechConfiguration())

...

func speak(_ text: String) {
    let input = TextToSpeechInput(text)
    tts.synthesize(input)
}
```

This example sets you up to use the demo voice available for free with Spokestack; for more configuration options, see [the TTS guide](/docs/Concepts/tts).

## Conclusion

That's all there is to it! Your app is now configured to accept voice commands. Obviously there's more we could tell you, and you can have much more control over the speech recognition process (including, but not limited to, configuring the pipeline's sensitivity, using a different ASR provider, or adding your own custom wakeword model). If you're interested in these advanced topics, check out our other guides. We'll be adding to them as Spokestack grows.

Thanks for reading!
