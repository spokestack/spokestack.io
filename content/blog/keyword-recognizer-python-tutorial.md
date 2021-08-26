---
title: A Swear Jar in 100 Lines of Python
date: '2021-06-10'
description: Use Spokestack's keyword recognizer model and Python library to help save up for a rainy day.
author: josh
tags: Keyword Recognition, Maker, Python, Tutorial
draft: false
hero: ../assets/blog/keyword-recognizer-python-tutorial.png
---

![swear jar](../assets/blog/keyword-recognizer-python-tutorial.png 'swear jar')

In this tutorial, we're going to use Spokestack's AutoML training tool to create a keyword recognizer model and use it, along with the [spokestack-python](https://github.com/spokestack/spokestack-python) library, to make a digital swear jar. The full code is [on GitHub](https://github.com/spokestack/swear-jar-python) if you'd like to run it for yourself.

The concept of a swear jar is simple: you have a list of words or short phrases that you'd like to stop saying, or stop _someone else_ from saying. Every time one of those words does slip out, you drop a coin in a jar. When the jar's full, you take it to the bank and open a savings account to spend when you're better behaved.

We should note that if swearing's not your thing, this concept also lets you reward yourself for saying nice things—call it a "compliment jar". We wouldn't want to limit this tutorial to us reprobates.

Anyway, the first thing that might come to mind for this use case is a [wake word detector](/docs/concepts/wake-word): you don't want your app running ASR all day, continuously streaming a pipe of data to wherever; you just want it to notice when you've said certain things. But there's a wrinkle: if movie ratings have taught us anything, it's that certain words are just . . . ickier than others. We'd like to make it more expensive to say _\<insert epithet here\>_ than, say, _\<insert milder epithet here\>_. (You didn't think we were actually going to suggest profanity for your list, did you? This is a family-friendly tech site we're running here.)

A [keyword recognizer](/docs/concepts/keywords) is perfect for this. Trained on a small set of utterances, it acts as a wake word recognizer and ASR in one, letting you know which utterance it heard without activating a cloud service in the process—your bad habits stay on your device forever.

Now that we know what we're doing and why, let's get to _doing_ it.

## Creating a Model

_**Note**: You'll need a Spokestack Maker or higher account to follow along with model creation. Running the sample app is totally free, so go ahead and take it for a spin first. Keep in mind that the models provided with the sample code are [personal models](/docs/concepts/keywords#personal-keyword), so [performance with your voice may vary](what-are-personal-ai-models). They were trained with a relatively deep voice._

If this is your first time using Spokestack, you'll need [an account](/create). If you have a free account, you'll need to [upgrade to the Maker tier](/pricing#maker). Once that's taken care of, head over to the [keyword tool](/account/keyword). Click the "New Model" button and name the model whatever you like. We're going with "swear jar" here, saving our creativity for the actual list of words.

Speaking of, now's the moment you've been waiting for: channel your inner George Carlin and click that "add keyword" button until you've accumulated enough to break (or reinforce) your habit.

While adding keywords, you'll notice that you also have the option to add multiple utterances to each keyword. Keywords and utterances interact like this: the keyword is the text that will be returned to your app when the model recognizes any utterance listed under it. So if one of your swears is, say, "beef", but you also want to stop saying "beefsteak", you might group those together by making them separate utterances under the keyword "beef".

Once everything is typed in, find a nice secluded space where no one will overhear enough to be concerned about your mental state, and prepare to swear at your computer. Or, as we call it, "Tuesday".

Click the "record" button next to an utterance to start recording samples for it. You'll need at least three samples of each utterance to train a model, but there's no upper limit. More samples only help performance, so really get in touch with your inner thespian. Don't go _too_ far, though; keep in mind that you want your training samples to still sound like you, so use whatever emotional affect you want your app to recognize as your voice.

When you've recorded all your samples, click "train". Model training takes a few minutes, so take this opportunity to do some deep breathing to wrap up your day's therapy session.

Don't forget to download your model once it's done training; we're about to need it.

## Writing the App

Our final product will be a simple Python command-line app that you can keep running in the background on any computer with a microphone attached. We'll be using [spokestack-python](https://github.com/spokestack/spokestack-python) to do all the signal processing. You can make a full-featured voice app with the library, including NLU and TTS for responses, but we only need the [speech pipeline](/docs/python/speech-pipeline) to demonstrate the usefulness of a keyword model.

```python
from spokestack.agc.webrtc import AutomaticGainControl
from spokestack.asr.keyword.tflite import KeywordRecognizer
from spokestack.io.pyaudio import PyAudioInput
from spokestack.nsx.webrtc import AutomaticNoiseSuppression
from spokestack.pipeline import SpeechPipeline
from spokestack.vad.webrtc import VoiceActivityDetector, VoiceActivityTrigger

FRAME_WIDTH = 10
SAMPLE_RATE = 16000
MODEL_DIR = "models"

pipeline = SpeechPipeline(
    input_source=PyAudioInput(
      frame_width=FRAME_WIDTH, sample_rate=SAMPLE_RATE
    ),
    stages=[
      AutomaticGainControl(sample_rate=SAMPLE_RATE,
                  frame_width=FRAME_WIDTH),
      AutomaticNoiseSuppression(sample_rate=SAMPLE_RATE),
      VoiceActivityDetector(
        frame_width=FRAME_WIDTH,
          sample_rate=SAMPLE_RATE,
          vad_fall_delay=500
      ),
      VoiceActivityTrigger(),
      KeywordRecognizer(list(WORDS.keys()), model_dir=MODEL_DIR)
    ]
  )

# we'll talk about this function in just a bit
pipeline.context.add_handler("recognize", swear_heard)
print("OK, I'll be listening. No funny business.")
print("Press Ctrl-c to exit.\n")
pipeline.run()
```

Believe it or not, this is the bulk of the code you'll need for this app. We're setting up the speech pipeline with the help of some hard-coded default values. `WORDS` isn't shown here, but it maps the keyword classes we just created to their values in cents so we can report how much we owe later on. See [the GitHub repository](https://github.com/spokestack/swear-jar-python) for more details.

In most cases, you'll want to read keyword classes from the `metdata.json` file distributed alongside the model, but for sake of demonstration, it's easier to put them in a static dictionary. The key gotcha is that if you hardcode, you still have to list the keywords in the same order as they appear in `metadata.json` because the model will reference them by index.

If you do want to load from the metadata file, this is how you'd do it in Python:

```python
import os
import json

def load_keyword_classes(model_dir):
    metadata = os.path.join(model_dir, "metadata.json")
    config = json.load(metadata)
    return [clazz["name"] for clazz in config["classes"]]
```

The other piece of our puzzle is the app's reaction when it hears a word on our list. For that we'll use the pipeline event we registered above:

```python
from spokestack.io.pyaudio import PyAudioOutput

AUDIO_DIR = "audio"
OUTPUT = PyAudioOutput(num_channels=1, sample_rate=44100)

def swear_heard(context):
  value = WORDS.get(context.transcript)
  if value:
    sound_path = os.path.join(AUDIO_DIR, f"{value}.wav")
    with wave.open(sound_path, 'rb') as coin:
      frame = coin.readframes(1024)
      while frame != '':
        OUTPUT.write(frame)
    print(f"Uh-oh! I heard {context.transcript}. That'll be {value} cents.")
```

Notice that this function was registered to listen to the `recognize` event, hinting at the fact that the keyword recognizer is acting as our ASR here. If we were using a wake word detector instead, it would fire the `activate` event, and we'd have to wait for `recognize` from a separate ASR to get a meaningful value in `context.transcipt.`

Thanks to some pre-recorded and cleverly named audio files, we're able to not only print a scolding message to the terminal, but play the sound of a hard-earned coin dropping into the jar.

## Go Deeper

- Keep a running total of the amount deposited throughout the day
- Grab a housemate and train using both your voices
- ???

## Conclusion

In order to run our application from the command line, you'll need to wrap the functions above in standard `if __name__ == "main"` Python boilerplate (again, see [the sample code](https://github.com/spokestack/swear-jar-python) for a working setup).

Other than that, though, the keyword model and the code above are almost all you need to make a working swear jar using Spokestack.

Have fun, and happy (?) swearing! Get in touch (contact info of all types is listed below) to let us know if you enjoyed this tutorial or if there's anything else you'd like to see us talk about.
