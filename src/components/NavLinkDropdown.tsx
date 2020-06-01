import * as theme from '../styles/theme'

import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import NavLink from './NavLink'
import React from 'react'
import { css } from '@emotion/core'

interface Props {
  children?: React.ReactNode
  href?: string
  imageUrl: string
  title: string
  text: string
}

export default function NavLinkDropdown({
  children,
  href,
  imageUrl,
  title,
  text
}: Props) {
  return (
    <NavLink
      mobileOnly
      partiallyActive
      extraCss={styles.dropdownLink}
      to={href}
      title={title}>
      <img css={styles.desktopOnly} alt={title} src={imageUrl} />
      <div css={styles.dropdownLinkContent}>
        <span css={[styles.title, href ? styles.blue : null]}>{title}</span>
        <p css={styles.desktopOnly}>{text}</p>
        {children}
      </div>
    </NavLink>
  )
}

const styles = {
  dropdownLink: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      color: ${theme.text} !important;
      height: auto;
      padding: 10px 20px;
      white-space: normal;
      border-radius: 7px;

      &,
      &:visited,
      &:hover,
      &:active {
        color: ${theme.text} !important;
      }

      img {
        flex-shrink: 0;
        width: 60px;
        margin-right: 10px;
      }
    }
  `,
  dropdownLinkContent: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      display: flex;
      flex-direction: column;
    }
  `,
  title: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      color: ${theme.header};
      font-weight: 700;
    }
  `,
  blue: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      color: ${theme.link};
    }
  `,
  desktopOnly: css`
    display: none;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      display: block;
    }
  `
}
