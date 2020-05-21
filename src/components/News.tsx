import * as theme from '../styles/theme'

import {
  DEFAULT_WIDTH,
  MIN_DEFAULT_MEDIA_QUERY
} from 'typography-breakpoint-constants'
import Image, { FixedObject } from 'gatsby-image'
import { graphql, useStaticQuery } from 'gatsby'

import Color from 'color'
import { Query } from '../utils/graphql'
import React from 'react'
import { css } from '@emotion/core'

type QueryType = Query & {
  linkedin: { childImageSharp: { fixed: FixedObject } }
  voicebotai: { childImageSharp: { fixed: FixedObject } }
  medium: { childImageSharp: { fixed: FixedObject } }
}

export default function News() {
  const { linkedin, voicebotai, medium } = useStaticQuery<QueryType>(newsQuery)
  return (
    <div css={styles.container}>
      <a
        href="https://www.linkedin.com/pulse/project-voice-2020-post-mortem-report-bradley-metrock/"
        css={styles.newsLink}>
        <Image
          fixed={linkedin.childImageSharp.fixed}
          alt="Linked In"
          css={styles.newsLinkImage}
        />
        <span>Project Voice 2020: Post-Mortem Report</span>
      </a>
      <a
        href="https://voicebot.ai/2020/01/15/how-spokestack-gives-mobile-app-their-own-branded-voice-assistant/"
        css={styles.newsLink}>
        <Image
          fixed={voicebotai.childImageSharp.fixed}
          alt="Voicebot AI"
          css={styles.newsLinkImage}
        />
        <span>
          How Spokestack Gives Mobile Apps Their Own Branded Voice Assistant
        </span>
      </a>
      <a
        href="https://medium.com/@kwylez/spokestack-framework-and-rss-sample-app-400ba7a2f879"
        css={styles.newsLink}>
        <Image
          fixed={medium.childImageSharp.fixed}
          alt="Medium"
          css={styles.newsLinkImage}
        />
        <span>Spokestack Framework and RSS Sample App</span>
      </a>
    </div>
  )
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      display: grid;
      grid-gap: 20px;
      grid-template-columns: 1fr 1fr 1fr;
      max-width: ${DEFAULT_WIDTH};
      margin-left: auto;
      margin-right: auto;
    }
  `,
  newsLink: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
    background-color: white;
    border-radius: 7px;
    border: 1px solid ${theme.mainBorder};
    color: ${theme.text} !important;
    text-decoration: none;
    transition: background-color 0.1s ${theme.transitionEasing};

    &:hover {
      background-color: ${Color('#fff').darken(0.1).hex()};
    }
    &:active {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
    }

    span {
      padding: 20px 20px 20px 5px;
    }
  `,
  newsLinkImage: css`
    width: 69px;
    height: 69px;
    flex-shrink: 0;
    margin: 15px;
  `
}

const newsQuery = graphql`
  query newsQuery {
    linkedin: file(absolutePath: { regex: "/linkedin.png/" }) {
      childImageSharp {
        fixed(width: 69, height: 69) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    voicebotai: file(absolutePath: { regex: "/voicebotai.png/" }) {
      childImageSharp {
        fixed(width: 69, height: 69) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    medium: file(absolutePath: { regex: "/medium.png/" }) {
      childImageSharp {
        fixed(width: 69, height: 69) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
