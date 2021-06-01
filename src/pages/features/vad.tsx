import React from 'react'
import Header from '../../components/features/Header'
import Section from '../../components/features/Section'
import Layout from '../../components/Layout'
import SEO from '../../components/SEO'
import * as styles from '../../styles/features.css'
import { StaticImage } from 'gatsby-plugin-image'
import Create from '../../components/Create'
import removeTrailingSlash from '../../utils/removeTrailingSlash'

export default function VADPage() {
  return (
    <Layout>
      <SEO
        title="Voice Activity Detection (VAD) - Spokestack Maker"
        description="Determine whether or not an audio snippet contains human speech with Voice Activity Detection. VAD is the first gatekeeper in a speech detection pipeline."
        image={`${removeTrailingSlash(process.env.SITE_URL!)}/seo/vad.png`}
      />
      <Header
        title="Voice Activity Detection"
        subtitle="Determine whether or not an audio snippet contains human speech."
        image={
          <StaticImage
            width={600}
            alt="VAD"
            src="../../images/features/vad-wake-word.png"
          />
        }
      />
      <div css={styles.content}>
        <Section title="What is Voice Activity Detection?">
          <p>
            The very beginning of a voice-activated{' '}
            <a href="/features/speech-pipeline">speech pipeline</a> resolves the
            very first problem in that description &mdash; how to determine
            whether a human voice is speaking?
          </p>
          <blockquote>
            <strong>Voice activity detection</strong>, or VAD, is the first
            gatekeeper in a speech detection pipeline.
          </blockquote>
          <p>
            It&apos;s responsible for making an initial determination of whether
            or not a snippet of audio contains human speech. Ignoring audio
            that&apos;s not detected as speech saves energy and processing
            power. The savings grow with each downstream processor you have in
            your speech pipeline.
          </p>
        </Section>
        <Section title="How Does VAD Work?">
          <p>
            VADs range in complexity from simple frequency analyzers to heavier
            black-box neural models. The underlying implementation in
            Spokestack&apos;s libraries varies based on tools available for the
            various platforms, but we try to strike a balance between speed and
            accuracy. The speech pipeline is a{' '}
            <a href="https://en.wikipedia.org/wiki/Real-time_computing#Criteria_for_real-time_computing">
              soft real-time
            </a>{' '}
            system and thus must be as responsive as possible.
          </p>
          <p>
            It&apos;s worse for a downstream component to miss user speech than
            to process too much. Our VADs tend to err on the side of producing
            false positives rather than rejecting actual speech.
          </p>
        </Section>
      </div>
      <Create />
    </Layout>
  )
}
