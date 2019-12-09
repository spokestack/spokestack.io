---
title: Speech Pipeline Configuration
navId: Speech Pipeline Configuration
description: A discussion of the parameters available to configure the speech pipeline
draft: false
---

Speech recognition is a complicated process, and fine-tuning it can be something of an art. To that end, Spokestack enables a great deal of customization via the `SpeechConfiguration` class on iOS and pipeline properties on Android. This guide provides a discussion of its various parameters, but note that the default settings are based on either standard practices or our own experience tuning our systems; even small changes can sometimes have a great effect on performance.

Parameters are listed here under their property names (the names themselves are designed to be platform-agnostic, but you use them directly to configure the Android pipeline); to convert to iOS `SpeechConfiguration` fields, in most cases just change the `snake-case` to `camelCase`. Exceptions to this rule are noted along with the relevant properties.

## Model Hyperparameters

These parameters are coupled to the [machine learning models](wakeword-models) used by the wakeword trigger and must be adjusted when the models' hyperparameters change.

- `rms-target`
  The wakeword trigger normalizes all audio during signal processing to a reference target, based on the Root Mean Squared (RMS) of the audio signal. All audio samples are normalized to this target RMS value based on the overall RMS energy of the clip (training) or an Exponentially-Weighted Moving Average (EMA) of the RMS energy of the microphone (inference). The RMS target should be a floating point value in the range [0, 1].

- `fft-window-size`
  This is the size of the sliding window of audio samples that is used to compute the STFT of the signal. It is measured in number of samples. For best performance, the window size should be a power of 2.

  The window size determines the number of frequency bands calculated by the STFT (fft-window-size / 2 + 1) and can affect the runtime performance of the wakeword trigger. However, increasing the window size can improve the vertical resolution of the spectrogram and thus the accuracy of the trigger. A typical value for wakeword detection is 512 samples.

