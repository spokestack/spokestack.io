---
title: Including model files in your app bundle
navId: require-models
description: Documentation for including local Spokestack model files in React Native app bundles.
draft: false
---

To include model files locally in your app (rather than downloading them from a CDN), you also need to add the necessary extensions so
the files can be included by Babel. To do this, edit your [`metro.config.js`](https://facebook.github.io/metro/docs/configuration/).

```js
const defaults = require('metro-config/src/defaults/defaults')

module.exports = {
  resolver: {
    // json is already in the list
    assetExts: defaults.assetExts.concat(['tflite', 'txt'])
  }
}
```

Then include model files using source objects:

```js
await Spokestack.initialize(clientId, clientSecret, {
  wakeword: {
    filter: require('./filter.tflite'),
    detect: require('./detect.tflite'),
    encode: require('./encode.tflite')
  },
  nlu: {
    model: require('./nlu.tflite'),
    metadata: require('./metadata.json'),
    vocab: require('./vocab.txt')
  }
})
```

This is not required. You can also pass remote URLs to the same config options and the files will be downloaded and cached automatically when first calling `initialize`:

```js
await Spokestack.initialize(clientId, clientSecret, {
  wakeword: {
    filter:
      'https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/filter.tflite',
    detect:
      'https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/detect.tflite',
    encode:
      'https://d3dmqd7cy685il.cloudfront.net/model/wake/spokestack/encode.tflite'
  }
})
```
