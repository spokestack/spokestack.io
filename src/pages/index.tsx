import {
  LARGE_DISPLAY_WIDTH,
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_TABLET_MEDIA_QUERY
} from 'typography-breakpoint-constants'
import { PageRendererProps, graphql } from 'gatsby'
import React, { useEffect, useRef, useState } from 'react'

import * as theme from '../utils/theme'
import Card from '../components/Card'
import Layout from '../components/Layout'
import { Query } from '../utils/graphql'
import SEO from '../components/SEO'
import SVGIcon from '../components/SVGIcon'
import SampleVoices from '../components/SampleVoices'
import StickyNavLayout from '../components/StickyNavLayout'
import { css } from '@emotion/core'
import iconArrow from '../icons/arrow-forward.svg'
import iconPlay from '../icons/play.svg'
import { rhythm } from '../utils/typography'

interface Props extends PageRendererProps {
  data: Query
}

export default function Index({ data, location }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [played, setPlayed] = useState(false)
  const siteTitle = data.site.siteMetadata.title
  const links = [
    {
      href: '/#asr',
      title: 'Spokestack ASR and VAD',
      ref: useRef<HTMLDivElement>(null)
    },
    {
      href: '/#wakeword',
      title: 'Spokestack Wakeword',
      ref: useRef<HTMLDivElement>(null)
    },
    {
      href: '/#tts',
      title: 'Spokestack TTS',
      ref: useRef<HTMLDivElement>(null)
    },
    {
      href: '/#nlu',
      title: 'Spokestack NLU',
      ref: useRef<HTMLDivElement>(null)
    }
  ]

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('playing', () => {
        setPlayed(true)
      })
    }
  }, [])

  return (
    <Layout>
      <SEO title={siteTitle} keywords={['spokestack', 'mobile', 'voice']} />
      <header css={styles.header}>
        <h1 css={styles.headerText}>Give your mobile app a voice&trade;</h1>
        <h4 css={[styles.headerText, styles.h4]} className="spokestack-speakable">
          Spokestack is a powerful platform of open source libraries and robust services to make
          your app fully voice-enabled.
        </h4>
        <a href="/docs" className="btn btn-large">
          Get started
          <SVGIcon
            icon={iconArrow.id}
            style={{ fill: theme.header, width: '17px', height: '17px' }}
          />
        </a>
      </header>
      <div css={styles.usageWrap}>
        <div css={styles.usage}>
          <div css={styles.usageText}>
            <h3>Why your mobile app needs voice control</h3>
            <p>
              Over{' '}
              <a href="https://voicebot.ai/2019/01/15/twice-the-number-of-u-s-adults-have-tried-in-car-voice-assistants-as-smart-speakers/">
                58% of Americans
              </a>{' '}
              use their phone as a voice assistant. That&lsquo;s more users than those of smart
              speaker, smart watch and desktop voice assistants combined. As Airpods&trade; and
              other voice assistant-powered headphones gain popularity, users will expect apps to
              have a voice and provide a hands-free experience.
            </p>
          </div>
          <div css={styles.videoWrap}>
            <video ref={videoRef} controls={played} css={styles.video} poster="/poster_2x.jpg">
              <source src="spokestack-1920x1080.mp4" type="video/mp4" media="(min-width: 1920px)" />
              <source src="spokestack-1280x720.mp4" type="video/mp4" media="(min-width: 1280px)" />
              <source src="spokestack-960x540.mp4" type="video/mp4" media="(min-width: 960px)" />
              <source src="spokestack-640x360.mp4" type="video/mp4" media="(min-width: 640px)" />
              <source src="spokestack-426x240.mp4" type="video/mp4" />
            </video>
            <a
              css={styles.playLink}
              onClick={() => videoRef.current.play()}
              style={played ? { display: 'none' } : null}>
              <div className="play-icon">
                <SVGIcon icon={iconPlay.id} style={{ width: '30px', height: '35px' }} />
              </div>
            </a>
          </div>
        </div>
      </div>
      <StickyNavLayout id="products" matchHash links={links} location={location}>
        <h1 css={styles.productsHeader}>Products &amp; Services</h1>
        <div id="asr" css={styles.feature} ref={links[0].ref}>
          <h2>Spokestack ASR and VAD</h2>
          <p className="title">
            A one-stop shop for Automatic Speech Recognition (ASR) and Voice Activity Detection
            (VAD)
          </p>
          <p>
            Easily add ASR and VAD to your app with one of our{' '}
            <a href="https://github.com/spokestack">open source libraries</a>. Spokestack ASR and
            VAD allow you to turn user utterances into text, which is the first step to responding
            to a user. From there, use Spokestack Wakeword, TTS and NLU to complete the voice
            experience.
          </p>
          <a href="/docs" className="link-with-icon">
            Get started
            <SVGIcon
              icon={iconArrow.id}
              style={{ fill: theme.primary, width: '17px', height: '17px' }}
            />
          </a>
        </div>
        <div id="wakeword" css={styles.feature} ref={links[1].ref}>
          <h2>Spokestack Wakeword</h2>
          <p className="title">Choose the keyword that will be the wakeword for your app.</p>
          <p>
            Use your brand name or any keyword of your choice to put your app into listen mode, also
            with the help of one of the{' '}
            <a href="https://github.com/spokestack">Spokestack libraries</a>. Like
            &ldquo;Siri&rdquo;, &ldquo;OK Google&rdquo;, or &ldquo;Alexa&rdquo;, your app will
            respond to your wakeword while it is open.
          </p>
          <a href="mailto:hello@spokestack.io" className="link-with-icon">
            Email us for details on getting a custom wakeword
            <SVGIcon
              icon={iconArrow.id}
              style={{ fill: theme.primary, width: '17px', height: '17px' }}
            />
          </a>
        </div>
        <div id="tts" css={styles.feature} ref={links[2].ref}>
          <h2>Spokestack TTS</h2>
          <p className="title">Create a custom voice for your brand.</p>
          <p>
            Get a custom voice or use the default voice for free. Respond to your users with our
            proprietary Text-to-Speech (TTS) service.
          </p>
          <p>
            Our TTS engine can create a custom voice for your brand with as little as five minutes
            of recordings. We can also work with your own voice talent in a professional recording
            studio to produce a high quality branded voice for your app.
          </p>
          <p>
            <a href="mailto:hello@spokestack.io" className="link-with-icon">
              Email us for details on getting a custom branded voice
              <SVGIcon
                icon={iconArrow.id}
                style={{ fill: theme.primary, width: '17px', height: '17px' }}
              />
            </a>
          </p>
          <p>
            Try some of our voice samples below. Each voice is generated using different recording
            times and methods.
          </p>
          <SampleVoices />
        </div>
        <div id="nlu" css={styles.feature} ref={links[3].ref}>
          <h2>Spokestack NLU</h2>
          <p className="title">
            Keep your data and customer conversations in your app where it belongs with our Natural
            Language Understanding (NLU) engine.
          </p>
          <p>
            Use the Spokestack NLU engine to communicate the unique requests, context and
            pronunciations of words that matter to you and users. Combined with Spokestack TTS,
            Spokestack NLU helps create a voice-enabled user experience optimized for your brand.
          </p>
          <a href="mailto:hello@spokestack.io" className="link-with-icon">
            Email us for details on getting a custom NLU for your app
            <SVGIcon
              icon={iconArrow.id}
              style={{ fill: theme.primary, width: '17px', height: '17px' }}
            />
          </a>
        </div>
      </StickyNavLayout>
      <section css={styles.summary}>
        <h1 css={styles.summaryHeader}>Why Choose Spokestack?</h1>
        <div css={styles.summaryDetails}>
          <Card
            title="Spokestack ASR and VAD"
            extraCss={css`
              ${styles.card}
              ${styles.largeCard}
            `}>
            <ul css={styles.list}>
              <li>
                <p>One-stop shop for adding ASR and VAD to your mobile apps</p>
              </li>
              <li>
                <p>
                  Easily add Text-to-Speech (TTS) and a wakeword to your app with Spokestack or
                  other providers, such as Siri, Google Assistant, or Alexa
                </p>
              </li>
            </ul>
          </Card>
          <Card
            title="Spokestack TTS"
            extraCss={css`
              ${styles.card}
              ${styles.largeCard}
            `}>
            <ul css={styles.list}>
              <li>
                <p>Hand off model training and prosody</p>
              </li>
              <li>
                <p>Fast, built to deliver responses at real time</p>
              </li>
              <li>
                <p>Know exactly what your customers are saying without an intermediary</p>
              </li>
            </ul>
          </Card>
          <Card title="Spokestack Wakeword" extraCss={styles.card}>
            <ul css={styles.list}>
              <li>
                <p>
                  Add a custom wakeword that suits your brand without training a Machine Learning
                  model on your own
                </p>
              </li>
            </ul>
          </Card>
          <Card title="Spokestack NLU" extraCss={styles.card}>
            <ul css={styles.list}>
              <li>
                <p>
                  A cross-platform NLU built for multimodal management and consistency throughout
                  the user experience
                </p>
              </li>
            </ul>
          </Card>
        </div>
      </section>
    </Layout>
  )
}

