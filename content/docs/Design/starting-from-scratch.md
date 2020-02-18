---
title: Starting from Scratch
navId: Starting from Scratch
description: Construct a map for new apps.
draft: false
---

## **1. List your actor(s) and touch points on the left from top to bottom.**

Each actor and/or touch point needs a separate sticky or cell in a color unique to them. Leave space at the bottom for any questions that may come up, and space towards the top for your voice.

Our maps include the following actors:

> **User.** This will include gestures and intents. Distinguish gestures from intents using quotes. For example, you could write "pace" on a sticky note or cell to capture a user who's asking how fast they’re running. Create separate maps for **return** and **new users**. Consider how you’ll onboard voice to new users. iOS has separate permissions for microphone & speech recognition. Android users only have to grant the ‘record audio’ permission.
>
> **Voice.** This will include audio output. How will you respond to your user? When will you allow them to speak? Will they be able to interrupt? Prompts and responses should be in quotes. Don’t fill in this column if the feature/interaction in question isn’t relevant. This will serve as the basis for [your script](https://www.spoekstack.io/docs/Design/script-storyboard-responses) later on.
>
> **Screen.** This will include visual output. What visuals will you add to communicate that you’re listening to the user? To communicate that you heard and interpreted the user's intent? What visuals will you provide if providing touch-to-talk support? Remember to keep these high-level. We’ll get to [best practices](/docs/Design/tips-for-designing-visual-output) for designing these in a later section.
>
> **Support.** This will include anything not included in the top three rows (back-end, front-end, marketing, etc.). Keep these broad.
>
> **Questions (optional).** Think of this map as a starting point. Make note of anything you’re unsure about.

![As an example, we’ve started a map for an imagined fitness tracker, MyRunBuddy.](https://paper-attachments.dropbox.com/s_64309765F21EEABBFEB095F2281AAE0D852D3B39607DDCA807D5E9D53AAABE5C_1581629577075_MyRunBuddy+-+actors+new.png)

## **2. Start by opening the app.**

Start with new users. Imagine the context in which a user might come to your app. List actions until something would happen on the device. Each action goes on a separate sticky note or cell in the same color as the corresponding actor and/or touch point. Keep your actions platform-agnostic. For example, instead of “tap the home button”, which refers to older iPhones, write “wake up device”.

## **3. Place simultaneous actions on stickies or cells below.**

- What is their next task?
- What information do they use to get there?

Map top to bottom, left to right until you capture your app as-is. Don’t worry about UI specifics at this point. Capture high-level inputs and outputs that get the user to the next step. Move actions around until the order represents your app’s flow. Look for any holes in the map that need further clarity. Document lapses in time where necessary.

![It’s important to note when a new user would hear this greeting. For example, if the user is opening the app for the first time not using their voice, they might not expect to hear something.](https://paper-attachments.dropbox.com/s_64309765F21EEABBFEB095F2281AAE0D852D3B39607DDCA807D5E9D53AAABE5C_1581629849651_MyRunBuddy+-+new+column.png)

## **4. Continue top to bottom, left to right until you reach a good stopping point.**

Nothing is set in stone. That’s the beauty of using stickies or a spreadsheet. Move actions around until the order feels right to you. If intents follow the same pattern in your map, feel free to map one as an example for the rest. Once you’ve exhausted your initial list of intents, you’re done. Look for any holes in the map that need further clarity.

![We mapped the user opening the app for the first time, creating an account, starting a run, and finishing a run. This does not include how a user would ask for their run stats (see “questions”). To account for this, you might either want to go back and try to fit these into your initial map or include these in your script later.](https://paper-attachments.dropbox.com/s_64309765F21EEABBFEB095F2281AAE0D852D3B39607DDCA807D5E9D53AAABE5C_1581630226823_MyRunBuddy+-+new+complete.png)

**5. Document your map (in-person teams only).**
Transfer your map to a shared document that everyone can reference. We use [](https://www.google.com/sheets/about/)[Google Sheets](https://www.google.com/sheets/about/). Like with the stickies, include one intent or action per cell if using a spreadsheet. Make sure anyone on your team can interrupt your document without explanation.

> For those using Google Sheets, here’s a [](https://docs.google.com/spreadsheets/d/1epKA1i_2Cbb8sCEnV_D1mHl4VHfdJhY7-EXZGIrPjbM/edit?usp=sharing)[template](https://docs.google.com/spreadsheets/d/1epKA1i_2Cbb8sCEnV_D1mHl4VHfdJhY7-EXZGIrPjbM/edit?usp=sharing) to get you started. Make sure to duplicate this document to make changes.
