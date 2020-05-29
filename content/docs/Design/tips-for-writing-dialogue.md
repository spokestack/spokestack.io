---
title: Tips for Writing Dialogue
navId: Tips for Writing Dialogue
description: Some helpful tips when writing your dialogue.
draft: false
---

Before we [start writing](/docs/Design/script-storyboard-responses), there are a few ground rules to keep in mind. Users tend to have a screen nearby. It's not necessary to deliver the same amount of information in each prompt as you would for a smart speaker skill. Your script should be functional. Think call and response. You might recognize some of these from "[The Eight Golden Rules of Interface Design](https://www.cs.umd.edu/users/ben/goldenrules.html)".

## 1. Set expectations

If your user's first intent is "open app", you'll want to start here. How would you start a conversation with a friend? "Hello" or "hi", perhaps, followed by enough context to continue.

For new users, this will be their first interaction with your app's voice. Inform novices how to proceed ([Golden Rule #2:](https://www.cs.umd.edu/users/ben/goldenrules.html) "seek universal usability"). Do this by either asking a question or giving an instruction. Don't add dialog after a question. This might cause your user to respond before you've completed the full prompt.

Here's an example. Information contained in [square brackets] communicates corresponding [visuals](/docs/Design/tips-for-designing-visual-output):

**NEW USER:** "Hey Siri, open MyRunBuddy."
**MYRUNBUDDY:** [Create account] "Welcome to MyRunBuddy! Let's start by creating an account."

_Since this user is new to MyRunBuddy, we've started by giving the user an instruction. This can be brief when paired with a visual, in this case a screen for account creation. Users aren't going to want to input private account information using their voice._

If you're greeting a return user, welcome them back. If it's been awhile, reestablish expectations so they remember what they can ask.

**RETURN USER:** "Hey Siri, open MyRunBuddy."
**MYRUNBUDDY:** [Home] "Welcome back! To start a run, say 'start running'."

## 2. Educate; don't overburden

Let users talk like humans, but also don't overpromise. Natural language understanding (NLU) isn't conducive to _completely_ talking like a person. You want to be aware of the capabilities of the tech you're working with. Well-defined prompts followed by keywords are going to be your shortest path to a success. For example, after "Hey Siri," the screen shows "What can I help you with?". This implies to the user that they're able to ask Siri anything. You'll want to direct users to express intents your app can actually fulfill.

