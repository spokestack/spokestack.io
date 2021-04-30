export const wakeword = `let pipeline = SpeechPipelineBuilder()
    .addListener(self)
    .useProfile(.tfliteWakewordAppleSpeech)
    .setProperty("tracing", Trace.Level.PERF)
    .setProperty("detectModelPath", detectPath)
    .setProperty("encodeModelPath", encodePath)
    .setProperty("filterModelPath", filterPath)
    .build()
pipeline.start()
`

export const keyword = `let pipeline = SpeechPipelineBuilder()
    .addListener(self)
    .useProfile(.vadTriggerKeyword)
    .setProperty("tracing", Trace.Level.PERF)
    .setProperty("keywordDetectModelPath", detectPath)
    .setProperty("keywordEncodeModelPath", encodePath)
    .setProperty("keywordFilterModelPath", filterPath)
    .setProperty("keywords", "list,of,keywords")
    .build()
pipeline.start()
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
