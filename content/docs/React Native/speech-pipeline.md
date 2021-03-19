---
title: Speech Pipeline in React Native
navId: Speech Pipeline (react-native)
description: Documentation for the Speech Pipeline in React Native
draft: false
tags: ASR, React Native, Wakeword
---

If you've read any of our other documentation, you know that the speech pipeline is the main way you interact with Spokestack's speech recognition and wakeword. This guide is here to explain in more detail how the React Native version of Spokestack uses this architecture to recognize wakewords and user speech. Spokestack on React Native is just a wrapper around the [Android](/docs/android/speech-pipeline) and [iOS](/docs/ios/speech-pipeline) native libraries. Consult those guides for platform-specific questions.

## What _is_ the speech pipeline?

The speech pipeline is a collection of distinct modular components that work together to process user speech. In short, the pipeline receives audio from the microphone and sends it through a number of _stages_. Each stage performs some form of processing and optionally dispatches events back through the pipeline.

## How do I set it up?

Configuration available at build time includes a pipeline profile and various properties, which are all listed in [react-native-spokestack's README](https://github.com/spokestack/react-native-spokestack#spokestackconfig).

Set a different profile with the profile property:

```js
Spokestack.initialize(
  process.env.SPOKESTACK_CLIENT_ID,
  process.env.SPOKESTACK_CLIENT_SECRET,
  {
    pipeline: {
      // The default is PTT_NATIVE_ASR
      profile: Spokestack.PipelineProfile.VAD_NATIVE_ASR
    }
  }
)
```

## How does it work?

`youtube: [Build your own voice interface to talk directly to your customers](https://www.youtube.com/watch?v=AvhQ6-9nCrQ)`

This is the speech pipeline's state machine:

![speech pipeline](images/speech_pipeline.png 'speech pipeline')

As you can see, once the pipeline has been built, calling `start()` puts it into a passive listening state—or it will if the pipeline has been properly configured. You _could_ have an ASR class as the only stage, in which case an ASR request would start immediately upon calling `start()`. This is almost certainly not what you want.

While the pipeline is listening passively, it sends audio through its stages a frame at a time (a "frame" defaults to 20 ms of audio, but [it's configurable](/docs/concepts/pipeline-configuration#runtime-tunable-parameters)). That audio is not leaving the device, though; it's waiting for a stage to recognize a trigger word or phrase and set the pipeline to active. The classes that do this in Spokestack typically have names that end in `Trigger`; see `WakewordTrigger` and `VoiceActivityTrigger` for examples.

The pipeline can also be activated by calling its `activate` method. This is what you'd do to implement push-to-talk. Once activated, it can be deactivated by calling `deactivate`, or it will remain active until a pre-set timeout is triggered (see `activeMin` and `activeMax` in the [wakeword configuration](https://github.com/spokestack/react-native-spokestack#wakewordconfig)).

For a complete set of available methods that can be called for the speech pipeline, please refer to [the API documentation](https://github.com/spokestack/react-native-spokestack#api-documentation).

When active, audio frames are sent through an ASR service (on-device or cloud-based) to be transcribed (if an ASR component is registered in the pipeline; these components have names that end in `SpeechRecognizer`). These ASR requests end when a pre-set timeout is reached or when the pipeline is manually set to inactive. At that point, the ASR service's best effort at a transcription is delivered via a speech event to any registered listeners.

## Events

All pipeline activity, including activations, deactivations, ASR timeouts, receipt of ASR transcripts, and tracing messages/errors are delivered asynchronously to event subscribers.

All events are optional, so apps can subscribe to whichever are of interest.

Subscribe to an event using `Spokestack.addEventListener()`

```js
Spokestack.addEventListener('activate', onActivate)
Spokestack.addEventListener('deactivate', onDeactivate)
Spokestack.addEventListener('recognize', onRecognize)
```

And remove event listeners using `Spokestack.removeEventListener()` or `Spokestack.removeAllListeners()`.

See [react-native-spokestack](https://github.com/spokestack/react-native-spokestack#events) for a list of all available events and a list of event data.

## And the cycle continues...

Once the ASR stage has completed its request and fired a `recognize` event, it signals the pipeline to return to listening passively for the wakeword. If a multi-turn interaction is desired, the pipeline can be manually reactivated after a system response by calling `activate()`.

To stop the pipeline completely, call its `stop()` method. As long as you retain a reference to its built instance, you can call `start()` again at any time without rebuilding it.
