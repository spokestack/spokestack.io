import * as theme from '../../styles/theme'

import OpenSourceFeature from './OpenSourceFeature'
import React from 'react'
import Tags from '../Tags'
import { css } from '@emotion/react'

export default function OpenSource() {
  return (
    <div id="open-source" className="ie-fix" css={styles.openSource}>
      <div css={styles.header}>
        <h2>
          <span>Spokestack Open Source</span>
        </h2>
        <p className="title">All plans have these free features</p>
      </div>
      <div css={styles.features}>
        <OpenSourceFeature
          title="Pre-Trained Universal Models"
          description="Allow you to interface with more than one user.">
          <Tags tags={['Wake Word', 'Keyword', 'NLU', 'TTS']} />
        </OpenSourceFeature>
        <OpenSourceFeature
          title="Beyond-Real-Time Local Inference"
          description="Keep your data local.">
          <Tags tags={['Wake Word', 'Keyword', 'NLU']} />
        </OpenSourceFeature>
        <OpenSourceFeature
          title="Secure Cloud Inference"
          description="Cloud data stays private. Plans start at 25k requests/mo for ASR, NLU, and streaming TTS cloud APIs.">
          <Tags tags={['ASR', 'NLU', 'TTS']} />
        </OpenSourceFeature>
        <OpenSourceFeature
          title="SDK Access"
          description="Native SDKs bundle all voice capabilities on platforms including:">
          <ul>
            <li>
              <a href="https://github.com/spokestack/react-native-spokestack">
                React Native
              </a>
            </li>
            <li>
              <a href="https://github.com/spokestack/spokestack-ios">iOS</a>
            </li>
            <li>
              <a href="https://github.com/spokestack/spokestack-android">
                Android
              </a>
            </li>
            <li>
              <a href="https://github.com/spokestack/node-spokestack">Node</a>
            </li>
            <li>
              <a href="https://github.com/spokestack/spokestack-python">
                Python
              </a>
            </li>
          </ul>
        </OpenSourceFeature>
        <OpenSourceFeature
          title="Demo Playground"
          description="Test your voice experience before going live on the following platforms:">
          <ul>
            <li>React Native</li>
            <li>iOS</li>
            <li>Android</li>
            <li>Web</li>
            <li>Python</li>
          </ul>
        </OpenSourceFeature>
        <OpenSourceFeature
          title="Drop-In Interface Widget"
          description={
            <p>
              Get a head start on your projects with{' '}
              <a href="/docs/concepts/tray">Spokestack Tray</a>, available for:
            </p>
          }>
          <ul>
            <li>
              <a href="https://github.com/spokestack/react-native-spokestack-tray">
                React Native
              </a>
            </li>
            <li>
              <a href="https://github.com/spokestack/spokestack-tray-ios">
                iOS
              </a>
            </li>
            <li>
              <a href="https://github.com/spokestack/spokestack-tray-android">
                Android
              </a>
            </li>
          </ul>
        </OpenSourceFeature>
        <OpenSourceFeature
          title="3rd-Party Provider Support for ASR"
          description="Use Spokestack ASR or choose from one of the following providers*:">
          <ul>
            <li>Apple (on-device)</li>
            <li>Google (on-device)</li>
            <li>Microsoft</li>
            <li>Google Cloud Speech</li>
          </ul>
          <p css={styles.footnote}>*Provider availability varies by platform</p>
        </OpenSourceFeature>
        <OpenSourceFeature
          title="Run NLU Models from 3rd-Party Providers"
          description="Use Jovo NLU models or import NLU models from:">
          <ul>
            <li>Alexa</li>
            <li>Dialogflow</li>
            <li>Rasa</li>
          </ul>
        </OpenSourceFeature>
        <OpenSourceFeature
          title="Flexibility to Choose TTS AI Voices"
          description="Use the default AI voice provided by default or use an AI voice from one of the following providers*:">
          <ul>
            <li>Apple</li>
            <li>Google</li>
          </ul>
          <p css={styles.footnote}>*Voice availability varies by platform</p>
        </OpenSourceFeature>
      </div>
    </div>
  )
}

const styles = {
  openSource: css`
    padding: 0 20px;
    margin-bottom: 50px;
  `,
  header: css`
    text-align: center;
    position: relative;

    h2 {
      margin-bottom: 25px;
    }
    .title {
      margin: 0;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      h2 {
        position: relative;
        background-image: ${theme.pricingBorderHorizontal};
        background-position: center;
        background-repeat: no-repeat;

        span {
          position: relative;
        }

        &:before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          width: 590px;
          height: 100%;
          transform: translateX(-50%);
          background-color: ${theme.mainBackground};
        }
      }
    }
  `,
  features: css`
    padding: 25px 0;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      display: flex;
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
      max-width: 1024px;
      margin: 0 auto;

      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }
  `,
  footnote: css`
    font-size: 14px;
    margin: 0;
  `
}
