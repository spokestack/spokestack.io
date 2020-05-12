---
title: Export Existing Model
navId: Export
description: Export existing Dialogflow/Alexa model to Spokestack
draft: true
---

This guide details the process of exporting an existing skill from Alexa or Dialogflow for use with Spokestack.

## Export From Alexa

1. Go to the [Alexa Developer Console](https://developer.amazon.com/en-US/docs/alexa/devconsole/about-the-developer-console.html).

2. Copy the contents of your [Interaction Model](https://developer.amazon.com/en-US/docs/alexa/custom-skills/create-the-interaction-model-for-your-skill.html) from the JSON Editor into a file named `InteractionModel.json`.

3. Upload `InteractionModel.json` to the [Spokestack Console](spokestack.io)

## Export From Dialogflow

1. Go to the [Dialogflow Console](https://dialogflow.cloud.google.com/).

2. Choose the agent you would like to export.

3. Navigate to the agent settings (cog wheel).

4. Click the `Export and Import` tab.

5. Select `Export as zip` and save the `.zip` file.

6. Upload the `.zip` file to the [Spokestack Console](spokestack.io)
