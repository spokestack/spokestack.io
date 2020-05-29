import * as theme from '../../styles/theme'

import {
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_LARGE_DISPLAY_MEDIA_QUERY
} from 'typography-breakpoint-constants'

import React from 'react'
import SVGIcon from '../SVGIcon'
import Video from './Video'
import { css } from '@emotion/core'

export default function Header() {
  return (
    <header css={styles.header}>
      <div css={styles.headerContent}>
        <h1 css={styles.headerText}>Build an Independent Voice Assistant</h1>
        <p className="title spokestack-speakable">
          Open source tools for mobile &amp; web voice interfaces
        </p>
        <a href="/login" className="btn btn-secondary btn-large">
          Create acount
          <SVGIcon icon="#arrow-forward" extraCss={styles.createAccountIcon} />
        </a>
      </div>
      <Video />
    </header>
  )
}

const styles = {
  header: css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background: ${theme.mainBackground} url(/background.svg) no-repeat;
    background-position: center bottom;
    background-size: cover;
    color: ${theme.textDarkBg};
    width: 100%;
    padding: 20px;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      align-items: center;
      padding: 0 50px;
      height: 645px;
    }

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      padding: 0 100px;
    }
  `,
  headerContent: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    max-width: 500px;
    margin-bottom: 25px;

    .title {
      max-width: 350px;
    }

    ${MIN_DEFAULT_MEDIA_QUERY} {
      margin-right: 20px;
    }
  `,
  headerText: css`
    color: ${theme.textDarkBg};
  `,
  createAccountIcon: css`
    fill: ${theme.header};
    width: 17px;
    height: 17px;
    margin-left: 5px;
  `
}
