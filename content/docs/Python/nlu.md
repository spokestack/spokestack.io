---
title: NLU in Python
navId: NLU (Python)
description: Understanding the Python NLU API
draft: false
tags: NLU, Python
seoImage: '../../assets/docs/python-nlu.png'
---

This is a companion to the [NLU concept guide](/docs/concepts/nlu), which is a detailed outline of the NLU module. Here we'll talk about usage issues specific to the Python client library.

### Configuration

As mentioned in the concept guide, every NLU model will have three files:

- `vocab.txt`
- `nlu.tflite`
- `metadata.json`

The path to the directory containing these files is passed as the `model_dir` argument on initialization of the NLU.

## Usage

As mentioned in the [Getting Started](getting-started) guide, initializing the Spokestack NLU is just like other Spokestack components.

```python
from spokestack.nlu.tflite import TFLiteNLU


nlu = TFLiteNLU("model_dir")
```

### NLU Results

NLU results are returned in a wrapper that allows for easy access of the properties. The `Result` class contains:

- `utterance`: unmodified transcript received by the NLU
- `intent`: classified user intent
- `confidence`: model confidence in intent classification
- `slots`: slots tagged by the model
