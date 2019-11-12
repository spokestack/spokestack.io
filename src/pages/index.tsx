import {
  DEFAULT_MEDIA_QUERY,
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_TABLET_MEDIA_QUERY
} from 'typography-breakpoint-constants'
import { PageRendererProps, graphql } from 'gatsby'
import React, { useEffect, useRef, useState } from 'react'
import { adjustFontSizeTo, rhythm } from '../utils/typography'

import Button from '../components/Button'
import Card from '../components/Card'
import { Global } from '@emotion/core'
import Layout from '../components/Layout'
import NavSelectedBackground from '../components/NavSelectedBackground'
import { Query } from '../utils/graphql'
import SEO from '../components/SEO'
import SVGIcon from '../components/SVGIcon'
import { css } from '@emotion/core'
import iconArrow from '../icons/arrow-forward.svg'

interface Props extends PageRendererProps {
  data: Query
}

const links = [
  { href: '/#branded-voice', title: 'Custom Branded Voice' },
  { href: '/#asr', title: 'Open source ASR Manager' },
  { href: '/#wakeword-creation', title: 'Wakeword Creation' },
  { href: '/#nlu', title: 'Natural Language Understanding (NLU)' }
]

const rhash = /[/#]/g

function hashToId(hash: string) {
  return hash.replace(rhash, '')
}

export default function Index({ data, location }: Props) {
  const siteTitle = data.site.siteMetadata.title
  const branded = useRef<HTMLDivElement>(null)
  const asr = useRef<HTMLDivElement>(null)
  const wakeword = useRef<HTMLDivElement>(null)
  const nlu = useRef<HTMLDivElement>(null)
  const [selectedId, setSelectedId] = useState<string>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      function(entries) {
        console.log(
          entries.reduce((acc, entry) => {
            if (entry.isIntersecting) {
              acc.push(entry)
            }
            return acc
          }, [])
        )
        for (const entry of entries) {
          if (entry.isIntersecting) {
            return setSelectedId(`${entry.target.id}-link`)
          }
        }
      },
      {
        root: null,
        threshold: 1
      }
    )
    observer.observe(branded.current)
    observer.observe(asr.current)
    observer.observe(wakeword.current)
    observer.observe(nlu.current)
    setSelectedId(`${hashToId(location.hash) || 'branded-voice'}-link`)
  }, [])

  return (
    <Layout>
      <SEO title={siteTitle} keywords={['spokestack', 'mobile', 'voice']} />
      <Global
        styles={css`
          .card ul {
            margin-bottom: 0;
          }
          .card li:last-child {
            margin-bottom: 0;
          }
          .card li p {
            margin: 0;
          }
        `}
      />
      <header css={styles.header}>
        <h1 css={styles.headerText}>Give your mobile app a voice</h1>
        <h4 css={[styles.headerText, styles.h4]}>
          When your customers say &ldquo;Hey Siri, open {'{my-app}'}&rdquo;, how will you respond?
          Let voice deliver your core value proposition to customers quicker.
        </h4>
        <Button large>
          Get started
          <SVGIcon icon={iconArrow.id} style={{ fill: 'var(--header-color)' }} />
        </Button>
      </header>
      <section css={styles.definition}>
        <h1>What is Spokestack?</h1>
        <p>
          Spokestack is a voice development platform that helps developers build custom voice
          experiences for mobile apps.
        </p>
      </section>
      <div css={styles.features}>
        <div css={styles.featuresNavWrap}>
          <nav css={styles.featuresNav}>
            {links.map((link, i) => {
              const id = `${hashToId(link.href)}-link`
              return (
                <a
                  key={`features-nav-link-${i}`}
                  css={styles.featuresNavLink}
                  id={id}
                  href={link.href}
                  title={link.title}
                  onClick={() => setSelectedId(id)}>
                  {link.title}
                </a>
              )
            })}
            <NavSelectedBackground selectedId={selectedId} />
          </nav>
        </div>
        <section id="products" css={styles.products}>
          <h1>Products &amp; Services</h1>
          <div id="branded-voice" css={styles.feature} ref={branded}>
            <h3>Custom Branded Voice</h3>
            <div css={styles.description}>
              <p>
                Choose from one of our voices or create your own uniquely branded synthetic voice to
                use in your app using Spokestack&rsquo;s Text-to-Speech (TTS) service.
              </p>
            </div>
            <Card title="Benefits">
              <ul css={styles.list}>
                <li>
                  <p>Hand off model training and prosody</p>
                </li>
                <li>
                  <p>Fast, built to deliver responses</p>
                </li>
                <li>
                  <p>Know exactly what your customers are saying without an intermediary</p>
                </li>
              </ul>
            </Card>
            {/* <Card title="Sample a Custom Voice">
            <p>Hand off model training and prosody</p>
            <p>Fast, built to deliver responses</p>
            <p>Know exactly what your customers are saying without an intermediary</p>
          </Card> */}
          </div>
          <div id="asr" css={styles.feature} ref={asr}>
            <h3>Open source Automatic Speech Recognition (ASR) Manager</h3>
            <div css={styles.description}>
              <p>
                Easily add and manage ASR and Voice Activated Detection (VAD) to your apps with a{' '}
                <a href="https://github.com/spokestack">Spokestack library</a> that fits your
                architecture.
              </p>
            </div>
            <Card title="Benefits">
              <ul css={styles.list}>
                <li>
                  <p>One-stop shop for adding ASR and VAD to your mobile apps</p>
                </li>
                <li>
                  <p>
                    Easily add custom Text-to-Speech (TTS) and a wakeword to your app with
                    Spokestack or from other providers such as Google Assistant, Siri, Alexa, etc.
                  </p>
                </li>
              </ul>
            </Card>
          </div>
          <div id="wakeword-creation" css={styles.feature} ref={wakeword}>
            <h3>Wakeword Creation</h3>
            <div css={styles.description}>
              <p>
                When your app is open, we will create a wakeword for your brand so users can call
                you by name.
              </p>
            </div>
            <Card title="Benefits">
              <ul css={styles.list}>
                <li>
                  <p>
                    We make it easy for you to add a branded wakeword without training a Machine
                    Learning (ML) model on your own
                  </p>
                </li>
              </ul>
            </Card>
          </div>
          <div id="nlu" css={styles.feature} ref={nlu}>
            <h3>Natural Language Understanding (NLU)</h3>
            <div css={styles.description}>
              <p>
                Want to unify your conversations across mobile, smart speaker and desktop? We have
                an NLU for that.
              </p>
            </div>
            <Card title="Benefits">
              <ul css={styles.list}>
                <li>
                  <p>
                    A cross-platform NLU that was built for multimodal management and consistencies
                    across the user experience
                  </p>
                </li>
              </ul>
            </Card>
          </div>
        </section>
      </div>
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
  h4: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      font-size: ${adjustFontSizeTo('25px').fontSize};
      line-height: ${adjustFontSizeTo('25px').lineHeight};
    }
  `,
  definition: css`
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      max-width: 600px;
    }

    ${MIN_TABLET_MEDIA_QUERY} {
      p {
        text-align: center;
      }
    }
  `,
  features: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      display: grid;
      grid-template-columns: 365px 1fr;
    }
  `,
  featuresNavWrap: css`
    background-color: white;
    padding: 25px 0 0 50px;
    ${DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  featuresNav: css`
    position: sticky;
    top: 25px;
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;
  `,
  featuresNavLink: css`
    padding: 15px 45px;
  `,
  products: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding-left: ${rhythm(4)};
    }
  `,
  feature: css`
    padding-top: ${rhythm(1)};

    ${MIN_DEFAULT_MEDIA_QUERY} {
      margin-bottom: ${rhythm(4)};
    }
  `,
  list: css`
    list-style-image: url(/arrow-forward.svg);
  `,
  description: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      margin: ${rhythm(1.5)} 0 ${rhythm(2)};
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
