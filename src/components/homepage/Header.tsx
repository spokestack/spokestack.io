import * as theme from '../../styles/theme'

import React from 'react'
import SVGIcon from '../SVGIcon'
import Video from './Video'
import { css } from '@emotion/react'

export default function Header() {
  return (
    <header css={styles.header}>
      <div className="ie-fix" css={styles.headerContent}>
        <h1 css={styles.headerText}>Give your app a voice interface</h1>
        <p className="title spokestack-speakable">
          Open source tools for mobile &amp; web
        </p>
        <a href="/create" className="btn btn-secondary">
          Get started free
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
    align-items: center;
    background: ${theme.mainBackground} url(/background.svg) no-repeat;
    background-position: center bottom;
    background-size: cover;
    color: ${theme.textDarkBg};
    width: 100%;
    padding: 90px 20px 20px;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      align-items: flex-start;
      padding: 0 30px;
      height: 566px;
    }

    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      padding: 0 100px;
    }
  `,
  headerContent: css`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    max-width: 700px;
    margin-bottom: 90px;

    .title {
      margin-bottom: 15px;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      align-items: flex-start;
      text-align: left;
      margin-right: 20px;
      margin-bottom: 0;

      .title {
        margin-bottom: 25px;
      }
    }
  `,
  headerText: css`
    color: ${theme.textDarkBg};
  `,
  createAccountIcon: css`
    fill: ${theme.header};
    width: 20px;
    height: 20px;
    margin-left: 5px;
  `
}
