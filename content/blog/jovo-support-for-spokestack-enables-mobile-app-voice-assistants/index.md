---
title: Jovo Support for Spokestack Enables Mobile App Voice Assistants
date: '2020-07-15'
description: It's now easier than ever to build your own Independent Voice Assistant. This new integration helps developers build cutting edge conversational experiences in mobile apps.
tags: 3rd Party Integration, News, NLU, Dialogue Management
author: mike
draft: false
hero: jovo.png
---

![Spokestack and Jovo Collaboration](./jovo.png)

This new integration helps developers build cutting edge conversational experiences for mobile apps using their Jovo interaction models and Spokestack's mobile ASR, NLU, and TTS services.

Like so many in the voice community, we're big fans of the [Jovo Framework](https://www.jovo.tech)! We share their love of open-source software as well as their "write once, run everywhere" approach to conversational assistants. That's why we're so excited to announce Spokestack integration with Jovo.

## How does the Jovo and Spokestack integration work?

Starting today, Jovo developers can take the following steps to begin building mobile voice experiences based on their Jovo interaction model with Spokestack:

- Create a Spokestack account to gain access to a Spokestack API key: [https://spokestack.io/create](/create).
- Add your Spokestack API key and secret to your Jovo project's configuration file.
- Run the `jovo build` command to create a `platforms/spokestack` directory.
- Run the `jovo deploy` command to upload your model to Spokestack.
- Spokestack will then train the imported model for use with Spokestack's [embedded NLU solutions for iOS, Android, and React Native](/docs).
- From there, developers can either follow our [port a smart speaker app to mobile tutorials](/tutorials) or build whatever mobile voice experience they have in their heads!

## Why would I import my Jovo model to Spokestack?

If you've experienced the power of using Jovo to build a conversation that works across the Alexa, Google, and Bixby smart speaker platforms, you may have wondered about transferring that conversational experience to a mobile app. With Spokestack, you can.

We take the interaction model that powers your conversation on smart speakers and port it to an embedded model that will work on a smartphone. So now users can say, "Siri, open {_your app name_}" to begin a mobile app conversational experience just like the one they have on smart speakers.

## New to mobile development? Want to see how Spokestack works on mobile?

We realize that the barrier to building conversations on mobile is lacking the skills to build apps that work on iOS and Android. Sometimes it's thinking through how voice would work on mobile. We've tried to address both issues.

On iOS, we have [Spokestack Studio](https://apps.apple.com/us/app/spokestack-studio/id1508393980), which was built to show developers exactly how wakewords, speech recognition, text-to-speech, and intent classification work on mobile. It even includes a port of the [Alexa Minecraft Helper](/blog/porting-the-alexa-minecraft-skill-to-ios-using-spokestack) skill to iOS.

Spokestack Studio isn't available for Android yet, but Spokestack does work on Android. We have another tutorial for [porting an Alexa Skill to Android](/blog/porting-the-alexa-minecraft-skill-to-android-using-spokestack) that walks you step-by-step from Alexa skill to Android app. After going through our tutorial, you should be able to port your smart speaker skill to the mobile platform of your choice.

## The future with Jovo

Like Jovo, we believe in sharing open-source software and building great developer tools. By working together, we can extend the capabilities of both conversational and mobile developers on mobile. We'll continue working with Jovo to improve the Spokestack integration, including adding our ASR and TTS services options for Jovo developers. Besides the technical integration, we're also announcing our financial support of Jovo through their [Open Collective initiative](https://opencollective.com/jovo-framework). We plan on being a long-term partner and supporter of the Jovo community.

We're excited to see what you'll build using Jovo and Spokestack for mobile voice apps! Tell us about it at [hello@spokestack.io](mailto:hello@spokestack.io).
