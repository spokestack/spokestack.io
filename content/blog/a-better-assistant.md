---
title: How to Make a Better Voice Assistant
date: '2020-08-20'
description: Google is always trying to improve Google Assistant, but can your app do better?
tags: Business, Product
author: josh
draft: false
---

## Training the Assistant

The Google AI team recently released a [very interesting blog post](https://ai.googleblog.com/2020/07/grounding-natural-language-instructions.html) summarizing an [equally interesting paper](https://arxiv.org/abs/2005.03776). I recommend reading both if you're in the mood for some technical diagrams and math in the context of app accessibility, but I'm going to give a quick overview here anyway.

Put simply, Google is looking into how they can train their voice assistant, Google Assistant, to perform actions _inside_ mobile apps. In the future, you might be able to say "OK Google, connect me to the Starbucks WiFi with password `coffee`", and the Assistant would open the Settings app, find the network you named, and try to connect you using the password you gave.

It's not always immediately obvious to a user how to perform a multi-step task like this. As the paper points out, this leads to an abundance of online tutorials giving step-by-step recipes for getting things done, recipes which can then be "read" by a machine to help it learn how to do those tasks without the user tapping all over the place.

On its face, this is great. Having the Assistant do all the complicated work has the potential to reduce user frustration and unlock the true usefulness of apps, not to mention the way it opens useful features to people who are visually or motor-impaired, either permanently or temporarily.

At least, that's the rose-colored sales pitch.

## Training Your Replacement

There's another way or two to look at this. One is that this is the first step toward Google taking over the user experience from apps, teaching people to just use the Assistant (read: Google) to interact with their apps. This doesn't necessarily take anything _away_ from you as an app developer, but it does essentially give Google a copy of your user interactions, right down to the products individual users might search for. As we know, this is valuable data to an advertisement broker like Google.

Another dystopian possibility is that this is a way to make already-popular apps look even better, make the app marketplace less competitive, and hurt discoverability for new apps. The system they're describing here relies on training data they've scraped from online tutorials, things that tend to exist in unequal quantities depending on the app they're written for. You probably won't have much trouble finding instructions for connecting to a WiFi network in Android's Settings app (though the instructions might be for an older version of the app, which is its own problem), but try finding a how-to for a more obscure productivity app. You might find one on the app's own website if you're lucky, and maybe one or two on a fan site, but in general it's not a level playing field.

Google's system might eventually be able to overcome this lack of training data, but until it can, the Assistant is likely to not work as well for apps that have fewer tutorials available, which in turn makes those apps less appealing to people who want to use their voice to interact with their apps.

That may sound bleak, but this isn't a gloom-and-doom post. After all, deep voice interaction with mobile apps is wonderful! It's a huge accessibility boon, and I meant what I said earlier about unlocking an app's true potential by making complicated tasks simple for a user to perform. So how do we overcome the potential for abuse and lock-in?

## Be Your Own Assistant

As it turns out, it's not as hard as it used to be to handle voice commands in your app. Our whole mission at Spokestack is to continue making it easier. A [free account](/create) gives you access to everything from in-app wakeword detection to ASR, NLU, and TTS to read your responses. Here are some of the benefits of turning your app into a purpose-built voice assistant using Spokestack libraries:

- Use your own app name as a wakeword instead of users interacting with another voice assistant as a gatekeeper for _your_ app's features.
- Call your features and manage your scene transitions directly instead of relying on an external system being able to break the task down into simple steps.
- Keep your user interactions private.
- Gain insight into what your users _want to do_ with your app rather than the way they interact with the features they can see at any given time.
- Let users know you're on top of the latest technology and leveraging it to make your app useful in as many situations as possible.
- Establish a unique voice for your brand, or bring an established voice into your mobile experience.

`youtube: [The Basic Elements of Voice Interfaces](https://www.youtube.com/watch?v=1x4MdTKEy3E)`

Sound good? We think so—if you have any questions, don't hesitate to reach out! Check out the links below for all the places you can find us. Join us in our goal of using voice tech to make all mobile apps more delightful.