const styles = {
  header: css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: ${rhythm(1.3)} 20px 160px;
    background: ${theme.primary} url(/background.svg) no-repeat;
    background-position: center bottom;
    color: ${theme.textDarkBg};
    width: 100%;

    @media (min-width: 1440px) {
      background-size: cover;
    }
    ${MIN_TABLET_MEDIA_QUERY} {
      padding: ${rhythm(4)} 20px ${rhythm(8)};
    }
  `,
  headerText: css`
    color: ${theme.textDarkBg};
    max-width: 600px;
  `,
  productsHeader: css`
    margin-bottom: 0;
  `,
  h4: css`
    font-weight: 400;
  `,
  usageWrap: css`
    width: 100%;
    background-color: white;
    margin-top: -1px;
    z-index: 1;
  `,
  usage: css`
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px ${rhythm(2)};

    ${MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      display: grid;
      grid-template-columns: 1fr 1fr;
      max-width: 1200px;
      margin: 0 auto;
      padding: ${rhythm(2)} 20px ${rhythm(3)};
    }
  `,
  usageText: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 520px;
    padding: ${rhythm(0.5)} 0;
    text-align: center;

    h3 {
      max-width: 400px;
    }

    p {
      max-width: 520px;
    }

    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding-right: 20px;
    }
  `,
  videoWrap: css`
    position: relative;
  `,
  video: css`
    width: 100%;
    max-width: 600px;
    border-radius: 10px;
  `,
  playLink: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .play-icon {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 5px;
      background-color: ${theme.primary};
      transition: transform 0.2s ${theme.transitionEasing};
    }
    &:hover .play-icon {
      transform: scale(1.1);
    }
    &:active .play-icon {
      transform: scale(0.9);
    }
  `,
  feature: css`
    padding: ${rhythm(1)} 0;
  `,
  list: css`
    list-style-image: url(/arrow-forward.svg);
  `,
  summary: css`
    width: 100%;
    background-color: white;
    padding: ${rhythm(3)} 20px 20px;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding-bottom: ${rhythm(2)};
    }
  `,
  summaryHeader: css`
    text-align: center;
  `,
  summaryDetails: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 100%;
    margin-top: ${rhythm(2)};

    ${MIN_DEFAULT_MEDIA_QUERY} {
      width: 100%;
      max-width: ${LARGE_DISPLAY_WIDTH};
      margin-left: auto;
      margin-right: auto;
      grid-template-columns: 1fr 1fr;
      grid-auto-columns: minmax(300px, auto);
      padding-right: 0;
    }
  `,
  card: css`
    ${theme.ieBreakpoint} {
      width: 100%;
      max-width: none;
      margin-bottom: 20px;
    }
  `,
  largeCard: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      min-height: 250px;
    }
  `
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
