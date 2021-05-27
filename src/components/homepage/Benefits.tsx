import * as theme from '../../styles/theme'

import React, { Fragment, useEffect, useRef, useState } from 'react'
import Scroller, { ScrollerSection } from './Scroller'

import BenefitsListItem from './BenefitsListItem'
import BenefitsSprite from '../../images/homepage/benefits-sprite.svg'
import Section from './Section'
import { css } from '@emotion/react'
import throttle from 'lodash/throttle'

export default function Benefits() {
  const [section, setSection] = useState<ScrollerSection>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = throttle(() => {
      const sections = Array.from(
        contentRef.current?.getElementsByClassName('benefits-section') || []
      ).reverse()
      for (const elem of sections) {
        const box = elem.getBoundingClientRect()
        const top = box.top
        const height = box.height
        const id = elem.id as ScrollerSection
        if (top < height / 2) {
          if (section !== id) {
            setSection(id as ScrollerSection)
          }
          return
        }
      }
      setSection(null)
    }, 50)
    onScroll()
    document.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [section])
  return (
    <div id="benefits" className="ie-fix" css={styles.benefits}>
      <BenefitsSprite />
      <div css={styles.header}>
        <h4 className="blue">Voice Doesn&apos;t Have to Be Hard</h4>
        <h2>Built by Developers, for Developers</h2>
      </div>
      <div ref={contentRef} css={styles.content}>
        <Scroller section={section} />
        <Section
          imageLeft
          extraCss={styles.section}
          id="modular"
          className="benefits-section"
          subHeader="Modular"
          header="Develop Across Platforms Using One API"
          text="Managing voice interfaces across embedded, mobile, and the web can be complicated, time-consuming, and expensive. With Spokestack, spend more time building voice-powered features for your customers and less time managing platforms."
          imageCss={styles.image}
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
          extraCss={styles.section}
          id="platforms"
          className="benefits-section"
          subHeader="Cross-Platform"
          header="Open Source Libraries for Mobile, Web, and Embedded Devices"
          text={
            <Fragment>
              <p className="title">
                The key AI technologies for voice under a simple unified API
                with clear documentation available on every major platform.
              </p>
              <div className="columns-mobile">
                <div className="column-half">
                  <BenefitsListItem
                    icon="#android"
                    iconCss={css`
                      width: 15px;
                      height: 15px;
                    `}
                    text="Android"
                  />
                  <BenefitsListItem
                    icon="#benefits-ios"
                    iconCss={css`
                      width: 15px;
                      height: 16px;
                      fill: white;
                    `}
                    text="iOS"
                  />
                  <BenefitsListItem
                    icon="#react-native"
                    iconCss={css`
                      width: 15px;
                      height: 15px;
                    `}
                    text="React Native"
                  />
                </div>
                <div className="column-half">
                  <BenefitsListItem
                    icon="#python"
                    iconCss={css`
                      width: 15px;
                      height: 15px;
                    `}
                    text="Python"
                  />
                  <BenefitsListItem
                    icon="#node"
                    iconCss={css`
                      width: 15px;
                      height: 15px;
                    `}
                    text="Node.js"
                  />
                </div>
              </div>
            </Fragment>
          }
          imageCss={styles.image}
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
          extraCss={styles.section}
          id="full-stack"
          className="benefits-section"
          subHeader="Full Stack"
          header="Just the Voice Tech You Need"
          text={
            <Fragment>
              <p className="title">
                Spokestack&apos;s, er, stack, has all the voice technology
                features you could want, but its modular design doesn’t make you
                use any that you don’t need. Voice activity detection that
                triggers when human speech is heard, wake word activation on
                your custom phrases, keyword recognition of just the commands
                you define, automatic speech recognition choices, natural
                language understanding of intents and slots, and text-to-speech
                voices unique to you.
              </p>
              <div className="columns-mobile">
                <div className="column-half">
                  <BenefitsListItem
                    bgColor="#c490d1"
                    icon="#benefits-asr"
                    iconCss={css`
                      width: 27px;
                      height: 11px;
                    `}
                    text="Automatic Speech Recognition"
                  />
                  <BenefitsListItem
                    bgColor="#a4036f"
                    icon="#benefits-vad"
                    iconCss={css`
                      width: 27px;
                      height: 10px;
                    `}
                    text="Voice Activity Detection"
                  />
                  <BenefitsListItem
                    bgColor="#3ab795"
                    icon="#benefits-wake-word"
                    iconCss={css`
                      width: 27px;
                      height: 20px;
                    `}
                    text="Wake Word"
                  />
                </div>
                <div className="column-half">
                  <BenefitsListItem
                    bgColor="#ff6666"
                    icon="#benefits-keyword"
                    iconCss={css`
                      width: 33px;
                      height: 6px;
                    `}
                    text="Keyword Recognition"
                  />
                  <BenefitsListItem
                    bgColor="#facc5f"
                    icon="#benefits-tts"
                    iconCss={css`
                      width: 26px;
                      height: 11px;
                    `}
                    text="Text-to-Speech"
                  />
                  <BenefitsListItem
                    bgColor="#f29e4c"
                    icon="#benefits-nlu"
                    iconCss={css`
                      width: 25px;
                      height: 11px;
                    `}
                    text="Natural Language Understanding"
                  />
                </div>
              </div>
            </Fragment>
          }
          imageCss={styles.image}
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
          extraCss={styles.section}
          id="integrations"
          className="benefits-section"
          subHeader="No-Code Integrations"
          header="Maintain Control and Flexibility"
          text={
            <Fragment>
              <p className="title">
                Our framework allows full control of your voice assistant&apos;s
                speech pipeline. Want to use Cortana instead of Google on
                Android? Prefer to use Dialogflow to understand what your users
                are saying? Want to use our TTS service instead of Amazon Polly?
                No problem!
              </p>
              <div className="columns-mobile">
                <div className="column-half">
                  <BenefitsListItem
                    icon="#benefits-alexa"
                    iconCss={css`
                      width: 15px;
                      height: 15px;
                    `}
                    text="Alexa"
                  />
                  <BenefitsListItem
                    icon="#android"
                    iconCss={css`
                      width: 15px;
                      height: 15px;
                    `}
                    text="Android"
                  />
                  <BenefitsListItem
                    icon="#benefits-ios"
                    iconCss={css`
                      width: 15px;
                      height: 16px;
                    `}
                    text="Apple"
                  />
                  <BenefitsListItem
                    icon="#benefits-dialogflow"
                    iconCss={css`
                      width: 15px;
                      height: 15px;
                    `}
                    text="Dialogflow"
                  />
                  <BenefitsListItem
                    iconUrl="/homepage/diagrams/jovo.png"
                    iconCss={css`
                      width: 15px;
                      height: 15px;
                    `}
                    text="Jovo"
                  />
                  <BenefitsListItem
                    icon="#benefits-google-assistant"
                    iconCss={css`
                      width: 15px;
                      height: 15px;
                    `}
                    text="Google Assistant"
                  />
                </div>
                <div className="column-half">
                  <BenefitsListItem
                    icon="#benefits-google-cloud"
                    iconCss={css`
                      width: 20px;
                      height: 15px;
                    `}
                    text="Google Cloud"
                  />
                  <BenefitsListItem
                    icon="#benefits-microsoft"
                    iconCss={css`
                      width: 15px;
                      height: 15px;
                    `}
                    text="Microsoft Azure"
                  />
                  <BenefitsListItem
                    icon="#benefits-rasa"
                    iconCss={css`
                      width: 15px;
                      height: 15px;
                    `}
                    text="Rasa"
                  />
                  <BenefitsListItem
                    iconUrl="/homepage/diagrams/siri.png"
                    iconCss={css`
                      width: 15px;
                      height: 15px;
                    `}
                    text="Siri"
                  />
                  <BenefitsListItem
                    icon="#benefits-spokestack"
                    iconCss={css`
                      width: 15px;
                      height: 15px;
                    `}
                    text="Spokestack"
                  />
                </div>
              </div>
            </Fragment>
          }
          imageCss={styles.image}
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
          extraCss={styles.section}
          id="custom"
          className="benefits-section"
          subHeader="Customize"
          header="Complete Control, Online and Offline"
          text={
            <Fragment>
              <p className="title">
                Make custom multilingual wake words, recognize keywords in any
                language (or sound!), and create your own AI voice clone. Oh,
                and it all runs offline!
              </p>
              <div className="columns-mobile">
                <div className="column-half">
                  <BenefitsListItem
                    imageCss={[
                      styles.customListItem,
                      css`
                        border: 2px solid #facc5f;
                      `
                    ]}
                    icon="#benefits-custom"
                    iconCss={[
                      styles.customIcon,
                      css`
                        fill: #facc5f;
                      `
                    ]}
                    text="Text-to-Speech"
                  />
                  <BenefitsListItem
                    imageCss={[
                      styles.customListItem,
                      css`
                        border: 2px solid #3ab795;
                      `
                    ]}
                    icon="#benefits-custom"
                    iconCss={[
                      styles.customIcon,
                      css`
                        fill: #3ab795;
                      `
                    ]}
                    text="Wake Word"
                  />
                </div>
                <div className="column-half">
                  <BenefitsListItem
                    imageCss={[
                      styles.customListItem,
                      css`
                        border: 2px solid #ff6666;
                      `
                    ]}
                    icon="#benefits-custom"
                    iconCss={[
                      styles.customIcon,
                      css`
                        fill: #ff6666;
                      `
                    ]}
                    text="Keyword Recognition"
                  />
                </div>
              </div>
            </Fragment>
          }
          imageCss={styles.image}
          image={
            <img
              css={styles.mobileDiagram}
              alt="Spokestack Is Cutomizable"
              src="/homepage/diagrams/5.svg"
            />
          }
        />
      </div>
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
  section: css`
    // Image height + 50 for padding
    min-height: 686px;
  `,
  content: css`
    position: relative;
    margin-top: 20px;
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
  image: css`
    width: 636px;
    max-width: 100%;
  `,
  mobileDiagram: css`
    width: 100%;

    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      display: none;
    }
  `,
  customListItem: css`
    width: 60px;
    height: 60px;
  `,
  customIcon: css`
    width: 42px;
    height: 8px;
  `
}
