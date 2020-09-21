---
title: Text-to-speech for iOS
navId: TTS (iOS)
description: Documentation for Spokestack's iOS TTS subsystem.
draft: false
---

Text-to-speech is a broad topic, but as far as Spokestack is concerned, there are two things your app has to handle: sending the input to be synthesized, and playing the resulting audio for your users. This guide will cover both.

## Starting up

To synthesize speech in Spokestack, use the `TextToSpeech` component:

```swift
let tts = TextToSpeech(self, configuration: configuration)
```

In this example, `self` implements the `TextToSpeechDelegate` protocol, which utilizes the delegate pattern to forward TTS events to your app.

We also use the default credentials for `SpeechConfiguration.apiId` and `SpeechConfiguration.apiSecret`, which are set to public values that let you try Spokestack TTS without creating an account. [Create an account](/create) or [sign in](/login) to get your own free API credentials and access to additional features!

## Generating the audio

Generating a URL to an audio stream of a TTS synthesized voice is just a single method in Spokestack!

```swift
tts.synthesize(TextToSpeechInput("Here I am, a brain the size of a planet."))
```

This is the simplest arity of `synthesize`, which takes a constructor of `TextToSpeechInput` with a plain text string as input. The `success(TextToSpeechResult:)` delegate function will be called with the result, which has a `url` property with the audio stream.

`TextToSpeechInput` has additional properties that you can use for more sophisticated speech synthesis. As always, there's more detail in the [API documentation](https://spokestack.github.io/spokestack-ios/Classes/TextToSpeechInput.html). Let's detail those advanced properties briefly:

The `input` is simply the string you want to hear synthesized.

The `inputFormat` argument is here because Spokestack supports serveral input formats: plain text, [SpeechMarkdown](https://www.speechmarkdown.org/), and a subset of the [SSML](https://www.w3.org/TR/speech-synthesis11) spec for specifying pronunciation and specific pause times. See [the TTS concept guide](/docs/Concepts/tts) for more information on providing SSML input. If you don't need this level of control, `TTSInputFormat.text` is the default.

The `voice` argument allows you to specify which of Spokestack's library of synthetic voices you wish to use. Want something besides `demo-male`? [Create a Spokestack account](/create) to get your own free access to additional voices!

The optional `id` property allows you to track individual TTS synthesis requests; it will be echoed back in the corresponding [`TextToSpeechResult.id`](https://spokestack.github.io/spokestack-ios/Classes/TextToSpeechResult.html).

## Using the generated audio

What you do with the synthesis result (or failure) is up to you! The streaming URL is valid for 60 seconds, so you can save it for later or play it back immediately.

To save it for later, you can simply download the audio before the 60-second TTL expires:

```swift
let destinationUrl = documentsUrl.appendingPathComponent(url.lastPathComponent)
let urlData = NSData(contentsOf: url)
urlData!.write(to: destinationUrl, atomically: false)
```

To use your own `AVPlayer` instance to control playback:

```swift
let playerItem = AVPlayerItem(url: streamingFile)
let player = AVPlayer(playerItem: playerItem)
player.play()
```

## Simply speak!

Want to skip all that and let Spokestack handle the both the synthesis and playback of your synthesis? We've combined the two sections above into a single function call! Try `speak(TextToSpeechInput:)`!

```swift
let input = TextToSpeechInput(text)
tts.speak(input)
```

You'll receive event notifications when synthesis has completed (`success`), playback has begun (`didBeginSpeaking`) and playback has finished (`didFinishSpeaking`). A whole TTS feature in just one function call!
