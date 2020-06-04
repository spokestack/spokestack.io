import AppStoreButton from '../components/AppStoreButton'
import BlueCard from '../components/BlueCard'
import Feature from '../components/Feature'
import Layout from '../components/Layout'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import { MIN_TEXT_WIDTH } from '../styles/theme'
import React from 'react'
import SEO from '../components/SEO'
import { css } from '@emotion/core'

export default function Features() {
  return (
    <Layout>
      <SEO
        title="Features"
        longTitle="Spokestack Features"
        description={`Discover all of the features Spokestack to make your app fully voice-enabled,
        including Automatic Speech Recognition, Natural Language Processing, Text-to-Speech, and Wakeword.`}
      />
      <div css={styles.container}>
        <section css={styles.content}>
          <header css={styles.header}>
            <h1>Easily add voice to your UX</h1>
            <p>
              Spokestack makes it easy to add voice user interfaces to your
              mobile apps and websites. Our open-source native libraries for
              Android and iOS provide a unified API for using voice on mobile.
              Our hosted web services augment the natural language processing
              capabilities across other platforms.
            </p>
          </header>
          <h2>Libraries &amp; services</h2>
          <div css={styles.features}>
            <Feature
              id="understanding"
              imageUrl="/navigation/nlu.svg"
              name="Natural language understanding"
              text="Natural language understanding (NLU) is what makes user speech actionable. Spokestack provides deep learning-based NLU models that can be deployed on device or to a web service. On-device NLU keeps your customer data away from third-party services and can operate even without a network connection."
            />
            <Feature
              id="speech-recognition"
              imageUrl="/navigation/asr.svg"
              name="Automatic speech recognition"
              text="The technology for converting spoken words to text is known as automatic speech recognition (ASR). The Spokestack open-source native libraries provide a convenient API across multiple ASR providers such as Apple, Google, and Microsoft."
            />
            <Feature
              id="text-to-speech"
              imageUrl="/navigation/tts.svg"
              name="Text-to-speech &amp; custom voice"
              text="Text-to-speech (TTS) is how voice user interfaces talk back. Spokestack provides a hosted TTS service that you can access directly or through our native libraries. What separates Spokestack TTS from other providers is our synthetic voice capability. Spokestack will build a custom voice model from your audio data so you can present a branded voice experience to your customers."
            />
            <Feature
              id="wakeword"
              imageUrl="/navigation/wakeword.svg"
              name="Wake word"
              text="A wake word is a specific term or phrase that can wake up an app for active listening. “Hey Siri” and “Alexa” are two of the most widely known wake words. The Spokestack native libraries have built-in support for wake words on mobile. Our services include building a customized, high-performance wake word model for your brand."
            />
          </div>
        </section>
        <BlueCard
          small
          button={
            <AppStoreButton slug="https://apps.apple.com/us/app/spokestack-studio/id1508393980" />
          }
          title="Download Spokestack Studio"
          text="Preview the capabilities of a voice user interface powered by Spokestack."
        />
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
  `
}
