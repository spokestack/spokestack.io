---
title: Speech Pipeline
navId: Speech Pipeline (Concepts)
description: Understanding the Spokestack Speech Pipeline
draft: false
tags: Speech Pipeline
seoImage: '../../assets/docs/concepts-speech-pipeline.png'
---

The speech pipeline is the main way you interact with Spokestack’s [voice activity detection (VAD)](/docs/concepts/vad), [wake word detection](/docs/concepts/wake-word), [keyword recognition](/docs/concepts/keywords) and [automatic speech recognition (ASR)](/docs/concepts/asr). The speech pipeline is an extensible audio processing pipeline that includes a variety of built-in speech processors for all the above stages.

This pipeline seamlessly integrates VAD-triggered wake word detection using on-device machine learning models with speech transcription. It runs as a [soft real-time](https://en.wikipedia.org/wiki/Real-time_computing#Criteria_for_real-time_computing) system.

[Voice activity detection](/docs/concepts/vad) enables the pipeline to listen to small segments of audio and determine if speech is present. To keep computation usage low for edge devices, the rest of the pipeline does not proceed if the VAD does not detect speech.

[A wake word](/docs/concepts/wake-word) enables the pipeline to listen to speech audio and determine if a name from a set of recognized names is spoken. This fulfills two objectives: one, only listen in on a conversation if the wake word is being spoken; and two, ensure the higher-cost ASR component to runs only when the user wants to be understood.

When Spokestack detects a wake word, the speech pipeline begins transcribing the user's speech using either [keyword recognition](/docs/concepts/keywords) or [automatic speech recognition](/docs/concepts/asr) until they stop talking for a pre-set amount of time, or a total activation time limit elapses.

When thinking through the mechanics of voice interaction, the speech pipeline is the entry point, responsible for capturing user audio and translating it into text. Configuring it entails choices about whether or not to use a wake word to activate keywords/ASR, what kind of preprocessing to perform on audio before sending it to be recognized, whether to use keyword or automatic speech recognition, and which ASR service to use. These choices can all be made [individually or through the use of configuration profiles](/docs/machine-learning/pipeline-configuration).
