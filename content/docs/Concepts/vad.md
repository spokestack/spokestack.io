---
title: Voice Activity Detection
navId: VAD (Concepts)
description: Documentation for Spokestack's third-party ASR support
draft: false
tags: Speech Pipeline, VAD
---

Voice activity detection, or VAD, is responsible for making a quick, low-cost determination of whether a snippet of audio contains human speech.

VADs range in complexity from simple frequency analyzers to heavier black-box neural models. The underlying implementation in Spokestack's libraries varies based on tools available for the various platforms, but we try to strike a balance between speed and accuracy.

VAD is the first gatekeeper in a speech detection pipeline. Ignoring audio that's not detected as speech saves processing power, and the savings grow with each downstream processor you have in your speech pipeline. The Spokestack [speech pipeline](/docs/concepts/speech-pipeline) is a [soft real-time](https://en.wikipedia.org/wiki/Real-time_computing#Criteria_for_real-time_computing) system, and its components must be as responsive as possible. It's worse for a downstream component to miss user speech than to process too much, so our VADs tend to err on the side of producing false positives rather than rejecting actual speech.
