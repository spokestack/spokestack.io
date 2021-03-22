---
title: Keyword Recognition
navId: Keyword (Concepts)
description: Documentation for Spokestack's Keyword Recognizer
draft: false
tags: Keywords
---

<img src="../../assets/docs/concepts-keywords.png" style="display:none"/>

Keyword recognition detects words or phrases from a list of key words. You define that list of words, and Spokestack notifies your software when any of them is recognized. This detection happens entirely on-device, with no data going over the network or to the cloud. Keyword detection straddles the line between [wake word detection](/docs/concepts/wakeword) and [speech recognition](/docs/concepts/asr), with the performance of the former and the results of the latter. Each keyword may comprise multiple utterances. When the model detects the presence of an utterance in user speech, it returns the keyword as a transcript.

### Keyword Detection

In practical terms, this means your app can listen for multiple wake words or brief commands and support variations in phrasing for each of them; using a fast, lightweight model; _without user audio leaving the device_.

To demonstrate, imagine an app designed to control music while the user is running. Classes could be named "play" and "stop" — of course, there would likely be more, but we'll list two for sake of brevity. Utterances for "play" could include "play", "start", "go", "music on", etc.; and "stop"'s utterances could be "stop", "quit", "pause", "music off", etc. If a user says any of those things, your app would receive a transcript, but the only transcripts it can receive are "play" and "stop", making it easy to map the command to the proper app feature.

The main use case for keyword models is in domains with limited vocabularies or apps that only wish to support specific words or phrases. If users are expected to interact with an app in complete sentences, or you want to support phrasings you didn't anticipate at build time, a [speech recognition](/docs/concepts/asr) component paired with [natural language understanding](/docs/concepts/nlu) would be a better fit for your case.

### Personal Keyword

Your [Spokestack Maker account](/account#billing) gives you access to powerful AutoML keyword customization. You define what key terms to recognize using Spokestack's personal keyword recognizer. It is trained using few-shot transfer learning, allowing a small amount of data to produce a neural model with an accuracy level suitable for personal, hobby, or exploratory projects. You should only expect them to respond to the voice (or voices) used in the data you submit.
