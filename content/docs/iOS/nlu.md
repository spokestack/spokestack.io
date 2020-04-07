---
title: NLU on iOS
navId: NLU (iOS)
description: Understanding the iOS NLU API
draft: false
---

This is a companion to the [NLU concept guide](docs/Concepts/nlu), which discusses the NLU subsystem holistically. Here we'll talk about usage issues specific to the Android client library.

### Configuration

The Spokestack NLU most commonly uses the following `SpeechConfiguration` properties:

- `nluVocabularyPath`: The bundle path to the model vocabulary
- `nluModelPath`: The bundle path to the nlu model
- `nluModelMetadataPath`: The bundle path to the nlu model metadata

The following properties are configurable, but should not be changed unless a different NLU model or vocabulary is being used (ie if you're changing this, you already know why you're doing so):

- `nluTerminatorTokenIndex`
- `nluPaddingTokenIndex`
- `nluPaddingTokenIndex`
- `nluMaxTokenLength`

## Usage

As mentioned in the [Getting Started](getting-started) guide, initializing the Spokestack NLU is like inititalizing the TTS component. Both a delegate callback interface and a publisher interface are provided. The call to `classify` is the same for either interface, but the result and `DispatchQueue` that the classification runs on are returned differently.

### 1) Delegate

A delegate interface is as simple as:

```swift
class NLU:  NLUDelegate {

    public let nlu = try! NLUTensorflow(self, configuration: SpeechConfiguration())

    nlu.classify(utterance: "turn the lights on in the kitchen")

    func classification(result: NLUResult) {
        // Utilize the result intent and slot(s) as appropriate
    }

    func failure(error: Error) {
        // respond appropriately to an error in classification
    }

    func didTrace(_ trace: String) {
        // respond appropriately to a debug tracing message
    }

}
```

assuming that `self` implements `NLUDelegate`.

When it comes time to classify an utterance using the delegate interface, Spokestack's NLU does all the heavy lifting on a configurable async `DispatchQueue`. Set `SpeechConfiguration.delegateDispatchQueue` to a `DispatchQueue` with your desired QoS. The `classify` function will run and call your delegate in that queue. By default `NLUTensorflow.classify` will run with a QoS of [`userInitiated`](https://developer.apple.com/documentation/dispatch/dispatchqos/qosclass/userinitiated).

### 2) Publisher (Combine)

The publisher interface to the classifier can take advantage of a simpler setup, and is able to classify multiple utterances with a single call. Note that the call to `classify` uses `subscribe(on:)` to ensure it is not blocking the UI thread.

```swift
// using Combine

let nlu = try! NLUTensorflow(configuration: SpeechConfiguration())

let utterances = ["turn the lights on in the kitchen"]

let _ = nlu.classify(utterances: utterances)
    .subscribe(on: DispatchQueue.global(qos: .userInitiated))
    .sink(receiveCompletion: { completion in
        switch completion {
            case .failure(let error):
                // respond appropriately to an error in classification
                break
            case .finished:
                // respond appropriately to finished classification
                break
        }
    }, receiveValue: { results in
        let _ = results.map({
            // Utilize the result's intents and slots as appropriate
        })
    })
```
