import * as theme from '../../styles/theme'

import React from 'react'
import SVGIcon from '../SVGIcon'
import { css } from '@emotion/react'

interface Props {
  title: string
  subtitle?: string
  image: React.ReactNode
}

export default function Header({ title, subtitle, image }: Props) {
  return (
    <header css={styles.header}>
      <div className="ie-fix" css={styles.headerContent}>
        <h1 css={styles.headerText}>{title}</h1>
        {!!subtitle && <p className="title spokestack-speakable">{subtitle}</p>}
        <a href="/account/create" className="btn btn-large btn-secondary">
          Get started free
          <SVGIcon icon="#arrow-forward" extraCss={styles.createAccountIcon} />
        </a>
      </div>
      <div css={styles.image}>{image}</div>
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
    background: ${theme.mainBackground} url('/features/background.svg')
      no-repeat;
    background-position: center bottom;
    background-size: cover;
    color: ${theme.textDarkBg};
    width: 100%;
    padding: 90px 20px 20px;
    margin-bottom: 50px;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      padding: 0 30px;
      height: 646px;
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
    max-width: 600px;
    margin-bottom: 50px;

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
  `,
  image: css`
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 15px;
  `
}
