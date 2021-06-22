import { css, SerializedStyles } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import * as theme from '../styles/theme'
import Prism from 'prismjs'
import SVGIcon from './SVGIcon'

export type Platform = 'ios' | 'android' | 'rn' | 'node' | 'python'

const sdks = {
  ios: {
    href: 'https://github.com/spokestack/spokestack-ios',
    title: 'iOS',
    language: 'Swift',
    samples: require('../samples/ios')
  },
  android: {
    href: 'https://github.com/spokestack/spokestack-android',
    title: 'Android',
    language: 'Kotlin',
    samples: require('../samples/android')
  },
  rn: {
    href: 'https://github.com/spokestack/react-native-spokestack',
    title: 'React Native',
    language: 'TypeScript',
    samples: require('../samples/rn')
  },
  node: {
    href: 'https://github.com/spokestack/node-spokestack',
    title: 'Node',
    language: 'TypeScript',
    samples: require('../samples/node')
  },
  python: {
    href: 'https://github.com/spokestack/spokestack-python',
    title: 'Python',
    language: 'Python',
    samples: require('../samples/python')
  }
}

export interface ConfiguratorProps {
  codeKey: 'wakeword' | 'keyword' | 'tts'
  extraCss?: SerializedStyles | SerializedStyles[]
  onPlatformChange?: (platform: Platform) => void
}

export default function Configurator({
  codeKey,
  extraCss,
  onPlatformChange
}: ConfiguratorProps) {
  const [platform, setPlatform] = useState<Platform>('ios')

  useEffect(() => {
    Prism.highlightAll()
  }, [codeKey])

  useEffect(() => {
    if (onPlatformChange) {
      onPlatformChange(platform)
    }
  }, [platform])

  return (
    <div css={[styles.configurator].concat(extraCss!)}>
      <div css={styles.selector}>
        {Object.keys(sdks).map((p) => (
          <a
            key={`platform-selector-${p}`}
            className={`btn${platform === p ? ' selected' : ''}`}
            css={styles.platformButton}
            onClick={() => setPlatform(p as Platform)}>
            {sdks[p as Platform].title}
          </a>
        ))}
      </div>

      <div css={styles.code}>
        {Object.keys(sdks).map((p) => (
          <pre
            key={`configurator-code-${p}`}
            className="line-numbers show-language"
            style={{ display: platform === p ? 'block' : 'none' }}>
            <code
              className={`language-${sdks[
                p as Platform
              ].language.toLowerCase()}`}>
              {sdks[p as Platform].samples[codeKey]}
            </code>
          </pre>
        ))}
      </div>

      <div css={styles.sdk}>
        <h5>Full-Featured Platform SDK</h5>
        <p>
          Our{' '}
          <a className="link-secondary" href={sdks[platform].href}>
            native {sdks[platform].title} library
          </a>{' '}
          {platform !== 'python' &&
            `is written in ${sdks[platform].language} and `}
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
    </div>
  )
}

const styles = {
  configurator: css`
    background-color: ${theme.header};
    border-radius: 7px;

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
    overflow-x: auto;
    padding: 20px;
  `,
  platformButton: css`
    border: none;
    font-weight: 400;
    display: inline-flex;
    height: 40px;

    &,
    &:visited {
      background: transparent;
      color: white;
    }

    &:hover:not([disabled]) {
      background-color: #17202b;
    }

    &.selected {
      background-color: #3d5166 !important;
      color: ${theme.secondary} !important;
    }
  `,
  code: css`
    width: calc(100vw - 100px);
    max-width: 100%;
    overflow-x: auto;
    flex-grow: 1;
  `,
  sdk: css`
    padding: 20px;
    border-top: 1px solid ${theme.mainBorderDark};

    h5 {
      margin-bottom: 25px;
    }

    p {
      color: #abafb2;
    }
  `,
  arrowIcon: css`
    width: 20px;
    height: 20px;
    margin-left: 7px;
  `
}
