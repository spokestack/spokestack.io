import * as theme from '../styles/theme'

import { Global, SerializedStyles, css } from '@emotion/core'

import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import NavLink from './NavLink'
import React from 'react'

interface Props {
  children?: React.ReactNode
  extraCss?: SerializedStyles
  href?: string
  imageUrl: string
  partiallyActive?: boolean
  title: string
  text: string
}

export default function NavLinkDropdown({
  children,
  extraCss,
  href,
  imageUrl,
  partiallyActive,
  title,
  text
}: Props) {
  return (
    <NavLink
      mobileOnly
      partiallyActive={partiallyActive}
      className="nav-link-dropdown"
      extraCss={[styles.dropdownLink, extraCss]}
      to={href}
      title={title}>
      <Global
        styles={css`
          html.dark-mode .nav-link-dropdown {
            span:not(.blue),
            p {
              color: ${theme.textDarkBg};
            }
          }
        `}
      />
      <img alt={title} css={styles.dropdownLinkImage} src={imageUrl} />
      <div className="ie-fix" css={styles.dropdownLinkContent}>
        <span className={href ? 'blue' : ''} css={styles.dropdownLinkTitle}>
          {title}
        </span>
        <p css={styles.dropdownLinkText}>{text}</p>
        {children}
      </div>
    </NavLink>
  )
}

const styles = {
  dropdownLink: css`
    flex-direction: row;
    align-items: flex-start;
    color: ${theme.text} !important;
    height: auto;
    padding: 20px;
    white-space: normal;

    &,
    &:visited,
    &:hover,
    &:active {
      color: ${theme.text} !important;
    }

    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding: 10px 20px;
      border-radius: 7px;
    }
  `,
  dropdownLinkImage: css`
    flex-shrink: 0;
    width: 60px;
    margin-right: 10px;
  `,
  dropdownLinkContent: css`
    display: flex;
    flex-direction: column;
  `,
  dropdownLinkTitle: css`
    color: ${theme.header};
    font-weight: 700;
    margin-bottom: 5px;
  `,
  dropdownLinkText: css`
    font-weight: 400;
  `
}
