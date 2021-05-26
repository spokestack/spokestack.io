---
title: NLU with Spokestack
navId: NLU (Concepts)
description: Understanding Spokestack's NLU system
draft: false
tags: NLU
seoImage: '../../assets/docs/concepts-nlu.png'
---

This guide explains the design of Spokestack's natural language understanding (NLU) API and how to use it with our on-device models or a third-party service.

## The Basics

Today's NLU systems are typically built around the intent/slot model of semantic parsing. A piece of user speech (usually around a sentence long or less) is called an _utterance_, the effect or action the user wishes it to produce is called the _intent_, and _slots_ represent key terms or parameters that offer details about that effect. A helpful metaphor for software developers is that of a (potentially side-effecting) function — an intent is a function that takes zero or more slot values as arguments and produces a result, occasionally performing a background action on the way there.

## Model Description

Every Spokestack NLU model consists of three files: a Wordpiece vocabulary (text), a TensorFlow Lite model (binary), and metadata (JSON).

### Wordpiece

Each input string is processed using Wordpiece tokenization, a variant of [Byte pair encoding](https://en.wikipedia.org/wiki/Byte_pair_encoding) originally described in [this paper](https://static.googleusercontent.com/media/research.google.com/ja//pubs/archive/37842.pdf), to divide user utterances into tokens. Once the input has been tokenized according to the pretrained vocabulary, the tokens are encoded into a sequence of integer IDs, each ID corresponding to that token's position in the vocabulary file.

### Tensorflow

Spokestack's NLU model runs on [TensorFlow Lite](https://www.tensorflow.org/lite) and is built on top of Google's [BERT](<https://en.wikipedia.org/wiki/BERT_(language_model)>) language model, using a pretrained version of it to leverage information learned from billions of words.

At inference time, the sequence of token IDs described in the previous section is padded with a special separator ID and trailing 0s to bring the sequence to a predetermined length. That padded sequence is the model's input (shaped `[1, sequence_length]`), and the output is two tensors representing posterior probabilities for intent classification and tag classification for each token (`[1, num_intents]` and `[1, num_tags, sequence_length]`, respectively).

### Metadata

The metadata for the model is a JSON definition of the possible intents and slots the TensorFlow model may find in an utterance. The metadata is used to translate the TensorFlow model posterior probabilities into an intent and (optionally) slots classification result.

## Usage

See the platform-specific NLU guides([Android](/docs/android/nlu) | [iOS](/docs/ios/nlu) | [React Native](/docs/react-native/nlu) | [Python](/docs/python/nlu)) for a discussion on design considerations in each client library and code samples.

## Model Confidence

Since intent classification is probabilistic, the model will always arrive at _some_ answer. This answer might, however, be wildly inappropriate if the user utterance is very different from anything the model has seen during training. For this reason, the model's confidence in its answer is exposed to callers.

## Interpreting the Results

The Spokestack library translates the model's numeric outputs into an intent name (a `String`), the model's confidence for that prediction (a `float`) confidence and a map of slot names (`String`s) to their values (`Slot`s). Note that slot values are custom objects instead of raw strings — a point that bears some explanation.

### Slot Parsing

Spokestack slot definitions include types that are used to transform model results into objects that more closely represent the value's meaning to the application and are hence more useful to application logic. Note that `Slot`'s `value` field itself is an `Object`. This prevents a type/generics explosion in the library itself and makes the values easier to deal with. `value` can be safely cast to the types described in this section.

A slot's type can be found by inspecting the model's JSON metadata. If slot parsing fails, the classifier will return an `NLUResult`with an error instead of a full slot map.

Slot types other than `entity` (which produces a simple string value) are only available when the training data is created using [Spokestack's TOML format](/docs/machine-learning/nlu-training-data). Descriptions of [custom slot types](/docs/machine-learning/nlu-training-data#slot-types) can be found in that document.

## Troubleshooting Performance

Configuring an NLU model is almost as much art as science. Here are some general guidelines for a successful model, though don't think of them as written in stone:

- Try to keep utterances for different intents from being too similar to each other — for example, utterance templates that only differ by a word or two ("turn on the {device}"/"turn off the device")might be better as a single intent with an extra slot (for our last examples, maybe "{action} the {device}"). This will reduce confusion in the `intent` part of your result and promote higher confidence values.
- In the same vein, think of intents as categories rather than individual requests. If you're using the "intent = function" analogy in your head, put all your overloaded function signatures as examples in the same intent. For example, if your app has a search function, put all searches in the same intent. If that intent can have 3 different slots, include utterance samples where the user supplies 0, 1, 2, and all 3 of them. If they omit information that's required to actually perform the search, the slot value will be `null` in the result your app receives, and you can ask the user for it in a followup. Even better, you might have already collected this value in a previous interaction, and your app can just fill it in from stored context, making your search feature that much more convenient.
- Try to keep slot examples as closely related as possible. You don't want to mix too many different parts of speech or, say, a list of animal names with a list of place names in a single slot, or you're probably going to have a bad time.

No matter how good your training data is, though, your model is still likely to receive some requests it just can't handle. A user might switch from talking to the app to talking to another person mid-utterance, or they might come up with a way of phrasing a request that's so far away from anything you imagined in your samples that classification fails. There are a couple standard strategies for dealing with errors like this gracefully:

#### Confidence Thresholds

As mentioned earlier, part of the NLU result returned to the app is a confidence value. This number (between 0 and 1) represents the model's determination of the similarity between the user's utterance and the sample utterances for a given intent.

The confidence value can be used to mimic the behavior of Amazon or Dialogflow's "fallback intents" by determining a threshold below which your model's answers tend to be inaccurate (0.5 or 0.7 might be a good place to start). Your app can ignore any intent result below that value, treating it instead as a fallback intent and delivering an error prompt to the user.

#### Explicit Fallback Intents

If confidence thresholding isn't working for you — say, your model consistently gives you a high confidence value for nonsensical inputs — the first thing to do is recheck your training data and see if you can spot any similarity between the bad inputs and any of your sample utterances. If a problem remains, you can try adding an explicit fallback or error intent to your training data. Random strings that don't relate at all to your app's domain are good candidates for sample utterances in a fallback intent.

You may also wish to capture utterances that are similar to your app's domain, but not part of its feature set, in an "unsupported" intent so you can both deliver an intelligent error and collect information about what features your users are interested in. Conversational "sad paths" can still provide valuable information to you as a developer!
