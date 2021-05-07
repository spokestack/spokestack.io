import { MIN_DEFAULT_MEDIA_QUERY, MIN_TEXT_WIDTH } from '../styles/theme'

import Create from '../components/Create'
import Feature from '../components/Feature'
import Layout from '../components/Layout'
import React from 'react'
import SEO from '../components/SEO'
import { css } from '@emotion/react'

export default function Features() {
  return (
    <Layout>
      <SEO
        title="Features for Voice User Interfaces | Spokestack"
        description="Spokestack makes it easy to add voice user interfaces to your mobile apps and websites. Explore the features of our libraries and services."
      />
      <div css={styles.container}>
        <section css={styles.content}>
          <header css={styles.header}>
            <h2>Easily add voice to your UX</h2>
            <p>
              Spokestack makes it easy to add voice user interfaces to your
              mobile apps and websites. Our open-source native libraries for
              Android and iOS provide a unified API for using voice on mobile.
              Our hosted web services augment the natural language processing
              capabilities across other platforms.
            </p>
          </header>
          <div css={styles.features}>
            <Feature
              id="wake-word"
              icon="#wake-word"
              iconCss={css`
                width: 42px;
                height: 36px;
              `}
              name="Wake word"
              text="A wake word is a specific term or phrase that can wake up an app for active listening. “Hey Siri” and “Alexa” are two of the most widely known wake words. The Spokestack native libraries have built-in support for wake words on mobile. Our services include building a customized, high-performance wake word model for your brand."
            />
            <Feature
              id="keyword"
              icon="#keyword"
              iconCss={css`
                width: 40px;
                height: 38px;
              `}
              name="Keyword"
              text="A keyword is a brief command that supports variations in phrasing—using a fast, lightweight model—without user audio leaving the device."
            />
            <Feature
              id="text-to-speech"
              icon="#tts"
              iconCss={css`
                width: 40px;
                height: 39px;
              `}
              name="Text-to-speech &amp; custom voice"
              text="Text-to-speech (TTS) is how voice user interfaces talk back. Spokestack provides a hosted TTS service that you can access directly or through our native libraries. What separates Spokestack TTS from other providers is our synthetic voice capability. Spokestack will build a custom voice model from your audio data so you can present a branded voice experience to your customers."
            />
            <Feature
              id="speech-recognition"
              icon="#asr"
              iconCss={css`
                width: 46px;
                height: 39px;
              `}
              name="Automatic Speech Recognition"
              text="The technology for converting spoken words to text is known as Automatic Speech Recognition (ASR). The Spokestack open-source native libraries provide a convenient API across multiple ASR providers such as Apple, Google, and Microsoft."
            />
            <Feature
              id="understanding"
              icon="#nlu"
              iconCss={css`
                width: 34px;
                height: 38px;
              `}
              name="Natural Language Understanding"
              text="Natural Language Understanding (NLU) is what makes user speech actionable. Spokestack provides deep learning-based NLU models that can be deployed on device or to a web service. On-device NLU keeps your customer data away from third-party services and can operate even without a network connection."
            />
            <Feature
              id="vad"
              icon="#vad"
              iconCss={css`
                width: 48px;
                height: 38px;
              `}
              name="Voice Activity Detection"
              text="Voice Activity Detection (VAD) is responsible for making an initial determination of whether or not a snippet of audio contains human speech. Ignoring audio that's not detected as speech saves energy and processing power. The savings grow with each downstream processor you have in your speech pipeline."
            />
            <Feature
              id="speech-pipeline"
              icon="#speech-pipeline"
              iconCss={css`
                width: 43px;
                height: 38px;
              `}
              name="Speech Pipeline"
              text="The speech pipeline is the main way you interact with Spokestack’s VAD, wake word, and speech recognition. The speech pipeline is an extensible audio processing pipeline that includes a variety of built-in speech processors for voice activity detection (VAD), wake word activation, and automatic speech recognition (ASR)."
            />
          </div>
        </section>
        <Create />
      </div>
    </Layout>
  )
}

const styles = {
  container: css`
    padding: 50px 0;
  `,
  content: css`
    padding: 0 20px;
    max-width: ${MIN_TEXT_WIDTH};
    margin: 0 auto;
  `,
  header: css`
    margin-bottom: 30px;
  `,
  features: css`
    padding-top: 50px;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding: 0;
    }
  `,
  image: css`
    width: 80px;
    height: 80px;
    display: block;
    flex-shrink: 0;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      margin-right: 25px;
    }
  `
}
