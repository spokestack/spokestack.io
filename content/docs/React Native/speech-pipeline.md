---
title: SpeechPipeline in React Native
navId: Speech Pipeline (React Native)
description: Documentation for the SpeechPipeline class in React Native
draft: false
---

If you've read any of our other documentation, you know that the speech pipeline is the main way you interact with Spokestack's speech recognition and wakeword. This guide is here to explain in a little more detail how the React Native version of Spokestack uses this architecture to recognize wakewords and user speech. Fundamnetally, Spokestack on React Native is just a wrapper around the [Android](/docs/Android/) and [iOS](/docs/iOS) native libraries, so if you have more detailed platform-specific questions, be sure to consult those!

## What _is_ it?

As the name implies, `SpeechPipeline` is a collection of distinct modular components that work together to process user speech. In short, the pipeline receives audio sends it through a variable number of _stages_, each of which performs some form of processing and optionally dispatches events back through the pipeline.

## How do I set it up?

Configuration available at build time include properties, described in [the configuration guide](/docs/Concepts/pipeline-configuration) and the various pipeline stages.

Stage order matters in the build process; audio is processed by each stage in turn, according to the order in which it's declared at build time. For example, a stage that activates ASR based on the presence of the wakeword needs to be placed before the ASR stage, and any stages that process audio to make the wakeword detector's job easier (for example, gain control) must be declared before the wakeword detection stage. The order of configuration properties, on the other hand, does not matter, and their declarations can be placed before or after those of processing stages.

## How does it work?

This is the speech pipeline's state machine:

![](images/speech_pipeline.png 'speech pipeline')

As you can see, once the pipeline has been built (signaled by the `onInit` event), calling `start()` puts it into a passive listening state—or it will if the pipeline has been properly configured. You _could_ have an ASR class as the only stage, in which case an ASR request would start immediately upon calling `start()`. This is almost certainly not what you want.

While the pipeline is listening passively, it sends audio through its stages a frame at a time (a "frame" defaults to 20 ms of audio, but [it's configurable](/docs/Concepts/pipeline-configuration)). That audio is not leaving the device, though; it's waiting for a stage to recognize a trigger word or phrase and set the pipeline to active. The classes that do this in Spokestack typically have names that end in `Trigger`; see `WakewordTrigger` and `VoiceActivityTrigger` for examples.

The pipeline can also be activated by calling its `activate` method. This is what you'd do to implement push-to-talk. Once activated, it can be deactivated by calling `deactivate`, or it will remain active until a pre-set timeout is triggered (see `active-min` and `active-max` in the [configuration documentation](/docs/Concepts/pipeline-configuration)).

For a complete set of available methods that can be called for the speech pipeline, please refer to [the API documentation](https://github.com/spokestack/react-native-spokestack#methods).

When active, audio frames are not processed on-device but are instead sent to an ASR service to be transcribed (if an ASR component is registered in the pipeline; these components have names that end in `SpeechRecognizer`). These ASR requests end when a pre-set timeout is reached or when the pipeline is manually set to inactive. At that point, the ASR service's best effort at a transcription is delivered via a speech event to any registered listeners.

## The Main Event

All pipeline activity, including activations, deactivations, ASR timeouts, receipt of ASR transcriptions, and tracing messages/errors are delivered asynchronously to [event subscribers](https://github.com/spokestack/react-native-spokestack#events).

All events are optional, so apps can subscribe to whichever are of interest. All pipeline events send an event dictionary with a common set of keys. Here's an example of a `recognize` event:

```javascript
{
  "event":"recognize"
  ,"transcript":"Hello world"
  ,"error":""
}
```

Events may also contain additional keys like this `trace` event used for debugging:

```javascript
{
  "event":"trace"
  ,"error":""
  ,"transcript":""
  ,"trace":"20 TFLiteWakewordRecognizer wake: 0.9167537"
}
```

## And the cycle continues...

Once the ASR stage has completed its request and fired a `recognize` event, it signals the pipeline to return to listening passively for the wakeword. If a multi-turn interaction is desired, the pipeline can be manually reactivated after a system response by calling `activate()`.

To stop the pipeline completely, call its `stop()` method. As long as you retain a reference to its built instance, you can call `start()` again at any time without rebuilding it.
