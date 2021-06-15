---
title: React Native Cookbook
navId: Cookbook (react-native)
description: Code snippets and tips for React Native
draft: false
tags: ASR, Dialogue Management, NLU, React Native, TTS, Wake Word
seoImage: '../../assets/docs/react-native-getting-started.png'
---

This is a collection of code snippets and brief descriptions designed to help you be as productive as possible as quickly as possible. Check out the [Concepts](/docs/concepts) section for more detailed discussions about the techniques mentioned here.

### Push-to-talk

Beginning in version 4, react-native-spokestack provides profiles with common configurations for the speech pipeline.

The default profile in is `PTT_NATIVE_ASR` (if no wake word models are specified), which is a push-to-talk profile using native (iOS and Android) speech recognition.

```js
// Uses the default profile
Spokestack.initialize(clientID, clientSecret)
```

There's another push-to-talk profile available that uses Spokestack ASR instead: `PTT_SPOKESTACK_ASR`. Set a different profile than the default using the `pipeline.profile` property:

```js
Spokestack.initialize(clientID, clientSecret, {
  pipeline: {
    profile: Spokestack.PipelineProfile.PTT_SPOKESTACK_ASR
  }
})
```

Once Spokestack is initialized, call `activate()` to start listening.

```js
async onTalkButtonPressed () {
  // Start the speech pipeline
  // If the pipeline has been started elsewhere, you
  // don't need this line
  // If the pipeline is already started, this is a noop
  await Spokestack.start()

  // Activate ASR and start listening
  await Spokestack.activate()
}
```

### Wake Word Activation

The pipeline will default to the native wake word-activated profile (`TFLITE_WAKEWORD_NATIVE_ASR`) if these configuration properties are specified, so we don't need to set it here.

You can also [use local model files](require-models) if you want to avoid a runtime download. This sample uses the free "Spokestack" wake word. To create a custom wake word, try our [Maker subscription](/account/billing).

```js
await Spokestack.initialize(clientId, clientSecret, {
  wakeword: {
    filter: 'https://s.spokestack.io/u/hgmYb/filter.tflite',
    detect: 'https://s.spokestack.io/u/hgmYb/detect.tflite',
    encode: 'https://s.spokestack.io/u/hgmYb/encode.tflite'
  }
})

// Only call start after initialize is called.
// Begins listening for the configured wake word.
await Spokestack.start()
```

### Keyword Recognition

[Keyword recognition](/docs/concepts/keywords) is a type of ASR that responds only to a pre-configured vocabulary. This sample uses a free keyword recognition model that recognizes the English numerals "zero" through "nine". To create a custom model, try our [Maker subscription](/account/billing).

The pipeline will default to a profile that uses keyword ASR (`VAD_KEYWORD_ASR`) if these configuration properties are specified, so we don't need to set it here. To use _both_ wake word activation and keyword ASR, simply ensure that both `wakeword` and `keyword` are present in your config and that both have the correct number of models.

You can also [use local model files](require-models) if you want to avoid a runtime download.

```js
await Spokestack.initialize(clientId, clientSecret, {
  keyword: {
    filter: 'https://s.spokestack.io/u/UbMeX/filter.tflite',
    detect: 'https://s.spokestack.io/u/UbMeX/detect.tflite',
    encode: 'https://s.spokestack.io/u/UbMeX/encode.tflite'
  }
})

// Only call start after initialize is called.
// Will attempt transcription any time speech audio is detected
await Spokestack.start()
```

### Cancel ASR (before the timeout is reached)

```js
cancelAsr () {
  Spokestack.deactivate()
}
```

When `deactivate` is called, Spokestack will continue listening for the next wake word activation. To stop listening entirely, call

```js
Spokestack.stop()
```

After calling this, you'll need to call

```js
Spokestack.start()
```

before you'll be able to recognize a wake word again.

If speech is being processed when `deactivate` is called, it may still trigger the `onRecognize` event when processing is complete.

### Extracting a slot value from `classify()`

Let's say you're trying out one of our example models, specifically the one for Minecraft.

Here's how to extract a slot value from a `classify()` result. Note that the intent and slot names are pre-determined by the NLU model metadata.

```ts
const { intent, slots } = await Spokestack.classify(
  'How do I make a castle?'
).catch(handleError)

switch (intent) {
  case 'RecipeIntent':
    // A RecipeIntent will have an "entity" slot with the Minecraft recipe name
    // The app would then know to show the recipe for a castle
    const slot = slots[0]
    if (slot) {
      const recipeName = slot.value // castle
      console.log(slot.type) // => "entity"
    }
    break
  // ... other intents
}
```

### Synthesize speech formatted with [SpeechMarkdown](https://www.speechmarkdown.org/)

When creating a synthesis request, the request takes a dictionary with specific keys. The `id` field is for your convenience, and `voice` may be changed by creating a [Spokestack account](/account). The `input` is where the SpeechMarkdown-formatted text will be placed.

```js
const url = await Spokestack.synthesize(
  'Yet right now the average age of this (50)[number] second Parliament is (49)[number] years old, [1s] OK.',
  Spokestack.TTSFormat.SPEECHMARKDOWN
)
```
