---
title: Cookbook
navId: Cookbook (react-native)
description: Code snippets and tips for iOS
draft: false
---

This is a collection of code snippets and brief descriptions designed to help you be as productive as possible as quickly as possible. Check out the Concepts section on the left for more detailed discussions about the techniques mentioned here.

### Tap to talk

When configuring Spokestack, ensure that you have settings that make sense for a button-activated ASR activation. A wakeword or VAD trigger, for example, would not make much sense since you'll be triggering ASR from a button.

```javascript
stages: [
  'io.spokestack.spokestack.webrtc.VoiceActivityDetector', // voice activity detection
  'io.spokestack.spokestack.ActivationTimeout', // speech recognition times out after a configurable interval when voice is no longer detected
  'io.spokestack.spokestack.google.GoogleSpeechRecognizer'
]
```

Then it's just a matter of calling `activate()` when a button is pushed!

```javascript
onTalkButtonPressed () {
  // if the pipeline has been started elsewhere, you
  // don't need this line
  Spokestack.start()

  // skips the wakeword activation and sends the pipeline
  // straight to ASR
  Spokestack.activate()
}
```

### Wakeword Activation

To use the demo "Spokestack" wakeword, you'll need the demo TensorFlow Lite models: [detect](https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/detect.tflite) | [encode](https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/encode.tflite) | [filter](https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/filter.tflite)

```javascript
Spokestack.initialize({
  // provides audio input into the pipeline
  input: 'io.spokestack.spokestack.android.MicrophoneInput',
  stages: [
    // voice activity detection
    'io.spokestack.spokestack.webrtc.VoiceActivityDetector',
    // speech recognition times out after a configurable interval when voice is no longer detected
    'io.spokestack.spokestack.ActivationTimeout',
    // wakeword activtation trigger
    'io.spokestack.spokestack.wakeword.WakewordTrigger'
  ],
  properties: {
    'wake-filter-path': filterModelPath,
    'wake-detect-path': detectModelPath,
    'wake-encode-path': encodeModelPath,
    'ans-policy': 'aggressive',
    'agc-target-level-dbfs': 3,
    'agc-compression-gain-db': 15,
    'vad-mode': 'very-aggressive',
    'vad-fall-delay': 800,
    'wake-threshold': 0.8,
    'pre-emphasis': 0.97,
    'trace-level': Spokestack.TraceLevel.DEBUG
  }
})

// Only call start after initialize is called.
// Begins listening for the configured wakeword.
Spokestack.start()
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

### Extracting an intent slot value from `onClassification`

Let's say you're creating a voice-controlled timer and wish to perform simplistic natural language processing to respond to a handful of commands: `start, stop, reset, start over`. Here's how to extract a slot value from an `onClassification` event. Note that the intent and slot names are pre-determined by the NLU model metadata.

```javascript
onClassification (e) {
  var result = e.result
  var intent = result.intent
  var intentSlots = intent.slots
  switch (intent) {
    case "start":
      // the "start" intent can have slots named "duration" and "units"
      var duration = intentSlots["duration"].value
      var units = intentSlots["units"].value
      // start a timer for `duration` `units` (eg 60 seconds) and change the UI accordingly
      break
    default:
      // handle an unexpected intent
  }
}
```

### Synthesis speech formatted with [SpeechMarkdown](https://www.speechmarkdown.org/)

When creating a synthesis request, the request takes a dictionary with specific keys. The `id` field is for your convenience, and `voice` may be changed by creating a [Spokestack account](https://spokestack.io/account). The `input` is where the SpeechMarkdown-formatted text will be placed.

```javascript
Spokestack.synthesize({
  id: '1234567890',
  input:
    'Yet right now the average age of this (50)[number] second Parliament is (49)[number] years old, [1s] OK.',
  format: Spokestack.TTSFormat.SPEECHMARKDOWN,
  voice: 'demo-male'
})
```
