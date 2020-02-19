---
title: Script & Storyboard Responses
navId: Script and Storyboard Responses
description: Script and storyboard responses to the user.
draft: false
---

When a user expresses an intent and your app responds, we call this interaction a **turn**. Your script will reflect turns you defined in your [experience map](/docs/Design/map-out-integration) in more detail. You’ll also want to reference your initial list of intents.

If you have more than one experience map, create scripts to represent each scenario. We use [Dropbox Paper](https://www.dropbox.com/paper), but any collaborative editor will work.

# **1. Name your document.**

Make it something descriptive. We often start with the product or feature’s name along with the user type. For this example, we named our script “MyRunBuddy MVP Return User”.

# **2. Write a scenario.**

Start from the same point as your experience map. Provide some context. Remind teammates what your user is doing at the start of this interaction. Format contextual clues in italics.

- What’s going through their mind?
- What are they trying to do?
- Think back to any scenarios you created during discovery. Where are they currently in the flow?
- Have they granted the necessary permissions?

Here’s an example:

> The user has gone through onboarding and has their microphone on. They are familiar with using the app including voice commands. In this scenario, the app is open in the background on their phone. They are currently in the middle of a recorded run with their phone in an armband. To speak to MyRunBuddy, they move their arm towards their face.

# **3. Start with the first intent or gesture.**

Give your user a clear label and, again, be descriptive. Specify whether this is a new or return user. Treat this like you would any other script by bolding the user’s name and following it with a colon. Use quotes to differentiate between a user’s intents & gestures. Include descriptions of what you would expect to happen on the screen in [square brackets]. Keep these broad and don't make any specific UI decisions at this point.

Here’s an example:

> **RETURN USER:** [Listening] “MyRunBuddy, how fast am I running?”

# **4. Respond.**

Focus on the conversational aspect of your response for now. We’ll get to [visual responses](/docs/Design/tips-for-designing-visual-output) in step #8. Refer to our [best practices](/docs/Design/tips-for-writing-dialog) if you get stuck. Label each turn with its corresponding intent. Write any variations below each response. Note any assumptions and remaining questions below each turn.

> Pace
> **RETURN USER:** [Listening] “MyRunBuddy, how fast am I running?”
> **MYRUNBUDDY:** [Pace] “You’re running a 9-minute mile pace.”

# **5. Rinse & repeat.**

Once you’ve exhausted your experience map, write turns for anything outside that flow. This is where your list of intents will come in handy.

1. How will you respond if you weren’t able to match what the user said with an intent?
2. If you ask a question, how will you respond if the user responds with a negative?

Your script is complete once you’ve exhausted both your experience map(s) and intent list. Write a several variations of your responses. Go back to [best practice](/docs/Design/tips-for-writing-dialog) rule #6 if you get stuck.

Here’s an [example](https://www.dropbox.com/scl/fi/0weo35v72i901bynq2j8o/MyRunBuddy-MVP-Return-User-PUBLIC.paper?dl=0&rlkey=mzwmhjl00xznfaxxxo17kjjz1) of a drafted script excluding visual output. We’ll get to that in a later step.

# **6. Test how your dialog sounds.**

Does my interaction sound human? Enter responses [here](https://labs.spokestack.io/) to see how a synthetic voice might read them. Refer to [step #5](/docs/Design/tips-for-writing-dialog) if you get stuck.

# **7. Tweak language that didn’t sound right.**

Go back and revise your original script. Repeat steps 6 & 7 a few times until you feel satisfied with the end result.

# **8. Replace [square brackets] with visuals.**

Now that you’ve established what you’re going to say, it’s time to make [UI decisions](/docs/Design/tips-for-designing-visual-output). We use [Sketch](https://www.sketch.com/) to wireframe and mock up ideas. Export screens from your tool of choice and pair them with corresponding turns.
Create a prototype if it’s helpful. [Adobe XD](https://www.adobe.com/products/xd.html) is the best option we’ve found for prototyping with voice. Understand the [challenges](/docs/Design/test-with-real-people) of adding voice to a prototype before proceeding.

# **9. Review & tweak.**

Show your complete storyboard to your team. Go back and revise screens that don’t make sense. Repeat steps 6-9 a few times until you feel satisfied with all responses, both audio and visual.

Need help executing? We can provide the design and linguistic support you need for your next project.

[Email us for more details →](mailto: hello@spokestack.io)
