---
title: Map Out Integration
navId: Map Out Integration
description: Consider what users want to ask and how you will respond.
draft: false
---

After identifying the right use cases for voice and multi-modal interactions in your app, the next step is to plan the integration. A useful technique is to create an customer journey or experience map.

## Experience Mapping

An experience map is a list of inputs from left to right with simultaneous outputs below. Multi-modal maps include intents and gestures followed by voice and visual outputs. A complete map will provide a better sense of scope before building anything.

Inspiration for this exercise comes from the [Sketch Phase](https://www.thesprintbook.com/how) of _The Design Sprint_ and [How to Make an Experience Map](https://blog.carbonfive.com/2017/08/03/experience-mapping-2/).

## Intents and Utterances

When experience mapping for multimodal devices we often think of the inputs as either gestures or `intents`. The term intent has specific meaning in the world of natural language understanding (NLU). One of the jobs of an NLU system is to listen to what a user says and convert that to an `intent`. The phrase a user says to express an `intent` is often referred to as an `utterance`.

For example, if you are building an app that sells movie tickets, one action you likely want to handle is searching for a movie. If a user says "I want to see 1917", the NLU process might resolve that to the `SearchMovie` intent. Part of what Spokestack does is handle the tricky mapping of `utterances` to `intents`. For the design process, you can mostly just focus on the actions or intents you want to handle.

A good first step is to write down a rough list of applicable intents. Think of this as a fluid list that will help frame how you teach users what to ask. Keep adding intents to this list throughout as you see fit.

### Example: Intent List

As a thought example, imagine you're working on a run tracking app. Here's a list of some intents you might include:

![](https://paper-attachments.dropbox.com/s_C4D40CF4264B091F315BA630BFCAF3A9024DF8E8F6C6ED7DCF4188B1D6A5EE61_1580942864791_MyRunBuddy+-+intents.png)

## Actors and Actions

The type of experience map we are using lists "actors" in the app along the left axis. The bottom axis represents time as the actor moves through the app. Each actor and/or touch point needs a separate sticky or cell in a color unique to them. Leave space at the bottom for any questions that may come up, and space towards the top for your voice.

![](https://paper-attachments.dropbox.com/s_64309765F21EEABBFEB095F2281AAE0D852D3B39607DDCA807D5E9D53AAABE5C_1581629577075_MyRunBuddy+-+actors+new.png)

Our maps include the following actors:

- **User.** This will include gestures and intents. Distinguish gestures from intents using quotes. For example, you could write "pace" on a sticky note or cell to capture a user who's asking how fast they're running. Create separate maps for **return** and **new users**. Consider how you'll onboard voice to new users. iOS has separate permissions for microphone & speech recognition. Android users only have to grant the 'record audio' permission.

- **Voice.** This will include audio output. How will you respond to your user? When will you allow them to speak? Will they be able to interrupt? Prompts and responses should be in quotes. Don't fill in this column if the feature/interaction in question isn't relevant. This will serve as the basis for [your script](script-storyboard-responses) later on.

- **Screen.** This will include visual output. What visuals will you add to communicate that you're listening to the user? To communicate that you heard and interpreted the user's intent? What visuals will you provide if providing touch-to-talk support? Remember to keep these high-level. We'll get to [best practices](/docs/Design/tips-for-designing-visual-output) for designing these in a later section.

- **Support.** This will include actions performed by actors not included in the top three rows (e.g. application server, customer support, and app logic).

There is a fourth row that is not actually an actor but more of a notes section. Including it as an actor is perhaps not semantically correct, but still a nice way of organizing our thoughts.

- **Questions (optional).** Notes and unresolved questions.

## Building a Map

### Pick a Starting Point

Most mobile apps will require multiple experience maps to accomodate all the possibly user journies. If you are mapping a new app, a logical starting point might be when a new user opens the app for the first time. For an existing app, a starting point could be when a user returns to the app for a specific reason. Pick a starting point and start listing actions until something would happen on the device. Each action goes on a separate sticky note or cell in the same color as the corresponding actor and/or touch point. Keep your actions platform-agnostic. For example, instead of "tap the home button", which refers to older iPhones, write "wake up device".

|                                                              A starting map for a new app                                                               |                                                             A starting map for an existing app                                                             |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![](https://paper-attachments.dropbox.com/s_64309765F21EEABBFEB095F2281AAE0D852D3B39607DDCA807D5E9D53AAABE5C_1581629849651_MyRunBuddy+-+new+column.png) | ![](https://paper-attachments.dropbox.com/s_2D0F9EFCECAA3D6E12857EAAD162866F99CA40129F0BD81B218A102B4CF8D9B0_1581626920121_MyRunBuddy+-+as-is+initial.png) |

### Continue Mapping

Map top to bottom, left to right until you capture your user experience without voice. Don't worry about UI specifics at this point. Capture high-level inputs and outputs that get the user to the next step. Move actions around until the order represents your app's flow. Look for any holes in the map that need further clarity. Document lapses in time where necessary.

Consider these questions as you progress

- What is their next task?
- What information do they use to get there?

Nothing is set in stone. That's the beauty of using stickies. Move actions around until the order feels right to you. Once you've exhausted your initial list of intents, you're done. Look for any holes in the map that need further clarity.

As an example we mapped the user opening the app for the first time, creating an account, starting a run, and finishing a run. This does not include how a user would ask for their run stats (see "questions"). To account for this, you might either want to go back and try to fit these into your initial map or include these in your script later.

![](https://paper-attachments.dropbox.com/s_64309765F21EEABBFEB095F2281AAE0D852D3B39607DDCA807D5E9D53AAABE5C_1581630226823_MyRunBuddy+-+new+complete.png)

## A custom solution

Is this all a bit overwhelming? We provide on-site and remote experience mapping workshops tailored to your organization.

[Email us for more details →](mailto: hello@spokestack.io)