- `fft-window-type`
  The window type is the string name of a windowing function to apply to the audio signal prior to calculating its STFT. Currently, only the [hann](https://en.wikipedia.org/wiki/Hann_function) window is supported.

- `fft-hop-length`
  This parameter is the number of milliseconds to advance the audio sliding window each time the STFT is calculated. The hop length can improve the horizontal resolution of the spectrogram by increasing the frequency at which the STFT is calculated. This must be traded against the cost of calculating the STFT each frame, as well as running the rest of the detection pipeline, since a detection occurs on each STFT frame. A typical value for wakeword detection is 10ms.

- `mel-frame-length`
  The frame length is the length of the filtered STFT, in milliseconds. This parameter determines the number of frames to include in the spectrogram, which determines the size of the input to the encoder model. For ordinary RNN encoders, this value should be set to `fft-hop-length` (the default), since these encoders process a single frame at a time. For CRNN encoders, this value can be any multiple of the hop length.

- `mel-frame-width`
  This is the number of features in each filtered STFT frame. Similar to `fft-window-size`, the filtered frame width increases the vertical resolution of the detector model's inputs. If the filter model uses the mel filterbank, a typical value for this parameter is 40 features for wakeword detection.

- `wake-encode-length`
  This is the length of the encoder output sliding window, in milliseconds. It determines the number of encoder output frames to send into the detector model. The default value for this parameter is 1000 (1 second).

  **iOS name**: `encodeLength`

- `wake-encode-width`
  This is the number of features in each encoded frame. The `encode` model transforms the mel frames into encoded frames, each of which has this dimension. A typical value for this parameter is 128.

  **iOS name**: `encodeWidth`

- `wake-state-width`
  This is the number of features in the encoder's state vector. This parameter depends on the type of encoder (GRU/LSTM). For GRU networks, this parameter is the same as `wake-encode-width` (the default for this parameter), since GRU outputs are identical to their hidden states.

  **iOS name**: `stateWidth`

## Runtime Tunable Parameters

These parameters may be adjusted at runtime without rebuilding/retraining the ML models used for wakeword detection.

- `wake-filter-path`
  This parameter is a file system path to the TF-Lite model for filtering the audio spectrogram during signal processing (see [Wakeword Models](wakeword-models) for a description of these models). If this model is stored in an Android asset, it must first be extracted to the cache diretory, and the cache path must be passed as this parameter.

  **iOS name**: `filterModelPath`

- `wake-encode-path`
  The encode path is a file system path to the wakeword encoder TF-Lite model. It behaves similarly to the `wake-filter-path` parameter.

  **iOS name**: `encodeModelPath`

- `wake-detect-path`
  The detector path is a file system path to the wakeword detection TF-Lite model. It behaves similarly to the `wake-filter-path` parameter.

  **iOS name**: `detectModelPath`

- `rms-alpha`
  This is the rate parameter of the EMA used to normalize the the audio signal to the running RMS energy. A higher rate allows normalization to respond more quickly to changes in signal energy, while a lower rate reduces noise in the RMS value. Note that the RMS energy is only calculated for voiced audio (when the VAD is active).

  RMS normalization can be disabled by setting `rms-alpha` to 0, which is the default.

- `pre-emphasis`
  This value controls the [pre-emphasis](<https://en.wikipedia.org/wiki/Emphasis_(telecommunications)>) filter used to process the audio signal after RMS normalization. The filter is implemented as `x[i] = x[i] - p * x[i - 1]`, where `p` is the configured pre-emphasis weight. This filter removes any DC components from the signal and amplifies high frequency components.

  Pre-emphasis can be disabled by setting `pre-emphasis` to 0, which is the default.

- `vad-rise-delay`
  This parameter sets the rising edge delay (in milliseconds) of the internal VAD used by the wakeword trigger. The rising edge delay is typically configured to 0, since the wakeword trigger sees a sliding window of audio.

  _Not available on iOS_

- `vad-fall-delay`
  The falling edge delay is the number of milliseconds to delay deactivating the VAD after voiced speech is no longer detected. This parameter ensures that the wakeword trigger continues to run between words in a phrase for slow talkers and words with leading/trailing unvoiced phonemes. It also has a subtle interaction with `wake-active-min` for activations with and without pauses after the wakeword. This parameter should be tuned specifically to the wakeword being used.

- `wake-threshold`
  This is the threshold that is compared with the detector model's posterior probability, in order to determine whether to activate the pipeline. It is the primary means of tuning precision/recall for model performance. A standard approach is to choose this threshold such that the model outputs no more than 1 false positive per hour in the test set. This parameter takes on values in the range [0, 1] and defaults to 0.5.

- `wake-active-min`
  This parameter represents the minimum number of milliseconds that a wakeword activation must remain active. It is used to prevent a VAD deactivation at the end of the wakeword utterance from prematurely terminating the wakeword activation, when a user pauses between saying the wakeword and making the system request. It should be tuned alongside `vad-fall-delay` and is typically longer than `vad-fall-delay`.

- `wake-active-max`
  The maximum activation length (milliseconds) is the maximum amount of time any activation can take, even if a VAD deactivation does not occur. This limits the amount of audio processed further in the pipeline by allowing the pipeline activation to time out. The maximum activation length applies to wakeword activations, as well as manual activations (external calls to `context.set-active`). It should be tuned to the longest expected user utterance.

- `sample-rate`
  The number of audio samples per second sent to the wakeword detector. Defaults to 16000 (16kHz).

- `frame-width`
  The number of milliseconds in each frame of audio sent to the wakeword detector. Defaults to 20.

- `agc-target-level-dbfs`
  Used in the `AutomaticGainControl` pipeline component, this parameter attempts to correct the RMS amplitude of input audio to the specified dbfs level to avoid clipping. This setting should be tuned in conjunction with the specific wakeword you're using and any devices you're targeting. See [Wikipedia](https://en.wikipedia.org/wiki/DBFS) for a description of DBFS.

  _Not available on iOS_

- `agc-compression-gain-db`
  Used in the `AutomaticGainControl` pipeline component, this parameter adds the specified decibel gain after performing dynamic range compression. This setting should be tuned in conjunction with the specific wakeword you're using and any devices you're targeting.

  _Not available on iOS_

- `trace-level`
  Determines the level of logging output received by your app. See the `SpeechContext.TraceLevel` enum on Android or the `Trace` enum on iOS for valid values.

  **iOS name**: `tracing`

## iOS-specific Parameters

These parameters only exist in the iOS `SpeechConfiguration` class.

- `vadMode`
  Determines how sensitive the VAD will be, representing a tradeoff between precision (the likelihood that when the VAD is active, speech really did occur) and recall (the likelihood that the VAD will activate when speech occurs, though it might also activate for non-speech noise). See the `VADMode` enum for possible values.

- `wakePhrases`
  A comma-separated list of space-separated keyword phrases used to activate the Apple ASR-based wakeword detector. If your wakeword can be transcribed as two words, you may wish to list both variants here for the best performance; for example, `"spoke stack,spokestack"`. In addition, if you find your desired wakeword being transcribed poorly by ASR, you can include common misspellings; for example, `"spoke stack,spokestack,smoke stack,smokestack"`.

- `wakewordRequestTimeout`
  When using Apple's ASR for wakeword detection, this is the amount of time, in milliseconds, allotted to each request. Apple has an undocumented limit of 1 minute for requests to its built-in ASR, so that is an upper bound for this parameter. The Apple wakeword detector automatically restarts requests that time out, so this parameter controls how often those restarts occur when the wakeword is not detected. We recommend keeping this timeout relatively long.

- `authorization`
  Used to authorize requests for Spokestack TTS. Defaults to an API key that allows access only to the free `demo-male` voice.
