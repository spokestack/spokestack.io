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
