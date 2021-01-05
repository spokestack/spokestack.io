---
title: NLU on React Native
navId: NLU (react-native)
description: Understanding the React Native NLU API
draft: false
---

This is a companion to the [NLU concept guide](/docs/concepts/nlu), which discusses the NLU subsystem holistically. Here we'll talk about usage issues specific to the React Native client library.

## Configuration

As mentioned in the [Getting Started](getting-started) guide, initializing the Spokestack NLU is done using the same interface as the other Spokestack components:

```javascript
Spokestack.initialize(
  process.env.SPOKESTACK_CLIENT_ID,
  process.env.SPOKESTACK_CLIENT_SECRET,
  {
    nlu: {
      model: require('./nlu.tflite'),
      metadata: require('./metadata.json'),
      vocab: require('./vocab.txt')
    }
  }
)
```

Including model files in your app bundle requires a small change to your React Native bundler config. See [this guide](/docs/react-native/require-models) for more info.

## Usage

When it comes time to classify an utterance, Spokestack's NLU does all the heavy lifting on a background thread and returns the classification result via an event body.

Call `classify` with the text you want to classify.

```javascript
const result = await Spokestack.classify('Tea, earl grey, hot').catch(
  handleError
)
```

Your `onClassification` callback will receive an object with the following structure:

```javascript
{
  "intent": "RecipeIntent",
  "confidence": "0.9999006",
  "slots": [{
    "value":"tea",
    "type":"entity"
  }]
}
```

From there, your app takes over and acts on the intent and slots.

For more information on NLU, see the [NLU concept guide](/docs/concepts/nlu).