When introducing intents, limit yourself to three. Say the most important intent last ([Golden Rule #8:](https://www.cs.umd.edu/users/ben/goldenrules.html) "reduce short-term memory load"). This will help users remember what they can ask, even when unprompted ([Golden Rule #7:](https://www.cs.umd.edu/users/ben/goldenrules.html) "keep users in control").

**NEW USER:** [Listening] "Start a run."
**MYRUNBUDDY:** [Recording Run] "Starting. To check your run's progress, say 'What's my pace? or 'How far have I run?'"

_The user heard these prompts because it's their first time recording a run. Use your best judgement with what types of intents to include here. Revealing how to phrase one intent might clue them in on how to say other similar intents. This is something worth testing with your users._

## 3. Confirm information

This lets the user know that an action is complete ([Golden Rule #4:](https://www.cs.umd.edu/users/ben/goldenrules.html) "design dialogs to yield closure"). Avoid follow-ups or **reprompts** for tasks that are easy to undo. Consider how you might confirm the same information using [visuals](/docs/Design/tips-for-designing-visual-output).

**RETURN USER:** [Listening] "MyRunBuddy, start a run."
**MYRUNBUDDY:** [Confirmation + Recording Run] "Starting…"

_Since this user has recored a run before using their voice, there's no follow-up to the app's confirmation. We'll [show you examples](/docs/Design/tips-for-designing-visual-output) of things you might want to include along with a confirmation in later steps._

Confirmations don't always need to be conversational. Consider sounds. In the example above, instead of saying "starting," you could replace this with a beep or swoosh sound.

## 4. Be relevant

Voice input for complex queries is faster and more convenient, especially for users who are multi-tasking. And yet, the average person can read faster than they can listen. Consider whether a voice response, a [visual response](/docs/Design/tips-for-designing-visual-output), or both is appropriate. Respect your users' time; don't inconvenience them by taking too long to respond. A well-crafted response ([Golden Rule #3:](https://www.cs.umd.edu/users/ben/goldenrules.html) "offer informative feedback") will increase re-engagement.

**RETURN USER:** [Listening] "MyRunBuddy, what's my pace?"
**MYRUNBUDDY:** [Recording Run w/pace highlighted] "You're running an 8 minute, 45 second mile pace."

Consider how a user provided the input. If they used their voice, a voice response might make the most sense if the response is brief. If the user tapped a button, they might not expect to hear a response. For example, imagine if every time you hit the home button on your iPhone by accident, you heard Siri talk. That might get old quick.

## 5. Prevent & account for failure

Include scenarios in your script where the user's intent isn't understood. Direct the user how to go back or abandon misheard intents ([Golden Rule #6:](https://www.cs.umd.edu/users/ben/goldenrules.html) "permit easy reversal of actions"). Recognize that intent recognition in public spaces is more challenging ([Golden Rule #5:](https://www.cs.umd.edu/users/ben/goldenrules.html) "prevent errors").

**RETURN USER:** [Listening] "Go ahead and stop my run"
**MYRUNBUDDY:** [Recording Run] "Your current run is still recording. Do you want start a new run?"
**RETURN USER:** [Listening] "STOP my run"
**MYRUNBUDDY:** [Recording Run] "Stopping…Would you like to save this run?"

_In this example, the app misheard the user's 'stop' intent for 'start'. This goes back to step #2: "confirm information". The app let the user confirm an important action (in this case, ending a workout) before taking it. This prevents costly errors before they happen._

Don't ask a question if you won't be able to understand the answer. Even at the risk of sounding less conversational.

**RETURN USER:** [Listening] "Pause my run"
**MYRUNBUDDY:** [Recording Run] "Pausing… Are you having a good run so far?"
**RETURN USER:** [Listening] "It's a little rainy, but I'm feeling pretty good."
**MYRUNBUDDY:** [Error] "Sorry, I didn't quite understand what you said. Could you repeat that?"

_In this example, the app added a question to make the app sound more human. When the user answered the question, the app failed to respond as this question wasn't supported by a yes/no intent._

Include scenarios in your script for your app failing to receive speech input at all. What if they take longer than anticipated to answer a question? Account for scenarios in which users aren't sure how to phrase their question or response. What if there's a long pause? You'll want to re-prompt the user if this occurs. For example, if Siri doesn't hear anything after awhile, you might hear "Uh huh," "I'm here," or "Yes?"

## 6. Talk like a human

Human-to-human conversation is second nature. Talking to a voice assistant doesn't seem natural. And yet, it's becoming more common. Always be thinking how you would respond if a friend asked the same thing on the street. How would you respond in a quick text message ([Golden Rule #2:](https://www.cs.umd.edu/users/ben/goldenrules.html) "seek universal usability")? Proofread your responses. Pay attention to comma, period, and space placement. These have a big impact on how synthetic voices interpret responses.

**RETURN USER:** [Listening] "How much farther?"
**MYRUNBUDDY:** [Recording Run + Map] "You're. 5 miles away from the 3 mile marker."

_In this example, the response would read as "you're [pause] five miles away…" - a big difference! A good TTS engine can handle decimals with correct period placement. To make this more conversational, change this to something like, "You're half a mile away from the 3 mile marker."_

## 7. Provide variety & consistency

Users don't always want to hear the same response. This can sound monotonous, robotic, and tedious. Variety can help users pay closer attention to what's being said. Consider different ways of phrasing the same response without changing meaning.

At the same time, users rely on consistent cues, both visual and audible ([Golden Rule #1:](https://www.cs.umd.edu/users/ben/goldenrules.html) "strive for consistency"). This holds true for how your responses _sound_. Consider your app's persona. What will your app sound like? How will that sound differentiate you from competitors? If you're using Spokestack, sample voices in the [account section](/account/services/tts). Or, [contact us](mailto: hello@spokestack.io) if you're interested in a custom solution.

---

Need help executing? We can provide the linguistic support you need for your next project.

[Email us for more details →](mailto: hello@spokestack.io)
