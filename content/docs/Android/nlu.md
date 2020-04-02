---
title: NLU on Android
navId: NLU (Android)
description: Understanding the Android NLU API
draft: false
---

This guide explains the design of Spokestack's natural language understanding (NLU) API and how to use it with our on-device models or a third-party service.

## The basics

Today's NLU systems are typically built around the intent/slot model of semantic parsing. A piece of user speech (usually around a sentence long or less) is called an _utterance_, the effect or action the user wishes it to produce is called the _intent_, and _slots_ represent key terms or parameters that offer details about that effect. A helpful metaphor for software developers is that of a (potentially side-effecting) function — an intent is a function that takes zero or more slot values as arguments and produces a result, occasionally performing a background action on the way there.

## Model description

Spokestack's NLU models run on [TensorFlow Lite](https://www.tensorflow.org/lite) and are built on top of Google's [BERT](<https://en.wikipedia.org/wiki/BERT_(language_model)>) language model, using a pretrained version of it to leverage information learned from billions of words.

The mobile libraries use Wordpiece tokenization, a variant of [Byte pair encoding](https://en.wikipedia.org/wiki/Byte_pair_encoding) originally described in [this paper](https://static.googleusercontent.com/media/research.google.com/ja//pubs/archive/37842.pdf), to divide user utterances into tokens. The wordpiece vocabulary is pretrained and distributed along with the model; the tokens produced by the tokenizer are encoded into a sequence of integer IDs according to this vocabulary.

The sequence of integers representing the user utterance is then padded with a special separator token and trailing 0s to bring the sequence to a predetermined length. That padded sequence is the model's input (shaped `[1, sequence_length]`), and the output is two tensors representing posterior probabilities for intent classification and tag classification for each token (`[1, num_intents]` and `[1, num_tags, sequence_length]`, respectively).

## Usage

As mentioned in the [Getting Started](getting-started) guide, initializing the Spokestack NLU is done using a fluent interface, just like other Spokestack components:

```kotlin
val nlu = TensorflowNLU.Builder()
    .setProperty("nlu-model-path", "$cacheDir/nlu.tflite")
    .setProperty("nlu-metadata-path", "$cacheDir/metadata.json")
    .setProperty("wordpiece-vocab-path", "$cacheDir/vocab.txt")
    .addTraceListener(this)
    .build()
```

The configuration properties above refer to the model itself and metadata files distributed along with it. They're stored at the root of the app's cache directory here for convenience.

When it comes time to classify an utterance, Spokestack's NLU does all the heavy lifting on a background thread and returns an [`AsyncResult`](https://www.javadoc.io/doc/io.spokestack/spokestack-android/latest/io/spokestack/spokestack/util/AsyncResult.html) that wraps the eventual classification data. This custom version of [`Future`](https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/Future.html) exists to enable different approaches to retrieving the classification:

### 1) Blocking call

An `AsyncResult` can be used in a synchronous context by calling its `get()` method, which blocks until the result is available. This can be useful if you're already working on a background thread and don't wish to complicate things further to get the classifier's answer. We'll simulate that situation below via Kotlin's [coroutine context](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/with-context.html).

```kotlin
GlobalScope.launch(Dispatchers.Default) {
    // other background tasks

    nlu?.let {
        val nluResult = it.classify(utterance).get()

        // go back to the main context to update the UI
        withContext(Dispatchers.Main) {
            // nluResult.intent contains the user's intent
            // nluResult.slots contains slots detected in the utterance
        }
    }
}
```

### 2) Callback

Where `AsyncResult` differs from a vanilla `Future` is in its ability to notify a registered callback when the result is available. Note that the callback is invoked from the NLU's background thread, so any updates to the UI will need to be wrapped appropriately. The example below creates an anonymous class/object expression to represent the callback; it might be cleaner to have a separate class for this depending on your use case.

```kotlin
val asyncResult = nlu?.classify(utterance)
asyncResult?.registerCallback(object : Callback<NLUResult> {
    override fun call(nluResult: NLUResult?) {
        runOnUiThread {
            // update UI with nluResult
        }
    }

    override fun onError(err: Throwable?) {
        // handle error
    }
})
```

## Interpreting the results

The Spokestack library translates the model's numeric outputs into an intent name (a `String`), the model's confidence for that prediction (a `float`) confidence and a map of slot names (`String`s) to their values (`Slot`s). Note that slot values are custom objects instead of raw strings — a point that bears some explanation.

### Slot parsing

Spokestack slot definitions include types that are used to transform model results into objects that more closely represent the value's meaning to the application and are hence more useful to application logic. Note that `Slot`'s `value` field itself is an `Object`. This prevents a type/generics explosion in the library itself and makes the values easier to deal with. `value` can be safely cast to the types described in this section.

A slot's type can be found by inspecting the model's JSON metadata, which can also specify valid values for many of the types; see below for details. If slot parsing fails, the classifier will return an `NLUResult`with an error instead of a full slots map.

#### Digits

A digits slot represents a string of integers. Note that this is different from an integer slot, whic is described below. The digits type is meant to capture a string of digits spoken in order, as in a phone number or PIN.

When capturing numbers spoken aloud, there is some inherent ambiguity — for example, does "eight hundred fifty-six" mean "800 56" or "856"? The digits slot always renders powers of 10 ("hundred" and "thousand", in the case of the digits slot; larger numbers are not supported) with the trailing zeroes. This is due to the type's intention of capturing information like phone numbers, where users are likely to say things such as "one eight hundred five five five fifty-five fifty-five". Note that this does not apply to the first power of 10: "fifty-five" renders as "55".

Model metadata can specify the number of digits expected for a given slot with a `count` field; if this field is absent, any number of digits is accepted. If it is present, and the number of digits recognized does not match, an error is returned.

#### Entity

An entity slot represents a value with a specific meaning in the current domain. No transformation is performed on this type; its value is a `String` extracted directly from the ASR result.

#### Integer

An integer slot, as implied by the name, attempts to parse a spoken numeric value into an `int` value. Spoken values may be ordinal or cardinal ("third" or "three", respectively), and the integer slot interprets powers of 10 in the opposite way that the digits slot does: "eight hundred fifty-six" will be rendered as `856`.

Values up to Java's `Integer.MAX_VALUE` are supported, but model metadata specifies the acceptable range of values for the particular slot; values outside that range result in an error.

#### Selset

A selset slot is a way of normalizing a list of aliases to a canonical value. For example, a camera application might want to allow a user to say "picture", "pic", "photo", or "selfie" but interpret all those terms as "photo" (as opposed to "video", which might have its own aliases). The model's metadata specifies acceptable aliases alongside each normalized value.
