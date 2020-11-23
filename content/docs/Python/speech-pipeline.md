---
title: SpeechPipeline in Python
navId: Speech Pipeline (Python)
description: Documentation for the SpeechPipeline class in Python
draft: false
---

## What _is_ it?

The `SpeechPipeline` is a collection of modular components that work together to process user speech. The pipeline receives frame-level audio from an _input_ class, and then processes the audio by sending it through a series of _stages_. Information sharing is accomplished by `SpeechContext`, which can be altered by each stage of the pipeline. For example, a voice activity detector may set `is_speech` to `True` if speech is detected. In addition, at each stage an event can be triggered that allows code outside the pipeline to be executed.

## How does it work?

Once the pipeline is initialized and started with `pipeline.start()`, it will remain in a passive listening state until an activation event occurs. In most cases, this activation event will be triggered by the wakeword.

When the pipeline is passively listening, a single frame of audio flows through each component of the pipeline. The default frame size is 20ms, but can be configured. This audio does not leave the device. The pipeline is waiting until a trigger sets the `SpeechContext` to `active`. Most likely, the trigger will be either `WakewordTrigger` or `VoiceActivityTrigger`, but every trigger class will contain `Trigger` in the name.

## How do I set it up?

The best way to start working with Spokestack is through pipeline profiles. Profiles are preset configurations for the `SpeechPipeline` that bundle input and stage classes into an easy-to-use wrapper. All profiles are designed to be initialized with only one line.

```python
from spokestack.profile.wakeword_asr import WakewordSpokestackASR

pipeline = WakewordSpokestackASR.create(
    "spokestack_id", "spokestack_secret", model_dir="path_to_tflite_model_dir"
)
pipeline.start()
```

If you wish to build your own components, or have enhanced control over our components, you can initialize the pipeline with individual components. Keep in mind that you will always need an audio input source and at least one component.

```python
from spokestack.pipeline import SpeechPipeline
from spokestack.io.pyaudio import PyAudioInput
from spokestack.vad.webrtc import VoiceActivityDetector
from spokestack.wakeword.tflite import WakewordTrigger
from spokestack.asr.spokestack.speech_recognizer import SpeechRecognizer

pipeline = SpeechPipeline(
    PyAudioInput(),
    [
        VoiceActivityDetector(),
        WakewordTrigger("path_to_tflite_model"),
        SpeechRecognizer("spokestack_id", "spokestack_secret"),
    ],
)

pipeline.start()
```

### Speech Event Handlers

The `SpeechPipeline` offers the ability to execute code based on events that occur within the pipeline. These handlers are registered with the `@pipeline.event` [decorator](https://www.python.org/dev/peps/pep-0318/). Handlers can follow the naming convention of `on_{event}` or pass the `name` argument to the decorator. A basic handler that prints the ASR transcript to console, for both conventions, is given below.

```python
@pipeline.event
def on_recognize(context):
    print(context.transcript)


@pipeline.event(name="get_transcript")
def get_transcript(context):
    print(context.transcript)
```

There are several speech events available:

- `recognize`: occurs when the ASR completes recognition.
- `partial_recognize`: occurs during ASR recognition when partial transcripts are received.
- `activate`: occurs when `SpeechContext` is activated.
- `deactivate`: occurs when `SpeechContext` is deactivated.
- `step`: occurs when a single frame is processed by the pipeline.

## Other methods

There are a few other methods available to the `SpeechPipeline` which control the flow of information through the pipeline. All of these methods are accessible through callbacks. However, `pause` and `resume` are designed to be used as a temporary stop of the audio flow while other computation is being performed, and can be called multiple times throughout the life of the pipeline.

### Stop

The `stop` method is a permanent stop of the pipeline and should be called when closing the application using the pipeline.

```python
pipeline.stop()
```

### Start

The `start` methods initializes the pipeline and must always be called first before audio can be read into the pipeline.

```python
pipeline.start()
```

### Pause

The `pause` method is a temporary stop of the pipeline flow.

```python
pipeline.pause()
```

### Resume

If the pipeline is paused, `resume` must be called to restart the audio flow.

```python
pipeline.resume()
```
