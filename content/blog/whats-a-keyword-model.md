---
title: What's a Keyword Model, and Why Would I Use One?
date: '2021-06-14'
description: We'll show you where keyword recognition models fit in with wake words, ASR, and NLU; and we'll help you decide if they're right for your app.
tags: ASR, Concepts, Keyword, NLU, Wake Word
author: josh
draft: false
hero: ../assets/docs/concepts-keywords.png
---

![What are Keyword Recognition Models?](../assets/docs/concepts-keywords.png)

So you've read the [description of a keyword recognition model](/features/keyword), but you still have questions. Not a problem! Keyword recognition (sometimes called "keyword spotting") isn't quite the household term that "ASR", "NLU", and "TTS" are. In this post, we'll lay out what this type of model does, where it fits into the Spokestack speech processing model, and why you might (or might not) want to use one.

## How Keyword Recognition Works

The Spokestack libraries support keyword recognition via three separate TensorFlow Lite models, much like our [wake word models](/features/wake-word). They're very lightweight and run _entirely on-device_. The first two models preprocess and encode audio for the third, which is trained to detect a number of specific words or phrases chosen ahead of time. In the research literature, each word or phrase would be called a "class", and the task of choosing one of these from a collection of many is known as [multiclass classification](https://en.wikipedia.org/wiki/Multiclass_classification). In our web interface, we call the classes "keywords" to avoid overusing technical jargon. The notion of a "class" is important, though, as we'll see later on.

All this processing happens in near-real time, with keyword recognition running every time Spokestack's speech pipeline deactivates, and we'll talk about what _that_ means in the next section.

## So Is It ASR, NLU, ... A Unicorn?

First, the short and sweet answer: in Spokestack's libraries, keyword recognition is a type of automatic speech recognition (ASR). It can be used with or without a wake word, but using it as your app's ASR means that your app shouldn't need NLU at all. Let's unpack that a bit.

Spokestack transforms speech audio into text via a series of processing steps collectively called the [speech pipeline](/features/speech-pipeline). The speech pipeline includes voice activity detection (VAD), wake word detection, and ASR. These stages are mix-and-match: you can use any or all of them (though it only makes sense to run them in the order I've listed them in here).

When ASR is actively processing audio to transcribe it into text, we say the pipeline is "active". You get to choose whether that activation happens as a result of:

- the VAD detecting speech (all speech audio will be run through ASR)
- a wake word being detected (in which case you should be running VAD to send only speech audio through the wake word detector)
- a button press in the app's UI

All the most common configurations are made available via [pipeline profiles](/docs/concepts/speech-pipeline#customizing-the-pipeline).

Using a keyword recognition model as ASR means that it will process audio received while the speech pipeline is active, making its decision when the pipeline deactivates. Deactivation happens when speech stops for a preset amount of time (usually a few hundred milliseconds)or when the pipeline has been active for a particularly long time. Both of these durations are [configurable](/docs/machine-learning/pipeline-configuration#runtime-tunable-parameters), but the profiles include sensible defaults that should work in most situations.

The speech pipeline informs your app about activation, deactivation, and speech recognition events asynchronously through an event listener, or [observer](https://en.wikipedia.org/wiki/Observer_pattern). See the documentation for your chosen platform on how to establish a listener.

## Did You Say I Don't Need NLU?

OK, so it's ASR, but how does a keyword model make NLU unnecessary? Recall our discussion about keyword classes above. A single class — or keyword, in the web interface — can have multiple members, just like a class in a schoolroom has multiple students. We call these class members "utterances", and combining utterances with keywords gives you super powers. OK, not quite, but it's close.

When you included multiple utterances in a keyword, the model will detect any utterance in the user's speech, but it will transcribe that utterance using the name of the _class_. This means that, for example, you can name a keyword "volume_up" and have utterances that detect "volume up", "turn it up", "louder", and so on. If a user says any of those utterances, your app will receive a transcript of `volume_up`.

This collapsing of a collection of utterances into a single command is a stripped-down version of what NLU does. You've configured the keyword model by hand, so you have a complete list of all the keywords you could possibly see in transcripts. If the model isn't confident enough that it heard one of the utterances it was trained with, it will fire a timeout event instead of a recognition event, which is the equivalent of a [fallback intent](/docs/concepts/nlu#explicit-fallback-intents) in NLU.

## Great! I'm Using This for All the Things!

Not so fast. Keyword models are a powerful tool, but other forms of ASR and NLU do exist for a reason. Let's talk about some of the reasons for and against using keyword recognition ASR.

### Pro &#9989;: Network Usage

Keyword recognition runs entirely on the device running your app. No network connection is necessary, saving both time and data, and making the primary functionality of your app's voice interface available anywhere your user happens to be. This is great for, say, a music app used by trail runners out in the woods.

### Pro &#9989;: Power Consumption

No network requests means less battery drain, and keyword models are more lightweight than on-device ASR models, requiring fewer cycles to do their work.

### Pro &#9989;: Privacy

On-device ASR means your users' speech never travels to the cloud.

### Pro &#9989;: Simplicity

If you have an app that is naturally controllable via a limited set of commands, keyword models make your life easier. You don't need to use Spokestack's NLU module at all, which saves you writing training data for said model, downloading its files, and accounting for it in your app model.

### Con &#10060;: Limited Vocabulary

The last point has a flipside. The fact that a keyword model's vocabulary is limited means that your app won't be good at handling unexpected requests — in fact, it's likely to give you a timeout event if the user says something you didn't anticipate, leaving you with no idea what the user said. This makes it more difficult to log user requests and use that information to improve your model.

In other words, if you want to support requests made in full sentences or long phrases and allow your users to come up with novel ways to word their requests, a keyword model isn't for you.

### Con &#10060;: No NLU

Again with the flipsides. NLU isn't _just_ for collapsing similarly worded requests into the same command to make them easy to process. The command part is the `intent` in an NLU result, but there are also `slots`. You need slots if your users' request can be parameterized — if you think about a spoken command like it's a method/function call in your app, the `intent` is the function's name, and the `slots` are its arguments.

You can't reasonably support a command like "Order me a large pizza with pepperoni and sausage" with a keyword model, because you'd need a different keyword for _each_ size and topping combination possible. Talk about a combinatorial explosion. That sort of command is exactly where NLU models excel.

### Con &#10060;: Data-Hungry

Keyword recognition models have to be trained. For a small project with just a few users, a [personal keyword model](/blog/what-are-personal-ai-models) should be fine; you can just ask your users to record data samples and use that as your training data.

For an app you want to distribute widely, you'll want to collect data for each of your utterances from a variety of voices to ensure it works well for as many of your users as possible. [We can help with data collection](/pricing#pro), but there is a cost involved, and it gets larger the more samples you need to collect.

## Summary

Here's what we've covered:

- Keyword recognition is a type of ASR, taking the place of platform-provided or cloud ASR in the speech pipeline.
- You decide the vocabulary for a keyword model ahead of time.
- When you use keyword recognition-based ASR, you don't need to train an NLU model.
- They're a great tool, but whether they're the _right_ tool is specific to your use case.

If you still have questions, let us know [in the forum](https://forum.spokestack.io/) or via any other link in the Community section below!
