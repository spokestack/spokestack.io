---
title: Map Out Integration
navId: Map Out Integration
description: Consider what users want to ask and how you will respond.
draft: false
---

After [identifying the right use cases](docs/Design/find-the-right-use-case) for multimodal voice, map how you'll integrate them into your app. A useful technique for this is to create a customer journey or experience map.

## Experience Mapping

An experience map is a list of inputs from left to right with simultaneous outputs below. Multimodal maps include intents and gestures followed by voice and visual outputs. A complete map will provide a better sense of scope before building anything.

Inspiration for this exercise comes from the [Sketch Phase](https://www.thesprintbook.com/how) of _The Design Sprint_ and [How to Make an Experience Map](https://blog.carbonfive.com/2017/08/03/experience-mapping-2/).

## Intents and Utterances

When mapping for multimodal devices, think of inputs as either gestures or `intents`. The term `intent` comes from the world of natural language understanding (NLU). One of the jobs of an NLU system is to listen to what a user says and match that to an `intent`. The phrase a user says to express an `intent` is often referred to as an `utterance`.

For example, an app that sells movie tickets will likely need to handle searches for movie titles. If a user says "I want to see 1917", the NLU process might resolve that to the `SearchMovie` intent. Part of what Spokestack does is handle the tricky mapping of `utterances` to `intents`.

Focus on actions or `intents` you want to handle throughout the design process. A good first step is to write down a rough list of applicable `intents`. Think of this as a fluid list that will help frame what you need to teach users to ask. Add `intents` to this list as you see fit.

### Example: Intent List

As a thought example, imagine you're working on a fitness tracking app. Here's a list of some intents you might include:

![](https://paper-attachments.dropbox.com/s_C4D40CF4264B091F315BA630BFCAF3A9024DF8E8F6C6ED7DCF4188B1D6A5EE61_1580942864791_MyRunBuddy+-+intents.png)

## Actors and Actions

The type of experience map we use lists "actors" in the app along the left axis. The bottom axis represents time as the actor moves through the app. Each actor and/or touch point needs a separate sticky note in a color unique to them. Leave space at the bottom for any questions that may come up, and space towards the top for voice output.

![](https://paper-attachments.dropbox.com/s_64309765F21EEABBFEB095F2281AAE0D852D3B39607DDCA807D5E9D53AAABE5C_1581629577075_MyRunBuddy+-+actors+new.png)

Our maps include the following actors:

- **User.** This will include gestures and `intents`. Distinguish gestures from `intents` using quotes. For example, you could write "pace" on a sticky note to capture a user who asks how fast they're running. Create separate maps for **return** and **new users**. Consider how you'll onboard voice to new users. iOS has separate permissions for microphone & speech recognition. Android users only have to grant the `record-audio` permission.

- **Voice.** This will include audio output. How will you respond to your user? When will you allow them to speak? Will they be able to interrupt you? Prompts and responses should be in quotes. Don't fill in this column if the feature/interaction in question isn't relevant. This will serve as the basis for [your script](/docs/Design/script-storyboard-responses) later on.

- **Screen.** This will include visual output. What visuals will you add to communicate that you're listening to the user? To communicate that you heard and correctly interpreted the user's intent? What visuals will you provide if providing touch-to-talk support? Remember to keep these high-level. We'll get to [best practices](/docs/Design/tips-for-designing-visual-output) for designing these in a later section.

- **Support.** This will include actions performed by actors not included in the top three rows (e.g. application server, customer support, and app logic).

Our fourth row is not an actor, but more of a section for notes . Including it as an actor may not be semantically correct, but is there to organize our thoughts in a tidy way.

- **Questions (optional).** This will include notes and unresolved questions.

## Building a Map

You need sticky notes (4-6 different colors), markers, and an empty wall. Tape is optional, but recommended for sticky notes that become less sticky. Invite a variety of teammates with differing areas of expertise to your space. Choose someone to lead and record the discussion using sticky notes.

### Pick a Starting Point

Most mobile apps need multiple experience maps to accomodate all possible user journeys. Establish a starting point for each. If mapping a new app, a logical starting point might be when a new user opens the app for the first time. For an existing app, you might start when a user returns to the app for a specific reason.

List user actions until you would expect something to happen on the device. Each action goes on a separate sticky note in the same color as the corresponding actor and/or touch point. Keep your actions platform-agnostic. For example, instead of "tap the home button", which refers to older iPhones, write "wake up device".

|                                                              A starting map for a new app                                                               |                                                             A starting map for an existing app                                                             |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![](https://paper-attachments.dropbox.com/s_64309765F21EEABBFEB095F2281AAE0D852D3B39607DDCA807D5E9D53AAABE5C_1581629849651_MyRunBuddy+-+new+column.png) | ![](https://paper-attachments.dropbox.com/s_2D0F9EFCECAA3D6E12857EAAD162866F99CA40129F0BD81B218A102B4CF8D9B0_1581626920121_MyRunBuddy+-+as-is+initial.png) |

### Continue Mapping

Map top to bottom, left to right until you capture your user experience without voice. Don't worry about UI specifics at this point. Capture high-level inputs and outputs that get the user to the next step. Move actions around until the order represents your app's flow. Look for any holes in the map that need further clarity. Document lapses in time where necessary.

Consider the following questions as you progress:

- What is your user's next task?
- What information do they need to get them to their next task?

Nothing is set in stone. That's the beauty of using sticky notes. Move actions around until the order feels right to you. Once you've exhausted your initial list of `intents`, you're done. Look for any holes in your map that need further clarity.

As a thought example, we've provided a map for a fitness tracker. This includes a user opening our fitness tracker for the first time, creating an account, starting a run, and finishing a run. This does not include how a user would ask for their run stats (see "questions"). To account for this, either go back and try to fit these into your initial map or make a note to include them in your script.

![](https://paper-attachments.dropbox.com/s_64309765F21EEABBFEB095F2281AAE0D852D3B39607DDCA807D5E9D53AAABE5C_1581630226823_MyRunBuddy+-+new+complete.png)

## A custom solution

Seem overwhelming? We provide on-site and remote experience mapping workshops tailored to your organization.

[Email us for more details →](mailto: hello@spokestack.io)
