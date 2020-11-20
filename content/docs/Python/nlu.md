---
title: NLU in Python
navId: NLU (Python)
description: Understanding the Python NLU API
draft: false
---

This is a companion to the [NLU concept guide](/docs/Concepts/nlu), which is a detailed outline of the NLU module. Here we'll talk about usage issues specific to the Python client library.

### Configuration

As a brief recap to the [guide](/docs/Concepts/nlu), every NLU model will have the three files.

- `vocab.txt`
- `nlu.tflite`
- `metadata.json`

The path to the directory containing these files is passed as the `model_dir` argument on initialization of the NLU.

## Usage

As mentioned in the [Getting Started](getting-started) guide, initializing the Spokestack NLU is done using a fluent interface, just like other Spokestack components.

```python
from spokestack.nlu.tflite import TFLiteNLU


nlu = TFLiteNLU("model_dir")
```

### NLU Results

NLU results are returned in a wrapper that allows for easy access of the properties. The `Result` class contains:

- `utterance` unmodified transcript received by the NLU
- `intent` classified user intent
- `confidence` model confidence in intent classification
- `slots` slots tagged by the model

### Callback

The callback for the NLU is going to take place on the "recognize" event. Take a look at the pipeline [guide](speech-pipeline) for a detailed explanation of callbacks. Below, is a sample of an NLU callback with the best practice of temporarily stopping the audio flow while the utterance is processed.

```python
@pipeline.event
def on_recognize(context):
    # pause audio
    pipeline.pause()
    # process the utterance
    results = nlu(context.transcript)
    # resume audio
    pipeline.resume()
```
