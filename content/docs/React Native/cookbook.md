---
title: Cookbook
navId: Cookbook (react-native)
description: Code snippets and tips for React Native
draft: false
---

This is a collection of code snippets and brief descriptions designed to help you be as productive as possible as quickly as possible. Check out the Concepts section for more detailed discussions about the techniques mentioned here.

### Push-to-talk

Beginning in version 4, react-native-spokestack provides profiles with common configurations for the speech pipeline.

The default profile in is `PTT_NATIVE_ASR` (if no wakeword models are specified), which is a push-to-talk profile using native (iOS and Android) speech recognition.

```javascript
// Uses the default profile
Spokestack.initialize(clientID, clientSecret)
```

There's another push-to-talk profile available that uses Spokestack ASR instead: `PTT_SPOKESTACK_ASR`. Set a different profile than the default using the `pipeline.profile` property:

```javascript
Spokestack.initialize(clientID, clientSecret, {
  pipeline: {
    profile: Spokestack.PipelineProfile.PTT_SPOKESTACK_ASR
  }
})
```

Once Spokestack is initialized, call `activate()` to start listening.

```javascript
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

### Wakeword Activation

To use the demo "Spokestack" wakeword, you'll need the demo TensorFlow Lite models: [detect](https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/detect.tflite) | [encode](https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/encode.tflite) | [filter](https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/filter.tflite).

The pipeline will default to the native wakeword-activated profile (`TFLITE_WAKEWORD_NATIVE_ASR`) if these configuration properties are specified, so we don't need to set it here.

```javascript
await Spokestack.initialize(clientId, clientSecret, {
  wakeword: {
    filter: filterModelPath,
    detect: detectModelPath,
    encode: encodeModelPath
  }
})

// Only call start after initialize is called.
// Begins listening for the configured wakeword.
await Spokestack.start()
```

### Cancel ASR (before the timeout is reached)

```javascript
cancelAsr () {
  Spokestack.deactivate()
}
```

When `deactivate` is called, Spokestack will continue listening for the next wakeword activation. To stop listening entirely, call

```javascript
Spokestack.stop()
```

After calling this, you'll need to call

```javascript
Spokestack.start()
```

before you'll be able to recognize a wakeword again.

If speech is being processed when `deactivate` is called, it may still trigger the `onRecognize` event when processing is complete.

### Extracting a slot value from `classify()`

Let's say you're creating a voice-controlled timer and wish to perform natural language processing to respond to a handful of commands: `timer, stop, reset`. Here's how to extract a slot value from a `classify()` result. Note that the intent and slot names are pre-determined by the NLU model metadata.

```ts
const { intent, slots } = await Spokestack.classify(utterance).catch(
  handleError
)
switch (intent) {
  case 'timer':
    // the "start" intent can have slots named "duration" and "units"
    const duration = slots.duration?.value // 60
    const units = slots.units?.value // "seconds"
    // start a timer for `duration` `units` (eg 60 seconds) and change the UI accordingly
    break
  case 'stop':
    // stop the timer
    break
  case 'reset':
    const duration = 0
    // reset the timer
    break
  // handle an unexpected intent
  default:
}
```

### Synthesize speech formatted with [SpeechMarkdown](https://www.speechmarkdown.org/)

When creating a synthesis request, the request takes a dictionary with specific keys. The `id` field is for your convenience, and `voice` may be changed by creating a [Spokestack account](/account). The `input` is where the SpeechMarkdown-formatted text will be placed.

```javascript
const url = await Spokestack.synthesize(
  'Yet right now the average age of this (50)[number] second Parliament is (49)[number] years old, [1s] OK.',
  Spokestack.TTSFormat.SPEECHMARKDOWN
)
```
