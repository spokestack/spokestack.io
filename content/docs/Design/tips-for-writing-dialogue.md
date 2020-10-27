---
title: Best Practices for Writing a Script
navId: Tips for Writing Dialogue
description: Some helpful tips when writing your dialogue.
draft: false
---

Human-to-human conversation is second nature. Talking to a voice assistant on the other hand doesn’t seem natural, yet is becoming more common. At Spokestack, we support user-initiated, call and response exchanges (often referred to as [system-centric](https://books.google.com/books?id=sxidDwAAQBAJ&pg=PA288&lpg=PA288&dq=system-centric+interaction+conversational+ux&source=bl&ots=GpWt-8ZIjQ&sig=ACfU3U37Qow3LDDcUTf92htxoFYb0pQt7A&hl=en&sa=X&ved=2ahUKEwi_hqvCsovpAhUHWN8KHR0CCDwQ6AEwBnoECAsQAQ#v=onepage&q=system-centric%20interaction%20conversational%20ux&f=false) interactions). These are conducive to voice control and information retrieval.

Below are some ground rules to keep in mind while [writing](/docs/Design/script-storyboard-responses) system-centric dialog. These draw from industry standards found in user experience (UX) design, conversational user experience (CUX) design, and conversational analysis (CA) as well as from our own professional experiences. You might recognize some of these from Ben Schneiderman’s [_The Eight Golden Rules of Interface Design_](https://www.cs.umd.edu/users/ben/goldenrules.html) and Paul Grice’s [_Cooperative Principle_](https://en.wikipedia.org/wiki/Cooperative_principle).

## Start with a greeting

Consider how you’d start a conversation with a friend. Perhaps “Hello” or “Hi,” followed by enough context to continue communication. With system-centric exchanges, users control the conversation ([golden rule #7:](https://www.cs.umd.edu/users/ben/goldenrules.html) “keep users in control”). Consider what choices users will have and what they’ll need to elicit an appropriate response.

#### Give new users options, but don’t assume intent

This will be their first interaction with your app’s voice. Make a brief, but transparent first impression ([quality maxim](https://en.wikipedia.org/wiki/Cooperative_principle)). New users require varying degrees of hand holding. Do this by either asking a question or providing instruction. Well-defined prompts followed by keywords, often referred to as “slot values” or “entities,” are going to be your shortest path to success.

It’s important to craft prompts that are brief, clear, and transparent. Here are a few things to keep in mind that help achieve these three things:

- Limit prompts to one idea.
- Don’t add dialog after asking a question. This might cause your user to respond prematurely before a prompt has been fully read.
- Be direct and avoid leading with with an open-ended prompt \*\*\*\*unless the type of feedback you’re looking for warrants it.
- Provide an example utterance in your instructions. Revealing how to phrase one intent might clue users in on how to say other similar intents.

Here’s an example. As a thought example, imagine you’re working on a fitness tracking app, MyRunBuddy. Information contained in [square brackets] communicates corresponding [visuals](/docs/Design/tips-for-designing-visual-output):

```none
NEW USER: “Hey Siri, open MyRunBuddy.”
MYRUNBUDDY: [Create account] “Welcome to MyRunBuddy! Start by creating an account.”
```

Since this user is new to MyRunBuddy, we started with a direct instruction that was limited to one idea. This can be brief when paired with a visual. In this case, the instruction was paired with a screen for account creation. Users won’t want to input private account information using their voice.

#### Welcome back return users

Provide enough context to let users know they’re interfacing with the same app as before. If it’s been awhile, re-establish expectations so they remember what they can ask.

Here’s an example:

```none
RETURN USER: “Hey Siri, open MyRunBuddy.”
MYRUNBUDDY: [Home] “Welcome back! To record a run, say ‘start my run’.”
```

Again, we started with a direct instruction that was limited to one idea. However, in this example, we provided the user an example utterance as part of instruction. Users will be able to adapt this example utterance to meet their own needs. For example, they might say “start my walk.”

## Inform users how to proceed & continuously educate them

If designed correctly, users shouldn’t have to to learn how to speak to your assistant ([golden rule #2:](https://www.cs.umd.edu/users/ben/goldenrules.html) \*\*\*\*“seek universal usability”). However, even if your intents are intuitive, you’ll still need to help users discover new intents. This will in turn encourage future interaction. Otherwise, users will need to be motivated enough to seek out new intents on their own.

When educating new and return users of what they can say, continue to remain brief, clear, and transparent. To do this, consider the following:

- Don’t introduce more than three intents at a time. Providing too many options can impede understanding.
- Avoid reading long lists such as menu options and [display these items visually](/docs/Design/tips-for-designing-visual-output) instead.
- Say the most important intent (your call to action) either first or last ([golden rule #8:](https://www.cs.umd.edu/users/ben/goldenrules.html) “reduce short-term memory load”). This will help users remember what they can ask, even when unprompted.
- Be consistent with noun and verbs tenses, especially with lists.

Here’s an example:

```none
NEW USER: [Listening] “Start a run.”
MYRUNBUDDY: [Recording Run] “Starting. To check your run’s progress, say ‘What’s my pace? or ‘How far have I run?‘”
```

The user was read these example utterances because it’s their first time recording a run. Use your best judgement with what examples to include here. This is something worth testing with your users.

## Implicitly confirm speech recognition & understanding

Speech recognition can be challenging, especially in public spaces. Allow users to implicitly confirm that what they said was correctly (or incorrectly) recognized by your automatic speech recognition (ASR) engine, but don’t force them to explicitly confirm in order to continue ([golden rule #5:](https://www.cs.umd.edu/users/ben/goldenrules.html) “prevent errors”). For example, if the ASR records a background conversation on TV rather than the user’s utterance.

Here’s an example of an aural implicit confirmation:

```none
RETURN USER: [Listening] “MyRunBuddy, start a run.”
MYRUNBUDDY: [Confirmation + Recording Run] “Starting…”
```

Since this user has recored a run before using their voice, a follow-up confirmation isn’t required. We’ll [show you examples](/docs/Design/tips-for-designing-visual-output) of visuals you might want to include along with aural confirmations later.

#### Use sounds such as “earcons” or “liveliness indicators”

Implicit confirmations don’t always need to be conversational, especially when a delay in output is expected. Sounds or “[earcons](https://medium.com/vui-magazine/earcons-the-audio-version-of-an-icon-59b7f0921235)” can enhance your experience by providing needed brevity and consistency. In the example above, instead of saying “starting,” you could replace this with a beep or swoosh sound. Sometimes a simple ‘mm hmm’ or what Cathy Pearl refers to in her book, [_Designing Voice User Interface_](https://www.amazon.com/Designing-Voice-User-Interfaces-Conversational/dp/1491955414)_s_, as a “liveliness indicator” is all you need to indicate that the app is still listening.

## Reserve follow-ups for when a misunderstanding might carry a penalty

Don’t follow every intent with “are you sure?” Build trust by letting users know what their next action will be as well as the stakes of that action.

Here’s an example of aural explicit confirmation:

```none
RETURN USER: [Listening] “Go ahead and stop my run”
MYRUNBUDDY: [Recording Run] “Your current run is still recording. Do you want start a new run?”
RETURN USER: [Listening] “STOP my run”
MYRUNBUDDY: [Recording Run] “Stopping…Would you like to save this run?”
```

In this example, the app misheard the user’s `stop` intent for `start`. The app made the user explicitly confirm an important action (in this case, ending a workout) before fulfilling it, preventing a costly error from happening.

## Consider how a user provided input & respond in kind

Voice input for complex queries is faster and more convenient, especially for users who are multitasking. And yet, the average person can read faster than they can listen. Respect your users’ time. It’s not necessary to respond with the same amount of information you would for a smart speaker skill. A well-crafted response will increase re-engagement. Consider whether a voice response, a [visual response](/docs/Design/tips-for-designing-visual-output), or both is appropriate and be consistent with which mode you use ([golden rule #1:](https://www.cs.umd.edu/users/ben/goldenrules.html) “strive for consistency”). For example, if a user used their voice, a brief voice response might make the most sense.

Here are a few other considerations:

- Use just enough words so users understand how to proceed without sacrificing accuracy ([quantity maxim](https://en.wikipedia.org/wiki/Cooperative_principle)).
- Avoid long sentences and lists, overly technical words, idioms, and fillers.
- Break up long form responses into smaller pieces. This will help make information feel less like a manual and more like an interaction they can control.
- Include conversation landmarks or markers such as “first,” “next,” “then,” or “finally” to let the user know where they are in the conversation. This could also include acknowledgements and positive feedback like “thanks,” “got it,” or “great!”
- Pay attention to punctuation.

Here’s an example:

```none
RETURN USER: [Listening] “MyRunBuddy, what’s my pace?”
MYRUNBUDDY: [Recording Run w/pace highlighted] “You’re running an 8 minute, 45 second mile pace.”
```

This response is brief and provides only information the user asked for while avoiding fillers. Here’s another example:

```none
RETURN USER: [Listening] “How much farther?”
MYRUNBUDDY: [Recording Run + Map] “You’re. 5 miles away from the 3 mile marker.”
```

In this example, the response would read as “you’re [pause] five miles away…” - a big difference! A good text-to-speech (TTS) engine can handle decimals with correct period placement. To make this more conversational, change this to something like, “You’re half a mile away from the 3 mile marker.”

#### Use timing to your advantage

Define the length of time between speech detection and the start of a response or prompt, otherwise known as “endpoint detection.” This can differ in anticipation of the user’s utterance. If endpoint detection is too short, you’ll cut off user utterances; too long, and the elongated pause might be interpreted as an error. With system-centric conversations, we recommend shorter, 2 second pauses. Reserve longer pauses for open-ended responses.

## Help users get back on track rather than blame them

When something unexpected happens, “Sorry, I didn’t get that” isn’t always going to cut it. Users don’t like being reminded that they weren’t understood. This can be monotonous and frustrating. Include scenarios in your script for your app failing to understand and receive speech input at all. What if users take longer to answer a question? Account for scenarios in which users aren’t sure how to phrase their question or response. What if there’s a long pause? What if they have a [lapse in memory](http://Preventing User Errors: Avoiding Unconscious Slips) or aren’t paying full attention to the task at hand?

Here are some things to consider when writing error prompts:

- Even at the risk of sounding less conversational, don’t ask a question if you won’t be able to understand the answer.
- Consider using silence. Users will often respond to silence by repeating themselves, especially for one-off commands.
- Prompt users to either clarify or include additional information by repeating or paraphrasing all or part of their previous turn. For experienced or return users, this can be brief.
- If after prompting your user no speech is detected, either reprompt the user or end the conversation. For example, Siri reprompts the user after 3 seconds with any number of liveliness indicators: “uh huh,” “I’m here,” “Yes?” etc.

```none
RETURN USER: [Listening] “Pause my run”
MYRUNBUDDY: [Recording Run] “Pausing… Are you having a good run so far?”
RETURN USER: [Listening] “It’s a little rainy, but I’m feeling pretty good.”
MYRUNBUDDY: [Error] “Sorry, I didn’t quite understand what you said. Could you repeat that?”
```

In this example, the app added a question to make the app sound more human. When the user answered the question, the app failed to respond as this question wasn’t supported by a yes/no intent.

## Let users know when an action is complete

Consider how you’ll end a single turn or multiple turns ([golden rule #4:](https://www.cs.umd.edu/users/ben/goldenrules.html) “design dialogs to yield closure”). In most cases, once you’ve provided the information requested, it’s best to end the session. Include natural feedback like “thank you” where appropriate. Avoid ending with an open-ended question such as “Is there anything else I can help you with?” as this forces the user to remember what your app is capable of doing ([golden rule #8:](https://www.cs.umd.edu/users/ben/goldenrules.html) “reduce short-term memory load”).
