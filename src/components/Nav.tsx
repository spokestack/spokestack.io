import * as theme from '../styles/theme'

import { Global, SerializedStyles, css } from '@emotion/core'
import {
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_LARGE_DISPLAY_MEDIA_QUERY
} from 'typography-breakpoint-constants'
import React, { useState } from 'react'

import Hamburger from './Hamburger'
import { Link } from 'gatsby'
import LoginButtons from './LoginButtons'
import Logo from './Logo'
import { adjustFontSizeTo } from '../styles/typography'

interface Props {
  extraCss?: SerializedStyles
}

export default function Nav({ extraCss }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <nav css={[styles.nav, extraCss]}>
      <Global
        styles={css`
          .nav-link-active {
            color: ${theme.secondary} !important;
            font-weight: bold;
            cursor: default;
          }
          .nav-link-active:after {
            width: 100% !important;
            height: 4px !important;
            left: 0 !important;
          }
        `}
      />
      <header css={styles.header}>
        <Hamburger
          open={mobileOpen}
          onClick={() => {
            setMobileOpen(!mobileOpen)
          }}
          extraCss={styles.hamburger}
        />
        <a href="/" css={styles.logoLink}>
          <Logo />
        </a>
      </header>
      <div css={styles.navContent} className={mobileOpen ? 'mobile-open' : ''}>
        <ul css={styles.links}>
          <li css={styles.listItem}>
            <Link
              css={styles.navLink}
              to="/"
              activeClassName="nav-link-active"
              className="nav-link"
              onClick={() => setMobileOpen(false)}>
              Features
            </Link>
          </li>
          <li css={styles.listItem}>
            <Link
              className="nav-link"
              css={styles.navLink}
              activeClassName="nav-link-active"
              partiallyActive
              to="/about"
              title="About Spokestack">
              Resources
            </Link>
          </li>
          <li css={styles.listItem}>
            <Link
              className="nav-link"
              css={styles.navLink}
              activeClassName="nav-link-active"
              partiallyActive
              to="/pricing"
              title="Spokestack Pricing">
              Pricing
            </Link>
          </li>
          <li css={styles.listItem}>
            <Link
              className="nav-link"
              css={styles.navLink}
              activeClassName="nav-link-active"
              partiallyActive
              to="/support"
              title="Spokestack Support">
              Support
            </Link>
          </li>
        </ul>
        <LoginButtons extraCss={styles.mobileLogin} />
      </div>
      <LoginButtons extraCss={styles.desktopLogin} />
    </nav>
  )
}

const styles = {
  nav: css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background-color: ${theme.primary};
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 9997;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      position: absolute;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 50px;
    }

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      padding: 0 100px;
    }
  `,
  header: css`
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${theme.primary};
    user-select: none;
    flex-shrink: 0;
    z-index: 9999;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      justify-content: flex-start;
      background: none;
    }
  `,
  hamburger: css`
    position: absolute;
    top: 50%;
    margin-top: -7px;
    left: 20px;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  logoLink: css`
    line-height: 0;
  `,
  navContent: css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 60px 0 94px;
    transform: translateY(-100%);
    transition: transform 0.2s ${theme.transitionEasing};
    background-color: ${theme.primary};
    z-index: 9998;

    &.mobile-open {
      transform: translateY(0);
    }

    ${MIN_DEFAULT_MEDIA_QUERY} {
      position: static;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      bottom: auto;
      padding: 0;
      margin-left: 20px;
      transform: none;
    }
  `,
  links: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-grow: 1;
    list-style: none;
    margin: 0;
    height: 100%;
    overflow-y: auto;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      justify-content: flex-start;
      overflow: hidden;
    }
  `,
  listItem: css`
    margin: 0;
    width: 100%;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      width: auto;
    }
  `,
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

    &,
    &:hover,
    &:visited {
      color: ${theme.textDarkBg} !important;
      text-decoration: none;
    }

    &:hover,
    &.nav-link-active {
      background-color: rgba(0, 0, 0, 0.1);
    }
    &:active:not(.nav-link-active) {
      background-color: rgba(0, 0, 0, 0.2);
    }

    ${MIN_DEFAULT_MEDIA_QUERY} {
      width: auto;
      font-size: ${adjustFontSizeTo('16px').fontSize};

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
  `,
  mobileLogin: css`
    height: 94px;
    background-color: ${theme.primary};

    ${MIN_DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  desktopLogin: css`
    display: none;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      display: flex;
    }
  `
}
