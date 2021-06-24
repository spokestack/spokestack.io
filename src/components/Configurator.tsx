import { css, SerializedStyles } from '@emotion/react'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import * as theme from '../styles/theme'
import Prism from 'prismjs'
import SVGIcon from './SVGIcon'
import * as ios from '../samples/ios'
import * as android from '../samples/android'
import * as rn from '../samples/rn'
import * as node from '../samples/node'
import * as python from '../samples/python'

type Feature = 'wakeword' | 'keyword' | 'tts' | 'nlu' | 'asr'
type Platform = 'ios' | 'android' | 'rn' | 'node' | 'python'

const features = {
  wakeword: 'Wake Word',
  keyword: 'Keyword',
  tts: 'TTS',
  nlu: 'NLU',
  asr: 'ASR'
}
const sdks = {
  ios: {
    href: 'https://github.com/spokestack/spokestack-ios',
    title: 'iOS',
    language: 'Swift',
    samples: ios
  },
  android: {
    href: 'https://github.com/spokestack/spokestack-android',
    title: 'Android',
    language: 'Kotlin',
    samples: android
  },
  rn: {
    href: 'https://github.com/spokestack/react-native-spokestack',
    title: 'React Native',
    language: 'TypeScript',
    samples: rn
  },
  node: {
    href: 'https://github.com/spokestack/node-spokestack',
    title: 'Node',
    language: 'TypeScript',
    samples: node
  },
  python: {
    href: 'https://github.com/spokestack/spokestack-python',
    title: 'Python',
    language: 'Python',
    samples: python
  }
}

export interface ConfiguratorProps {
  feature?: Feature
  hideLinks?: boolean
  extraCss?: SerializedStyles | SerializedStyles[]
  platform?: Platform
  onChange?: (platform: Platform, feature: Feature) => void
}

export default function Configurator({
  feature,
  hideLinks,
  extraCss,
  onChange,
  platform
}: ConfiguratorProps) {
  const codeRef = useRef<HTMLElement>(null)
  const [featureChoice, setFeatureChoice] = useState<Feature>(
    feature || 'wakeword'
  )
  const [platformChoice, setPlatformChoice] = useState<Platform>(
    platform || 'ios'
  )

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
    if (onChange) {
      onChange(platformChoice, featureChoice)
    }
  }, [featureChoice, platformChoice])

  return (
    <div css={[styles.configurator].concat(extraCss!)}>
      {!feature && (
        <div css={styles.selector}>
          {!platform && <h4>Select Feature</h4>}
          <div css={styles.selectorButtons}>
            {Object.keys(features).map((f) => (
              <a
                key={`feature-selector-${f}`}
                className={`btn${featureChoice === f ? ' selected' : ''}`}
                css={styles.selectorButton}
                onClick={() => setFeatureChoice(f as Feature)}>
                {features[f as Feature]}
              </a>
            ))}
          </div>
        </div>
      )}

      {!platform && (
        <div css={styles.selector}>
          {!feature && <h4>Select Platform</h4>}
          <div css={styles.selectorButtons}>
            {Object.keys(sdks).map((p) => (
              <a
                key={`platform-selector-${p}`}
                className={`btn${platformChoice === p ? ' selected' : ''}`}
                css={styles.selectorButton}
                onClick={() => setPlatformChoice(p as Platform)}>
                {sdks[p as Platform].title}
              </a>
            ))}
          </div>
        </div>
      )}

      <div css={styles.code}>
        <pre className="line-numbers">
          <code
            ref={codeRef}
            className={`language-${sdks[
              platformChoice
            ].language.toLowerCase()}`}>
            {sdks[platformChoice].samples[featureChoice]}
          </code>
        </pre>
        <div className="prism-language" css={styles.language}>
          {sdks[platformChoice].language}
        </div>
      </div>

      {!hideLinks && (
        <Fragment>
          <hr />
          <div css={styles.sdk}>
            <h5>Full-Featured Platform SDK</h5>
            <p>
              Our{' '}
              <a className="link-secondary" href={sdks[platformChoice].href}>
                native {sdks[platformChoice].title} library
              </a>{' '}
              {platformChoice !== 'python' &&
                `is written in ${sdks[platformChoice].language} and `}
              makes setup a breeze.
            </p>
            <a className="link-secondary link-with-icon" href="/docs">
              Expore the docs{' '}
              <SVGIcon
                icon="#arrow-forward"
                className="icon"
                extraCss={styles.arrowIcon}
              />
            </a>
          </div>
        </Fragment>
      )}
    </div>
  )
}

const styles = {
  configurator: css`
    display: flex;
    flex-direction: column;
    background-color: ${theme.header};
    border-radius: 7px;
    margin-bottom: 20px;

    hr {
      margin: 0;
      opacity: 0.5;
    }

    :not(pre) > code[class*='language-'],
    pre[class*='language-'] {
      background: transparent;
    }
    code[class*='language-'],
    pre[class*='language-'] {
      font-size: 18px;
    }
  `,
  selector: css`
    padding: 30px 40px 0;

    h4 {
      color: white;
      margin: 0 0 20px;
    }
  `,
  selectorButtons: css`
    overflow-x: auto;
  `,
  selectorButton: css`
    border: none;
    font-weight: 400;
    display: inline-flex;
    height: 40px;

    &,
    &:visited {
      background: transparent !important;
      color: white !important;
    }

    &:hover:not([disabled]) {
      background-color: #17202b !important;
    }

    &.selected {
      background-color: #3d5166 !important;
      color: ${theme.secondary} !important;
    }
  `,
  code: css`
    position: relative;
    width: calc(100vw - 100px);
    max-width: 100%;
    overflow-x: auto;
    flex-grow: 1;
    padding: 0 10px;

    &:hover .prism-language {
      opacity: 1;
    }
  `,
  language: css`
    position: absolute;
    top: 20px;
    right: 20px;
    color: ${theme.textDarkBg};
    font-size: 0.8em;
    padding: 0 0.5em;
    background: rgba(224, 224, 224, 0.2);
    box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.2);
    border-radius: 0.5em;
    opacity: 0;
    transition: opacity 0.1s ${theme.transitionEasing};
  `,
  sdk: css`
    padding: 20px;

    h5 {
      color: white;
      margin: 0 0 20px;
    }

    p {
      color: #abafb2;
      margin-bottom: 20px;
    }
  `,
  arrowIcon: css`
    width: 20px;
    height: 20px;
    margin-left: 7px;
  `
}
