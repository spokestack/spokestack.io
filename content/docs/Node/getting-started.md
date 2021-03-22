---
title: Getting Started
navId: Getting Started (Node)
description: Getting started with the Spokestack Node API
draft: false
tags: Node
---

This guide will get you up and running with Spokestack for Node -- you'll have a voice interface in your software in no time.

## Installation

```bash
$ npm install spokestack --save
```

## Speech-to-Text and NLU

Aside from ASR, the main way to use Spokestack is through Spokestack's [GraphQL](https://graphql.org) API, which is available at `https://api.spokestack.io/v1`. It requires [Spokestack credentials](https://spokestack.io/create) to access.

node-spokestack includes [Express middleware](#spokestackmiddleware) to help integrate a proxy for the GraphQL API into any node server. A proxy is necessary to avoid exposing your Spokestack credentials.

The API is used to synthesize text to speech using various methods including raw text, [speech markdown](https://www.speechmarkdown.org), and [SSML](https://en.wikipedia.org/wiki/Speech_Synthesis_Markup_Language).

It can also be used for [NLU classification](https://www.spokestack.io/docs/concepts/nlu).

This repo includes [an example app](examples/with-next) with sample code using [apollo](https://www.apollographql.com) to work with the GraphQL API. The example app also includes a route for viewing live docs (or "introspection") of the Spokestack api (`/graphql`).

![Spokestack GraphQL Introspection](./spokestack-graphql.png)

## Automatic Speech Recognition

The one piece missing from the Spokestack GraphQL API is ASR. This is because a websocket is needed to provide continuous processing. node-spokestack includes functions to use either [Spokestack ASR](https://www.spokestack.io/docs/concepts/asr) or [Google Cloud Speech](https://github.com/googleapis/nodejs-speech), and there are two functions for each platform.

1. A [helper function](#asrSocketServer) for adding a websocket to a node server (express or otherwise).
1. A [one-time function](#asr) for processing speech into text.

We recommend using the websocket if you need to process speech to text more than once in your application.

## Setup

Go to [spokestack.io](https://spokestack.io) and create an account. Create a token at [spokestack.io/account/settings#api](https://spokestack.io/account/settings#api). Note that you'll only be able to see the token secret once. If you accidentally leave the page, create another token. Once you have a token, set the following environment variables in your `.bash_profile` or `.zshenv`:

```bash
export SS_API_CLIENT_ID=#"Identity" field from Spokestack API token
export SS_API_CLIENT_SECRET=#"Secret key" field from Spokestack API token
```

## Using Google ASR instead of Spokestack ASR

If you'd prefer to use Google ASR, follow these [instructions for setting up Google Cloud Speech](https://github.com/googleapis/nodejs-speech#before-you-begin). Ensure `GOOGLE_APPLICATION_CREDENTIALS` is set in your environment.

## Convenience functions for Node.js servers

See the [extensive server documentation on Github](https://github.com/spokestack/node-spokestack#convenience-functions-for-nodejs-servers)!

## Convenience functions for the client

See the [extensive server documentation on Github](https://github.com/spokestack/node-spokestack#convenience-functions-for-the-client)!
