import * as theme from '../styles/theme'

import React from 'react'
import SVGIcon from './SVGIcon'
import { css } from '@emotion/core'

export default function Libraries() {
  return (
    <div css={styles.libraries}>
      <a
        css={styles.libraryLink}
        href="https://github.com/spokestack/spokestack-ios">
        <SVGIcon icon="#arrow-forward" css={styles.libraryIcon} />
        iOS
      </a>
      <a
        css={styles.libraryLink}
        href="https://github.com/spokestack/spokestack-android">
        <SVGIcon icon="#arrow-forward" css={styles.libraryIcon} />
        Android
      </a>
      <a
        css={styles.libraryLink}
        href="https://github.com/spokestack/react-native-spokestack">
        <SVGIcon icon="#arrow-forward" css={styles.libraryIcon} />
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
