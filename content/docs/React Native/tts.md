---
title: Text-to-speech for React Native
navId: TTS (React Native)
description: Documentation for Spokestack's React Native TTS API.
draft: false
---

Text-to-speech is a broad topic, but as far as Spokestack is concerned, there are two things your app has to handle: sending the input to be synthesized, and playing the resulting audio for your users. This guide will cover both.

## Starting up

To synthesize speech in Spokestack, use the `synthesize` method. This small API is built similarly to the speech pipeline, but it operates independently.

Here's how to initialize the TTS API as part of the unified Spokestack initialization:

```javascript
Spokestack.initialize({
  // omitting speech pipelineline and nlu configuration
  input: '',
  stages: [],
  properties: {},
  nlu: {},
  tts: {
    ttsServiceClass: 'io.spokestack.spokestack.tts.SpokestackTTSService',
    // Spokestack account information
    'spokestack-id': 'f0bc990c-e9db-4a0c-a2b1-6a6395a3d97e', // your Spokestack API ID
    'spokestack-secret':
      '5BD5483F573D691A15CFA493C1782F451D4BD666E39A9E7B2EBE287E6A72C6B6' // your Spokestack API secret
  }
})
```

In this example, `spokestack-id` and `spokestack-secret` are set to public values that let you try Spokestack TTS without creating an account. [Create an account](/create) or [sign in](/login) to get your own free API credentials and access to additional features!

## Generating the audio

Generating a URL to a audio stream of a tts synthesized voice is just a single method in Spokestack!

```javascript
Spokestack.synthesize({
  input: 'Here I am, a brain the size of a planet.',
  format: Spokestack.TTSFormat.TEXT,
  voice: 'demo-male'
})
```

We'll break down what was included in the `synthesize` arguments here, and there's also more details on the [API documentation](https://github.com/spokestack/react-native-spokestack#methods):

The `input` is simply the string you want to hear synthesized.

The `format` argument is here because Spokestack supports serveral input formats: plain text, [SpeechMarkdown](https://www.speechmarkdown.org/), and a subset of the [SSML](https://www.w3.org/TR/speech-synthesis11) spec for specifying pronunciation and specific pause times. See [the TTS concept guide](/docs/Concepts/tts) for more information on providing SSML input. If you don't need this level of control, simply specify `Spokestack.TTSFormat.TEXT` like in the above example.

The `voice` argument allows you to specify which of Spokestack's library of synthetic voices you wish to use. Want something besides `demo-male`? [Create a Spokestack account](/create) to get your own free access to additional voices!

## Using the generated audio

How do you get the audio generated from the call to the `synthesize` method? Just a couple of event subscriptions!

```javascript
// Receive the real-time transcript synthesis result or failure
Spokestack.onSuccess = (e) => {
  console.log(e.url) // https://api.spokestack.io/stream/g2dkABVnYXRld2F5QDE3Mi4yNy4xMi4yNDQAACeUAAAAAgE
}
Spokestack.onFailure = (e) => {
  console.log(e.error)
}
```

What you do with the synthesis result (or failure) is up to you! The streaming URL is valid for 60 seconds, so you can save it for later or play it back immediately using your favorite React Native media package. We're fond of [react-native-video](https://github.com/react-native-community/react-native-video), and have also used [react-native-track-player](https://github.com/react-native-kit/react-native-track-player). For either one, you can just pass the URL along.
