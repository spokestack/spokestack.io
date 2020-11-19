---
title: Integrating Spokestack with Google App Actions
date: '2020-11-18'
description: Take your app's voice integration to the next level by having Google Assistant hand off the conversation to an in-app voice assistant.
author: josh
tags: Android, Engineering, Tutorial
draft: false
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
implementation 'io.spokestack:spokestack-android:10.0.0'
implementation 'org.tensorflow:tensorflow-lite:2.3.0'
implementation 'androidx.lifecycle:lifecycle-common-java8:2.2.0'
implementation 'androidx.media:media:1.2.0'
implementation 'com.google.android.exoplayer:exoplayer-core:2.11.7'
```

There are several non-Spokestack dependencies here because Spokestack takes a "use only what you need" approach and doesn't include many transitive dependencies by default. The sample app will use everything, though, so we'll need to pull in some libraries to support wakeword, NLU, and TTS that we wouldn't need if we didn't want that functionality.

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

### From actions to intents

If you've done any work with voice platforms before, you might notice some familiar concepts in `actions.xml`. If you squint a bit, the configuration (minus the `fulfillment` elements) looks like an [NLU](/docs/concepts/nlu) configuration, especially if you've used any custom intents in your app. `intentName` is . . . well, the name of the intent, `parameter`s are slots, and `queryPatterns` are utterances. If you're using a built-in intent, like `GET_THING` in the sample app, `queryPatterns` is hidden from you, handled entirely by Google, but the other things are still there.

We're going to exploit that similarity and convert our XML directly into Spokestack's [NLU format](/docs/concepts/nlu-training-data), using it to create a custom NLU model that will replicate the features we've just defined for Google Assistant in our app itself. This is a great opportunity to add new intents to your in-app NLU that would be too tricky or infeasible to expose via Google Assistant.

We won't go over the converted versions of all the intents here, but here's the Spokestack version of the `navigate.settings` intent from the last section:

```toml
description = "the user wishes to view the settings screen"

[generators.verb]
type = "list"
values = [
  "see",
  "show",
  "give me",
  "open",
  "change",
  "update",
  "go to",
  "take me to"
]

