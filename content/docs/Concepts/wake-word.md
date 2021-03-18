---
title: Wake Word
navId: Wake Word (Concepts)
description: Understanding Wake Words
draft: false
tags: Speech Pipeline, Wakeword
---

A wakeword is a signal for the computer to begin transitioning from passive to active listening. It acts as your software's "name", signaling that the user is speaking to the app. “Hey Siri” and “Alexa” are two of the most widely known wake words.

When Spokestack detects a wake word, [the speech pipeline](/docs/Concepts/speech-pipeline) begins transcribing the user's speech until they stop talking for a pre-set amount of time, or a total activation time limit elapses.

Spokestack's wake word detectors use a series of three neural models to filter user speech to isolate the most important frequency components, encode those for classification, and detect the presence of a wake word in the encoded version. More detailed information about the models themselves can be found [in our documentation](/docs/Machine Learning/wakeword-models).

A wake word model can be trained to recognize a number of different utterances, so your app can respond to different invocations, but the different utterances will simply activate the speech pipeline; you won't know which one the user spoke. This contrasts with a [keyword recognizer](/docs/Concepts/keywords), which will give you a transcript of the user's speech.

### Personal Wake Word

Spokestack's personal wake word uses few-shot transfer learning, allowing a small amount of data to produce a neural model with an accuracy level suitable for personal, hobby, or exploratory projects. You should only expect them to respond to the voice (or voices) used in the data you submit.
