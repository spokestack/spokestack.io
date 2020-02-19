---
title: For Existing Apps
navId: For Existing Apps
description: Construct a map for existing apps.
draft: false
---

## **1. List your actor(s) and touch points on the left from top to bottom.**

Consider your app as it currently stands. This list will serve as labels for the rows of actions in your map. Each actor needs a separate sticky or cell in a color unique to them.

We include the following:

> **User.** This will include gestures for now. Specify whether you’ll be targeting a **return user** or **new user**. If targeting both, create separate maps for each user type.
>
> **Voice.** This will include audio output. We’ll fill in this row later.
>
> **Screen.** This will include visual output.
>
> **Support.** This will include anything not included in the top three rows (back-end, front-end, marketing, etc.). Keep these broad.
>
> **Questions (optional).** You won’t have anything here yet, but questions may arise later when you include voice control in your map.

![As an example, we’ve gone ahead and started a map for our imagined fitness tracker, MyRunBuddy.](https://paper-attachments.dropbox.com/s_2D0F9EFCECAA3D6E12857EAAD162866F99CA40129F0BD81B218A102B4CF8D9B0_1581626807410_MyRunBuddy+-+actors.png)

## **2. Determine where to start.**

Imagine the context in which a user might come to your app. List actions until something would happen on the device. Each action goes on a separate sticky note or cell in the same color as the corresponding actor and/or touch point. Keep your actions platform-agnostic. For example, instead of ‘tap the home button’, which refers to older iPhones, write ‘wake up device’.

![For MyRunBuddy, our map assumes the app is open in the background. We start with the user re-opening the app to empathize with a runner’s experience of finding their pace mid-run.](https://paper-attachments.dropbox.com/s_2D0F9EFCECAA3D6E12857EAAD162866F99CA40129F0BD81B218A102B4CF8D9B0_1581626920121_MyRunBuddy+-+as-is+initial.png)

## **3. Continue mapping.**

- What is their next task?
- What information do they use to get there?

Map top to bottom, left to right until you capture your app as-is. Don’t worry about UI specifics at this point. Capture high-level inputs and outputs that get the user to the next step. Move actions around until the order represents your app’s flow. Look for any holes in the map that need further clarity. Document lapses in time where necessary.

![Here’s a complete experience map for MyRunBuddy’s current state.](https://paper-attachments.dropbox.com/s_2D0F9EFCECAA3D6E12857EAAD162866F99CA40129F0BD81B218A102B4CF8D9B0_1581626942664_MyRunBuddy+-+as-is.png)

## **4. Capture your map in its current state.**

Create an artifact that you can reference later. This will allow you to compare your app’s state now to its state after voice integration.

**For in-person teams.** Take a picture of your map and save it somewhere where everyone will be able to access it. You’ll need this later for step #5.

**For remote teams & individuals.** If using Google Sheets, duplicate your open tab. Rename the new one so you’re able to differentiate between the two.

## **5. Fill in the “voice” row along with any relevant questions and/or support items.**

The same instructions from step #3 apply here. Some gestures or visuals you recorded earlier might change to accommodate voice output. Once you’ve exhausted your list of intents, you’re done mapping. Keep in mind: an app that doesn’t know what it can’t understand or can’t do is frustrating to use. You want to handle target intents well, but also dedicate thought to graceful failure. We’ll discuss best practices for this in a [later section](/docs/Design/tips-for-writing-dialog).

**For in-person teams.** Make note of these changes by adding new stickies on top of existing ones or by swapping them out. If eliminating steps, remove irrelevant stickies from your map and re-organize where necessary.

**For remote teams & individuals.** Make note of any changes by using a different text color. If eliminating steps, remove irrelevant cells from your map and reorganize where necessary.

Consider the following for each row:

> **User.** This will include intents. Distinguish gestures from intents by using quotes. For example, you could write "pace" on a sticky note or cell to capture a user who's asking how fast they’re running. Consider how you’ll onboard voice to new and return users. iOS has separate permissions for microphone & speech recognition. Android users only have to grant the ‘record audio’ permission.
>
> **Voice.** This will include audio output. How will you respond to your user? When will you allow them to speak? Will they be able to interrupt? Prompts and responses should be in quotes. Don’t fill in this column if the feature/interaction in question isn’t relevant. This will serve as the basis for [your script](https://www.spoekstack.io/docs/Design/script-storyboard-responses) later on.
>
> **Screen.** This will include visual output. What visuals will you add to communicate that you’re listening to the user? To communicate that you heard and interpreted the user's intent? What visuals will you provide if providing touch-to-talk support? Remember to keep these high-level. We’ll get to [best practices](/docs/Design/tips-for-designing-visual-output) for designing these in a later section.
>
> **Support.** What will need to change/be deployed to support changes from the above three? What information will you need to know to fulfill voice navigation and queries?
>
> **Questions (optional).** Think of any changes to your existing map as a starting point. Make note of anything you’re unsure about.

![Because our map assumes this user is mid-run, we’ve made the decision to introduce onboarding for voice controls for users new to voice before a user starts a run. Our run stats include things like pace, time, and miles. Rather than map each of these separately, we’ve made a note that they will follow a similar format as pace.](https://paper-attachments.dropbox.com/s_2D0F9EFCECAA3D6E12857EAAD162866F99CA40129F0BD81B218A102B4CF8D9B0_1581626971650_MyRunBuddy+-+to-be.png)

![Here, we’ve re-organized our new map so that it’s uncluttered and easier to follow.](https://paper-attachments.dropbox.com/s_2D0F9EFCECAA3D6E12857EAAD162866F99CA40129F0BD81B218A102B4CF8D9B0_1581627131722_MyRunBuddy+-+to-be+minimized.png)

## **5. Document your map (in-person teams only).**

Transfer maps to a shared document that everyone can reference moving forward. We use [](https://www.google.com/sheets/about/)[Google Sheets](https://www.google.com/sheets/about/). Like with the stickies, include one intent or action per cell. Make sure anyone on your team can interpret your document without explanation.

> We’ve provided a [](https://docs.google.com/spreadsheets/d/1epKA1i_2Cbb8sCEnV_D1mHl4VHfdJhY7-EXZGIrPjbM/edit?usp=sharing)[template](https://docs.google.com/spreadsheets/d/1epKA1i_2Cbb8sCEnV_D1mHl4VHfdJhY7-EXZGIrPjbM/edit?usp=sharing) to get you started. Make sure to duplicate this document to make changes.
