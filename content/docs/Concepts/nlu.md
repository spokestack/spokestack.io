---
title: NLU with Spokestack
navId: NLU (Concepts)
description: Understanding Spokestack's NLU system
draft: false
---

This guide explains the design of Spokestack's natural language understanding (NLU) API and how to use it with our on-device models or a third-party service.

## The basics

Today's NLU systems are typically built around the intent/slot model of semantic parsing. A piece of user speech (usually around a sentence long or less) is called an _utterance_, the effect or action the user wishes it to produce is called the _intent_, and _slots_ represent key terms or parameters that offer details about that effect. A helpful metaphor for software developers is that of a (potentially side-effecting) function — an intent is a function that takes zero or more slot values as arguments and produces a result, occasionally performing a background action on the way there.

## Model description

Every Spokestack NLU model consists of three files: a Wordpiece vocabulary (text), a TensorFlow Lite model (binary), and metadata (JSON).

### Wordpiece

Each input string is processed using Wordpiece tokenization, a variant of [Byte pair encoding](https://en.wikipedia.org/wiki/Byte_pair_encoding) originally described in [this paper](https://static.googleusercontent.com/media/research.google.com/ja//pubs/archive/37842.pdf), to divide user utterances into tokens. Once the input has been tokenized according to the pretrained vocabulary, the tokens are encoded into a sequence of integer IDs, each ID corresponding to that token's position in the vocabulary file.

### Tensorflow

Spokestack's NLU model runs on [TensorFlow Lite](https://www.tensorflow.org/lite) and is built on top of Google's [BERT](<https://en.wikipedia.org/wiki/BERT_(language_model)>) language model, using a pretrained version of it to leverage information learned from billions of words.

At inference time, the sequence of token IDs described in the previous section is padded with a special separator ID and trailing 0s to bring the sequence to a predetermined length. That padded sequence is the model's input (shaped `[1, sequence_length]`), and the output is two tensors representing posterior probabilities for intent classification and tag classification for each token (`[1, num_intents]` and `[1, num_tags, sequence_length]`, respectively).

### Metadata

The metadata for the model is a JSON definition of the possible intents and slots the TensorFlow model may find in an utterance. The metadata is used to translate the TensorFlow model posterior probabilities into an intent and (optionally) slots classification result.

## Usage

See the platform-specific NLU guides([Android](/docs/Android/nlu)|[iOS](/docs/iOS/nlu)) for a discussion on design considerations in each client library and code samples.

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

An entity slot represents a value with a specific meaning in the current domain. No transformation is performed on this type; its value is a `String` extracted directly from the input utterance.

#### Integer

An integer slot, as implied by the name, attempts to parse a numeric string into an integer value. Numeric values may be ordinal or cardinal ("third" or "three", respectively), and the integer slot interprets powers of 10 in the opposite way that the digits slot does: "eight hundred fifty-six" will be rendered as `856`.

#### Selset

A selset slot is a way of normalizing a list of aliases to a canonical value. For example, a camera application might want to allow a user to say "picture", "pic", "photo", or "selfie" but interpret all those terms as "photo" (as opposed to "video", which might have its own aliases). The model's metadata specifies acceptable aliases alongside each normalized value. One constraint on selset aliases due to Wordpiece tokenization is that they cannot contain trailing periods, eg "Lookout Mtn" is allowed but "Lookout Mtn." is not.
