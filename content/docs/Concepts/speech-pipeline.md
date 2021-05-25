---
title: Speech Pipeline
navId: Speech Pipeline (Concepts)
description: Understanding the Spokestack Speech Pipeline
draft: false
tags: Speech Pipeline
seoImage: '../../assets/docs/concepts-speech-pipeline.png'
---

The speech pipeline is the main way you interact with Spokestack’s [voice activity detection (VAD)](/docs/concepts/vad), [wake word detection](/docs/concepts/wake-word), [keyword recognition](/docs/concepts/keywords) and [automatic speech recognition (ASR)](/docs/concepts/asr). The speech pipeline is an extensible audio processing pipeline that includes a variety of built-in speech processors for all the above features.

## Basic Features

This pipeline seamlessly integrates voice activity-triggered wake word detection using on-device machine learning models with speech transcription. It runs as a [soft real-time](https://en.wikipedia.org/wiki/Real-time_computing#Criteria_for_real-time_computing) system.

[Voice activity detection](/docs/concepts/vad) (VAD) enables the pipeline to listen to small segments of audio and determine if speech is present. To keep computation usage low for edge devices, the rest of the pipeline does not proceed if the VAD does not detect speech.

[A wake word](/docs/concepts/wake-word) enables the pipeline to listen to speech audio and determine if a name from a set of recognized names is spoken. This fulfills two objectives: one, only listen in on a conversation if the wake word is being spoken; and two, ensure the higher-cost ASR component to runs only when the user wants to be understood.

When Spokestack detects a wake word, the speech pipeline begins transcribing the user's speech using either [keyword recognition](/docs/concepts/keywords) or [automatic speech recognition](/docs/concepts/asr) until they stop talking for a pre-set amount of time, or a total activation time limit elapses.

When thinking through the mechanics of voice interaction, the speech pipeline is the entry point, responsible for capturing user audio and translating it into text. Configuring it entails choices about whether or not to use a wake word to activate keywords/ASR, what kind of preprocessing to perform on audio before sending it to be recognized, whether to use keyword or automatic speech recognition, and which ASR service to use. These choices are made by configuring the processing stages used by the pipeline (see below), and fine-tuning of individual stages is done [via configuration properties](/docs/machine-learning/pipeline-configuration).

## Customizing the Pipeline

The speech pipeline is designed as a series of processing _stages_; when it's running, audio from the device's microphone is passed through each stage frame by frame. A frame of audio is typically 20 ms long. A pipeline stage can either modify the audio signal to do things like remove background noise or otherwise prepare it for speech recognition, or it can use the audio signal to perform some other action; for example, the wake word detection stage will signal that ASR should become active if a wake word is detected.

Each of the features mentioned above — VAD, wake word, and ASR — has its own dedicated [stage](pipeline-stage) and can be included or omitted from the pipeline as desired. Spokestack libraries provide a set of preconfigured "pipeline profiles" that cover common configuration options like wake word vs. VAD activation, different ASR providers, and so on, but they also allow for direct customization of the processing stages if none of the profiles fits your use case. See each library's speech pipeline documentation or code for more details.

Direct access to the pipeline's stages means that not only can you choose from the variety of options Spokestack has already implemented, but you are also free to [implement your own](pipeline-stage#create-your-own-stage) audio preprocessing, ASR provider, etc., and include it in the speech pipeline. This lets you implement any custom functionality you need while keeping a consistent API for all your voice interactions. If your pipeline stage would be useful to others, please submit a PR to the relevant Spokestack library — contributions are welcome!
