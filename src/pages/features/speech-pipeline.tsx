import React from 'react'
import Header from '../../components/features/Header'
import Section from '../../components/features/Section'
import Layout from '../../components/Layout'
import SEO from '../../components/SEO'
import * as styles from '../../styles/features.css'
import { StaticImage } from 'gatsby-plugin-image'
import Create from '../../components/Create'

export default function SpeechPipelinePage() {
  return (
    <Layout>
      <SEO
        title="Speech Pipeline | Spokestack"
        description="The Spokestack Speech Pipeline is an extensible audio processing pipeline that includes a variety of built-in speech processors for all processing stages, including VAD, wake word and keyword recognition, and ASR."
      />
      <Header
        title="Spokestack Speech Pipeline"
        image={
          <StaticImage
            placeholder="blurred"
            alt="Speech Pipeline"
            src="../../images/features/asr.png"
          />
        }
      />
      <div css={styles.content}>
        <Section title="What is the Speech Pipeline?">
          <p>
            The <strong>speech pipeline</strong> is an extensible audio
            processing pipeline that includes a variety of built-in speech
            processors for{' '}
            <a href="/features/vad">voice activity detection (VAD)</a>,{' '}
            <a href="/features/wake-word">wake word activation</a>,{' '}
            <a href="/features/keyword">keyword recognition</a>, and{' '}
            <a href="/features/asr">automatic speech recognition (ASR)</a>.
          </p>
        </Section>
        <Section title="How Does the Speech Pipeline Work?">
          <p>
            This pipeline seamlessly integrates VAD-triggered wake word
            detection using on-device machine learning models and speech
            transcription using ASR. It runs as a{' '}
            <a href="https://en.wikipedia.org/wiki/Real-time_computing#Criteria_for_real-time_computing">
              soft real-time
            </a>{' '}
            system , and its components must be as responsive as possible.
          </p>
          <p>
            When Spokestack detects a wake word, the speech pipeline begins
            transcribing the user&apos;s speech until they stop talking for a
            pre-set amount of time, or a total activation time limit elapses.
            The technology for converting spoken words to text is known as ASR.
          </p>
          <p>
            The speech pipeline is the first piece of the puzzle in any voice
            interaction and is responsible for capturing user audio and
            translating it into text. Configuring it entails choices about
            whether or not to use a wake word to activate ASR, what kind of
            preprocessing to perform on audio before sending it to ASR, and
            which ASR service to use. These choices can all be made{' '}
            <a href="/docs/Machine Learning/pipeline-configuration">
              individually or through the use of configuration profiles
            </a>
            .
          </p>
        </Section>
        <Section title="Why Should I Use Spokestack's Speech Pipeline?">
          <p>
            <a href="/features/vad">Voice activity detection</a> enables the
            pipeline to listen to small segments of audio and determine if
            speech is present. To keep computation usage low for edge devices,
            the rest of the pipeline does not proceed if the VAD does not detect
            speech.
          </p>
          <p>
            A <a href="/features/wake-word">wake word</a> enables the pipeline
            to listen to speech audio and determine if a name from a set of
            recognized names is spoken. This fulfills two objectives: one, only
            listen in on a conversation if the wake word is being spoken; and
            two, preserve the higher-cost ASR component to transcribe only when
            the user wants to talk.
          </p>
          <p>
            <a href="/features/keyword">Keyword recognition</a> enables your
            software to listen for multiple brief commands and support
            variations in phrasing for each of them—using a fast, lightweight
            model—without user audio leaving the device. Instead of having to
            recognize and respond to anything that can be said, like a voice
            assistant, keyword recognition allows you simplify processing and
            act on what users expect.
          </p>
          <p>
            <a href="/features/asr">Automatic speech recognition</a> refers to
            the process of analyzing and transcribing a chunk of audio without
            human intervention, producing text that software can process
            further, either to perform a function or simply to record it. This
            feature is essential for any voice interaction.
          </p>
        </Section>
      </div>
      <Create />
    </Layout>
  )
}
