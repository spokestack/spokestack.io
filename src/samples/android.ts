export const asr = `val spokestack = Spokestack.Builder()
    .withoutWakeword()
    .withoutNlu()
    .withoutTts()
    // listener inherits from SpokestackAdapter
    .addListener(listener)
    .build()
spokestack.start()
`

export const wakeword = `val spokestack = Spokestack.Builder()
    .setProperty("wake-filter-path", "path/to/filter.tflite")
    .setProperty("wake-encode-path", "path/to/encode.tflite")
    .setProperty("wake-detect-path", "path/to/detect.tflite")
    .withoutNlu()
    .withoutTts()
    // listener inherits from SpokestackAdapter
    .addListener(listener)
    .build()
spokestack.start()
`

export const keyword = `val spokestack = Spokestack.Builder()
    .withPipelineProfile(VADTriggerKeywordASR::class.qualifiedName)
    .setProperty("keyword-filter-path", "path/to/filter.tflite")
    .setProperty("keyword-encode-path", "path/to/encode.tflite")
    .setProperty("keyword-detect-path", "path/to/detect.tflite")
    .setProperty("keyword-metadata-path", "path/to/metadata.json")
    .withoutNlu()
    .withoutTts()
    // listener inherits from SpokestackAdapter
    .addListener(listener)
    .build()
spokestack.start()
`

export const nlu = `val spokestack = Spokestack.Builder()
    .withoutSpeechPipeline()
    .setProperty("nlu-model-path", "path/to/nlu.tflite")
    .setProperty("nlu-metadata-path", "path/to/metadata.json")
    .setProperty("wordpiece-vocab-path", "path/to/vocab.txt")
    .withoutTts()
    // listener inherits from SpokestackAdapter
    .addListener(listener)
    .build()
val asyncResult = spokestack.classify(utterance)
`

export const tts = `val spokestack = Spokestack.Builder()
    .withoutSpeechPipeline()
    .withoutNlu()
    .setProperty("spokestack-id", "your-client-id")
    .setProperty("spokestack-secret", "your-secret-key")
    // applicationContext is available inside all Activitys
    .withAndroidContext(applicationContext)
    // listener inherits from SpokestackAdapter
    .addListener(listener)
    .build()

val request = SynthesisRequest.Builder("hello, world")
    .build()
spokestack.synthesize(request)
`
