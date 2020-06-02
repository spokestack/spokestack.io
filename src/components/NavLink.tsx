import * as theme from '../styles/theme'

import React, { AnchorHTMLAttributes } from 'react'
import { SerializedStyles, css } from '@emotion/core'

import { Link } from 'gatsby'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import { adjustFontSizeTo } from '../styles/typography'

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  extraCss?: SerializedStyles
  to?: string
  partiallyActive?: boolean
  mobileOnly?: boolean
}

export default function NavLink({
  extraCss,
  to,
  children,
  mobileOnly,
  partiallyActive,
  ...props
}: Props) {
  const style = [styles.navLink]
  if (!mobileOnly) {
    style.push(styles.navLinkDesktop)
  }
  style.push(extraCss)
  return to ? (
    <Link
      className="nav-link"
      css={style}
      activeClassName="nav-link-active"
      to={to}
      partiallyActive={partiallyActive}
      {...props}>
      {children}
    </Link>
  ) : (
    <a className="nav-link" css={style} {...props}>
      {children}
    </a>
  )
}

const styles = {
  navLink: css`
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 60px;
    font-size: ${adjustFontSizeTo('18px').fontSize};
    font-weight: 300;
    line-height: 1.1;
    transition: background-color 0.2s ${theme.transitionEasing},
      color 0.2s ${theme.transitionEasing};
    padding: 0 15px;
    user-select: none;
    white-space: nowrap;

    &[href] {
      cursor: pointer;
    }

    &,
    &:hover,
    &:visited {
      color: ${theme.textDarkBg} !important;
      text-decoration: none;
    }

    &[href]:hover,
    &[href].nav-link-active {
      background-color: rgba(0, 0, 0, 0.1);
    }
    &[href]:active:not(.nav-link-active) {
      background-color: rgba(0, 0, 0, 0.2);
    }
  `,
  navLinkDesktop: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      width: auto;

      &:hover,
      &.nav-link-active,
      &:visited {
        background: none !important;
      }
      &:active {
        background: none !important;
        text-shadow: 0 0 1px rgba(39, 110, 202, 0.6);
      }
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        right: 0;
        width: 0;
        height: 0;
        transition: width 0.1s ease-in-out, height 0.1s ease-in-out,
          left 0.1s ease-in-out;
        background-color: ${theme.secondary};
      }
      &:hover:after {
        left: 0;
        height: 4px;
        width: 100%;
      }
    }
  `
}
