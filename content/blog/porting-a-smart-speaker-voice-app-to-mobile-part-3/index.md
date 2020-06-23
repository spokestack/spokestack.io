---
title: Porting a Smart Speaker Voice App - Part 3
date: '2020-06-08T00:00:02.000Z'
description: Spokestack introduces a new way to build and access voice apps independent from major virtual assistant platforms. Take your smart speaker app mobile.
tags: Engineering, Product
author: daniel
draft: false
---

## Import an Alexa or Dialogflow Interaction Model

In [Part 1](/blog/porting-a-smart-speaker-voice-app-to-mobile-part-1) and [Part 2](/blog/porting-a-smart-speaker-voice-app-to-mobile-part-2) of this series we covered what smart speaker voice apps are and how you can port them to mobile using Spokestack. This post describes how you can easily bring your voice app's natural language understanding over to a smartphone.

Voice apps running on smart speakers use the platform’s natural language understanding (NLU) to infer intent from a user’s utterance. When moving an Alexa Skill or a Google Action to mobile, you’ll need a different way to perform NLU. Fortunately, Spokestack provides custom NLU models that run on device using [TensorFlow Lite’s interpreter](https://www.tensorflow.org/lite). Even better, you can export your existing Alexa or Dialogflow interaction model and let our system build a custom on device model for you.

NLU is a critical component of modern voice user interfaces (VUI). This process takes what the user says, or `utterance`, and classifies it as something the voice application can understand. For smart speaker voice apps, this classification results in an `intent` with optional `slots`. For example, the utterance “Turn off the hallway lights” might result in an intent called `TOGGLE_LIGHTS` with slots for `mode:off` and `location:hallway`. A similar utterance “Turn on the bedroom lights” could also give the intent `TOGGLE_LIGHTS`, but with slots `mode:on` and `location:bedroom`.

The exact name of an intent is not important except as a mnemonic for the programmer. The same goes for the slot names and values. What this is doing is scoping the huge domain of natural language down to a few actionable intents with predefined possible values. As a voice interface designer, it’s your job to define which intents the interface can respond to just like a GUI designer chooses which visual elements a user can interact with. The voice app can choose to ignore any utterance that doesn’t match with a known intent or prompt for further clarification. For more technical information on Spokestack’s NLU system, take a look at our [NLU concepts guide](/docs/Concepts/nlu) in the documentation.

If you’ve built a Google Action or Alexa Skill, you’ve already defined a natural language interaction model using Dialogflow or Alexa Skills Kit. Behind the scenes, these services generate an NLU model for you and make it available to your skill using their cloud services. Spokestack can also generate an NLU model for you, except you get to run it in your app!

I want to pause to point out that you don’t have to use the Spokestack on-device NLU for your embedded assistant. Spokestack’s speech pipeline provides you with text from the ASR service. You could choose to classify this text using a hosted NLU service’s API like Google’s Dialogflow or Amazon Lex. However, running on device provides some advantages. First, it eliminates a network round trip that could result in faster performance depending on connection speeds. Second, it allows NLU to work even offline or with a poor signal. Finally, on-device NLU enhances privacy for your users by not sharing transcripts of their voice interactions with third party services.

To get started with a free NLU model that’s compatible with Spokestack, [create a free account](/create) and upload your existing Alexa or Dialogflow interaction model. The following instructions for that process are paraphrased from our [export guide](/docs/Concepts/export):

1.  Log into the Amazon developer console, find your skill, click the "Build" tab at the top, and look for "JSON Editor" listed under your intents and slots on the left side (at the time of this writing).
1.  Copy the entire contents of the JSON editor and paste them into a new file on your computer. Save it as `<YOUR-MODEL-NAME-HERE>.json`.
1.  Log in to your Spokestack account, click on "Language Understanding" on the left, and upload your JSON file using the "Import" button.
1.  Watch the email address you used to sign up for the account; we'll email you when your files are ready, and you can download them from your account page.

## Next Steps: Tutorials

Spokestack has libraries for iOS, Android, and React Native.

- Tutorial: [Create an Alexa-Compatible Dialog Manager in Swift](/blog/create-an-alexa-compatible-dialog-manager-in-swift)
- Tutorial: [Porting the Alexa Minecraft Skill to iOS Using Spokestack](/blog/porting-the-alexa-minecraft-skill-to-ios-using-spokestack)
- Tutorial: Porting the Alexa Minecraft Skill to Android Using Spokestack (Coming Soon)
- Tutorial: Porting the Alexa Minecraft Skill to React Native Using Spokestack (Coming Soon)
