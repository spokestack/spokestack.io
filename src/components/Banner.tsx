import * as theme from '../styles/theme'

import React from 'react'
import { css } from '@emotion/react'

interface Props {
  children: React.ReactNode
  href: string
}

export default function Banner({ children, href }: Props) {
  return (
    <a css={styles.banner} href={href}>
      <img css={styles.bannerImage} src="/banner.svg" />
      {children}
    </a>
  )
}

const styles = {
  banner: css`
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    background-color: ${theme.primaryDark};
    font-size: 14px;
    font-weight: 400;
    padding: 20px;
    overflow: hidden;
    z-index: 99999;

    &,
    &:visited,
    &:hover,
    &:active {
      color: white;
    }

    &:hover {
      background-color: ${theme.primary};
    }
    &:active {
      box-shadow: inset 0 0 16px rgba(0, 0, 0, 0.7);
    }

    p {
      width: auto;
      margin: 0;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      position: absolute;
      height: 40px;
    }
  `,
  bannerImage: css`
    width: 62px;
    height: 62px;
    flex-shrink: 0;
    line-height: 0;
    margin-right: 20px;
  `
}
