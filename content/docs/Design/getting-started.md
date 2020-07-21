---
title: Getting Started
navId: Getting Started (Design)
description: Getting started with designing your app to work with Spokestack
draft: false
---

# 1 - Getting Started
In this section, we’ll introduce you to design considerations for multimodal apps that are voice-enabled. Smartphones are well-suited for this type of interaction because they have a screen, a microphone, *and* a speaker. All best practices and exercises in this section maximize these capabilities by design. This guide will cover how to [find the right use case](https://spokestack.io/docs/Design/find-the-right-use-case), [map an experience](https://spokestack.io/docs/Design/map-out-integration), [write dialogue](https://spokestack.io/docs/Design/docs/Design/script-storyboard-responses), and [design a multi-modal UI](https://spokestack.io/docs/Design/docs/Design/tips-for-designing-visual-output).

## Modes of interaction

Before we start, it’s important to understand how users interact with your apps and how you’re able to respond. Any interface that uses voice as a mode of interaction is often referred to as a voice interface or voice user interface (VUI).

**GUI-only**
*Touch Input / Display Output*
Most apps today use gestures as the primary mode of input. The number of actions a user can take are constrained by the interface’s UI. Apps respond to touch input by updating the screen with new information. Some include sound or music with visual output, but this is not the same as voice output.

**Voice-only**
*Voice Input / Voice Output*
Smart speakers without a screen (e.g. Alexa & Google Home) are examples of voice-only devices. 
Users make spoken requests and the device responds with audio, no visuals.

**Multimodal**
*Text or Touch Input / Voice or Display Output*
A multimodal interface provides more than one mode of interaction. For example, smartphones can accept text by voice as input and respond with visuals. They can also accept touch as input and respond using voice. Modern mobile voice assistants (e.g. Apple, Siri, and Google Assistant) leverage these capabilities.

## Advantages of multimodal

Voice can be an intuitive and convenient way to interact. Users can access information and send commands hands-free. Speaking is also [three times faster than typing](https://www.popularmechanics.com/technology/a22684/phone-dictation-typing-speed/).

Yet, voice-only interactions often fail to provide appropriate output. This is especially true for multi-step information and lists. Imagine for example having a smart speaker dictate a recipe to you while cooking.

There are many reasons voice output can be inferior to text or visuals. Active listening requires effort. It’s hard to rewind content that wasn’t caught the first time through. Reading allows users to understand at their own speed, usually at a faster rate. The average human reads [250-300 words per minute](https://en.wikipedia.org/wiki/Words_per_minute) while the average audiobook dictates [150-160 words per minute](https://en.wikipedia.org/wiki/Words_per_minute).

Here are some benefits of pairing visual and audio responses in a mobile app:


1. **Faster input** - Simple voice dictation is quicker than typing. Complex voice requests can be more efficient than navigating multiple visual menus. For example, “Book me a hotel room at the Marriott in downtown Austin on February third” could be much faster than going through an equal number of visual forms.


1. **Faster output** - While voice input is faster than typing, voice output is slower than reading. Visual output can convey information back to the user in less time than voice output alone. In the above example, a smartphone can display a list of room options instead of trying to read each one out loud.


1. **Sensitive information** - A voice response can be inappropriate with sensitive information. For example, the response to “Show me my bank balance” is likely better delivered on the screen than out loud.


1. **Integration with existing assets** - No need to make significant changes to your app’s interface to integrate voice. An initial integration can include shortcuts to accomplishing existing tasks within your app.


1. **Authentication** - Smartphones have authentication already built in using passcodes, fingerprint ids, and facial recognition.


1. **Improved Accessibility** ***-*** Incorporating [more than one modality](https://vimeo.com/410056595) allows users to select and switch between modalities as their context shifts. This could include a change in environment or what they’re trying to accomplish.
