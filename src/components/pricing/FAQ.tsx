import { css } from '@emotion/react'
import React from 'react'
import * as theme from '../../styles/theme'
import { SiteSiteMetadataContact } from '../../utils/graphql'
import Question from './Question'

interface Props {
  contact: SiteSiteMetadataContact
}

export default function FAQ({ contact }: Props) {
  return (
    <div id="faq" className="ie-fix" css={styles.faq}>
      <div css={styles.header}>
        <h2>FAQ</h2>
        <p className="title">
          Need more help? Check out our <a href="/docs">documentation</a>,{' '}
          <a href="https://forums.spokestack.io">forum</a>, or{' '}
          <a href={`mailto:${contact.email}`}>email us</a>.
        </p>
      </div>
      <div css={styles.questions}>
        <Question
          question="What's the difference between personal and universal models?"
          answer=""
        />
        <Question
          question="How many keywords can a keyword model have?"
          answer=""
        />
        <Question
          question="Do you do any pre-processing on the audio input to filter out background noise?"
          answer={
            <p>
              Many of our platform libraries offer components that perform
              preprocessing like acoustic noise suppression and gain control.
              These components have tunable configurations; see our API
              references (
              <a href="https://github.com/spokestack/react-native-spokestack#api-documentation">
                React Native
              </a>{' '}
              |{' '}
              <a href="https://spokestack.github.io/spokestack-ios/index.html">
                iOS
              </a>{' '}
              |{' '}
              <a href="https://www.javadoc.io/doc/io.spokestack/spokestack-android/latest/index.html">
                Android
              </a>{' '}
              | <a href="/docs/python/getting-started">Python</a>) for more
              details. In general, Spokestack&apos;s speech processing pipeline
              is designed to be extensible, so preprocessing stages designed to
              handle specific environments can be created and added by clients
              as needed.
            </p>
          }
        />
        <Question
          question="How many samples are needed for highest quality personal model training?"
          answer=""
        />
        <Question
          question="What free universal models are available?"
          answer=""
        />
        <Question
          question="I want to train my own model to use in Spokestack. What inputs and outputs should I expect?"
          answer=""
        />
        <Question question="What is Spokestack ASR's WER?" answer="" />
        <Question
          question="What is a personal wake word model’s recall accuracy?"
          answer=""
        />
        <Question question="What is Spokestack’s TTS MOS?" answer="" />
        <Question
          question="What happens when I hit my usage limits?"
          answer=""
        />
        <Question question="What are my payment options?" answer="" />
      </div>
    </div>
  )
}

const styles = {
  faq: css`
    padding: 50px 20px 0;
  `,
  header: css`
    text-align: center;

    h2 {
      margin-bottom: 25px;
    }
    .title {
      margin-bottom: 50px;
    }
    a {
      font-weight: 400;
    }
  `,
  questions: css`
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 1px solid ${theme.mainBorder};
    border-radius: 7px;
    overflow: hidden;
  `
}
