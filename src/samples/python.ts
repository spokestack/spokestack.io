export const wakeword = `from spokestack.profile.wakeword_asr import WakewordSpokestackASR

pipeline = WakewordSpokestackASR.create(
    "YOUR_SPOKESTACK_API_ID",
    "YOUR_SPOKESTACK_API_SECRET",
    model_dir="path_to_wakeword_model"
)
pipeline.run()
`

export const keyword = `from spokestack.profile.keyword import SpokestackKeyword

pipeline = SpokestackKeyword.create(
    classes=["one", "two", "three"],
    model_dir="path_to_keyword_model"
)
pipeline.run()
`

export const tts = `from spokestack.tts.manager import TextToSpeechManager
from spokestack.tts.clients.spokestack import TextToSpeechClient
from spokestack.io.pyaudio import PyAudioOutput

client = TextToSpeechClient(
  "YOUR_SPOKESTACK_API_ID",
  "YOUR_SPOKESTACK_API_SECRET"
)
output = PyAudioOutput()
manager = TextToSpeechManager(client, output)
manager.synthesize("welcome to spokestack")
`
