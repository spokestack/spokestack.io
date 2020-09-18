## Spokestack Tray for iOS
As much time, talent and treasure that Apple has put into Siri, ASR and NLU, integrating a custom voice enabled app experience is quite the challenge and in some cases a non-starter.
Spokestack changes all of that. Our mission at Spokestack is to make it as easy as possible to make your apps fully voice-enabled.

After building the services needed to make voice interaction work, including [Wakeword](/docs/Concepts/wakeword-models), [Speech Recognition](/docs/Concepts/asr), [Natural Language Understanding](/docs/Concepts/nlu), and [Text-to-speech](/docs/Concepts/tts), we started working on ways users could integrate these services without having to completely rewrite their applications.

Introducing [spokestack-tray-ios](https://github.com/spokestack/spokestack-tray-ios)

![iOS Spokestack Tray Example](./tray_example.gif)

[spokestack-tray-ios](https://github.com/spokestack/spokestack-tray-ios) is an iOS framework that is designed to work in any application, regardless of its layout or navigation. It utilizes [spokestack-ios](https://github.com/spokestack/spokestack-ios), to add voice experiences. With on-device wakeword, ASR, and NLU, the tray’s silent mode works completely offline–TTS is the only service that requires a network.

With a few required props (and [lots of optional ones](https://github.com/spokestack/spokestack-tray-ios/blob/master/SpokestackTray/Models/TrayConfiguration.swift)), you can start building a customizable voice experience without the hassle that usually comes with listening for a wakeword, working with a microphone, or playing audio in iOS.

This tutorial will guide you through the process of installing `spokestack-tray-ios` as well as using the SpokestackTray framework to respond to user intents.

### Installation

**CocoaPods** is a dependency manager for Cocoa projects. For usage and installation instructions, visit their [website](https://cocoapods.org). To integrate [Spokestack](https://github.com/spokestack/spokestack-ios) into your Xcode project using CocoaPods, specify it in your Podfile:

`pod 'SpokestackTray-iOS'`

From your terminal in the project directory run

`pod install`

Either in your `Podfile` or your Project / Target settings set the minimum iOS target to **iOS 13**

### Edit Info.plist

Spokestack requires access to your device's microphone and Apple's speech recognition service.

_without these your app will crash_

```
<key>NSMicrophoneUsageDescription</key>
<string>For making voice requests</string>
<key>NSSpeechRecognitionUsageDescription</key>
<string>For understanding your voice requests</string>
```

### Edit the AppDelegate.(swift|m)

Spokestack is dependent on the appropriate `AVAudioSession` to be configured. For _most_ apps this can be done in the `AppDelegate.(swift|m)`

```
do {
            let session = AVAudioSession.sharedInstance()
            try? session.setCategory(.playAndRecord, options: [.defaultToSpeaker, .allowAirPlay, .allowBluetoothA2DP, .allowBluetooth])
            try? session.setActive(true, options: [])
        }
```

### Usage

The [spokestack-tray-ios example app](https://github.com/spokestack/spokestack-tray-ios/tree/master/SpokestackTrayExample) uses the “Spokestack” wakeword and [sample Minecraft NLU models](/blog/porting-the-alexa-minecraft-skill-to-ios-using-spokestack).

In this example, the following code is used to add the `SpokestackTray` framework:

```swift
import SpokestackTray
import Spokestack

    override func viewDidLoad() {
        
        super.viewDidLoad()

        let configuration: TrayConfiguration = TrayConfiguration()
        
        /// When the tray is opened for the first time this is the synthesized
        /// greeting that will be "said" to the user

        configuration.greeting = """
        Welcome! This example uses models for Minecraft. Try saying, \"How do I make a castle?\"
        """
        
        /// When the tray is listening or processing speech there is a animated gradient that
        /// sits on top of the tray. The default values are red, white and blue

        configuration.gradientColors = [
            "#61fae9".spstk_color,
            "#2F5BEA".spstk_color,
            UIColor.systemRed
        ]

        /// Apart of the initialization of the tray is to download the nlu and wakeword models.
        /// These are the default Spokestack models, but you can replace with your own

        configuration.nluModelURLs = [
            NLUModelURLMetaDataKey: "https://d3dmqd7cy685il.cloudfront.net/nlu/production/shared/XtASJqxkO6UwefOzia-he2gnIMcBnR2UCF-VyaIy-OI/nlu.tflite",
            NLUModelURLNLUKey: "https://d3dmqd7cy685il.cloudfront.net/nlu/production/shared/XtASJqxkO6UwefOzia-he2gnIMcBnR2UCF-VyaIy-OI/vocab.txt",
            NLUModelURLVocabKey: "https://d3dmqd7cy685il.cloudfront.net/nlu/production/shared/XtASJqxkO6UwefOzia-he2gnIMcBnR2UCF-VyaIy-OI/metadata.json"
        ]
        configuration.wakewordModelURLs = [
            WakeWordModelDetectKey: "https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/detect.tflite",
            WakeWordModelEncodeKey: "https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/encode.tflite",
            WakeWordModelFilterKey: "https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/filter.tflite"
        ]

        configuration.cliendId = "YOUR_CLIENT_ID"
        configuration.clientSecret = "YOUR_CLIENT_SECRET"
        
        /// The handleIntent callback is how the SpeechController and the TrayViewModel know if 
        /// NLUResult should be processed and what text should be added to the tableView.

        let greeting: IntentResult = IntentResult(node: InterntResultNode.greeting.rawValue, prompt: configuration.greeting)
        var lastNode: IntentResult = greeting

        configuration.handleIntent = {intent, slots, utterance in

            switch intent {
                case IntentResultAmazonType.repeat.rawValue:
                    return lastNode
                case IntentResultAmazonType.yes.rawValue:
                    lastNode = IntentResult(node: InterntResultNode.search.rawValue, prompt: "I heard you say yes! What would you like to make?")
                case IntentResultAmazonType.no.rawValue:
                    lastNode = IntentResult(node: InterntResultNode.exit.rawValue, prompt: "I heard you say no. Goodbye")
                case IntentResultAmazonType.stop.rawValue,
                     IntentResultAmazonType.cancel.rawValue,
                     IntentResultAmazonType.fallback.rawValue:
                    lastNode = IntentResult(node: InterntResultNode.exit.rawValue, prompt: "Goodbye!")
                case IntentResultAmazonType.recipe.rawValue:
                    
                    if let whatToMakeSlot: Dictionary<String, Slot> = slots,
                       let slot: Slot = whatToMakeSlot["Item"],
                       let item: String = slot.value as? String {
                    
                        lastNode = IntentResult(node: InterntResultNode.recipe.rawValue,
                                                prompt: """
                                                If I were a real app, I would show a screen now on how to make a \(item). Want to continue?
                                                """
                                    )
                    }
                    
                case IntentResultAmazonType.help.rawValue:
                    lastNode = greeting
                default:
                    lastNode = greeting
            }
            
            return lastNode
        }
        
        /// Which NLUNodes should trigger the tray to close automatically

        configuration.exitNodes = [
            InterntResultNode.exit.rawValue
        ]
        
        /// Callback when the tray is opened. The call back is called _after_ the animation has finished
        
        configuration.onOpen = {
            LogController.shared.log("isOpen")
        }
        
        /// Callback when the tray is closed. The call back is called _after_ the animation has finished
        
        configuration.onClose = {
            LogController.shared.log("onClose")
        }
        
        /// Callback when a `TrayListenerType` has occured
        
        configuration.onEvent = {event in
            LogController.shared.log("onEvent \(event)")
        }
        
        let tray: SpokestackTrayViewController = SpokestackTrayViewController(self, configuration: configuration)
        tray.addToParentView()
        tray.listen()
    }

```

**clientId and clientSecret**

The `clientId` and `clientSecret` props are where you pass your API tokens generated in your Spokestack account. First, [create a free account](/account/create). Then, [generate a token](/account/settings#api) on the account settings page. Don’t worry, there’s no hidden subscription.

**nluModelUrls**

These URLs point to the sample Minecraft NLU models files we have hosted on a CDN, which are downloaded automatically by `SpokestackTray` the first time the app launches (and only the first time). The files are then saved to the app’s cache for future use so they only need to be downloaded once. NLU models can vary drastically in size, and we thought it better not to include them in the app bundles, but instead load them lazily.

At this point, you may be wondering what an NLU does. While Automatic Speech Recognition provides us with a way to process speech into text, that text is rarely enough to figure out what the user wants the app to do. Natural Language Understanding (NLU) is the next step to process the text into what voice platforms call “intents”.

A good example is searching with voice. If your app has just said, “What would you like to search for?” and the user says, “Bananas”, you can be reasonably sure that the user means for the app to search for bananas without the help of an NLU.

But if the user initiated the interaction and said, “Search for bananas”, the NLU can parse that statement into an intent (e.g. “search”) with variables (e.g. “bananas”). If you were only using ASR, you’d probably end up searching for the whole sentence, “search for bananas”, rather than just “bananas”, which may yield different results. For more information on NLU in Spokestack, please check out [our guide](/docs/Concepts/nlu). If you’ve already built an NLU model in Alexa, Dialogflow, or Jovo, check out [our guide on exporting existing NLU models from other platforms](/docs/Concepts/export).

**handleIntent**

So, intents are commands for the app based on what the user said. Now that you know how you get intents, it’s your responsibility to respond to those intents. There are two questions to answer for any given intent:

What should the app say in response to the user? This is the return value of `handleIntent` and is always required.
Should the app update the UI? Note that not all intents will need to make UI changes.
In the voice search example, if the user has just searched for “bananas”, the answer to question #1 might be to say, “Here are your search results.” The answer to question #2 would probably be to show the search results. Remember that the NLU doesn’t do the search for you; it just tells you the proper search terms.

These answers could be written like this…

```
 configuration.handleIntent = {intent, slots, utterance in

            if intent == "search" {
              let results = searchService.search(slots.ingrident)
              viewModel.addSearchResults(results)
              
              // Return a response
          return {
              prompt: "Here are your search results.",
              node: "search_results"
          }
            }
        }
```

The `prompt` will then be synthesized using Spokestack’s TTS service. It then gets played using the device’s native audio player (unless the tray is in `silent` mode).

The `node` property is metadata to help you track conversation state, and the value is completely up to you. The only reason `SpokestackTray` needs it is to determine whether to listen again after the prompt has been said.

If the node is specified in the [exitNodes](https://github.com/spokestack/spokestack-tray-ios/blob/master/SpokestackTray/Models/TrayConfiguration.swift#L79) prop, the conversation will stop and SpokestackTray will close.

If the node is not an exit node, `SpokestackTray` will stay open and listen to the user again, and the process will repeat.

## Conclusion

Hopefully, we’ve given you a glimpse into just how powerful `spokestack-tray-ios` can be. Add the `SpokestackTray framework` to your iOS app to start building elegant conversational user experiences.

For complete documentation, check out [spokestack-tray-ios on GitHub](https://github.com/spokestack/spokestack-tray-ios).

For support, we [offer multiple support channels](/support) to help you get started.
