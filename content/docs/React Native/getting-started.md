---
title: Getting Started
navId: Getting Started (react-native)
description: Getting started with the Spokestack React Native API
draft: false
tags: React Native
---

This guide will get you up and running with Spokestack for React Native, and you'll be hearing and responding to your users in no time.

## Prerequisites

We assume that you have a working react-native 0.60+ project (with `npm` and `cocoapods` already installed), and are adding Spokestack to that project. If you're starting from scratch, please refer to the [react-native getting started guide](https://reactnative.dev/docs/getting-started) and then come back here!

### iOS

iOS 13+, [CocoaPods](https://guides.cocoapods.org/using/using-cocoapods.html#adding-pods-to-an-xcode-project) v1.6.0+.

### Android

Android SDK 21+.

## Installation

[![](https://img.shields.io/npm/v/react-native-spokestack.svg)](https://www.npmjs.com/package/react-native-spokestack)

Using npm:

```shell
npm install --save react-native-spokestack
```

or using yarn:

```shell
yarn add react-native-spokestack
```

Then follow the instructions for each platform to link react-native-spokestack to your project:

## iOS installation

<details>
  <summary>iOS details</summary>

First, set your iOS deployment target in XCode to 13.0.

### Edit Podfile

Before running `pod install`, make sure to make the following edits.

react-native-spokestack makes use of relatively new APIs only available in iOS 13+. Set your deployment target to iOS 13 at the top of your Podfile:

```ruby
platform :ios, '13.0'
```

We also need to use `use_frameworks!` in our Podfile in order to support dependencies written in Swift.

```ruby
target 'SpokestackExample' do
  use_frameworks!
  #...
```

For now, `use_frameworks!` does not work with Flipper, so we also need to disable Flipper. Remove any Flipper-related lines in your Podfile. In React Native 0.63.2, they look like this:

```ruby
  # X Remove or comment out these lines X
  use_flipper!
  post_install do |installer|
    flipper_post_install(installer)
  end
  # XX
```

Remove your existing Podfile.lock and Pods folder to ensure no conflicts, then install the pods:

```shell
$ npx pod-install
```

### Edit Info.plist

Add the following to your Info.plist to enable permissions.

```xml
<key>NSMicrophoneUsageDescription</key>
<string>This app uses the microphone to hear voice commands</string>
<key>NSSpeechRecognitionUsageDescription</key>
<string>This app uses speech recognition to process voice commands</string>
```

#### Remove Flipper

While Flipper works on fixing their pod for `use_frameworks!`, we must disable Flipper. We already removed the Flipper dependencies from Pods above, but there remains some code in the AppDelegate.m that imports Flipper. There are two ways to fix this.

1. You can disable Flipper imports without removing any code from the AppDelegate. To do this, open your xcworkspace file in XCode. Go to your target, then Build Settings, search for "C Flags", remove `-DFB_SONARKIT_ENABLED=1` from flags.
1. Remove all Flipper-related code from your AppDelegate.m.

In our example app, we've done option 1 and left in the Flipper code in case they get it working in the future and we can add it back.

### Edit AppDelegate.m

#### Add AVFoundation to imports

```objc
#import <AVFoundation/AVFoundation.h>
```

#### AudioSession category

Set the AudioSession category. There are several configurations that work.

The following is a suggestion that should fit most use cases:

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  AVAudioSession *session = [AVAudioSession sharedInstance];
  [session setCategory:AVAudioSessionCategoryPlayAndRecord
     mode:AVAudioSessionModeDefault
  options:AVAudioSessionCategoryOptionDefaultToSpeaker | AVAudioSessionCategoryOptionAllowAirPlay | AVAudioSessionCategoryOptionAllowBluetoothA2DP | AVAudioSessionCategoryOptionAllowBluetooth
    error:nil];
  [session setActive:YES error:nil];

  // ...
```

For a list of all categories, modes, and options, see [Apple's AudioSession documentation](https://developer.apple.com/documentation/avfoundation/avaudiosession/1771734-setcategory).

</details>

## Android installation

<details>
  <summary>Android details</summary>

### ASR Support

The example usage uses the system-provided ASRs (`AndroidSpeechRecognizer` and `AppleSpeechRecognizer`). However, `AndroidSpeechRecognizer` is not available on 100% of devices. If your app supports a device that doesn't have built-in speech recognition, use Spokestack ASR instead by setting the `profile` to a Spokestack profile using the `profile` prop.

See our [ASR documentation](/docs/concepts/asr) for more information.

### Edit root build.gradle (_not_ app/build.gradle)

```groovy
// ...
  ext {
    // Minimum SDK is 21
    minSdkVersion = 21
// ...
  dependencies {
    // Minimium gradle is 3.0.1+
    // The latest React Native already has this
    classpath("com.android.tools.build:gradle:3.5.3")
```

### Edit AndroidManifest.xml

Add the necessary permissions to your `AndroidManifest.xml`. The first permission is often there already. The second is needed for using the microphone.

```xml
    <!-- For TTS -->
    <uses-permission android:name="android.permission.INTERNET" />
    <!-- For wake word and ASR -->
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <!-- For ensuring no downloads happen over cellular, unless forced -->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

### Request RECORD_AUDIO permission

The RECORD_AUDIO permission is special in that it must be both listed in the `AndroidManifest.xml` as well as requested at runtime. There are a couple ways to handle this (react-native-spokestack does not do this for you):

1. **Recommended** Add a screen to your onboarding that explains the need for the permissions used on each platform (RECORD_AUDIO on Android and Speech Recognition on iOS). Have a look at [react-native-permissions](https://github.com/zoontek/react-native-permissions) to handle permissions in a more robust way.
2. Request the permissions only when needed, such as when a user taps on a "listen" button. Avoid asking for permission with no context or without explaining why it is needed. In other words, we do not recommend asking for permission on app launch.

While iOS will bring up permissions dialogs automatically for any permissions needed, you must do this manually in Android.

React Native already provides a module for this. See [React Native's PermissionsAndroid](https://reactnative.dev/docs/permissionsandroid) for more info.

</details>

## Configuration

There are many options for configuring Spokestack. This example begins capturing audio when `Spokestack.start()` is called and uses a Voice Activity Detection (VAD) component to detect speech and send it through an automated speech recognition system, in this case the platform's built-in speech recognizer. In other words, we're configuring this app to always actively listen, and no wake word detection is performed. See [the configuration guide](/docs/concepts/pipeline-configuration) for more information about pipeline building options. Beginning in version 4.0.0, it's easy to change the pipeline configuration through the use of the `profile` property.

We'll configure the NLU (Natural Language Understanding) component, which uses Spokestack models. To test things out, try one of our free NLU models on [your Spokestack account page](/account/services/nlu), such as our [example Minecraft NLU model](https://s.spokestack.io/u/7fYxV/nlu.tflite), [model metadata](https://s.spokestack.io/u/7fYxV/metadata.json), and [NLU vocabulary](https://s.spokestack.io/u/7fYxV/vocab.txt).

First, we'll need a Spokestack API key and secret, available for free once you've [created an account](/create). Create a key in the [account section](/account/settings/#api).

```javascript
import Spokestack from 'react-native-spokestack'

/**
 * Initialize the Spokestack speech pipeline.
 *
 * This example configures a voice-triggered speech recongnizer
 * For all configuration options, see https://github.com/spokestack/react-native-spokestack
 * For more examples of speech recognizer configuration, see https://github.com/spokestack/spokestack-android#configuration
 *
 * The first 2 arguments are your Spokestack credentials
 * available for free from https://spokestack.io.
 * Avoid hardcoding these in your app.
 * There are several ways to include
 * environment variables in your code.
 *
 * Using process.env:
 * https://babeljs.io/docs/en/babel-plugin-transform-inline-environment-variables/
 *
 * Using a local .env file ignored by git:
 * https://github.com/goatandsheep/react-native-dotenv
 * https://github.com/luggit/react-native-config
 */
Spokestack.initialize(
  process.env.SPOKESTACK_CLIENT_ID,
  process.env.SPOKESTACK_CLIENT_SECRET,
  {
    pipeline: {
      // The default is PTT_NATIVE_ASR
      profile: Spokestack.PipelineProfile.VAD_NATIVE_ASR
    },
    nlu: {
      // These are only required if using Spokestack.classify
      model: require('./nlu.tflite'),
      metadata: require('./metadata.json'),
      vocab: require('./vocab.txt')
    }
  }
)
```

Including model files in your app bundle requires a small change to your React Native bundler config. See [this guide](/docs/react-native/require-models) for more info.

## Hearing your users

`youtube: [Build your own voice interface to talk directly to your customers](https://www.youtube.com/watch?v=AvhQ6-9nCrQ)`

Call `Spokestack.start()` to begin listening for speech. `Spokestack.stop()` will stop listening completely.

To manually start speech recognition, without waiting for activation from a wake word or voice trigger, call `Spokestack.activate()` after calling `Spokestack.start()`.

Call `Spokestack.deactivate()` to stop speech recognition. The speech pipeline will continue listening for a wake word or voice trigger, if applicable.

```javascript
// Start and stop the speech pipeline. All methods can be called repeatedly.
await Spokestack.start() // start speech pipeline. can only start after initialize is called.
await Spokestack.stop() // stop speech pipeline
await Spokestack.activate() // manually activate the speech pipeline. The speech pipeline is now actively listening for speech to recognize.
await Spokestack.deactivate() // manually deactivate the speech pipeline. The speech pipeline is now passively waiting for an activation trigger.
```

Listen to speech events to receive the speech recognition results, be informed of errors and debugging events, or get notified when the pipeline activates or deactivates. For example, you may want to disable any buttons or show a special "listening" indicator while recording.

```javascript
componentDidMount() {
  Spokestack.addListener('recognize', ({ transcript }) => console.log(transcript))
  Spokestack.addListener('activate', () => console.log('activated'))
  Spokestack.addListener('deactivate', () => console.log('deactivated'))
  Spokestack.addListener('error', ({ error }) => console.error(error))
  Spokestack.addListener('trace', ({ message }) => console.error(message)) // For debugging
}

// Remember to remove listeners when they are no longer needed
componentWillUnmount() {
  Spokestack.removeAllListeners()
}
```

## Understanding your users

The `"recognize"` event will give you the raw text of what the user just said via the `transcript` property. Translating that utterance into an action in your app is the job of an NLU component. Spokestack leaves the choice of NLU up to you, but we do offer our own full-featured NLU component for Spokestack based on years of research and lessons learned from working with other services. Our NLU runs directly on your user's device, instead of calling back to the cloud. Call `Spokestack.classify()` to use your NLU.

```javascript
const result = await Spokestack.classify(utterance)
console.log(result)
// { "intent": "request.lights.activate", "slots": [{ "location": { "value": "room", "type": "selset" } }], "confidence":" 0.9999888" }
```

Classification results are in a map containing an intent. An intent-based classifier will regularize all sorts of related language into a single canonical intent, e.g. "let's go" and "please cease" get classified as `start` and `stop`, respectively. The slots are the data, or parameters on which your app can take action. See our [NLU guide](/docs/concepts/nlu) for information on NLU in general and Spokestack's implementation.

## Talking back to your users

If you want full hands-free and eyes-free interaction, you'll also want to deliver responses via voice. This requires a text-to-speech (TTS) component, and Spokestack has one of these too! Call it with the text you want to synthesize, and it will send you an event with an audio file containing the synthesized voice speaking your text utterance.

```javascript
// Get a URL to a mp3 audio file of the processed speech
const url = await Spokestack.synthesize(utterance)
audioPlayer.play(url)
```

Spokestack includes one free voice. An upgraded account is needed for custom voices. For more information on TTS and details about controlling pronunciation, see [the TTS concept guide](/docs/concepts/tts).

## Conclusion

That's all there is to it! Your app is now configured to accept and respond to voice commands. Hopefully, this guide gives you an idea of the power of Spokestack. Spokestack has everything you need to start building rich voice experiences in your apps in an elegant way. If you're interested in advanced topics (such as configuring the pipeline's sensitivity or adding your own custom wake word), check out our other Concepts and Design guides.
