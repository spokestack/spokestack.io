import { Global, css } from '@emotion/core'
import {
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_TABLET_MEDIA_QUERY,
  MOBILE_MEDIA_QUERY
} from 'typography-breakpoint-constants'
import { adjustFontSizeTo, rhythm } from '../utils/typography'

import { Link } from 'gatsby'
import React from 'react'
import SocialLinks from './SocialLinks'

export default function Nav() {
  return (
    <div css={styles.navContainer}>
      <Global
        styles={css`
          .nav-link-active {
            color: var(--secondary-color) !important;
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
        <a href="/" css={styles.logoLink}>
          <img src="/logo.svg" css={styles.logo} />
        </a>
        <SocialLinks iconSize={25} />
      </header>
      <nav css={styles.nav}>
        <ul css={styles.links}>
          <li css={styles.listItem} style={{ minWidth: '85px' }}>
            <a css={styles.navLink} href="/#products" className="nav-link">
              Products &amp; Services
            </a>
          </li>
          {/* <li css={styles.listItem}>
            <a css={styles.navLink} href="/#demos" className="nav-link">
              Demos
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
              to="/docs"
              title="Spokestack Documentation">
              Docs
            </Link>
          </li>
          {/* <li css={styles.listItem}>
            <Link
              className="nav-link"
              css={styles.navLink}
              activeClassName="nav-link-active"
              partiallyActive
              to="/blog"
              title="Spokestack Blog">
              Blog
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  )
}

const styles = {
  navContainer: css`
    position: relative;
    height: 100px;
    background-color: var(--primary-color);
    padding: 0 ${rhythm(0.8)};
    display: flex;
    flex-direction: column;
    justify-content: center;

    ${MIN_TABLET_MEDIA_QUERY} {
      height: 60px;
    }
  `,
  header: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 60px;
  `,
  logoLink: css`
    line-height: 0;
    ${MOBILE_MEDIA_QUERY} {
      width: 38px;
      overflow: hidden;
    }
  `,
  logo: css`
    line-height: 0;
    max-width: none;
    margin: 0;
    width: 185px;
    height: 60px;
  `,
  nav: css`
    padding: 0 ${rhythm(0.4)};
    transition: all 0.2s var(--transition-easing);

    ${MIN_TABLET_MEDIA_QUERY} {
      position: absolute;
      top: 0;
      left: 235px;
      right: 145px;
      height: 60px;
    }
    ${MIN_DEFAULT_MEDIA_QUERY} {
      right: 325px;
    }
  `,
  links: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    list-style: none;
    margin: 0;

    ${MIN_TABLET_MEDIA_QUERY} {
      justify-content: flex-start;
      height: 60px;
    }
  `,
  listItem: css`
    margin: 0;
    width: 19%;
    height: 100%;

    ${MIN_TABLET_MEDIA_QUERY} {
      width: auto;
    }
  `,
  navLink: css`
    --nav-link-color: var(--text-color-dark-bg);
    color: var(--nav-link-color);
    font-size: ${adjustFontSizeTo('14px').fontSize};
    font-weight: 400;
    line-height: 1.1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;
    text-decoration: none;
    background-image: none;
    transition: all 0.2s var(--transition-easing);
    padding: 5px ${rhythm(0.2)} 8px;
    user-select: none;

    &:hover,
    &:visited {
      color: var(--nav-link-color);
      text-decoration: none;
      background-image: none;
    }
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      right: 0;
      width: 0;
      height: 0;
      transition: width 0.1s ease-in-out, height 0.1s ease-in-out, left 0.1s ease-in-out;
      background-color: var(--secondary-color);
    }
    &:hover:after {
      left: 0;
      height: 4px;
      width: 100%;
    }
    &:active {
      text-shadow: 0 0 1px rgba(39, 110, 202, 0.6);
    }

    ${MIN_TABLET_MEDIA_QUERY} {
      font-size: ${adjustFontSizeTo('16px').fontSize};
      margin-right: 15px;
    }
  `
}
