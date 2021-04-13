---
title: Using a Custom TTS Voice in an Alexa Skill
date: '2021-04-02'
description: Why should your Alexa skill sound like all the others? Use Spokestack's custom TTS to make your skill stand out!
author: josh
tags: News, 3rd Party Integration
draft: true
hero: ../../assets/alexa-custom-tts.png
---

At Spokestack, our mission is to give every mobile app a voice. To that end, we've focused on building mobile libraries with cohesive APIs that include all the voice tech you'll need to recreate the smart speaker experience (and then some!) on a smartphone.

We don't want to limit this tech to _only_ mobile phones, though. We also have [a Python library](https://github.com/spokestack/spokestack-python/) to help you deploy a voice experience on, say, an SBC like a Raspberry Pi.

And let's not forget the smart speakers themselves. They're what really catalyzed this wave of voice tech popularity, and they're still relevant.

Now that we've launched the Maker subscription, we have even more to offer in the smart speaker ecosystem. There's no reason users should be locked in to hearing the same voice in every skill. The sound of a skill's voice should be recognizable, and Maker TTS makes that possible, even for an independent skill developer without the budget for voice talent.

To make experimenting with custom TTS on Alexa dead simple, we've created [a sample Alexa skill](https://github.com/spokestack/alexa-custom-tts) that has all the code you'll need to use Spokestack's TTS in a (very) simple skill. It's completely free to use even without a Maker account, though you'll be limited to Spokestack's free voice until you upgrade. You just have to change a few lines at the top of one file to include your Spokestack API ID and secret key, and you're good to go.

Full installation instructions are in the readme, but as a brief summary, this code uses Amazon's [Alexa-hosted skill](https://developer.amazon.com/en-US/docs/alexa/hosted-skills/build-a-skill-end-to-end-using-an-alexa-hosted-skill.html) feature to copy the code from GitHub into a free sandbox inside Amazon Web Services that runs it on-demand.

The skill itself doesn't do much — it offers a quick bit of encouragement and exits immediately — but all the code is right there and follows a straightforward, familiar pattern from Amazon's numerous samples, so it's straightforward to experiment and build a "real" skill little by little.

A couple ideas for simple extensions:

1. Instead of saying the same thing every time, have the skill pick its response from a random list of motivations.
1. Configure the skill to not exit after launch, instead allowing the user to ask for another motivation.

If those ideas aren't appealing because you already have your own skill, you can also take the code for calling Spokestack's TTS service and drop it right in.

We can't wait to hear what you'll build!
