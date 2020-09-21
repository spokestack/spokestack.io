---
title: NLU on React Native
navId: NLU (react-native)
description: Understanding the React Native NLU API
draft: false
---

This is a companion to the [NLU concept guide](/docs/Concepts/nlu), which discusses the NLU subsystem holistically. Here we'll talk about usage issues specific to the React Native client library.

## Configuration

As mentioned in the [Getting Started](getting-started) guide, initializing the Spokestack NLU is done using the same interface as the other Spokestack components:

```javascript
Spokestack.initialize({
  // omitting speech pipelineline and tts configuration
  input: '',
  stages: [],
  tts: {},
  properties: {},
  nlu: {
    'nlu-model-path': YOUR_NLU_MODEL_PATH, // string filesystem path to nlu model
    'nlu-metadata-path': YOUR_NLU_METADATA_PATH, // string filesystem path to nlu metadata
    'wordpiece-vocab-path': YOUR_NLU_VOCABULARY_PATH // string filesystem path to nlu vocab
  }
})
```

The configuration properties above refer to the three required files for the Spokestack NLU model you're using. If you're unfamiliar with how to pass filesystem paths using react-native (so were we at first!), here's an example that uses the nifty [`react-native-fetch-blob`](https://github.com/joltup/rn-fetch-blob) library:

```javascript
const nluModelPath = await RNFetchBlob.config({
  fileCache: true,
  appendExt: 'tflite'
})
  .fetch(
    'GET',
    'https://d3dmqd7cy685il.cloudfront.net/nlu/production/shared/XtASJqxkO6UwefOzia-he2gnIMcBnR2UCF-VyaIy-OI/nlu.tflite'
  )
  .then((res) => res.path())
const nluMetadataPath = await RNFetchBlob.config({
  fileCache: true,
  appendExt: 'json'
})
  .fetch(
    'GET',
    'https://d3dmqd7cy685il.cloudfront.net/nlu/production/shared/XtASJqxkO6UwefOzia-he2gnIMcBnR2UCF-VyaIy-OI/metadata.json'
  )
  .then((res) => res.path())
const nluVocabPath = await RNFetchBlob.config({
  fileCache: true,
  appendExt: 'txt'
})
  .fetch(
    'GET',
    'https://github.com/spokestack/spokestack-ios/raw/master/SpokestackFrameworkExample/vocab.txt'
  )
  .then((res) => res.path())
```

Then just pass those `const` files to the `nlu` object above!

## Usage

When it comes time to classify an utterance, Spokestack's NLU does all the heavy lifting on a background thread and returns the classification result via an event body.

First register the app to receive the `onClassification` event:

```javascript
Spokestack.onClassification = (e) => {
  console.log(e.result.intent)
}
```

Then just call `classify` with the text you want to classify. The second argument, a plain object, is currently unused.

```javascript
Spokestack.classify('Tea, earl grey, hot', {})
```

Your `onClassification` callback will receive an object with the following structure:

```javascript
{
  "event":"classification"
  ,"result": {
    "confidence":"0.9999006"
    ,"intent":"RecipeIntent"
    ,"slots": {
      "Item":{
        "rawValue":"Tea, earl grey, hot"
        ,"value":"tea"
        ,"type":"entity"
      }
    }
  }
  ,"error":""
}
```

From there, your app takes over and acts on the intent and slots!
