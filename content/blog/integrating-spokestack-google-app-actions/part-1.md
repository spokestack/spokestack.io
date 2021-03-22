---
title: Integrating Spokestack with Google App Actions, Part 1
date: '2020-11-23'
description: Take your app's voice integration to the next level by having Google Assistant hand off the conversation to an in-app voice assistant.
author: josh
tags: Android, Engineering, Tutorial, 3rd Party Integration
draft: false
hero: ../../assets/blog/integrating-spokestack-google-app-actions/google-app-actions-hero.png
---

![Integrating Spokestack Google App Actions](../../assets/blog/integrating-spokestack-google-app-actions/google-app-actions-hero.png)

_This tutorial is part of a series:_

- **Part 1** (_You are here!_): Working with Google App Actions
- [Part 2](/blog/integrating-spokestack-google-app-actions-2): Adding your own voice experience with Spokestack
- [Part 3](/blog/integrating-spokestack-google-app-actions-3): Using Spokestack Tray to add a voice UI

---

The terms "smart speaker" and "voice assistant" are now full members of our cultural vocabulary. Talking to a voice assistant has become so common that voice interaction has grown from an exciting new feature into an expectation. Consumers are habituated to the tech and [would like to use it in mobile apps](https://voicebot.ai/2020/11/09/national-consumer-survey-reveals-that-a-lot-of-consumers-want-voice-assistants-in-mobile-apps/) — if only the apps supported it.

Making that last part a reality is what Spokestack's all about. In this tutorial, we're going to solve one of the problems mentioned in the article linked above:

> Those approaches enable a user to employ Siri or Google Assistant to deep link into an app to a specific screen or to execute an action. However, once the user gets to that point, the Siri or Google Assistant session has ended.

The "approach" the author's talking about, in Android's case, is the use of an [App Action](https://developers.google.com/assistant/app/overview) to open an app or a specific screen/`Activity` via Google Assistant. This is a great feature that Google's provided, and having the interaction between the user and Google Assistant end after your app has been opened is exactly what you want! That's _your_ user experience to manage from there on out, and any data provided by the user (your customer) should stay between the two of you.

It does, however, leave you with the burden of maintaining the UX expectations set up by that initial interaction, which in this case means continuing the conversation via voice if the user wants to. Let's talk about how to do that.

## Show me the code!

In this tutorial, we'll be talking through [a sample app](https://github.com/spokestack/app-actions-example) we've set up to demonstrate an integration with App Actions. It doesn't have any groundbreaking features or much of a UI to speak of, but it should give you a basic idea of how to handle multiple `Intent`s/`Activity`s via voice, using Google Assistant for the initial interaction and following up with your own voice responses from then on.

## Setup

Google has some [prerequisites](https://developers.google.com/assistant/app/get-started#requirements) for App Actions development. You'll need to meet those in order to try out the Google Assistant interactions. Spokestack's features are available either way; the only prerequisite for them is a physical device (not the emulator) to test voice input.

### Dependencies

OK, with that out of the way, let's get our dependencies sorted. Check the `app/build.gradle` file in the sample project — these are the important bits:

```groovy
implementation 'io.spokestack:spokestack-android:11.0.0'
implementation 'org.tensorflow:tensorflow-lite:2.3.0'
implementation 'androidx.media:media:1.2.0'
implementation 'com.google.android.exoplayer:exoplayer-core:2.11.7'
```

There are several non-Spokestack dependencies here because Spokestack takes a "use only what you need" approach and doesn't include many transitive dependencies by default. The sample app will use everything, though, so we'll need to pull in some libraries to support wake word, NLU, and TTS that we wouldn't need if we didn't want that functionality.

### Declaring App Actions

The main addition to your app when integrating App Actions is adding a `res/values/actions.xml` file that describes the pieces of your app you want to make available to Google Assistant. Google's documentation for the format is [here](https://developers.google.com/assistant/app/action-schema), but in summary:

- `actions` is the top-level element, and it contains one or more nested `action` elements.
- Each `action` describes a single intent (or command) you want to expose to Google Assistant.
- You choose between a built-in and custom intent via the `intentName` attribute:
  - A name that matches on of Google's [built-ins](https://developers.google.com/assistant/app/reference/built-in-intents/bii-index) will automatically inherit the parameters described by that built-in.
  - A name that does not match a built-in means that you'll need to specify both a `queryPatterns` attribute that points to natural-language examples of how a user would invoke this intent and nested `parameter` elements that describe any parameters that you want to capture in those utterances.
- Each action must have at least one nested `fulfillment` element that describes what part of the app should handle the intent. There are [several ways](https://developers.google.com/assistant/app/action-schema#fulfillment) to handle this. Our sample app uses custom schemas (`example://feature?{param1,param2}`), but an app tied to an established web presence should probably use http/https deep links instead.

Here's an example of one of our actions, this one using a custom intent:

```xml
<action
  intentName="navigate.settings"
  queryPatterns="@array/NavigateSettingsQueries">
  <fulfillment urlTemplate="example://settings" />
</action>
```

This is the simplest action we have, because it doesn't include any extra parameters. We're only using this one to take the user to a certain screen in the app. The `queryPatterns` attribute points to an item in `res/values/arrays.xml`:

```xml
<string-array name="NavigateSettingsQueries">
  <item>settings</item>
  <item>settings (screen)? (please)?</item>
  <item>go to settings</item>
  <item>go to my settings</item>
  <item>go to the settings</item>
  <!-- ... -->
</string-array>
```

Note the use of [conditionals](https://developers.google.com/assistant/conversational/df-asdk/reference/action-package/QueryPatterns#ap-conditionals), a feature from another part of the Google Assistant ecosystem brought over to make these query configurations a little more concise.

#### Fulfilling the App Actions request

As mentioned above, the `fulfillment` element specifies what sort of URI a given intent should produce, but the _routing_ for those URIs happens in your manifest (`AndroidManifest.xml`). An activity that should handle a deep link must declare an `intent-filter` element that matches said link. Here's the intent filter for the URI above, which leads to the settings activity:

```xml
<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <data
    android:host="settings"
    android:scheme="example" />
</intent-filter>
```

The key here is the `data` element, where we break down the custom URI we used in `actions.xml`. This `data` element matches a URI of "example://settings".

Once properly declared in the manifest, links handled by an activity will show up as the `data` field of the activity's `Intent`. See any of the sample app's activities for an example.

This is, of course, only one way of setting up deep links. For a large app (or maybe just for sake of convenience), you might prefer an alternate solution like airbnb's [`DeepLinkDispatch`](https://github.com/airbnb/DeepLinkDispatch).

## Try it out!

This is a good time to take a step back and run the demo to see what we've been talking about. You can run the app itself on either the simulator or a device, but you'll need a physical device with Google Play services and a Google developer account in order to test the actual App Actions. If you have those, head over to [this Codelab](https://codelabs.developers.google.com/codelabs/appactions/#2) for instructions on how to modify the app's ID, upload a test build to the Play Console, and get the App Actions Test Tool.

Once you've uploaded the build, make sure you're signed into Android Studio with the same developer account you used for the upload (click the avatar icon at the top right of the IDE window to sign in). Then, follow the instructions in the "Test App Actions" section [later in the Codelab](https://codelabs.developers.google.com/codelabs/appactions/#4) to create a preview build.

You can send test actions either directly from the test tool or by invoking Google Assistant on the device like you normally would. Try saying things like "OK Google, turn the office light off" or "OK Google, find me some shoes". We've worked out the kinks for this demo, so everything should go smoothly; if it doesn't, please open an issue in the sample app repository! If you run into any errors as you start to make changes to the sample app, check Google's [troubleshooting tips](https://developers.google.com/assistant/app/troubleshoot); the error messages themselves aren't always intuitive.

## But wait...there's more

That does it for the first part of the interaction — getting from Google Assistant into a specific part of your app. That's a step toward a better user experience already, but check out the [next part](/blog/integrating-spokestack-google-app-actions-2) of our tutorial to learn how to continue the voice interface the user just tried to open. See you then!
