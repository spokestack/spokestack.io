---
title: Speech Pipeline
navId: Speech Pipeline (Concepts)
description: Understanding the Spokestack Speech Pipeline
draft: false
tags: Speech Pipeline
---

The speech pipeline is the main way you interact with Spokestack’s voice activity detection (VAD), wake word detection, and automatic speech recognition (ASR). The speech pipeline is an extensible audio processing pipeline that includes a variety of built-in speech processors for all the above stages.

This pipeline seamlessly integrates VAD-triggered wake word detection using on-device machine learning models with speech transcription. It runs as a [soft real-time](https://en.wikipedia.org/wiki/Real-time_computing#Criteria_for_real-time_computing) system, and its components must be as responsive as possible.

[Voice activity detection](/docs/concepts/vad) enables the pipeline to listen to small segments of audio and determine if speech is present. To keep computation usage low for edge devices, the rest of the pipeline does not proceed if the VAD does not detect speech.

[A wake word](/docs/concepts/wake-word) enables the pipeline to listen to speech audio and determine if a name from a set of recognized names is spoken. This fulfills two objectives: one, only listen in on a conversation if the wake word is being spoken, and two preserve the higher-cost ASR component to transcribe only when the user wants to talk.

When Spokestack detects a wake word, the speech pipeline begins transcribing the user's speech until they stop talking for a pre-set amount of time, or a total activation time limit elapses. The technology for converting spoken words to text is known as [automatic speech recognition](/docs/concepts/asr).

When thinking through the mechanics of voice interaction, the speech pipeline is the entry point, responsible for capturing user audio and translating it into text. Configuring it entails choices about whether or not to use a wakeword to activate ASR, what kind of preprocessing to perform on audio before sending it to ASR, and which ASR service to use. These choices can all be made [individually or through the use of configuration profiles](/docs/machine-learning/pipeline-configuration).
