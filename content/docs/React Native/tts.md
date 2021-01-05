---
title: Text-to-speech for React Native
navId: TTS (react-native)
description: Documentation for Spokestack's React Native TTS API.
draft: false
---

Text-to-speech is a broad topic, but as far as Spokestack is concerned, there are two things your app has to handle: sending the input to be synthesized, and playing the resulting audio for your users. This guide will cover both.

## Starting up

To synthesize speech in Spokestack, use the `synthesize` method. This small API is built similarly to the speech pipeline, but it operates independently.

TTS requires very little configuration. The only things needed are your Spokestack API client ID and secret.

```javascript
await Spokestack.initialize(
  // Your Spokestack API key ID
  'f0bc990c-e9db-4a0c-a2b1-6a6395a3d97e',
  // Your Spokestack API key secret
  '5BD5483F573D691A15CFA493C1782F451D4BD666E39A9E7B2EBE287E6A72C6B6'
)
```

In this example, the credentials are set to public values that allow you to try Spokestack TTS without creating an account.

[Create an account](/create) or [sign in](/login) to get your own free API credentials and access to additional features!

## Generating the audio

Generating a URL to an audio stream of a TTS synthesized voice is just a single method in Spokestack!

```javascript
const url = await Spokestack.synthesize(
  'Here I am, a brain the size of a planet.'
)
```

`Spokestack.synthesize()` can also synthesize using other formats besides plain text (the default). This includes [SpeechMarkdown](https://www.speechmarkdown.org/) and [SSML](https://www.w3.org/TR/speech-synthesis). See [the TTS concept guide](/docs/Concepts/tts) for more information on providing SSML input.

The default voice is Spokestack's free "demo-male" voice. Custom voices are available! [Contact us to find out more](mailto:hello@spokestack.io).

Documentation for `Spokestack.synthesize()` and its arguments can be found in [react-native-spokestack's README](https://github.com/spokestack/react-native-spokestack#synthesize).

## Using the generated audio

What you do with the synthesis result (or failure) is up to you! The streaming URL is valid for 60 seconds, so you can save it for later or play it back immediately.

For simple and immediate playback, we also provide `Spokestack.speak()`, which takes the same arguments as `Spokestack.synthesize()` but plays the audio as soon as the speech is processed using the device's current playback settings. For more complicated playback, we defer to other libraries dedicated to that feature. We're fond of [react-native-video](https://github.com/react-native-community/react-native-video), and have also used [react-native-track-player](https://github.com/react-native-kit/react-native-track-player). For either one, pass the URL directly as the source.
