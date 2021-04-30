import { css, SerializedStyles } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import * as theme from '../styles/theme'
import Prism from 'prismjs'
import SVGIcon from './SVGIcon'
import * as ios from '../samples/ios'
import * as android from '../samples/android'
import * as rn from '../samples/rn'
import * as node from '../samples/node'
import * as python from '../samples/python'

export interface ConfiguratorProps {
  codeKey: 'wakeword' | 'keyword' | 'tts'
  extraCss?: SerializedStyles | SerializedStyles[]
}

export default function Configurator({ codeKey, extraCss }: ConfiguratorProps) {
  const [platform, setPlatform] = useState<
    'ios' | 'android' | 'rn' | 'node' | 'python'
  >('ios')

  useEffect(() => {
    Prism.highlightAll()
  }, [codeKey])

  return (
    <div css={[styles.configurator].concat(extraCss!)}>
      <div css={styles.selector}>
        <a
          className={`btn${platform === 'ios' ? ' selected' : ''}`}
          css={styles.platformButton}
          onClick={() => setPlatform('ios')}>
          iOS
        </a>
        <a
          className={`btn${platform === 'android' ? ' selected' : ''}`}
          css={styles.platformButton}
          onClick={() => setPlatform('android')}>
          Android
        </a>
        {!!rn[codeKey] && (
          <a
            className={`btn${platform === 'rn' ? ' selected' : ''}`}
            css={styles.platformButton}
            onClick={() => setPlatform('rn')}>
            React Native
          </a>
        )}
        {!!node[codeKey] && (
          <a
            className={`btn${platform === 'node' ? ' selected' : ''}`}
            css={styles.platformButton}
            onClick={() => setPlatform('node')}>
            Node
          </a>
        )}
        <a
          className={`btn${platform === 'python' ? ' selected' : ''}`}
          css={styles.platformButton}
          onClick={() => setPlatform('python')}>
          Python
        </a>
      </div>

      <pre
        className="line-numbers show-language"
        style={{ display: platform === 'ios' ? 'block' : 'none' }}>
        <code className="language-swift">{ios[codeKey]}</code>
      </pre>
      <pre
        className="line-numbers show-language"
        style={{ display: platform === 'android' ? 'block' : 'none' }}>
        <code className="language-kotlin">{android[codeKey]}</code>
      </pre>
      {!!rn[codeKey] && (
        <pre
          className="line-numbers show-language"
          style={{ display: platform === 'rn' ? 'block' : 'none' }}>
          <code className="language-javascript">{rn[codeKey]}</code>
        </pre>
      )}
      {!!node[codeKey] && (
        <pre
          className="line-numbers show-language"
          style={{ display: platform === 'node' ? 'block' : 'none' }}>
          <code className="language-javascript">{node[codeKey]}</code>
        </pre>
      )}
      <pre
        className="line-numbers show-language"
        style={{ display: platform === 'python' ? 'block' : 'none' }}>
        <code className="language-python">{python[codeKey]}</code>
      </pre>

      <div css={styles.sdk}>
        <h5>Full-Featured Platform SDK</h5>
        {platform === 'ios' ? (
          <p>
            Our{' '}
            <a
              className="link-secondary"
              href="https://github.com/spokestack/spokestack-ios">
              native iOS library
            </a>{' '}
            is written in Swift and includes a top-level class that handles wake
            word configuration making setup a breeze.
          </p>
        ) : platform === 'android' ? (
          <p>
            Our{' '}
            <a
              className="link-secondary"
              href="https://github.com/spokestack/spokestack-android">
              native Android library
            </a>{' '}
            is written in Java and includes a top-level class that handles wake
            word configuration making setup a breeze.
          </p>
        ) : platform === 'rn' ? (
          <p>
            Our{' '}
            <a
              className="link-secondary"
              href="https://github.com/spokestack/react-native-spokestack">
              React Native library
            </a>{' '}
            is written in JS and includes an imperative API that makes setup a
            breeze.
          </p>
        ) : platform === 'node' ? (
          <p>
            Our{' '}
            <a
              className="link-secondary"
              href="https://github.com/spokestack/node-spokestack">
              NodeJS library
            </a>{' '}
            is written in JS and includes an imperative API that makes setup a
            breeze.
          </p>
        ) : (
          platform === 'python' && (
            <p>
              Our{' '}
              <a
                className="link-secondary"
                href="https://github.com/spokestack/spokestack-python">
                native Python library
              </a>{' '}
              includes a top-level class that handles wake word configuration
              making setup a breeze.
            </p>
          )
        )}
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
    font-weight: 300;
    display: inline-flex;

    &,
    &:visited {
      background: transparent;
      color: white;
    }

    &:hover:not([disabled]) {
      background-color: #3d5166;
    }

    &.selected {
      background-color: #3d5166 !important;
      color: ${theme.secondary} !important;
    }
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

    a .icon {
      margin-left: 5px;
    }
  `,
  arrowIcon: css`
    width: 24px;
    height: 24px;
  `
}
