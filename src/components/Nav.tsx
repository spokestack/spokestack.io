import * as theme from '../utils/theme'

import { Global, css } from '@emotion/core'
import {
  LARGE_DISPLAY_MEDIA_QUERY,
  MIN_LARGE_DISPLAY_MEDIA_QUERY
} from 'typography-breakpoint-constants'
import React, { useState } from 'react'

import Hamburger from './Hamburger'
import { Link } from 'gatsby'
import LoginButton from './LoginButton'
import SocialLinks from './SocialLinks'
import { adjustFontSizeTo } from '../utils/typography'
import { isLoggedIn } from '../utils/auth'

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <div css={styles.navContainer}>
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
      <nav css={styles.nav} className={mobileOpen ? 'mobile-open' : ''}>
        <div css={styles.navContent}>
          <ul css={styles.links}>
            {!isLoggedIn() && (
              <li css={styles.listItem} style={{ minWidth: '85px' }}>
                <a
                  css={styles.navLink}
                  style={{ minWidth: '130px' }}
                  href="/#products"
                  className="nav-link"
                  onClick={() => setMobileOpen(false)}>
                  Products &amp; Services
                </a>
              </li>
            )}
            <li css={styles.listItem}>
              <a
                css={styles.navLink}
                href="/#news"
                className="nav-link"
                onClick={() => setMobileOpen(false)}>
                In the News
              </a>
            </li>
            {/* <li css={styles.listItem}>
              <a
                css={styles.navLink}
                href="/#events"
                className="nav-link"
                onClick={() => setMobileOpen(false)}>
                Events
              </a>
            </li> */}
            <li css={styles.listItem}>
              <Link
                className="nav-link"
                css={styles.navLink}
                activeClassName="nav-link-active"
                partiallyActive
                to="/about"
                title="About Spokestack">
                About
              </Link>
            </li>
            <li css={styles.listItem}>
              <Link
                className="nav-link"
                css={styles.navLink}
                activeClassName="nav-link-active"
                partiallyActive
                to="/blog"
                title="Spokestack Blog">
                Blog
              </Link>
            </li>
            <li css={styles.listItem}>
              <Link
                className="nav-link"
                css={styles.navLink}
                activeClassName="nav-link-active"
                partiallyActive
                to="/docs"
                title="Spokestack Documentation">
                Docs
              </Link>
            </li>
            {isLoggedIn() && (
              <li css={styles.listItem}>
                <Link
                  className="nav-link"
                  css={styles.navLink}
                  activeClassName="nav-link-active"
                  partiallyActive
                  to="/account"
                  title="Spokestack Account">
                  Account
                </Link>
              </li>
            )}
          </ul>
          <div css={styles.rightLinks}>
            <SocialLinks
              iconSize={25}
              extraCss={styles.socialLink}
              titleCss={styles.socialLinkTitle}
            />
            <LoginButton />
          </div>
        </div>
      </nav>
      <header css={styles.header}>
        <Hamburger
          open={mobileOpen}
          onClick={() => {
            setMobileOpen(!mobileOpen)
          }}
          extraCss={styles.hamburger}
        />
        <a href="/" css={styles.logoLink}>
          <img src="/logo.svg" css={styles.logo} />
        </a>
      </header>
    </div>
  )
}

const mobileLink = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  font-size: ${adjustFontSizeTo('18px').fontSize};
  font-weight: 400;
  line-height: 1.1;
  color: ${theme.textDarkBg};
  text-align: center;
  text-decoration: none;
  transition: background-color 0.2s ${theme.transitionEasing},
    color 0.2s ${theme.transitionEasing};
  padding: 0 15px;
  user-select: none;
  white-space: nowrap;

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
`

const styles = {
  navContainer: css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background-color: ${theme.primary};
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 9999;

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      position: absolute;
      flex-direction: row-reverse;
      justify-content: space-between;
      padding: 0 20px;
    }
  `,
  header: css`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 60px;
    background-color: ${theme.primary};
    user-select: none;
    flex-shrink: 0;

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      justify-content: flex-start;
      background: none;
    }
  `,
  hamburger: css`
    position: absolute;
    top: 50%;
    margin-top: -7px;
    left: 20px;

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      display: none;
    }
  `,
  logoLink: css`
    line-height: 0;
  `,
  logo: css`
    line-height: 0;
    max-width: none;
    margin: 0;
    width: 185px;
    height: 60px;
  `,
  desktopLink: css`
    ${LARGE_DISPLAY_MEDIA_QUERY} {
      display: none;
    }
  `,
  nav: css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 60px 0;
    transform: translateY(-100%);
    transition: transform 0.2s ${theme.transitionEasing};
    background-color: ${theme.primary};
    overflow: hidden;

    &.mobile-open {
      transform: translateY(0);
    }

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      position: relative;
      bottom: auto;
      width: 100%;
      height: 60px;
      padding: 0;
      margin-left: 20px;
      transform: none;
    }
  `,
  navContent: css`
    width: 100%;
    height: 100%;
    overflow-y: auto;

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      width: auto;
      overflow: hidden;
      display: flex;
      flex-direction: row;
    }
  `,
  links: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    list-style: none;
    margin: 0;

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      flex-direction: row;
      justify-content: flex-start;
    }
  `,
  rightLinks: css`
    display: flex;
    flex-direction: column;

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      flex-direction: row;
      align-items: center;
    }
  `,
  listItem: css`
    margin: 0;
    width: 100%;

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      width: auto;
    }
  `,
  navLink: css`
    ${mobileLink}
    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
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
  socialLink: css`
    ${LARGE_DISPLAY_MEDIA_QUERY} {
      border-radius: 0;
      ${mobileLink}
    }
  `,
  socialLinkTitle: css`
    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      display: none;
    }
  `
}
