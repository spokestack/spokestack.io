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

export const asr = `from spokestack.activation_timeout import ActivationTimeout
from spokestack.io.pyaudio import PyAudioInput
from spokestack.asr.spokestack.speech_recognizer import SpeechRecognizer
from spokestack.pipeline import SpeechPipeline

mic = PyAudioInput()
vad = VoiceActivityDetector()
asr = SpeechRecognizer("spokestack_id", "spokestack_secret")
timeout = ActivationTimeout()

pipeline = SpeechPipeline(mic, [vad, asr, timeout])
pipeline.run()
`

export const nlu = `from spokestack.nlu.tflite import TFLiteNLU
nlu = TFLiteNLU("model_dir")

@pipeline.event
def on_recognize(context):
  results = nlu(context.transcript)
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
