---
title: Text-to-speech for Python
navId: TTS (Python)
description: Documentation for Spokestack's Python TTS module.
draft: false
---

Text-to-speech is a broad topic, but as far as Spokestack is concerned, there are two things your app has to handle: sending text, SSML, or Speech Markdown to be synthesized; and playing the resulting audio for your users. This guide will cover both.

## Generating Audio

The best way to synthesize speech in Spokestack is to use the `TextToSpeechManager` module. Keep in mind that this module operates independently of the `SpeechPipeline`.

`TextToSpeechManager` is initialized as follows:

```python
from spokestack.tts.manager import TextToSpeechManager
from spokestack.tts.clients.spokestack import TextToSpeechClient
from spokestack.io.pyaudio import PyAudioOutput

manager = TextToSpeechManager(
    TextToSpeechClient("spokestack_id", "spokestack_secret"), PyAudioOutput()
)

manager.synthesize(utterance="welcome to spokestack", mode="text", voice="demo-male")
```

If you haven't already, you will need to [create an account](/create) or [sign in](/login) to get your API credentials. See the [TTS concept guide](/docs/concepts/tts) for additional information about the types that are supported for the `mode` argument
