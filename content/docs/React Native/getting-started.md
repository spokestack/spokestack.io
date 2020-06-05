---
title: Getting Started
navId: Getting Started (react-native)
description: Getting started with the Spokestack React Native API
draft: false
---

This guide will get you up and running with Spokestack for React Native, and you'll be hearing and responding to your users in no time.

One caveat before we start, though: _This is not a collection of best practices_. We're going to be trading thoughtful organization for convenience here, so please consider how best to organize your Spokestack use for your application architecture.

## Prerequisites

We assume that you already have a working react-native 0.60+ project (with `npm` and `cocoapods` already installed), and are adding Spokestack to that project. If you're starting from scratch, please refer to the [react-native getting started guide](https://reactnative.dev/docs/getting-started) and then come back here!

### iOS

iOS 13+, [CocoaPods](https://guides.cocoapods.org/using/using-cocoapods.html#adding-pods-to-an-xcode-project) v1.6.0+.

### Android

Android SDK 26+, Android NDK (`SDK Manager` -> `SDK Tools` tab in Android Studio, or see [here](https://developer.android.com/ndk/downloads)).

## Installation

```bash
$ npm install --save react-native-spokestack
$ cd ios
$ pod install
```

### iOS

#### `Podfile`

Edit your `Podfile` to include `use_native_modules!` and `use_frameworks!`, to use `platform :ios, '13.0'` or higher, and to remove all `Flipper` references and dependencies (Spokestack is a static library and must `use_frameworks!`, which breaks compatibility with `Flipper`).

#### XCode Project

1. In your XCode Project settings, select your app target (eg `MinecraftSkill`) > Build Settings > Library Search Paths : Remove the search path `"$(TOOLCHAIN_DIR)/usr/lib/swift-5.0/$(PLATFORM_NAME)"`.
1. If your project does not already have an Objective-C - Swift bridging header, please create one: File > New File > Swift File > “Dummy.swift”, your app target > Create Bridging Header.

### Android

### `/android/gradle.properties`

Due to the number of libraries React Native uses on Android, it's best to give the JVM extra memory while during compliation: `org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8`

### `android/build.gradle`

Spokestack has dependencies that require a slightly higher minimum SDK version that React Native requires by default:

```java
buildscript {
    ext {
        buildToolsVersion = "28.0.3"
        minSdkVersion = 21
        //...
    }
    repositories {
        google()
        maven { url 'https://csspeechstorage.blob.core.windows.net/maven/' }
        //...
    }
}

//...

allprojects{
    repositories {
        google()
        maven { url 'https://csspeechstorage.blob.core.windows.net/maven/' }
        //...
    }
}
```

## Integration

### iOS

In order for your app to accept voice input via Spokestack, it needs two things:

1. The proper iOS permissions
1. An active `AVAudioSession`

Head over to `Info.plist` in your project and add a couple keys. Here are the raw values you'll need (the keys, at least; feel free to substitute your own values):

```xml
<key>NSMicrophoneUsageDescription</key>
<string>The microphone is used to receive user commands via voice.</string>
<key>NSSpeechRecognitionUsageDescription</key>
<string>Speech recognition is used to translate user voice input into text for further processing.</string>
```

Apple manages the various demands on a phone's audio system via [audio sessions](https://developer.apple.com/library/archive/documentation/Audio/Conceptual/AudioSessionProgrammingGuide/Introduction/Introduction.html). See their documentation for more details, but here's the minimum configuration you'll need in order to record user speech. A good place for it is your `AppDelegate`'s `application(_:didFinishLaunchingWithOptions)` method.

Given that, and remembering to remove Flipper as discussed earlier, your `AppDelegate.m` should look similar to this:

```objectivec
#import "AppDelegate.h"
#import <AVFoundation/AVFoundation.h>

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  # set the AVSession to a category compatible with both recording and playback
  [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryPlayAndRecord mode:AVAudioSessionModeDefault options:AVAudioSessionCategoryOptionDefaultToSpeaker  error:nil];
  [[AVAudioSession sharedInstance] setActive:YES error:nil];

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"YOUR APP NAME"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
```

### Android

To accept voice input, you need _at least_ the `RECORD_AUDIO` permission, and to perform speech recognition and TTS, you'll need to network access. These permissions are added automatically by the manifest included with the Spokestack library as of version 5.0.0, so you shouldn't need to add them explicitly.

Starting with Android 6.0, however, the `RECORD_AUDIO` permission requires you to request it from the user at runtime. Please see the [Android developer documentation](https://developer.android.com/training/permissions/requesting.html) for more information on how to do this. You'll also have to deal with the user potentially denying these permissions (or granting them at first and removing them later), but that's outside the scope of this guide.

Note that sending audio over the network can use a considerable amount of data, so you may also want to look into WiFi-related permissions and allow the user to disable voice control when using cellular data.

Also note that [the Android emulator cannot record audio](https://developer.android.com/guide/topics/media/mediarecorder). You'll need to test the voice input parts of your app on a real device.

#### `android/app/src/main/AndroidManifest.xml`

```xml
<!-- for wakeword & ASR -->
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<!-- for TTS -->
<uses-permission android:name="android.permission.INTERNET" />
```

## Configuring Spokestack

There are many options for configuring Spokestack. This example will begin capturing audio when `Spokestack.start()` is called and use a Voice Activity Detection (VAD) component to send any audio determined to be speech through an automated speech recognition system, in this case `GoogleSpeechRecognizer`. In other words, we're configuring this app to always actively listen, and no wakeword detection is performed. Note that to use this ASR option, you will need to provide your [own Google Voice credentials](https://codelabs.developers.google.com/codelabs/cloud-speech-intro/index.html#0). See [the configuration guide](/docs/Concepts/speech-pipeline) for more information about pipeline building options.

Then we configure a text-to-speech component using a TTS API key and secret that allow you to use Spokestack voices for free!

Finally we configure the natural language understanding component, which uses Spokestack NLU models. To test things out, you can grab an [example NLU model](https://github.com/spokestack/spokestack-ios/blob/master/SpokestackFrameworkExample/nlu.tflite), [model metadata](https://github.com/spokestack/spokestack-ios/blob/master/SpokestackFrameworkExample/nlu.tflite), and [NLU vocabulary](https://d3dmqd7cy685il.cloudfront.net/nlu/vocab.txt).

```javascript
import Spokestack from 'react-native-spokestack'

// initialize the Spokestack pipeline.
//
// Spokestack configuration has five top-level keys: 'input', 'stages', and 'properties' for the speech pipeline, 'tts' for text to speech, and 'nlu' for natural language recognition. Keys for asr, tts, and nlu may be omitted if your app does not require them.
// This example configures a voice-triggered speech recongnizer
// For additional examples, see https://github.com/spokestack/spokestack-android#configuration
Spokestack.initialize({
  input: 'io.spokestack.spokestack.android.MicrophoneInput', // provides audio input into the pipeline
  stages: [
    'io.spokestack.spokestack.webrtc.VoiceActivityDetector', // voice activity detection
    'io.spokestack.spokestack.webrtc.VoiceActivityTrigger', // voice activity detection triggers speech recognition
    'io.spokestack.spokestack.ActivationTimeout', // speech recognition times out after a configurable interval when voice is no longer detected
    'io.spokestack.spokestack.google.GoogleSpeechRecognizer' // one of the three supported speech recognition services
    // 'io.spokestack.spokestack.microsoft.AzureSpeechRecognizer'
    // 'io.spokestack.spokestack.android.AndroidSpeechRecognizer'
  ],
  properties: {
    locale: 'en-US',
    'agc-compression-gain-db': 15,
    'google-credentials': YOUR_GOOGLE_VOICE_CREDENTIALS, // only set if using `GoogleSpeechRecognizer` stage above
    'trace-level': Spokestack.TraceLevel.DEBUG // configurable logging level
  },
  tts: {
    ttsServiceClass: 'io.spokestack.spokestack.tts.SpokestackTTSService',
    // TTS API account properties. Only set these if you have a Spokestack account.
    'spokestack-id': 'f0bc990c-e9db-4a0c-a2b1-6a6395a3d97e', // your Spokestack API ID
    'spokestack-secret':
      '5BD5483F573D691A15CFA493C1782F451D4BD666E39A9E7B2EBE287E6A72C6B6' // your Spokestack API secret
  },
  nlu: {
    // NLU settings. Only set these if you are calling `Spokestack.classify`.
    'nlu-model-path': YOUR_NLU_MODEL_PATH, // string filesystem path to nlu model
    'nlu-metadata-path': YOUR_NLU_METADATA_PATH, // string filesystem path to nlu metadata
    'wordpiece-vocab-path': YOUR_NLU_VOCABULARY_PATH // string filesystem path to nlu vocab
  }
})
```

## Hearing your users

We call `Spokestack.start()` to begin listening for speech. `Spokestack.stop()` will stop listening completely. If you want to manually start speech recognition, without waiting for activation from a wakeword or voice trigger, call `Spokestack.activate()` after calling `start`. Correspondingly, `Spokestack.deactivate()` will stop speech recognition, but will still keep the pipelinerunning and listening for speech.

```javascript
// Speech Pipeline

// Start and stop the speech pipeline. All methods can be called repeatedly.
Spokestack.start() // start speech pipeline. can only start after initialize is called.
Spokestack.stop() // stop speech pipeline
Spokestack.activate() // manually activate the speech pipeline. The speech pipeline is now actively listening for speech to recognize.
Spokestack.deactivate() // manually deactivate the speech pipeline. The speech pipeline is now passively waiting for an activation trigger.
```

We need to provide implementations for the speech events, so that you can receive the speech recognition results, be informed of errors and debugging events, or get notified when the pipeline activates or deactivates (for example, you may want to disable any buttons or show a special "listening" indicator while recording).

```javascript
// Binding to speech pipeline events
const logEvent = (e) => console.log(e)
Spokestack.onActivate = logEvent
Spokestack.onDeactivate = logEvent
Spokestack.onError = (e) => {
  Spokestack.stop()
  logEvent(e)
}
Spokestack.onTrace = (e) => {
  // subscribe to tracing events according to the trace-level property
  logEvent(e.message)
}
Spokestack.onRecognize = (e) => {
  logEvent(e.transcript) // "Hello Spokestack"
}
```

## Understanding your users

Inside the `onRecognize` event, `e.transcript` will give you the raw text of what the user just said. Translating that utterance into an action in your app is the job of an NLU, or natural language understanding, component. Spokestack leaves the choice of NLU up to you, but we do offer our own full-featured NLU component for Spokestack based on years of research and lessons learned from working with other services. Our NLU runs directly on your user's device, instead of calling back to the cloud. Using it is incredibly simple, since we've already configured it (in the first part of this guide):

```javascript
// Classify the intent and slot of an utterance
Spokestack.classify(utterance, {})

// Receive the transcript classifcation result
Spokestack.onClassification = (e) => {
  logEvent(JSON.stringify(e))
  //  {"event":"classification","result":{"confidence":"0.9999888","intent":"request.lights.activate","slots":{"location":{"value":"room","type":"selset"}}},"error":""}
}
```

You'll note that classification results are in a map containingan intent. A intent-based classifier will regularize all sorts of related langague into a single canonical intent, eg "let's go" or "please cease" get classified as `start` and `stop`, respectively. Slots may be thought of as parameters for your app to take action on, based on the intent.

## Talking back to your users

If you want full hands-free and eyes-free interaction, you'll want to deliver responses via voice as well. This requires a text-to-speech (TTS) component, and Spokestack has one of these too! Simply call it with the text you want to synthesize, and it will send you an event with an audio file containing the synthesized voice speaking your text utterance.

```javascript
// Get a URL to a real-time synthesize of an utterance
Spokestack.synthesize({'input': utterance, 'format': Spokestack.TTSFormat.TEXT, 'voice': 'demo-male'})
};

// Receive the real-time synthesis result
Spokestack.onSuccess = e => {
  logEvent(JSON.stringify(e)) // { url: https://api.spokestack.io/stream/g2dkABVnYXRld2F5QDE3Mi4yNy4xMi4yNDQAACeUAAAAAgE }
```

The API credentials in this example set you up to use the demo voice available for free with Spokestack; for more configuration options and details about controlling pronunciation, see [the TTS concept guide](/docs/Concepts/tts).

## Conclusion

That's all there is to it! Your app is now configured to accept and respond to voice commands. Obviously there's more we could tell you, and you can have much more control over the speech recognition process (including, but not limited to, configuring the pipeline's sensitivity and adding your own custom wakeword models). If you're interested in these advanced topics, check out our other Concepts and Design guides. We'll be adding more React Native guides soon.
