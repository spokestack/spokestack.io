import * as theme from '../styles/theme'

import { Global, css } from '@emotion/core'

import React from 'react'
import SVGIcon from './SVGIcon'

export default function Libraries() {
  return (
    <div css={styles.libraries}>
      <Global
        styles={css`
          html.dark-mode {
            .library-icon {
              fill: white;
            }
          }
        `}
      />
      <a
        className="library-link"
        css={styles.libraryLink}
        href="https://github.com/spokestack/spokestack-ios">
        <SVGIcon
          className="library-icon"
          icon="#arrow-forward"
          css={styles.libraryIcon}
        />
        iOS
      </a>
      <a
        className="library-link"
        css={styles.libraryLink}
        href="https://github.com/spokestack/spokestack-android">
        <SVGIcon
          className="library-icon"
          icon="#arrow-forward"
          css={styles.libraryIcon}
        />
        Android
      </a>
      <a
        className="library-link"
        css={styles.libraryLink}
        href="https://github.com/spokestack/react-native-spokestack">
        <SVGIcon
          className="library-icon"
          icon="#arrow-forward"
          css={styles.libraryIcon}
        />
        React Native
      </a>
    </div>
  )
}

const styles = {
  libraries: css`
    display: flex;
    flex-direction: column;
  `,
  libraryLink: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    margin-bottom: 5px;
  `,
  libraryIcon: css`
    width: 18px;
    height: 18px;
    fill: ${theme.header};
    margin-right: 5px;
  `
}
