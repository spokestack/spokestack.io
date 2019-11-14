---
title: Web Browser and React Support for ASR and TTS
date: '2019-11-01T15:20:34.735Z'
description: Web Browser and React Support for ASR and TTS
draft: false
---

At Spokestack, we believe that voice represents the next platform shift for consumer computing. In addition to the major consumer voice platforms, our conversational assistants run on our own platform. In the interest of enabling that platform to reach into the web, how does the most popular framework for building web-based applications work with the W3C standards for speech technologies like Automatic Speech Recognition (ASR) and Text to Speech (TTS)? Let’s investigate…

## TL;DR

React is a great way to organize speech components. W3C’s Web Speech API browser support is disappointing. If you’re implementing React components that use the Web Speech API, we recommend only supporting the Chrome browser if possible. Otherwise, build your own custom React components that utilize a 3rd-party ASR service instead of Web Speech API’s ASR while using Web Speech API TTS.

## Protocol

The experiment relied on browser-provided ASR and TTS services, and did not attempt to implement such itself. The experiment performed a simple copy-cat pattern (perform Automatic Speech Recognition on signal from a microphone, and repeat the ASR’d speech back via Text to Speech). No NLU (natural language understanding) like intent recognition or response generation was attempted.

The experiment had a two-fold purpose:

1. Proof of concept for in-browser voice interaction using React.
2. Explore built-in browser support for Web Speech API vis-á-vis a custom implementation.
