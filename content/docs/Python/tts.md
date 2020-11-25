---
title: Text-to-speech for Python
navId: TTS (Python)
description: Documentation for Spokestack's Python TTS module.
draft: false
---

Text-to-speech is a broad topic, but as far as Spokestack is concerned, there are two things your app has to handle: sending text, SSML, or Speech Markdown to be synthesized; and playing the resulting audio for your users. This guide will cover both.

## Generating Audio

The best way to synthesize speech in Spokestack is to use the `TextToSpeechManager` module. This module combines `TextToSpeechClient` with an audio output target. Keep in mind that this module operates independently of the `SpeechPipeline`. If you haven't already, you will need to [create an account](/create) or [sign in](/login) to get your API credentials.

`TextToSpeechManager` is initialized as follows:

```python
from spokestack.tts.manager import TextToSpeechManager
from spokestack.tts.clients.spokestack import TextToSpeechClient
from spokestack.io.pyaudio import PyAudioOutput

manager = TextToSpeechManager(
    TextToSpeechClient("spokestack_id", "spokestack_secret"), PyAudioOutput()
)

```

There are three different modes for TTS: `text`, `ssml`, `markdown`. We will go over each mode briefly here. However, if you would like a more detailed view check out the [TTS concept guide](docs/concepts/tts).

### Text

The `text` mode is for plain text without any additional markup. To synthesize plain text you do the following:

```python
manager.synthesize(utterance="welcome to spokestack", mode="text", voice="demo-male")
```

### SSML

[SSML](https://www.w3.org/TR/speech-synthesis11/) is based on XML and gives you enhanced control over pronunciation. Check out the [guide](docs/concepts/tts) for more details. You can synthesize speech from SSML like this:

```python
manager.synthesize(utterance="<speak>welcome to spokestack</speak>", mode="text", voice="demo-male")
```

### Speech Markdown

Speech Markdown is a wrapper around SSML syntax that gives some additional features as explained in the [guide](docs/concepts/tts). An example of Speech Markdown looks like this:

```python
manager.synthesize(utterance="See all our products at (www)[characters] dot my company dot com.", mode="text", voice="demo-male")
```

## Additional Synthesis Options
If automatic playback is **not** what you are looking for we offer another option. An instance of
`TextToSpeechClient` can synthesize separately from the `TextToSpeechManager` and produce a URL that points to the audio file. This allows you to download the entire audio clip. This is especially useful in a [Jupyter](https://jupyter.org/) notebook where you may not have direct audio output access. Using the `TextToSpeechClient` to retrieve the audio URL is as simple as this:

```python
from spokestack.tts.clients.spokestack import TextToSpeechClient

tts = TextToSpeechClient("spokestack_id" "spokestack_secret")

audio_location = tts.synthesize_url("welcome to spokestack")
```

