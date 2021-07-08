export const wakeword = `let pipeline = SpeechPipelineBuilder()
    .addListener(self)
    .useProfile(.tfliteWakewordAppleSpeech)
    .setProperty("tracing", Trace.Level.PERF)
    .setProperty("detectModelPath", "detect.tflite")
    .setProperty("encodeModelPath", "encode.tflite")
    .setProperty("filterModelPath", "filter.tflite")
    .build()
pipeline.start()
`

export const keyword = `let pipeline = SpeechPipelineBuilder()
    .addListener(self)
    .useProfile(.vadTriggerKeyword)
    .setProperty("tracing", Trace.Level.PERF)
    .setProperty("keywordDetectModelPath", "detect.tflite")
    .setProperty("keywordEncodeModelPath", "encode.tflite")
    .setProperty("keywordFilterModelPath", "filter.tflite")
    .setProperty("keywordMetadataPath", "metadata.json")
    .build()
pipeline.start()
`

export const asr = `let spokestack = SpokestackBuilder()
  .addDelegate(self)
  .usePipelineProfile(.vadTriggerAppleSpeech)
  .build()
spokestack.start()
`

export const nlu = `let config = SpeechConfiguration()
config.nluVocabularyPath = "vocab.txt"
config.nluModelPath = "nlu.tflite"
config.nluModelMetadataPath = "metadata.json"


let nlu = try! NLUTensorflow(self, configuration: config)
nlu.classify(utterance: "turn the lights on in the kitchen")
`

export const tts = `let tts = SpokestackBuilder()
  .addDelegate(self)
  .setProperty("apiId", "YOUR_SPOKESTACK_API_ID")
  .setProperty("apiSecret", "YOUR_SPOKESTACK_API_SECRET")
  .build()
let input = TextToSpeechInput(
  "Hello world!",
  "demo-male"
)
tts.speak(input)
`
