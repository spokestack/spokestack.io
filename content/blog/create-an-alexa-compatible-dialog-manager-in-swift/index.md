---
title: Create an Alexa-Compatible Dialog Manager In Swift
date: '2020-06-08T00:00:03.000Z'
description: Porting the Alexa Skill dialog management from node.js to Swift.
tags: Engineering, Tutorial
author: daniel
draft: false
---

_This tutorial is part of the [Porting a Smart Speaker Voice App to Mobile](/blog/porting-a-smart-speaker-voice-app-to-mobile-part-1) series._

With Spokestack, you can make a mobile app work like a smart speaker skill or action. Spokestack provides many of the capabilities you need for a voice app such as speech recognition and text-to-speech. By importing your Alexa conversation model to Spokestack, you also get on-device natural language understanding (NLU) that behaves almost identically to how your smart speaker behaves. The next step is taking the classification from the NLU and creating a response, which is the job of the dialog manager component. In this post, I’ll show how I created a simple dialog manager in Swift that mirrors the API Amazon uses in its Alexa SDK for NodeJS. While this example is specific to Amazon Alexa, the same concepts also apply to Google Assistant and other virtual assistants.

### Alexa Skill Fulfillment

One of the key components you need to build when creating an Alexa skill is the web service for fulfillment. This is the code that decides how to reply based on an intent from Alexa’s NLU. For Alexa, you build a hosted web service that accepts structured requests from Alexa and fulfills them in the form of text or rich media. Amazon provides software development kits for several programming languages to make it easier to write the web service. With Spokestack, you don't need a separate web service for fulfillment. You can write the code directly in the mobile app that handles the dialog turns.

For a recent project, I wanted to convert several [sample Alexa skills](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs#samples) to mobile using Spokestack. The web service for these sample skills is written using the Alexa SDK for Node.js. To make this work in iOS, I needed to recreate that Node.js programming logic in Swift. Fortunately, Swift syntax and TypeScript are reasonably similar. By writing some Swift classes that mirror the API and syntax of the Alexa Node.js SDK, I was able to copy the remaining application logic fairly easily.

### Porting from Node.js to Swift

In my mobile app, I didn’t need to support [everything](https://developer.amazon.com/en-US/docs/alexa/alexa-skills-kit-sdk-for-nodejs/overview.html#alexa-features-supported-by-sdk) Alexa’s SDK does. For instance, my app didn’t need features like Amazon Pay or account linking. There are other capabilities like the audio player interface, video, and location services that I was sure I could implement later. But for these sample Alexa projects, I just needed to emulate handling a request, processing an intent, managing the session, and returning text for speaking or re-prompting.

### Swift Request Handler

The first step was to create a Swift version of the `RequestHandler`.

The `RequestHandler` in TypeScript looks like

```typescript
interface RequestHandler {
  canHandle(handlerInput: HandlerInput): Promise<boolean> | boolean
  handle(handlerInput: HandlerInput): Promise<Response> | Response
}
```

In Swift we can write this as

```swift
protocol RequestHandler {
    func canHandle(handlerInput:HandlerInput) -> Bool
    func handle(handlerInput:HandlerInput) -> Response
}
```

From the Alexa SDK documentation,

> `canHandle` is called by the SDK to determine if the given handler is capable of processing the incoming request.
> `handle` is called by the SDK when invoking the request handler.

The extended definitions in Swift are below. Note that the NLUResult is an import from Spokestack.

```swift
struct HandlerInput {

    var responseBuilder: ResponseBuilder
    var attributeMananger: AttributeManager
    var requestEnvelope: RequestEnvelope

    init(session: [String:Any], type: String, nluResult: NLUResult?) {
        responseBuilder = ResponseBuilder()
        attributeMananger = AttributeManager(session: session)
        requestEnvelope = RequestEnvelope(type: type, nluResult: nluResult)
    }
}

struct Response {
    var speak: String
    var reprompt: String?
}

struct RequestEnvelope {
    struct Intent {
        var name: String
        var slots: [String:Slot]?
    }
    struct Request {
        var type: String
        var intent: Intent?
    }
    var request: Request
    init( type: String, nluResult: NLUResult?) {
        request = Request(type: type)
        if (nluResult != nil) {
            request.intent = Intent(name: nluResult!.intent, slots: nluResult!.slots)
        }
    }
}

class ResponseBuilder {
    var response: Response
    init() {
        response = Response(speak:"")
    }
    func speak(_ speechOutput: String) -> ResponseBuilder {
        self.response.speak = speechOutput
        return self
    }
    @discardableResult
    func reprompt(_ repromptSpeechOutput: String) -> ResponseBuilder {
        self.response.reprompt = repromptSpeechOutput
        return self
    }
    func getResponse() -> Response {
        return response
    }
}

class AttributeManager {
    var _session:[String:Any]
    init(session:[String:Any]) {
        _session = session
    }
    func getSessionAttributes() -> [String:Any] {
        return _session
    }
    func setSessionAttributes(sessionAttributes : [String:Any]) {
        _session = _session.merging(sessionAttributes, uniquingKeysWith: { (_, last) in last })
    }
}
```

Implementing Request Handlers
In the Node.js SDK, the suggested pattern is to write a `RequestHandler` implementation for each type of request the application should handle. For example, in the Node.js code samples, Amazon has a `CancelAndStopIntentHandler` for the `AMAZON.CancelIntent` and `AMAZON.StopIntent`. For the `AMAZON.HelpIntent`, there’s a `HelpIntentHandler`. Now that I have a protocol for `RequestHandler`, I can write some Swift code to implement the same handlers.

In TypeScript, an example RequestHandler looks like this:

```typescript
const HelloWorldIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent'
    )
  },
  handle(handlerInput: HandlerInput): Response {
    const speechText = 'Hello World!'

    return handlerInput.responseBuilder.speak(speechText).getResponse()
  }
}
```

A Swift version looks incredibly similar:

```swift
struct HelloWorldIntentHandler : RequestHandler {
    func canHandle(handlerInput : HandlerInput) -> Bool {
        return handlerInput.requestEnvelope.request.type == "IntentRequest"
            && handlerInput.requestEnvelope.request.intent!.name == "HelloWorldIntent";
        }
    func handle(handlerInput : HandlerInput) -> Response {
        let speechText = "Hello World!";

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse()
    }
}
```

### Dialog Management

When you configure Alexa’s SDK for Node.js, you register all the `RequestHandler`s. When a request comes in, the SDK will call the `canHandle()` method of each registered `RequestHander` in order until it finds one that returns `true`. It then calls the `handle()` method of the matching `RequestHandler`.

We can implement a dialog manager in Swift that does the exact same thing. For each `turn` of the dialog, the `SkillDialogManager` looks for a `RequestHandler` that returns `true`. The `ErrorHandler` should be registered last and always return `true`. The dialog manager also updates the session with the last `speakOutput` and `repromptSpeech` so that it can replay those on a subsequent turn.

```swift
enum DialogError: Error {
    case unhandled
}

class SkillDialogManager {
    var session:[String:Any] = [:]

    var handlers:[RequestHandler] = [HelloWorldIntentHandler(),ErrorHandler()]

    func turn(type:String, nluResult:NLUResult? = nil, error:Error? = nil) throws -> Response {

        let handlerInput = HandlerInput(session: session, type: type, nluResult: nluResult)

        for handler in handlers {
            if (handler.canHandle(handlerInput: handlerInput)) {
                let output = handler.handle(handlerInput: handlerInput)
                session["speakOutput"] = output.speak
                session["repromptSpeech"] = output.reprompt

                return output
            }
        }

        throw DialogError.unhandled
    }
}
```
