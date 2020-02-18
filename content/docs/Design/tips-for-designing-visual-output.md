---
title: Tips for Designing Visual Output
navId: Tips for Designing Visual Output
description: Some helpful tips when writing your dialogue.
draft: false
---

What visuals do you need to supplement your dialog? You may recognize some overlaps with our tips on [writing dialog](/docs/Design/tips-for-writing-dialog).

## 1. Set expectations

[Think back](/docs/Design/tips-for-writing-dialog) to how you’d talk to a friend. Communicate to users when it’s their turn to talk as well as when the app is processing what they said.

### Show that you’re listening & thinking

This happens after a user asks a question, gives a command, or invokes a wakeword. How would a friend communicate that it’s your turn to talk? They might pause and maintain eye contact. These are visual and audible cues.

The same goes for multi-modal experiences. Without a visual cue, a user could misinterpret silence as an error or lag in processing. Make your cue easy enough to spot from a distance. For example, Alexa is a headless device intended for hands-free, eyes-free communication. And yet, it makes use of an easy-to-spot visual cue: the blue ring.

Use an animation to show active listening. Static cues don’t convey activity in the same way. Create an animation that lasts the same duration as your user’s utterance. An animation that ends before the user's finished talking is a sign that their intent wasn't heard. Make sure your cues are always in the same place so users know where to look ([Golden Rule #1:](https://www.cs.umd.edu/users/ben/goldenrules.html) “strive for consistency”).

### Be judicious with screen real estate

Decide whether visual turn-taking should occupy a full or [partial](https://uxdesign.cc/redesigning-siri-and-adding-multitasking-features-to-ios-70c2f1a1569b) screen. Using a full screen to communicate turn-taking isn't always realistic. Allow users to exit listening mode using gestures.

If screen real estate permits, consider including visual prompts. Remind users what they can say. Think back to “[educate; don’t overburden](/docs/Design/tips-for-writing-dialog)”.

- What intents did you introduce in your script?
- Should you randomize these or dispatch them at specific points throughout the conversation?

Take into account the context in which your user is using your app. If users are in a situation where they’re unable to view their screen, visuals might not be as useful.

Introducing visual cues for intents when a user is recording a run for the first time isn't useful.

![](https://paper-attachments.dropbox.com/s_BF5D22BAD9421AD3845A926151A97CA26F837572D6DA91B630753CEABD822986_1581541107663_MyRunBuddy+-+Start+a+run.png)

## 2. Confirm information

Consider the type of information you’re confirming. Follow the same rules you would for [designing notifications](https://www.nngroup.com/articles/push-notification/). Provide enough information so that users know what's going on. Don’t distract the user. Confirmations need to be small, legible, and in a color palette that doesn’t interfere. Avoid colors that convey immediacy.

For this example, the app could either choose to a) implicitly end the run and save it or b) tell the user they have a run in progress and ask if they want to stop & save.

![](https://paper-attachments.dropbox.com/s_BF5D22BAD9421AD3845A926151A97CA26F837572D6DA91B630753CEABD822986_1581631804482_MyRunBuddy+-+Saving.png)

The user then recorded a walk. Once saved, the user received visual confirmation.

![](https://paper-attachments.dropbox.com/s_BF5D22BAD9421AD3845A926151A97CA26F837572D6DA91B630753CEABD822986_1581543029296_MyRunBuddy+-+Record+walk.png)

If you need to use a follow-up, supplement with visuals ([Golden Rule #7:](https://www.cs.umd.edu/users/ben/goldenrules.html) “keep users in control”). If a user responds using gestures, providing audio output may not be appropriate.

In this example, the app asked a follow-up. The user responded by tapping a button and then continued by using gestures.

![](https://paper-attachments.dropbox.com/s_BF5D22BAD9421AD3845A926151A97CA26F837572D6DA91B630753CEABD822986_1581631877473_MyRunBuddy+-+Stop+a+run.png)

## 3. Be relevant

If requested information isn’t already available, consider opening a different screen. Respect your user’s time. Don’t overcomplicate output for a complex query. Format information for quick retrieval, emphasizing utility over complexity. Display information that is relevant to the user’s intent.

In this example, the user requested information that wasn’t already on the screen. As a result, the screen reformatted information to match the user’s request.

![](https://paper-attachments.dropbox.com/s_BF5D22BAD9421AD3845A926151A97CA26F837572D6DA91B630753CEABD822986_1581631941998_MyRunBuddy+-+Distance.png)

## 4. Prevent failure

If the app doesn't hear speech while actively listening, show that listening has ended. Stop the animation you established in step #1.

In the event that a user’s intent is misheard or misunderstood, give them an alternate mode to provide input. For example, Siri provides “tap to edit” below the user’s utterance on the screen.

### Touch to Talk

This is where context comes into play. A user who uses your app in public spaces with lots of background sound may be harder to hear. If this is how your users use your app, consider adding a touch to talk option. This will allow users to invoke listening by touch instead of using a wakeword. Place this button somewhere on the screen that is accessible one-handed.

## 5. Provide variety & consistency

Give users control over how they want to proceed using more than one type of input. Supplement your voice with visuals that allow your user to complete the same task. This would give the user the option to hear or see that information ([Golden Rule #7:](https://www.cs.umd.edu/users/ben/goldenrules.html) “keep users in control”).

Take into account users with accessibility needs. Make clear how they will receive output. Label visual inputs with corresponding actions: “see,” “hear,” “show me,” “tell me,” etc.

In this example, it’s clear what type of output the user will receive since they said ‘show me…’.

![](https://paper-attachments.dropbox.com/s_BF5D22BAD9421AD3845A926151A97CA26F837572D6DA91B630753CEABD822986_1581541264633_MyRunBuddy+-+Show+me.png)

Need help executing? We can provide the design support you need for your next project.

[Email us for more details →](mailto: hello@spokestack.io)