[utterances]
values = [
  "settings",
  "settings screen",
  "settings screen please",
  "{verb} settings",
  "{verb} my settings",
  "{verb} the settings",
  "{verb} the settings screen",
  "i want to see my settings",
  "i want to change my settings"
]
```

In Spokestack's format, you can achieve the same effect as Google's conditionals using [generators](/docs/concepts/nlu-training-data#generators). We've added a few more utterances to the Spokestack config than were present in `actions.xml` because they're a little easier to express here.

The `description` field is optional but can help you think about the interplay among your various intents.

For sake of demonstration, we've included all the Spokestack NLU files in `src/main/assets/spokestack-nlu` (we renamed the `GET_THING` intent to `command.search` for in-app usage and made up our own utterances for it). You won't need to actually create a model with these to run the tutorial code, though, because the trained model is in the assets folder as well. We'll talk about how to use it . . . right now.

## App logic

### Integrating Spokestack

The last section covered the setup for App Actions and the bridge between Google and Spokestack, so now let's look at how to handle voice input with Spokestack once the user's been dropped into your app.

Our sample app is a bit of a hodgepodge with no particular purpose other than to cover a few common use cases for voice control. Humor us here. The app has 4 total layouts, one that serves as a main menu and three others that demonstrate different potential features. Each scene has its own activity.

To process voice input, all you need is an instance of `Spokestack` and a subclass of `SpokestackAdapter` to receive events. Since we have multiple activities and want them all to be voice-enabled, we've made a `Spokestack` instance available via a singleton (see `Voice`) and created an abstract `VoiceActivity` to be extended by all activities that need access to it. Each `VoiceActivity` is responsible for creating its own `SpokestackAdapter` because each has its own UI that needs to be updated by voice commands. This could likely be DRYed up too, but this is a demo, after all, not production code.

There are two details that are important to call out specifically:

1. The `Spokestack` setup in `Voice`, specifically how it deals with wakeword and NLU data files.

For this tutorial, we're taking the simple approach of including all our data files in the `assets` folder (thus distributing them with the app itself) and simply decompressing them to the cache folder on startup. To decrease app size, you can choose to omit these files from the distribution and download them if absent, possibly forcing the app to redownload them based on version changes. It's important to think up front about how you'll distribute updates to your NLU model, since it essentially determines which features are available via voice.

2. The permission request in `VoiceActivity`

Spokestack needs the `RECORD_AUDIO` permission to use the device's microphone. It's automatically included in your manifest when you declare the Spokestack dependency, but starting with API level 23, you'll also need to [request it at runtime](https://developer.android.com/guide/topics/media/mediarecorder#audio-record-permission). Since the user can revoke the permission at any time in their settings, we check for it and re-request every time a `VoiceActivity` is created.

The way things are set up here, the microphone permission will also be requested on app startup. In a real app, you'll want to reorganize this to explain the permission before requesting it in order to provide a better user experience.

### Recreating the Google Assistant

With our voice integration set up, let's take a look at how it's used. Open up `DeviceControlActivity` and scroll to the bottom.

```kotlin
inner class Listener : SpokestackAdapter() {
  override fun nluResult(result: NLUResult) {
    if (result.intent == "command.control_device") {
      val dataUri = Uri.Builder()
        .appendQueryParameter("device", result.slots["device"]?.rawValue)
        .appendQueryParameter("command", result.slots["command"]?.rawValue)
        .build()
      setUiFromIntent(dataUri)
    }
}
```

There are several other methods in `SpokestackAdapter` that we could take advantage of to make our UI more responsive and log errors, but all we're interested in for the purpose of this demonstration is receiving results from the app's NLU. What we're doing here is reusing our deep link processing that's in place for Google Assistant: when the app receives an intent that matches our current scene, we use that intent's slots to construct a URI containing the query parameters we've set up for our App Action. The schema and host don't matter because we're already in the activity we want to be in. If we wanted to transition somewhere else, we'd want to make a full URI and use the `startActivity` method; this is what `MainActivity` does to route button presses to different activities.

At the risk of sounding like a broken record, a proper voice experience requires more code than this. You'll want to handle intents that _aren't_ meant for the current activity, respond intelligently, and so on. To do all this in a maintainable, understandable way, you want what's called a _dialogue manager_ component. Watch this blog for more on that in the future!

A couple more notes about `DeviceControlActivity`:

- Take a look at `onCreate`. It routes the URI in `intent?.data` to `setUiFromIntent` just like our NLU event handler above. The presence of a URI in `data` is how you'll know if you were reached via voice command, unless you've explicitly deep-linked to this activity somewhere else. If that's the case, you'll want to include an extra query parameter somewhere to help the app tell the links apart.
- `populateVoiceMaps` does a simple synonym mapping of potential slot values (what the user might actually _say_) to canonical device names — in this case, we're actually mapping straight to the UI components that represent those devices. This is because Google only lets us specify parameters for custom intents as plain text, rather than allowing the full expressive power of [entities](https://developers.google.com/assistant/app/action-schema#entity) available to built-in intents. Hence, we can't do that normalization in `actions.xml`. In Spokestack's format, we can fix this using a [selset slot](/docs/concepts/nlu-training-data/selset), but since user queries could come from either Google or Spokestack, we've left the parsing logic in the app so they can both be handled the same way.

### Moving to the next level

Once you've mastered the basics of voice navigation we've talked about here, you'll naturally want to start thinking about how your app should respond to users. We've given quick examples of this in both `DeviceControlActivity` and `SearchActivity`, but let's talk briefly about the latter.

In `SearchActivity`'s `setUiFromIntent`, we extract the "item" slot (the presumed search term) from the data URI and use it in a TTS response to the user. We end the response by asking the user if they want to search again. To make this a seamless experience for the user, we've added the following event handler to our `Listener` inner class:

```kotlin
override fun ttsEvent(event: TTSEvent) {
  when (event.type) {
    TTSEvent.Type.PLAYBACK_COMPLETE -> spokestack.activate()
    else -> {}
  }
}
```

This snippet automatically reactivates ASR when Spokestack finishes playing the audio for a TTS prompt, so the user can give another search if they want. If they say nothing, the ASR will deactivate after a timeout.

That brings us to another point: in its current state, voice integration in the sample app can only be accessed via wakeword ("Spokestack", in this case). It's easy enough to add a microphone button of your choosing, and it should call `spokestack.activate()` just as our TTS listener above. If you want to make your button work like a walkie-talkie, you can call `spokestack.deactivate()` when the user releases it; otherwise, calling `deactivate` is unnecessary.

## Conclusion

Congratulations; you have an app that not only makes its features accessible via Google Assistant, but continues that voice interaction via its very own voice layer! To try it all out with Google's test tools, follow the instructions in [this Codelab](https://codelabs.developers.google.com/codelabs/appactions/#0), changing app IDs as necessary to make them unique. Instructions for setting up the App Actions Test Tool are in [step 5](https://codelabs.developers.google.com/codelabs/appactions/#4). We've only scratched the surface of making a fully immersive voice experience here, but check out our other [tutorials](/tutorials) and [documentation](/docs) to learn more.
