export const wakeword = `val spokestack = Spokestack.Builder()
    .setProperty("wake-detect-path", "path/to/detect.tflite")
    .setProperty("wake-encode-path", "path/to/encode.tflite")
    .setProperty("wake-filter-path", "path/to/filter.tflite")
    .withoutNlu()
    .withoutTts()
    // listener inherits from SpokestackAdapter
    .addListener(listener)
    .build()
spokestack.start()
`

export const keyword = `val spokestack = Spokestack.Builder()
    .setProperty("keyword-detect-path", "path/to/detect.tflite")
    .setProperty("keyword-encode-path", "path/to/encode.tflite")
    .setProperty("keyword-filter-path", "path/to/filter.tflite")
    .setProperty("keyword-metadata-path", "path/to/metadata.json")
    .withoutNlu()
    .withoutTts()
    // listener inherits from SpokestackAdapter
    .addListener(listener)
    .build()
spokestack.start()
`

export const tts = `val spokestack = Spokestack.Builder()
    .setProperty("spokestack-id", "your-client-id")
    .setProperty("spokestack-secret", "your-secret-key")
    .withoutWakeword()
    .withoutNlu()
    // applicationContext is available inside all Activitys
    .withAndroidContext(applicationContext)
    // listener inherits from SpokestackAdapter
    .addListener(listener)
    .build()
val request = SynthesisRequest.Builder("hello, world")
    .build()
spokestack.synthesize(request)
`
