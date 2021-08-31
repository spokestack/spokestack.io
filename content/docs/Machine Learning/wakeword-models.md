---
title: Wake Word Models
navId: Wake Word Models (Machine Learning)
description: A detailed discussion of wake word model design
draft: false
tags: Wakeword
seoImage: '../../assets/docs/concepts-vad-wake-word.png'
---

Spokestack provides pretrained [TensorFlow Lite](https://www.tensorflow.org/lite) models that enable on-device wake word detection. These free models, however, only recognize the word "Spokestack"; in order to have your app respond to a different word or phrase, you'll need new models. If machine learning is outside your wheelhouse and you'd like a customized wake word for your app, check out our [Maker tier](/pricing#maker) for a way to prototype a [personal wake word model](/blog/what-are-personal-ai-models), no code required.

If building a custom model sounds like fun, though, soldier on. We'll describe the design of the models and their input/output shapes below; see [the configuration guide](pipeline-configuration) for more information about hyperparameters. Spokestack uses three separate models; they operate continuously, each feeding output into the next, for both efficiency and accuracy. We'll go over them in the order in which they're used. See the list of references at the end for descriptions of any unfamiliar terminology, and let us know if we missed anything!

## Filter

### Description

The filter model processes the linear amplitude Short-Time Fourier Transform (STFT), converting it into an audio feature representation. This representation may be the result of applying the [mel filterbank](https://en.wikipedia.org/wiki/Mel_scale) or calculating [MFCC](https://en.wikipedia.org/wiki/Mel-frequency_cepstrum) features. The use of a TF-Lite model for filtering hides the details of the filter from spokestack while optimizing the matrix operations involved.

### Input/Output

The filter model takes as input a single linear STFT frame, which is computed by Spokestack as the magnitude of the FFT over a sliding window of the audio signal. This input is shaped `[fft-window-size / 2 + 1]`. The model outputs a feature vector shaped `[mel-frame-width]`.

## Encoder

### Description

The encoder model is the [autoregressive](https://en.wikipedia.org/wiki/Autoregressive_model) component of the system. It processes a single frame (RNN) or a sliding window (CRNN) along with a previous state tensor.

### Input/Output

The encoder model's input tensor is shaped `[mel-frame-length, mel-frame-width]` (if processing a single frame, `mel-frame-length` will be 1), , the state tensor is shaped `[wake-state-width]`, and the output tensor is shaped `[wake-encode-width]`. It outputs an encoded representation of the frame and an updated state tensor.

## Detector

### Description

The detection model is a binary classifier that outputs a posterior probability that the wake word was detected. The architecture of this model is opaque to the wake word trigger at runtime and may vary, but it must be constrained to be compatible with [tflite](https://www.tensorflow.org/lite/) and [core.ml](https://developer.apple.com/documentation/coreml) and fast enough to run in soft real time on all supported devices.

### Input/Output

The input to this model is a sliding window of encoder frames, each of which was produced by the encoder model described above. This input is shaped `[wake-encode-length, wake-encode-width]`. The classifier outputs a scalar probability value.

## For More Information

- [Speech Processing for Machine Learning](https://haythamfayek.com/2016/04/21/speech-processing-for-machine-learning.html)
- [HMM Keyword Spotting](https://pdfs.semanticscholar.org/5be1/67bb082b32242818b9107fab26070dfcd8d2.pdf)
- [WUW-SR Wake Word Detection](https://pdfs.semanticscholar.org/0b00/efa192ba2b8e87b0ea02330fe1881ed1457d.pdf)
- [Snowboy DNN Wake Word Detection](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/42537.pdf)
- [CNN Wake Word Detection](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/43969.pdf)
- [CRNN Wake Word Detection](https://arxiv.org/pdf/1703.05390.pdf)
- [LSTM Wake Word Detection](https://diglib.tugraz.at/download.php?id=582ed1a5e0503&location=browse)
- [Attention for Wake Word Detection](https://arxiv.org/pdf/1803.10916.pdf)
- [Raw Audio Wake Word Detection](https://m.media-amazon.com/images/G/01/amazon.jobs/2017_ASRU_Paper._CB1198675309_.pdf)
- [Wake Word Detection Power Consumption](https://arxiv.org/pdf/1711.00333.pdf)
- [Google Speech Commands Dataset](https://research.googleblog.com/2017/08/launching-speech-commands-dataset.html)
- [Wake Word Detector Model Compression](https://s3-us-west-2.amazonaws.com/amazon.jobs-public-documents/Model_Compression_applied_to_small-_footprint_keyword_spotting.pdf)
- [Wake Word Detection on Microcontrollers](https://arxiv.org/pdf/1711.07128.pdf)
- [Semi-Supervised Keyword Spotting](http://cs229.stanford.edu/proj2016/report/Mahmoud-KeywordSpottingInArabicSpeech-report.pdf.pdf)
- [AGC for Wake Word Detection](https://static.googleusercontent.com/media/research.google.com/ru//pubs/archive/43289.pdf)
