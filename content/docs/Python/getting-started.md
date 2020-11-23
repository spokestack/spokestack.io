---
title: Getting Started
navId: Getting Started (Python)
description: Getting started with the Spokestack Python API
draft: false
---

This guide will get you up and running with Spokestack for Python, and you'll have a voice interface in your application in no time.

## Installation

### System Dependencies

There are some system dependencies that need to be downloaded in order to install `spokestack` via pip.

#### macOS

```shell
brew install lame portaudio
```

#### Debian/Ubuntu

```shell
sudo apt-get install portaudio19-dev libmp3lame-dev
```

#### Windows

We currently do not support Windows 10 natively, and recommend you install [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/install-win10) with the Debian dependencies. However, if you would like to work on native Windows support, we gladly accept pull requests.

Another potential avenue for using Spokestack on Windows 10 is via [anaconda](https://www.anaconda.com/). PortAudio can be installed via `conda`, but Lame cannot. Hence, microphone input will be supported, but text-to-speech will not.

```shell
conda install portaudio
```

### Installation with pip

Once system dependencies have been satisfied, you can install the library with the following.

```shell
pip install spokestack
```

### Setup

We use `pyenv` for virtual environments.

```shell
pyenv install 3.8.6
pyenv virtualenv 3.8.6 spokestack
pyenv local spokestack
pip install -r requirements.txt
```

### Install Tensorflow

This library requires a way to run [TFLite](https://www.tensorflow.org/lite) models. There are two ways to add this ability. The first is installing the full [Tensorflow](https://www.tensorflow.org/) library:

```shell
pip install tensorflow
```

In use cases where you require a small footprint, such as on a [Raspberry Pi](https://www.raspberrypi.org/) or similar [Internet of Things (IOT)](https://en.wikipedia.org/wiki/Internet_of_things) devices, you will want to install the TFLite Interpreter. You can install it for your platform by [following the instructions](https://www.tensorflow.org/lite/guide/python#install_just_the_tensorflow_lite_interpreter).

## Integration

In order for your application to use Spokestack's features, there are a few things you will need:

- A free Spokestack Account
- Audio Input Device
- A `SpeechPipeline` Instance
- Audio Output Device

### 1. Spokestack Account

Go to [spokestack.io](/create) to set up your own account (it's free!). Once you've got that, go [grab one of our free NLU models](/account/services/nlu). We'll use the `Highlow` one in this example, but you can choose another, or [create your own](/docs/concepts/nlu-training-data)

Once you've downloaded your NLU, unzip `nlu.tar.gz` with the three files inside (`metadata.json`, `nlu.tflite`, `vocab.txt`). The location of the directory isn't important, because we will pass the path on initialization.

### 2. Audio Input Device

The `PyAudioInput` class will use the system default audio input device. Most personal computers have some form of microphone, but in the case of an embedded device, you may need to purchase a small USB microphone.

### 3. `SpeechPipeline` Instance

The `SpeechPipeline` [guide](speech-pipeline) has a detailed explanation of how to set up the pipeline, so we will show the quickest way here using a profile.

```python
from spokestack.profile.wakeword_asr import WakewordSpokestackASR

pipeline = WakewordSpokestackASR.create(
    "spokestack_id", "spokestack_secret", model_dir="path_to_tflite_model_dir"
)
pipeline.start()
```

## From text to meaning

Translating the text into an action is the job of the [Natural Language Understanding (NLU)](/docs/concepts/nlu) component. A great thing about Spokestack NLU models is that they run entirely on device. The NLU can be initialized like this:

```python
from spokestack.nlu.tflite import TFLiteNLU


nlu = TFLiteNLU("path_to_tflite_model_dir")
```

Input to the NLU model is the ASR transcript. The transcript can be accessed as a property of `SpeechContext`. Below is a sample Event Handler for running inference on the speech transcript.

```python
@pipeline.event
def on_recognize(context)
    results = nlu(context.transcript)
```

Some useful links for configuring Spokestack's NLU:

- [high-level NLU guide](/docs/concepts/nlu)
- [Python NLU module documentation](nlu)
- [converting an Alexa or Dialogflow NLU model](/docs/concepts/export)

## Talking back to your users

If you want the full smart speaker experience, you will need to give your application a voice. This can be achieved with text-to-speech (TTS). For more information on TTS, see the [TTS concept guide](/docs/concepts/tts). TTS playback uses `PyAudioOutput` class, which plays audio with the default speaker for the device. Like NLU, TTS can be used in an Event Handler. Take a look at the example below, which simply speaks what the ASR heard.

```python
@pipeline.event
def on_recognize(context):
    tts.synthesize("welcome to spokestack")
```

## Conclusion

That's all there is to setting up an application with Spokestack. Your Python application can now accept and respond to voice commands.

Thank you for taking the time to read this!
