---
title: NLU on React Native
navId: NLU (react-native)
description: Understanding the React Native NLU API
draft: false
---

This is a companion to the [NLU concept guide](docs/Concepts/nlu), which discusses the NLU subsystem holistically. Here we'll talk about usage issues specific to the React Native client library.

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
    // NLU settings. Only set these if you are calling `Spokestack.classify`.
    'nlu-model-path': YOUR_NLU_MODEL_PATH, // string filesystem path to nlu model
    'nlu-metadata-path': YOUR_NLU_METADATA_PATH, // string filesystem path to nlu metadata
    'wordpiece-vocab-path': YOUR_NLU_VOCABULARY_PATH // string filesystem path to nlu vocab
  }
})
```

The configuration properties above refer to the three required files for the Spokestack NLU model you're using.

## Usage

When it comes time to classify an utterance, Spokestack's NLU does all the heavy lifting in the background thread and returns the classification result via an event body.

First register the app to receive the `onClassification` event:

```javascript
Spokestack.onClassification = (e) => {
  console.log(e.result.intent)
}
```

Then just call `classify` with the text you want to classify. The second argument, a dictionary, is currently unused.

```javascript
Spokestack.classify('Tea, earl grey, hot', {})
```

Your `onClassification` event will receive a dictionary with the following structure:

```javascript
{
  "event":"classification"
  ,"result": {
    "confidence":"0.9999006"
    ,"intent":"RecipeIntent"
    ,"slots": {
      "Item":{
        "rawValue":"tea earl grey hot"
        ,"value":"tea"
        ,"type":"entity"
      }
    }
  }
  ,"error":""
}
```

From there, your app takes over and acts on the intent and slots that have been classified!
