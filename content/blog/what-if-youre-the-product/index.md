---
title: What If You're the Product?
date: '2020-07-29'
description: How to keep your voice presence from giving away presents
tags: Concepts, Privacy, Smart Speakers, Voice Assistants
author: josh
draft: false
hero: product-people.png
---

![Doesn't look like these folks are having fun being products](product-people.png)

"If you're not the customer, you're the product." By now, tech-savvy consumers are familiar with this warning. It's almost a trope. Usually it's a caveat about [Google's collection of personal data](https://www.wired.com/story/google-tracks-you-privacy/) or [Facebook's stewardship](https://www.wired.com/story/cambridge-analytica-facebook-privacy-awakening/) of their own data trove, but there are plenty of other applications as well. And it's true: Personal data can be dangerous in the wrong hands.

It's not true _only_ for consumers, though; it's also true for your business. For real-world examples, see [Allbirds](https://www.theverge.com/tldr/2019/9/19/20874818/amazon-allbirds-shoe-clone-copy-sneaker-206-collective-private-label). Or [these Alexa Fund participants](https://www.wsj.com/articles/amazon-tech-startup-echo-bezos-alexa-investment-fund-11595520249). Or [the creator of an eerily Echo-like device](https://www.businessinsider.com/amazon-echo-ubi-smart-speaker-2020-7). There's a reason trade secrets are called "secrets".

## An uncomfortable truth

If you're browsing this site, it's probably safe to say you're familiar with voice technology and its meteoric rise over the past several years. Smart speakers are in people's homes, voice assistants are on consumers' phones, and voice is being touted as the next great way for businesses to engage their customers. To do that, you just set up a "skill" or "action" on these platforms—you just configure some text input and output, and the smart speaker/voice assistant platforms will do all the heavy lifting of "understanding" your users' verbal requests and turning your text responses into audio to read to them. You give them the data, and they give you . . . [exposure](https://www.bbc.com/worklife/article/20180411-dealing-with-clients-who-expect-you-to-work-for-free).

`youtube: [The Basic Elements of Voice Interfaces](https://www.youtube.com/watch?v=1x4MdTKEy3E&t=2s)`

This might seem like a reasonable trade—after all, you can't build automatic speech recognition (ASR), natural language understanding (NLU), and text-to-speech (TTS) systems—that's a ton of work and maintenance for an uncertain payoff, and systems like that aren't anywhere near the scope of your business. So you sign up for a free developer account and make sure you have a presence on the platform. It's not like you gave Google or Amazon credentials to your database, so what are you _actually_ giving up in the process?

To answer that question, we have to talk a bit about how the voice systems work. By now it won't surprise you to learn that they're built on massive troves of data, some of it public, but much of it "proprietary". You don't have to know how to [flow a tensor](https://www.tensorflow.org/) to know that machine learning, much of it in the form of neural networks, powers some of today's most impressive software, voice tech systems among them.

I'm greatly simplifying here, but to train an ASR system, you feed a model a whole bunch of audio data (thousands of hours, if you have it) along with transcripts of that audio; thanks to the magic of math, the model learns to predict the latter from the former. Once you have a baseline system trained, you can improve it by feeding it raw audio (different from the original training data), letting it do the transcription, and correcting the transcriptions after the fact if necessary. This is [what Amazon and Google do](https://www.cnet.com/how-to/amazon-and-google-are-listening-to-your-voice-recordings-heres-what-we-know/).

Next in the process, NLU models learn to turn natural language (transcripts from an ASR, which can be single words or full sentences) into something a little more structured so that software can reliably act on it, and TTS systems learn to turn text responses into audio so that they can be read to the user.

So there you have it: The data you provide in order to set up a voice app on one of the big platforms, combined with the interactions users have with your app, is all the vendors need to continuously improve their systems. That's not so bad, though, right? After all, you _want_ their voice tech to be as good as it can be so that your users have good experiences with your app.

Keep the cautionary tales from Amazon in mind as we go further down the rabbit hole.

`youtube: [How Did We Get Here?](https://www.youtube.com/watch?v=B-TIVeN2Kho&t=3s)`

A current research area in the NLU field is the so-called "end-to-end" dialogue system. It's another neural model, but instead of translating audio into text or text into "meaning", this one takes text input (a user request) and directly returns a text response. A quick Google search will turn up a wealth of papers on [creating the models themselves](https://arxiv.org/abs/1604.04562) and [using automated systems and crowdsourcing](https://www.aclweb.org/anthology/N18-3006) to generate or augment training data for such systems.

But what's better than data generated by one model under a single set of conditions? That's right—data collected from and annotated by humans. Enter one of the newest voice assistant features.

As usual, the vendors all have a different name for this feature. Google calls it [App Actions](https://developers.google.com/assistant/app/overview 'Google App Actions'), Apple has [Siri Shortcuts](https://support.apple.com/en-us/HT209055 'Siri Shortcuts'), and Amazon just announced [Alexa for Apps](https://developer.amazon.com/en-US/blogs/alexa/alexa-skills-kit/2020/07/you-can-now-seamlessly-connect-alexa-skills-to-mobile-apps 'Alexa for Apps'). They're all fundamentally the same thing, though, with slightly different trimmings: They allow you to surface information from deep within your app in response to a request to a voice assistant controlled by someone else.

Since I've spent some words focusing on Amazon already, let's dig a little further into their implementation of this feature. Take a look at [the response format](https://developer.amazon.com/en-US/docs/alexa/alexa-for-apps/skill-connection-request-reference.html#payload-example) for an Alexa skill that wants to connect to an app. Notice the `prompts` section, which lets you provide some text for Alexa to read right before it drops the user into your app to see the response. Convenient, right? Well, sort of. If a user's started an interaction like this via voice, it might be nice to actually be able to finish it with voice inside the app (more on that later), but at least this is a smooth-ish transition between the two, and it helps the user get _some_ answer even if the screen is locked.

But stop for a moment to think about what data Amazon has about the user interaction at this point:

1. audio of the user making the request
1. Amazon's ASR result for that audio
1. the user's "intent" (or distillation of the ASR result into an action) that you, the developer, provided Amazon with as part of creating your skill
1. a text response to that intent, again provided by you, an actual human

In other words, they'd have a pretty good pipeline for collecting training data for an end-to-end dialogue system, like [this one](https://www.aclweb.org/anthology/N19-2007/) that some of their engineers experimented with last year. What could they _do_ with such a model? For starters, they could learn to answer initial user queries well enough to keep those users inside Alexa instead of delivering them to third-party apps at all. If they were so inclined, they could also aggregate data about popular queries and responses to prioritize development of new business lines for Amazon.

I don't have any evidence to make concrete accusations about such things, but it doesn't seem outside the realm of possibility. Keep in mind that encouraging developers to let Alexa access individual app features might also encourage those developers to provide data for features that aren't a good fit for the smart speaker medium or were "too valuable to put on Alexa". In other words, a feature that deep links into apps can potentially give them access to data that they can't just mine from their Alexa Skills Store.

And text prompts aren't the only data collection boon here. Alexa for Apps also "lets" you provide an app store ID so that Alexa can link a user directly to your app's install page if they don't already have it installed. This might boost your app's discoverability if your skill somehow happens to be more popular than your mobile app, but it also lets Amazon link natural language requests to app store offerings, which is an interesting bit of data to have if you're building, say, a recommendation engine.

## Yeah, but what can I do about it?

Given all this information, what's the app developer to do? It'd be easy enough for me to recommend total abstinence, the business equivalent of deleting your Facebook account after the Cambridge Analytica debacle. An isolationist approach might not be fair to you, though. People use these voice assistants, so not participating in them or their advanced features might make your app appear to lag behind similar apps that aren't as cautious.

Instead, I suggest instead that you think carefully about the data you're providing in your user responses—the text that gets read to the user in a smart speaker app or before the voice assistant drops the user into your mobile app. For any given interaction, can you respond in a way that's helpful to the user but also vague, redirecting them into an experience that _you_ control for more information?

"But what if the user wants or needs a voice-only experience?" you might ask. That's a fair question—smart speakers have a distinct accessibility advantage, and some requests are just easier to speak than to tap. Finally, I have some good news for you: It's getting easier to put voice interactions _inside_ your app and stop relying on the ASR and other components provided by giant companies.

`youtube: [Voice is just another interface](https://www.youtube.com/watch?v=wbJ8fZh-iQw)`

This is Spokestack's mission: We exist to enable businesses to take back their voice presence. Voice is our business, not advertising or retail. We provide native mobile libraries that bring a full suite of ASR and natural language tools directly to your app. This, in turn, helps you keep your customer interactions private and prevents your thoughtful responses to user queries from being turned into training data that can be used against you.

In fact, we go a couple steps further than what the major voice platforms currently let you do. Spokestack can help you:

1. Give your app its own wakeword (so a user can _start_ a voice-only interaction from within the app, as if they'd said "Hey Google/Siri" to their phone).
1. Create your own voice to use for responses, so users can differentiate your brand from a generic AI voice.

`youtube: [Spokestack Overview](https://www.youtube.com/watch?v=MW2cYSQhbZE)`

That's all well and good for the mobile use case, but what about the smart speakers themselves, where voice is the _only_ medium? You _have_ to give detailed data in those responses, right? Maybe, but this is where your brand's custom voice comes into play. You don't have to provide text responses that can be immediately appropriated by the smart speaker platform; you can use a separate TTS service to synthesize your response and just provide the smart speaker with audio. If they _still_ want to take your data, they could of course run this through their own ASR systems, but that injects more error and cost into the process for them. You can do something similar with the NLU systems provided by the smart speakers too, but that's a topic for another post.

Don't concede the entire medium of voice interaction to your competitors (current or potential) just because they've built a stack of audio and language processing tools to "offer" to you. Don't give them any more data than necessary. Let your brand be its own mouthpiece. [Ask us how](mailto:hello@spokestack.io).
