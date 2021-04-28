---
title: Learn to use wake word and text-to-speech on a Raspberry Pi.
date: '2020-10-05'
description: Following this guide teaches you how to deploy your Maker models on an embedded device.
author: will
tags: Apps, Engineering, Python, Tutorial
draft: true
hero: ../assets/blog/
---

One of the primary motivations for working on [spokestack-python](https://github.com/spokestack/spokestack-python) was to allow our models to run on embedded devices like [Raspberry Pi](raspberrypi.org). We are excited to show you how easy it is to use [Wake Word](/docs/concepts/wakeword) and [TTS](/docs/concepts/tts) models on these devices.

## Spokestack Account

You will want to [login](https://www.spokestack.io/account/login) and get your API keys for this tutorial. If you do not already have a Spokestack account please [create one](https://www.spokestack.io/account/create)

## Hardware

This tutorial is geared toward the [Raspberry Pi 4B](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/) and [Zero W](https://www.raspberrypi.org/products/raspberry-pi-zero-w/). Technically, the minimum hardware requirements for this tutorial are a device that runs [Python](https://www.python.org), a microphone, and at least one speaker. The recommended hardware is listed below. In addition, we have created a [wishlist](https://www.adafruit.com/wishlists/524930) on Adafruit that is exactly what we used for this tutorial. If you have issues using other hardware or want to show us what you made, feel free to [contact us](/support). We are working on more hardware guides, so stay tuned!

### Parts List

- [Raspberry Pi 4 Model B](https://www.adafruit.com/product/4296) or [Zero W](https://www.adafruit.com/product/3708)
- [Adafruit Voice Bonnet](https://www.adafruit.com/product/4757)
- [Mono Enclosed Speaker](https://www.adafruit.com/product/3351)
- [Official Raspberry Pi Power Supply](https://www.adafruit.com/product/4298)
- [SD/MicroSD Memory Card](https://www.adafruit.com/product/2693)

  **Note: The Zero W runs a little slower than we would like**

## Raspberry Pi Setup

For the initial setup of the Raspberry Pi we recommend following the [Adafruit Voice Bonnet tutorial](https://learn.adafruit.com/adafruit-voice-bonnet/overview). This guide walks you through everything from OS installation to sound configuration. In addition, to the Adafruit instructions there are few Spokestack specific instructions/tips in the following.

### Audio

PulseAudio and the Adafruit Voice Bonnet do not interact well so you will want to disable PulseAudio with the following:

```shell
systemctl --user stop pulseaudio.socket pulseaudio.service
```

If you would like to enable PulseAudio afterward you can restart the service with:

```shell
systemctl --user start pulseaudio.socket pulseaudio.service
```

### System Dependencies

The following are some system dependencies that need to be installed before installing `spokestack` on the Raspberry Pi.

#### PyAudio

`sudo apt-get -y install portaudio19-dev`

#### Numpy

`sudo apt-get -y install libblas-dev`

#### Streamp3

`sudo apt-get -y install libmp3lame-dev`

### Install Rust for Tokenizers

The command to install Rust is taken directly from the [instructions](https://www.rust-lang.org/tools/install). On a Raspberry Pi 4, I didn't have any issues compiling Rust, but if you are using the Zero, you may need to cross-compile. We are currently working on an easy solution for the smaller embedded devices.

`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

### TFlite Interpreter

For this, we can go with TensorFlow recommended apt package. We've used the `pip` versions in the past, but this one is easier to install. These commands are directly from the original [instructions](https://www.tensorflow.org/lite/guide/python#install_tensorflow_lite_for_python).

```shell
echo "deb https://packages.cloud.google.com/apt coral-edgetpu-stable main" | sudo tee /etc/apt/sources.list.d/coral-edgetpu.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
sudo apt-get update
sudo apt-get install python3-tflite-runtime
```

## Installing Spokestack

Spokestack should be installed though `pip`. We are currently using `v0.0.20` for this tutorial. However, newer versions should be backwards compatible.

```shell
pip install spokestack==0.0.20
```

## Testing with a Project

We will test with our Spokestack "Hello, World!" [project](https://github.com/spokestack/python-hello-world). Keep in mind we installed the dependencies in the previous sections.

```shell
git clone https://github.com/spokestack/python-hello-world.git
cd python-hello-world
```

You will want to add your API keys to the `const.py` in `KEY_ID` and `KEY_SECRET`. Now we should be able to run the app. The project will automatically download the default wake word models. Once running, the default text-to-speech voice will respond when you say "Hey, Spokestack!"

```shell
python app.py
```

### Wrapping Up

In this tutorial, we covered how to set up Spokestack on an embedded device. This should get you started with using Spokestack with your projects. If you run into any trouble be sure to reach out through our [channels](/support).
