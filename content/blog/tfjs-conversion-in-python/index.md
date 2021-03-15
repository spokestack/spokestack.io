---
title: Converting a TensorFlow model to TensorFlow.js in Python
date: '2021-03-15T16:00:02.000Z'
description: Google provides a command line utility for converting TensorFlow models into TensorFlow.js format for running in a browser, but what if you want to do that conversion in code?
tags: Engineering
author: josh
draft: false
---

At Spokestack, we use several different types of TensorFlow model, and we have various deployment targets for them: big models for the cloud, small TensorFlow Lite models for mobile devices, and even Tensorflow.js models for browsers.

In cases where a single model architecture is trained and deployed to more than one of these targets, it's nice to be able to do the training, any necessary conversion, and deployment all from one place. It's even better if this can be managed from a single Python module.

This is easy enough for formats like [SavedModel](https://www.tensorflow.org/guide/saved_model) and [TensorFlow Lite](https://www.tensorflow.org/lite/convert), but the JavaScript target is a little trickier. Google provides instructions for [converting a SavedModel](https://www.tensorflow.org/js/tutorials/conversion/import_saved_model), but the only documented path for doing such a conversion is by using a command line utility. That's a bit of a bummer for our Python module, since we'd really rather not shell out to a library that's written in Python itself. Surely there's a better way.

## To GitHub!

Thankfully, the code for [tfjs-converter](https://github.com/tensorflow/tfjs/tree/master/tfjs-converter) is on GitHub for us all to see, so let's dive in and see what we can find.

---

**Note**: Since we're talking about an undocumented workflow, and part of it uses protected functions, it almost goes without saying that this is all subject to change. At the time of writing, it worked using version 2.4.1 of `tensorflow` and 3.3.0 of `tensorflowjs`. Both are available via `pip install`, though installing `tensorflowjs` will get you a compatible version of `tensorflow` for free.

---

First things first: if you have a SavedModel on disk somewhere that you're looking to convert, you can skip the slight messiness of the rest of this post and just do the following ([source code](https://github.com/tensorflow/tfjs/blob/14cfeefb30f9e0af31cb5addfa182fc16909876a/tfjs-converter/python/tensorflowjs/converters/tf_saved_model_conversion_v2.py#L513)):

```python
from tensorflowjs.converters.converter import tf_saved_model_conversion_v2 as convert

# ...

# see the source code for other valid kwargs
convert.convert_tf_saved_model(saved_model_dir, output_dir)
```

See? Easy. But it's not quite what we wanted, as it requires us to export our model to the SavedModel format first, and of course that exported version has to be re-loaded to do the conversion. So let's break it down a bit.

The body of `convert_tf_saved_model` loads the model, freezes the weights, builds a protocol buffer version of the signature function we want to convert, and exports the frozen graph to JavaScript format. All those subtasks exist as protected functions, but since this is Python, no one's going to ask any questions about us just calling those — no one except Pylint, that is, and it can be bribed with a comment line if necessary.

Here's the replacement I came up with for the public function above. It's essentially a reproduction that doesn't require a directory as input. You of course don't need the Pylint comments if you don't use Pylint.

```python
from tensorflowjs.converters.converter import tf_saved_model_conversion_v2 as convert

# ...

def convert_func(concrete_func: tf.Graph, output_dir: str) -> None:
  if not os.path.exists(output_dir):
    os.makedirs(output_dir, exist_ok=True)

  # pylint: disable=protected-access
  frozen_graph = convert._freeze_saved_model_v2(
    concrete_func, control_flow_v2=True
  )

  inputs = [x for x in concrete_func.inputs if not x.dtype == "resource"]

  # pylint: disable=protected-access
  signature = convert._build_signature_def(
    frozen_graph, inputs, concrete_func.outputs
  )

  output_graph = os.path.join(output_dir, "model.json")
  convert.optimize_graph(frozen_graph, signature, output_graph, TF_VERSION)
```

I've retained the mypy type hints because I think they help the explanation. The `concrete_func` argument here is a full TensorFlow graph, but it has that name because the model in question uses [`tf.function`](https://www.tensorflow.org/api_docs/python/tf/function) to make retrieving its signatures easier. If you have access to these functions, you can call [`get_concrete_func`](https://www.tensorflow.org/guide/function#obtaining_concrete_functions) to get an input for our `convert_func` function.

Another way to get a valid `concrete_func` is to use a [SignatureDef](https://www.tensorflow.org/tfx/serving/signature_defs). Let's say you have a SavedModel from which you want to export several (but not all) signatures:

```python
import tensorflow as tf

model = tf.saved_model.load("path/to/saved_model")
for signature in ["sig1", "sig2"]:
  output_dir = f"path/to/output/{signature}"

  # conversion will fail if the parent directory doesn't exist
  if not os.path.exists(output_dir):
    os.makedirs(output_dir, exist_ok=True)

  concrete_func = model.signatures[signature]
  convert_func(concrete_func, output_dir)
```

Notice the creation of a new output directory for every signature. This is important, as internally TensorFlow.js will create a `model.json` and binary weights file(s) for each signature, and if you have a single output directory for all the signatures, it will overwrite each one in turn, leaving you with a single set of converted files at the end.

## Conclusion

And just like that, we've come out the other side of our spelunking trip into the `tensorflowjs` source code, only a little worse for wear. Models converted using the above method can be loaded in TensorFlow.js via [`tf.loadGraphModel`](https://js.tensorflow.org/api/latest/#loadGraphModel).

I hope this has been some small help in your journey to infer all the things in the browser.
