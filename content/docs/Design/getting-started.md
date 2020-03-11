---
title: Getting Started
navId: Getting Started (Design)
description: Getting started with designing your app to work with Spokestack
draft: false
---

In this section of our documentation we introduce you to design for voice-enabled and multi-modal apps.

We will cover the basics of experience mapping, dialogue writing, and multi-modal design. This is all intended to get the most benefits from the capabilities of the device on which your app runs. Smartphones are particularly well well suited for voice and visual interactions because they have a touchscreen, a microphone, _and_ a speaker.

## Modes of Interaction

How your user interacts with your mobile app and how your app responds.

### Touch Input / Display Output

The vast majority of apps currently available on smartphones use touch and gestures as the primary input method. The apps respond to user input by updating the display. Some apps also incorporate sound or music as part of the output, but this is different from voice output.

### Voice-only

Smart speakers without screens (e.g. Amazon Echo and Google Home) are examples of voice-only devices. The user makes a spoken request and the device responds without use of visuals. Voice can be an intuitive and convenient way to interact. Users can access information and send commands without touching anything. Speaking is also [three times faster than typing](https://www.popularmechanics.com/technology/a22684/phone-dictation-typing-speed/).

### Multi-modal

A mult-modal device has an interface that provides more than one mode of interaction. Smartphones are capable of taking text as an input and creating a visual response. Convrseley, they can accept a touch interaction as an input and respond using voice. Modern phone-based voice assistants like Apple Siri and Google Assistant make use of the multi-modal capabilities of smartphones.

## Advantages of Multi-modal

While voice is an natural and intuitive method of input, the primary weakness of voice-only interactions is the speed at which it can deliver information back to users. This is especially true for multi-step information and lists. Imagine for example having a smart speaker dictate a recipe to you while you were trying to cook.

There are many reasons voice output can be inferior to text. Active listening requires effort and it's hard to rewind content that we didn't catch the first time through. Reading allows users to understand at their own speed, usually at a faster rate. The average human reads [250-300 words per minute](https://en.wikipedia.org/wiki/Words_per_minute) while the average audiobook dictates [150-160 words per minute](https://en.wikipedia.org/wiki/Words_per_minute).

Here are some benefits of pairing visual and audio responses in an app using a smartphone:

1. **Faster Input** - Simple voice dictation is roughly three times faster than typing. Complex voice request can be much more efficient than navigating multiple visual menus. For example, "Book me a hotel room at the Marriott in downtown Austin on February third." could be much faster than going through the equivalent visual forms.

1. **Faster Output** - While voice input is faster than typing, voice output is slower than reading. So visual output can convey information back to the user more quickly than only voice. In the example above, a smartphone can display a list of room options instead of trying to read each one out loud.

1. **Sensitive Information** - A voice response can be inappropriate in some cases where potentially sensitive information is involved. For example, the response to "Show me my bank balance" is likely better delivered on the screen than out loud.

1. **Integration With Existing Assets** - Introducing voice to a mobile app does not necessarily require a significant change to the graphical user interface. Initial implementations of voice requests can be shortcuts to existing app activities.

1. **Authentication** - Smartphones already have authentication built in using passcodes, fingerprint ids, or facial recognition.
