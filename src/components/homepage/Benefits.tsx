import { css } from '@emotion/react'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import * as theme from '../../styles/theme'
import Section from './Section'

export default function Benefits() {
  return (
    <div css={styles.benefits}>
      <div css={styles.header}>
        <h4 className="blue">Voice Doesn&apos;t Have to Be Hard</h4>
        <h2>
          We Built Spokestack Out of a Place of Empathy So Developers Like You
          Can:
        </h2>
      </div>
      <Section
        imageLeft
        id="customizable-ui"
        subHeader="Customizable UI"
        header="Add Voice Search and Navigation Without Overhauling Your UI"
        text="Voice requests can be more efficient than navigating multiple visual menus and exposes a greater UI surface area than a tiny mobile screen. Receive all the benefits of a voice interface that compliments gesture navigation while preserving full autonomy and control of your customer's data."
        image={
          <StaticImage
            width={601}
            alt="Customizable UI"
            src="../../images/homepage/customizable.png"
          />
        }
      />
      <Section
        id="cross-platform"
        subHeader="Cross-Platform"
        header="Develop Across Platforms Using One API"
        text="Managing voice interfaces across embedded, mobile, and the web can be complicated, time-consuming, and expensive. With Spokestack, spend more time helping customers and less time managing platforms."
        image={
          <StaticImage
            width={600}
            alt="Cross-Platform"
            src="../../images/homepage/cross-platform.png"
          />
        }
      />
      <Section
        imageLeft
        id="modular"
        subHeader="Modular By Design"
        header="Maintain Control and Flexibility"
        text="Our framework allows full control of your voice assistant's speech pipeline. Want to use Cortana instead of Google on Android? Prefer to use Dialogflow to understand what your users are saying? Want to use our TTS service instead of Amazon Polly? No problem!"
        image={
          <StaticImage
            width={600}
            alt="Modular By Design"
            src="../../images/homepage/modular.png"
          />
        }
      />
    </div>
  )
}

const styles = {
  benefits: css``,
  header: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 50px 20px;

    h4.blue {
      text-transform: uppercase;
    }
    h2 {
      max-width: 930px;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      padding-left: 50px;
      padding-right: 50px;
    }
  `
}
