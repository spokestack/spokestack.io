---
title: Speech Pipeline Stages
navId: Speech Pipeline Stages
description: How a Speech Pipeline stage works, and how to implement your own.
draft: false
tags: Speech Pipeline
seoImage: '../../assets/docs/concepts-speech-pipeline.png'
---

As mentioned in the [introduction to the speech pipeline](speech-pipeline), Spokestack processes audio by passing it through a series of _stages_, each of which either alters the signal itself or uses it to control another part of the system. This might mean sending an event to registered listeners, activating or deactivating subsequent stages, or both. In this guide, we'll talk in detail about what's involved in a single pipeline stage and talk about how you'd implement your own.

## Terminology

- **Frame**: Audio is processed by the speech pipeline in chunks called frames. A frame of audio is 20ms long by default and is consists of an array of floating point values that represent individual audio samples received from the device's microphone.
- **Speech Configuration**: A set of configuration properties passed to the speech pipeline itself and each stage during construction (on most platforms; it doesn't exist on Python). It's a simple map of property names to primitive values that can be used to tune the stage's performance or pass it setup options. Any needs specific to a custom stage, such as API credentials for an external service or simple settings, should be added to this object.
- **Speech Context**: The representation of the pipeline's current state and the stages' means of communicating with each other. The speech context includes information like whether the current frame of audio contains speech, whether ASR is currently active, the current transcript of speech (which may be updated each frame that ASR is active), etc. The context is also capable of dispatching events to registered pipeline listeners.

## Architecture

Not much is required to create a pipeline stage. On iOS and Android, your class will need to implement the `SpeechProcessor` interface, which contains a single method named `process`. In Python, the stage class just needs to be callable with a `SpeechContext` and frame of audio. Either way, this function is called with every frame of audio the pipeline receives. Stages listed before this one in the speech pipeline's configuration will receive the audio first, giving them a chance to modify it or the speech context.

Let's take a look at how this works in practice, using the example of a stage that performs ASR by sending audio to an external service. This will illustrate how to interact with the current state of the speech context in a custom stage without modifying the frame of audio itself. The following code snippet is [from the Android library](https://github.com/spokestack/spokestack-android/blob/6fa5c8067d4f3afca3d26e2b1686119b3eff2547/src/main/java/io/spokestack/spokestack/google/GoogleSpeechRecognizer.java), but we'll discuss it enough that programming language shouldn't matter.

```java
  public void process(SpeechContext context, ByteBuffer frame)
      throws Exception {
    if (context.isActive() && this.request == null) // 1
      begin(context);
    else if (!context.isActive() && this.request != null) // 2
      commit();
    else if (context.isActive()) // 3
      send(frame);
  }
```

All this implementation of `process` does is dispatch to other methods in the class based on certain conditions in the speech context. Here's what each condition does in plain English, starting from the top:

#### Condition 1

`context.isActive()` is the cue that ASR should be running — if the pipeline is triggered on VAD alone, the VAD trigger stage will set the context to active whenever it detects speech and deactivate it when speech stops; if a wake word is being used, the wake word trigger will set it to active only if the wake word has been detected. `this.request` is a reference to the state of the ASR stage itself: this stage uses an internal HTTP client to transmit audio to an ASR service, so this part of the condition checks to see whether the request has already been started by a previous frame.

In other words, if ASR should be running, and we don't already have an open HTTP request to the ASR service, start one.

#### Condition 2

If the rest of the pipeline has determined that ASR should be inactive, but we have an open HTTP request to our ASR service, close out the HTTP request.

#### Condition 3

Otherwise, if ASR should be active, send the current frame to the ASR service. At this point, we've already determined that we have an open request, so we don't need to do anything special here other than use it to forward the audio.

If none of these conditions matches, it means the speech context is inactive (ASR should not be running), and we don't have an open request to our ASR provider, so we do nothing.

## Create Your Own Stage

The above approach can easily be adapted to stream frames of audio to a neural ASR model running locally. In the case of our sample stage, the `PARTIAL_RECOGNIZE` and `RECOGNIZE` events are dispatched in response to events received asynchronously from the internal HTTP client, but they could just as easily be sent in response to events produced by a local model. In the Android library, these events are sent to listeners via `context.dispatch(SpeechContext.Event)` after relevant fields (the current transcript, in most cases) is set, but event dispatch is similar on all platforms.

A caveat to this approach is that such a stage should run its ASR model, scorer, and/or anything else needed to encode inputs and interpret outputs on a background thread so that the pipeline can continue to process audio in near-real time.

The key point is that Spokestack doesn't attempt to hide the raw audio signal or pipeline state, so the information available to its first-party stages is available to any third-party extensions. This means that stages should be careful to avoid violating expectations of other stages (i.e., don't set the context to active or tell it speech is present unless that's explicitly your stage's job), but it also means that the full power of the pipeline is at your disposal and ready to be extended.

If your stage is of general use (for example, you've added a new ASR provider like we just described), please open a PR on the relevant library. We welcome contributions!
