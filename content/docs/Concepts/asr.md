---
title: ASR configuration
navId: ASR
description: Documentation for Spokestack's third-party ASR support
draft: false
---

Spokestack is designed to support multiple speech recognition providers so you can decide which is right for your use case. Support varies by mobile platform, however, so we decided to gather the information in one place to make the choice as easy as possible for your app.

## Supported ASR providers by platform

| Provider                                                                                                | Android  | iOS      |
| ------------------------------------------------------------------------------------------------------- | -------- | -------- |
| Android ASR (on-device)                                                                                 | &#9989;  | &#10060; |
| Apple ASR (on-device)                                                                                   | &#10060; | &#9989;  |
| [Azure Speech Services](https://azure.microsoft.com/en-us/services/cognitive-services/speech-services/) | &#9989;  | &#10060; |
| [Google Cloud](https://cloud.google.com/speech-to-text)                                                 | &#9989;  | &#10060; |

## Configuration

ASR providers require various configuration, usually in the form of API keys, but sometimes runtime components. This configuration takes place when you first build a Spokestack `SpeechPipeline`; below is a list of configuration needed for each platform and some usage notes.

For Android, primitive configuration properties are set via a call to `setProperty(propertyName, value)` on the speech pipeline's builder (or a `SpeechConfig` object supplied to it); in iOS, they're set as fields of a `SpeechConfiguration` object.

---

#### Android ASR

##### Android

No API keys or configuration properties are required, but a Context (`android.content.Context`) object must be added to the `SpeechPipeline`'s builder via the `setAndroidContext()` method. See [the javadoc for `AndroidSpeechRecognizer`](https://www.javadoc.io/doc/io.spokestack/spokestack-android/latest/io/spokestack/spokestack/android/AndroidSpeechRecognizer.html) for more information.

###### Device compatibility

Android's native ASR support is very device-specific. This chart lists physical devices on which it has been tested by either the Spokestack team or our community. If you have a device that is not listed, please try it out and submit a PR with your results!

| Device                 | API Level | Launches?          | On-device ASR?     |
| ---------------------- | --------- | ------------------ | ------------------ |
| Moto X (2nd Gen)       | 22        | :white_check_mark: | :x: `*`            |
| Lenovo TB-X340F tablet | 27        | :white_check_mark: | :x: `*`            |
| Pixel 1                | 29        | :white_check_mark: | :x: `**`           |
| Pixel 3 XL             | 29        | :white_check_mark: | :white_check_mark: |
| Pixel 3a               | 29        | :white_check_mark: | :x: `**`           |
| Pixel 4                | 29        | :white_check_mark: | :white_check_mark: |

`*` ASR fails consistently with a `SERVER_ERROR`, which seems to indicate that the server used by the device manufacturer to handle these requests is no longer operational.
`**` Spokestack ASR fails with a `SPEECH_TIMEOUT`, but the `SpeechRecognizer` works on its own, indicating that there's an adverse reaction between Spokestack and the built-in ASR, likely to do with how microphone control is handled by the system.

##### iOS

N/A

---

#### Apple ASR

##### Android

N/A

##### iOS

None required! &#1F389;

---

#### Azure Speech Services

##### Android

- `azure-api-key` (string): An API key valid for Azure Cognitive Services. See [Microsoft's documentation](https://azure.microsoft.com/en-us/try/cognitive-services/?api=speech-services) for more information.
- `azure-region` (string): A region identifier for Azure Speech Services. See [Microsoft's list](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/regions).

##### iOS

N/A (for now)

---

#### Google Cloud

##### Android

- `google-credentials` (string): A JSON-serialized string containing Google account credentials. See [Google's documentation](https://cloud.google.com/docs/authentication/getting-started#creating_a_service_account) for more information.
- `locale` (string): A BCP-47 language identifier to identify the language that should be used for speech recognition (example: "en-US"). See [Google's documentation](https://cloud.google.com/speech-to-text/docs/languages) for a list of supported codes.

##### iOS

N/A (for now)
