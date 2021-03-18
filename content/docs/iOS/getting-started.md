---
title: Getting Started
navId: Getting Started (iOS)
description: Getting started with the Spokestack iOS API
draft: false
tags: iOS
---

This guide will get you up and running with Spokestack for iOS, and you'll be hearing and responding to your users in no time. We'll start with how to integrate speech recognition, and then move on to how to process that recognized speech using natural langauge understanding, and finally learn how to speak back to your users using text to speech.

One caveat before we start, though: _This is not a collection of best practices_. We're going to be trading thoughtful organization for convenience here, so when we say something like "put this in your view controller", just know that you might not want to leave it there long-term. OK, now that that's out of the way, let's jump right in.

## Prerequisites

Your app needs to target iOS 13 or higher for most Spokestack features. A limited feature set of speech recognition and natural language understanding is available for iOS 11 & 12.

## Installation

The rest of the guide will assume you already have the Spokestack framework installed in your project. See [the README](https://github.com/spokestack/spokestack-ios/blob/master/README.md) for more information, but if you're using [CocoaPods](https://cocoapods.org/), it's as easy as adding

```bash
pod 'Spokestack-iOS'
platform :ios, '13.0'
```

to your `Podfile` and running

```bash
pod install
```

in your terminal.

## Integration

In order for your app to use the various Spokestack features, it needs five things:

1. The proper iOS permissions
1. An active `AVAudioSession`
1. A free Spokestack account, with your very own API key and NLU.
1. An instance of `Spokestack`
1. An implementation of the `SpokestackDelegate` protocol

### 1. Permissions

For the first one, head over to `Info.plist` in your project and add a couple keys. Here are the raw values you'll need (the keys, at least; feel free to substitute your own values):

```xml
<key>NSMicrophoneUsageDescription</key>
<string>The microphone is used to receive user commands via voice.</string>
<key>NSSpeechRecognitionUsageDescription</key>
<string>Speech recognition is used to translate user voice input into text for further processing.</string>
```

If you're not using "Raw Keys & Values" mode in Xcode, the keys are `Privacy - Microphone Usage Description` and `Privacy - Speech Recognition Usage Description`, respectively. Having these description strings means that your app will prompt the user for the appropriate permissions the first time you activate the speech pipeline. Setting up that pipeline is our next step.

### 2. `AVAudioSession`

Apple manages the various demands on a phone's audio system via [audio sessions](https://developer.apple.com/library/archive/documentation/Audio/Conceptual/AudioSessionProgrammingGuide/Introduction/Introduction.html). See their documentation for more details, but here's the minimum configuration you'll need in order to record user speech. A good place for it is likely your `AppDelegate`'s `application(_:didFinishLaunchingWithOptions)` method.

```swift
import AVFoundation

...

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions:
    [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    let audioSession = AVAudioSession.sharedInstance()
    do {
        try audioSession.setCategory(AVAudioSession.Category.playAndRecord, mode: AVAudioSession.Mode.default,
                                     options: [AVAudioSession.CategoryOptions.defaultToSpeaker, AVAudioSession.CategoryOptions.allowBluetooth, AVAudioSession.CategoryOptions.allowAirPlay])
        try audioSession.setActive(true)
    } catch let error as NSError {
        // handle error
    }
}
```

### 3. Your free Spokestack Account

Go to [spokestack.io](/account/) to set up your own account (it's free!). Once you've got that, go [grab one of our free NLU models](/account/services/nlu). We'll use the `Highlow` one in this example, but you can choose another, or [create your own](/docs/Integrations/export) if you already have something on DialogFlow or Alexa!

Once you've downloaded your NLU, unzip `nlu.tar.gz` and add the three files inside (`metadata.json`, `nlu.tflite`, `vocab.txt`) to your XCode project. See, that wasn't painful at all!

### 4. Setting up Spokestack

With the proper permissions in place, and your NLU all ready to go, it's time to decide where you'd like to receive and process speech input and output. In a single-view app, the easiest place for this is going to be your main view controller. We don't know what you've named it, but here we'll call it `MyViewController`. At the top, `import Spokestack`, and at the class level, add the `Spokestack` controller:

```swift
public let spokestack = SpokestackBuilder()
    .addDelegate(self)
    .usePipelineProfile(.vadTriggerAppleSpeech)
    // Note: the following `path`s depend on how you added the NLU files eariler in step 3!
    .setProperty("nluVocabularyPath", Bundle(for: type(of: self)).path(forResource: "vocab", ofType: "txt")
    .setProperty("nluModelMetadataPath", Bundle(for: type(of: self)).path(forResource: "metadata", ofType: "json")
    .setProperty("nluModelPath", Bundle(for: type(of: self)).path(forResource: "nlu", ofType: "tflite")
    .build()
```

Note that `spokestack` must persist outside the scope of the calling function, so don't declare it inside a function call that will get garbage collected! If this is confusing, please consult the [fuller discussion of the pipeline](speech-pipeline).

There are many options for configuring the speech pipeline. This particular setup will begin capturing audio when `spokestack.pipeline.start()` is called and use a Voice Activity Detection (VAD) component to send any audio determined to be speech through on-device ASR using Apple's `SFSpeech` API. In other words, the app is always actively listening, and no wakeword detection is performed. See [the configuration guide](/docs/iOS/speech-pipeline) for more information about pipeline building options. Using a `vadTriggerAppleSpeech` profile is a good way to test out ASR without having to tap a button to activate it or downloading and configuring wakeword models. Consider your use-case fully before using it in production, however, since it will capture all speech it hears, not just what's directed at your app.

The `self` in this example means that `MyViewController` also implements `SpokestackDelegate`, which, conveniently enough, is the next step.

### 5. Implementing SpokestackDelegate

`youtube: [Build your own voice interface to talk directly to your customers](https://www.youtube.com/watch?v=AvhQ6-9nCrQ)`

Now that we have an instance of `Spokestack`, we'll use the [delegate pattern](https://en.wikipedia.org/wiki/Delegation_pattern) so that the ASR, NLU, and TTS features can send events to you. We'll do that in the same class we used in the previous step. All `SpokestackDelegate` functions are optional except for `failure(error:)`, so you will opt in to each one explictly, but for now we just need to use two of them. First, `failure(error:)`:

```swift

    func failure(error: Error) {
        print("failure \(String(describing: error))")
    }

```

This will allow Spokestack modules to communicate back to us if something goes wrong. You may also want to listen for `onInit`, which will tell you when Spokestack is ready to start:

```swift
    func onInit() {
        // ready! time to start listening
        spokestack.pipeline.start()
    }
```

Next, you may not have noticed, but when we built `Spokestack`, we took advantage of a neat feature where Spokestack will automatically classify what the ASR hears. Classifying what your user says into an action in your app is the job of an NLU, or natural language understanding, module. Earlier we configured Spokestack to classify what your user says in terms of guessing a number. Let's wire that up so that we can see what it comes up with!

```swift
    func classification(result: NLUResult) {
        let intent = result.intent
        let slots = result.slots
        switch result.intent {
        // your app picks a number. the user guess a number.
        case "NumberGuessIntent":
            let guess = result.slots!["number"]!.value as! Int
            // if the guess is higher, lower, or equal to the pick, respond accordingly
            return
        case "AMAZON.HelpIntent":
            // if the user asks for help, respond with the rules of the game
            return
        case "AMAZON.StopIntent":
            // If the user wants to stop playing, then pick another number
            return
        case default:
            // what your user said doesn't make sense in terms of a high/low guessing game, so give them a nudge along the right direction
            return
        }
    }

    // ...other delegate functions...

    func didTrace(_ trace: String) {
        // Get Spokestack module tracing messages that provide additional debugging information. Note that tracing verbosity of each is determined by the SpeechConfiguration.tracing setting!
    }

```

You'll note that the intents are just a single string. A intent-based classifier will regularize all sorts of related langague into a single canonical intent, eg "let's go" or "please cease" get classified as `start` and `stop`, respectively.

That's it, you've added a voice interface to your app! Now that we've done all the hard work, let's discuss a few ways you can use Spokestack.

## Talking back to your users

If you want full hands-free and eyes-free interaction, you'll want to deliver responses via voice as well. This requires a text-to-speech (TTS) component, and Spokestack has one of these too!

```swift
import AVFoundation

...

class MyViewController: UIViewController, SpokestackDelegate {

    func didBeginSpeaking() {
        // handle the response playback beginning if desired
    }

    func didFinishSpeaking() {
        // handle the response playback ending if desired
    }

    func success(result: TextToSpeechResult) {
        // handle the result if desired
    }
```

To play the voice response represented by your input with the default audio system, just call the `speak` function!

```swift
// with your properties
// assumes `self` adopts `TextToSpeechDelegate`
// uses default SpeechConfiguration values for api access.
let tts = TextToSpeech(self, configuration: SpeechConfiguration())

...

func speak(_ text: String) {
    let input = TextToSpeechInput(text)
    tts.speak(input)
}
```

The `speak` function will call your delegate's `didBeginSpeaking` and `didFinishSpeaking` at the start and finish, respectively, of response playback.

In this example, `SpeechConfiguration.apiId` and `SpeechConfiguration.apiSecret` are set to sample values that let you try Spokestack TTS with a demo voice, without creating an account. You can [get your own free API credentials](/create). For more TTS input configuration options, see [the TTS guide](/docs/Concepts/tts).

If you want more fine-grained control over how the TTS response is played back, you're free to feed the `TextToSpeechResult.url` in the `success` handler into your own audio player. See the [cookbook](cookbook) for a quick version of that recipe.

## To wake or not to wake

When we first configured Spokestack, we used voice activity-activated speech recognition, but that's not the only way you can start transcribing your users' speech!

### I want the user to tap a button before talking

After the pipeline is started, call `pipeline.activate()` in the action of whatever button you want to activate the microphone. This skips the wakeword step of the pipeline and starts the Automatic Speech Recognition (ASR) component directly. ASR will stop automatically after the user is silent for a few seconds (how _many_ seconds is one of the configuration parameters we hinted at earlier) or after a preconfigured timeout is reached, but if you need to stop listening immediately for any reason, call `pipeline.deactivate()`. You can then call `pipeline.activate()` to start ASR again or `pipeline.stop()` to shut the pipeline down completely.

Note that, as we mentioned earlier, the very first time you start a speech pipeline, the microphone is activated, so your user will be presented with permissions modals for the microphone and speech recognition; you may want to plan for this in your designs.

### I want to use a wakeword

If you want your app to be controllable purely by voice, you need a wakeword — a word (or short phrase) that tells your app "the next thing the user says is meant for you". Spokestack comes with a default wakeword ("Spokestack", believe it or not), and that's enabled just by changing the pipeline profile enum in the `SpeechPipeline` we just set up. Try changing `.vadTriggerAppleSpeech` to `.appleWakewordAppleSpeech` in that Spokestack configuration example. Then, to begin listening for the default wakeword "Spokestack", just call `pipeline.start()`.

## Understanding your users

Spokestack leaves the choice of NLU up to you, but we do offer our own full-featured NLU component for Spokestack based on years of research and lessons learned from working with other services. Our NLU runs directly on your user's device, instead of calling back to the cloud. If you're a fan of the cloud, though, you might want to check out [DialogFlow](https://dialogflow.com/), [LUIS](https://www.luis.ai/home), or [wit.ai](https://wit.ai/). And if your app is simple enough, you can make your own NLU with string matching or regular expressions (see the [cookbook](cookbook) for an example of this).

## Conclusion

That's all there is to it! Your app is now configured to accept voice commands and play back synthetic voice responses. Obviously there's more we could tell you, and you can have much more control over the speech recognition process (including, but not limited to, configuring the pipeline's sensitivity, using a different ASR provider, or adding your own custom wakeword model). If you're interested in these advanced topics, check out our other guides. We'll be adding to them as Spokestack grows.

Thanks for reading!
