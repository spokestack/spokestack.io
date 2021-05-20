import * as theme from '../../styles/theme'

import React from 'react'
import { css } from '@emotion/react'
import { StaticImage } from 'gatsby-plugin-image'

export default function Header() {
  return (
    <header css={styles.header}>
      <div className="ie-fix" css={styles.headerContent}>
        <h1 css={styles.headerText}>Give Your Software a Voice Interface</h1>
        <p className="title spokestack-speakable">
          Open source tools for mobile, web, &amp; embedded devices
        </p>
        <a href="/account/create" className="btn btn-secondary">
          Get started free
        </a>
      </div>
      <StaticImage
        width={549}
        css={styles.image}
        alt="Spokestack Example"
        src="../../images/homepage/hero.png"
      />
    </header>
  )
}

const styles = {
  header: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${theme.mainBackground} url('/homepage/background.svg')
      no-repeat;
    background-position: center top;
    background-size: cover;
    color: ${theme.textDarkBg};
    width: 100%;
    padding: 15px 20px 0;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      height: 602px;
      flex-direction: row;
      align-items: flex-start;
      padding-left: 50px;
      padding-right: 50px;
    }

    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      padding-left: 150px;
      padding-right: 150px;
    }
  `,
  headerContent: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 25px;

    .title {
      margin-bottom: 50px;
    }

    .btn {
      width: 100%;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      max-width: 540px;
      margin-top: 80px;
      margin-right: 50px;

      .btn {
        width: auto;
      }
    }
  `,
  headerText: css`
    color: ${theme.textDarkBg};
  `,
  image: css`
    flex-shrink: 0;
  `
}
