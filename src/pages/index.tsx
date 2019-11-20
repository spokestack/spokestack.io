import {
  LARGE_DISPLAY_WIDTH,
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_TABLET_MEDIA_QUERY
} from 'typography-breakpoint-constants'
import { PageRendererProps, graphql } from 'gatsby'
import React, { useRef } from 'react'
import { adjustFontSizeTo, rhythm } from '../utils/typography'

import Card from '../components/Card'
import Layout from '../components/Layout'
import { Query } from '../utils/graphql'
import SEO from '../components/SEO'
import SVGIcon from '../components/SVGIcon'
import StickyNavLayout from '../components/StickyNavLayout'
import UsageMap from '../components/UsageMap'
import { css } from '@emotion/core'
import iconArrow from '../icons/arrow-forward.svg'

interface Props extends PageRendererProps {
  data: Query
}

export default function Index({ data, location }: Props) {
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

  return (
    <Layout>
      <SEO title={siteTitle} keywords={['spokestack', 'mobile', 'voice']} />
      <header css={styles.header}>
        <h1 css={styles.headerText}>Give your mobile app a voice</h1>
        <h4 css={[styles.headerText, styles.h4]}>
          Spokestack is a powerful platform of open source libraries and robust services to make
          your app voice-enabled.
        </h4>
        <a href="/docs" className="btn btn-large">
          Get started
          <SVGIcon icon={iconArrow.id} style={{ fill: 'var(--header-color)' }} />
        </a>
      </header>
      <div css={styles.usageWrap}>
        <div css={styles.usage}>
          <div css={styles.usageText}>
            <h3>Today&apos;s consumers want to speak to their products and services.</h3>
            <p>
              Over 58% of Americans use their phone as a voice assistant<sup>*</sup>. That’s more
              users than those of smart speaker, smart watch and desktop voice assistants combined.
              As Airpods&trade; and other voice assistant-powered headphones gain popularity, users
              will expect apps to have a voice, either to help them navigate or provide a hands-free
              experience.
            </p>
          </div>
          <UsageMap />
        </div>
      </div>
      <StickyNavLayout id="products" matchHash links={links} location={location}>
        <h1 css={styles.productsHeader}>Products &amp; Services</h1>
        <div id="asr" css={styles.feature} ref={links[0].ref}>
          <h2>Spokestack ASR and VAD</h2>
          <p css={styles.title}>
            A one-stop shop for Automatic Speech Recognition (ASR) and Voice Activity Detection
            (VAD)
          </p>
          <div css={styles.description}>
            <p>
              Easily add ASR and VAD to your app with one of our{' '}
              <a href="https://github.com/spokestack">Spokestack libraries</a>. Spokestack ASR and
              VAD allows you to turn user utterances into text, which is the first step to
              responding to a user.
            </p>
            <p>
              <a href="/docs" className="link-with-icon">
                Get started
                <SVGIcon icon={iconArrow.id} style={{ fill: 'var(--header-color)' }} />
              </a>
            </p>
          </div>
        </div>
        <div id="wakeword" css={styles.feature} ref={links[1].ref}>
          <h3>Spokestack Wakeword</h3>
          <p css={styles.title}>Choose the keyword that will be the wakeword for your app.</p>
          <div css={styles.description}>
            <p>
              Spokestack lets you use your brand name or keyword of choice to put your app into
              listen mode. Like &ldquo;Siri&rdquo;, &ldquo;OK Google&rdquo;, or &ldquo;Alexa&rdquo;,
              your app will respond to your wakeword while it is open.
            </p>
            <p>
              <a href="mailto:hello@spokestack.io" className="link-with-icon">
                Email us for details on getting a custom wakeword
                <SVGIcon icon={iconArrow.id} style={{ fill: 'var(--header-color)' }} />
              </a>
            </p>
          </div>
        </div>
        <div id="tts" css={styles.feature} ref={links[2].ref}>
          <h3>Spokestack TTS</h3>
          <p css={styles.title}>Create a custom voice for your brand.</p>
          <div css={styles.description}>
            <p>
              Spokestack enables your app to use a custom voice that responds to your users with our
              Text-to-Speech (TTS) service. We even offer a default voice for free!
            </p>
            <p>
              Our TTS engine can create a custom voice for your brand with as little as five minutes
              of recordings. We can also work with your own voice talent in professional recording
              studios to produce a high quality branded voice for your app.
            </p>
            <p>
              <a href="mailto:hello@spokestack.io" className="link-with-icon">
                Email us for details on getting a custom branded voice
                <SVGIcon icon={iconArrow.id} style={{ fill: 'var(--header-color)' }} />
              </a>
            </p>
          </div>
        </div>
        <div id="nlu" css={styles.feature} ref={links[3].ref}>
          <h3>Spokestack NLU</h3>
          <p css={styles.title}>
            Keep your data and customer conversations in your app where it belongs with our Natural
            Language Understanding (NLU) engine.
          </p>
          <div css={styles.description}>
            <p>
              Using the Spokestack NLU will empower you to communicate the unique requests, context
              and pronunciations of words that matter to you and users. Combined with Spokestack
              TTS, Spokestack NLU helps create a voice-enabled user experienced optimized for your
              brand.
            </p>
            <p>
              <a href="mailto:hello@spokestack.io" className="link-with-icon">
                Email us for details on getting a custom NLU for your app
                <SVGIcon icon={iconArrow.id} style={{ fill: 'var(--header-color)' }} />
              </a>
            </p>
          </div>
        </div>
      </StickyNavLayout>
      <section css={styles.summary}>
        <h1 css={styles.summaryHeader}>Why Choose Spokestack?</h1>
        <div css={styles.summaryDetails}>
          <Card title="Spokestack ASR and VAD" extraCss={styles.largeCard}>
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
          <Card title="Spokestack TTS" extraCss={styles.largeCard}>
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
          <Card title="Spokestack Wakeword">
            <ul css={styles.list}>
              <li>
                <p>
                  Add a custom wakeword that suits your brand without training a Machine Learning
                  model on your own
                </p>
              </li>
            </ul>
          </Card>
          <Card title="Spokestack NLU">
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
    color: var(--text-color-dark-bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: ${rhythm(1.3)} 20px 160px;
    background: var(--primary-color) url(/background.svg) no-repeat;
    background-position: center bottom -1px;

    @media (min-width: 1440px) {
      background-size: cover;
    }
    ${MIN_TABLET_MEDIA_QUERY} {
      padding: ${rhythm(4)} 20px ${rhythm(8)};
    }
  `,
  headerText: css`
    color: var(--text-color-dark-bg);
    max-width: 600px;
  `,
  productsHeader: css`
    margin-bottom: 0;
  `,
  h4: css`
    font-weight: 400;
    ${MIN_DEFAULT_MEDIA_QUERY} {
      font-size: ${adjustFontSizeTo('25px').fontSize};
      line-height: ${adjustFontSizeTo('25px').lineHeight};
    }
  `,
  usageWrap: css`
    background-color: white;
    margin-top: -1px;
  `,
  usage: css`
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      display: grid;
      grid-template-columns: 1fr 640px;
      max-width: ${LARGE_DISPLAY_WIDTH};
      margin: 0 auto;
      padding-right: 20px;
    }
  `,
  usageText: css`
    padding: ${rhythm(0.5)} 20px;

    h3,
    p {
      max-width: 600px;
    }

    ${MIN_TABLET_MEDIA_QUERY} {
      h3,
      p {
        text-align: center;
      }
    }
  `,
  feature: css`
    padding-top: ${rhythm(1)};

    ${MIN_DEFAULT_MEDIA_QUERY} {
      margin-bottom: ${rhythm(3)};
    }
  `,
  title: css`
    font-size: ${adjustFontSizeTo('25px').fontSize};
    line-height: ${adjustFontSizeTo('25px').lineHeight};
  `,
  list: css`
    list-style-image: url(/arrow-forward.svg);
  `,
  description: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      margin: ${rhythm(1.5)} 0 ${rhythm(2)};
    }
  `,
  summary: css`
    background-color: white;
    padding: ${rhythm(3)} 0;
  `,
  summaryHeader: css`
    text-align: center;
  `,
  summaryDetails: css`
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 100%;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      max-width: ${LARGE_DISPLAY_WIDTH};
      margin: 0 auto;
      grid-template-columns: 1fr 1fr;
      grid-auto-columns: minmax(300px, auto);
      padding-right: 20px;
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
