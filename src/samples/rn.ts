export const wakeword = `try {
  await Spokestack.initialize(
    "YOUR_SPOKESTACK_API_ID",
    "YOUR_SPOKESTACK_API_SECRET",
    {
      wakeword: {
        filter: require('./filter.tflite'),
        detect: require('./detect.tflite'),
        encode: require('./encode.tflite')
      }
    }
  )
  await Spokestack.start()
} catch (e) {
  console.error(e)
}
`

export const keyword = `try {
  await Spokestack.initialize(
    "YOUR_SPOKESTACK_API_ID",
    "YOUR_SPOKESTACK_API_SECRET",
    {
      keyword: {
        filter: require('./filter.tflite'),
        detect: require('./detect.tflite'),
        encode: require('./encode.tflite'),
        classes: ['one', 'two', 'three']
      }
    }
  )
  await Spokestack.start()
} catch (e) {
  console.error(e)
}
`

export const tts = `try {
  const url = await Spokestack.synthesize('Hello world')
  play(url)
} catch (e) {
  console.error(e)
}
`

export const nlu = `await Spokestack.initialize(clientId, clientSecret, {
  nlu: {
    model: 'https://s.spokestack.io/u/7fYxV/nlu.tflite',
    metadata: 'https://s.spokestack.io/u/7fYxV/metadata.json',
    vocab: 'https://s.spokestack.io/u/7fYxV/vocab.txt'
  }
})
const result = await Spokestack.classify(transcript)
`

export const asr = `await Spokestack.initialize(clientId, clientSecret)
Spokestack.addEventListener(
  'recognize',
  ({ transcript }: SpokestackRecognizeEvent) => {
    console.log(transcript)
  }
)
`
