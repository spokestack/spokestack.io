import * as theme from '../../styles/theme'

import React, { Fragment } from 'react'

import Section from './Section'
import { css } from '@emotion/react'

export default function Benefits() {
  return (
    <div id="benefits" className="ie-fix" css={styles.benefits}>
      <div css={styles.header}>
        <h4 className="blue">Voice Doesn&apos;t Have to Be Hard</h4>
        <h2>Built by Developers, for Developers</h2>
      </div>
      <Section
        imageLeft
        id="modular"
        subHeader="Modular"
        header="Develop Across Platforms Using One API"
        text="Managing voice interfaces across embedded, mobile, and the web can be complicated, time-consuming, and expensive. With Spokestack, spend more time building voice-powered features for your customers and less time managing platforms."
        image={
          <img
            css={styles.mobileDiagram}
            alt="Spokestack Is Modular"
            src="/homepage/diagrams/1.svg"
          />
        }
      />
      <Section
        imageLeft
        id="cross-platform"
        subHeader="Cross-Platform"
        header="Open Source Libraries for Mobile, Web, and Embedded Devices"
        text={
          <Fragment>
            <p className="title">
              The key AI technologies for voice under a simple unified API with
              clear documentation available on every major platform.
            </p>
            <div className="columns-mobile">
              <div className="column-half">
                <p className="title">Android</p>
                <p className="title">iOS</p>
                <p className="title">React Native</p>
              </div>
              <div className="column-half">
                <p className="title">Python</p>
                <p className="title">Node</p>
              </div>
            </div>
          </Fragment>
        }
        image={
          <img
            css={styles.mobileDiagram}
            alt="Spokestack Is Cross-Platform"
            src="/homepage/diagrams/2.svg"
          />
        }
      />
      <Section
        imageLeft
        id="full-stack"
        subHeader="Full Stack"
        header="Just the Voice Tech You Need"
        text={
          <Fragment>
            <p className="title">
              Spokestack&apos;s, er, stack, has all the voice technology
              features you could want, but its modular design doesn’t make you
              use any that you don’t need. Voice activity detection that
              triggers when human speech is heard, wake word activation on your
              custom phrases, keyword recognition of just the commands you
              define, automatic speech recognition choices, natural language
              understanding of intents and slots, and text-to-speech voices
              unique to you.
            </p>
            <div className="columns-mobile">
              <div className="column-half">
                <p className="title">Automatic Speech Recognition (ASR)</p>
                <p className="title">Voice Activity Detection (VAD)</p>
                <p className="title">Wake Word</p>
              </div>
              <div className="column-half">
                <p className="title">Keyword Recognition</p>
                <p className="title">Text-to-Speech (TTS)</p>
                <p className="title">Natural Language Understanding (NLU)</p>
              </div>
            </div>
          </Fragment>
        }
        image={
          <img
            css={styles.mobileDiagram}
            alt="Spokestack Is Streamlined"
            src="/homepage/diagrams/3.svg"
          />
        }
      />
      <Section
        imageLeft
        id="no-code-integrations"
        subHeader="No-Code Integrations"
        header="Maintain Control and Flexibility"
        text={
          <Fragment>
            <p className="title">
              Our framework allows full control of your voice assistant&apos;s
              speech pipeline. Want to use Cortana instead of Google on Android?
              Prefer to use Dialogflow to understand what your users are saying?
              Want to use our TTS service instead of Amazon Polly? No problem!
            </p>
            <div className="columns">
              <div className="column-third">
                <h4>ASR</h4>
                <p className="title">Android</p>
                <p className="title">Apple</p>
                <p className="title">Google Cloud</p>
                <p className="title">Microsoft Azure</p>
                <p className="title">Spokestack</p>
              </div>
              <div className="column-third">
                <h4>NLU</h4>
                <p className="title">Alexa</p>
                <p className="title">Dialogflow</p>
                <p className="title">Jovo</p>
                <p className="title">Rasa</p>
                <p className="title">Spokestack</p>
              </div>
              <div className="column-third">
                <h4>TTS</h4>
                <p className="title">Alexa</p>
                <p className="title">Google Assistant</p>
                <p className="title">Siri</p>
                <p className="title">Spokestack</p>
              </div>
            </div>
          </Fragment>
        }
        image={
          <img
            css={styles.mobileDiagram}
            alt="Spokestack Is Flexible"
            src="/homepage/diagrams/4.svg"
          />
        }
      />
      <Section
        imageLeft
        id="customize"
        subHeader="Customize"
        header="Complete Control, Online and Offline"
        text={
          <Fragment>
            <p className="title">
              Make custom multilingual wake words, recognize keywords in any
              language (or sound!), and create your own AI voice clone. Oh, and
              it all runs offline!
            </p>
            <div className="columns">
              <p className="column-third">Text-to-Speech (TTS)</p>
              <p className="column-third">Wake Word</p>
              <p className="column-third">Keyword Recognition</p>
            </div>
          </Fragment>
        }
        image={
          <img
            css={styles.mobileDiagram}
            alt="Spokestack Is Cutomizable"
            src="/homepage/diagrams/5.svg"
          />
        }
      />
    </div>
  )
}

const styles = {
  benefits: css`
    padding-top: 50px;

    .columns,
    .columns-mobile {
      margin-top: 40px;

      p {
        margin-bottom: 15px;
      }
    }
  `,
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

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      padding-left: 50px;
      padding-right: 50px;
    }
  `,
  mobileDiagram: css`
    width: 636px;
    max-width: 100%;
  `
}
