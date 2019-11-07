import { css, Global } from '@emotion/core'
import { Link } from 'gatsby'
import React from 'react'
import { rhythm } from '../utils/typography'
import SocialLink from './SocialLink'
import githubIcon from '../icons/github.svg'
import twitterIcon from '../icons/twitter.svg'

export default function Nav() {
  return (
    <div css={styles.container}>
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
        <a href="/">
          <img src="/logo.svg" css={styles.logo} />
        </a>
        <div css={styles.socialLinks}>
          <SocialLink
            href="https://github.com/spokestack"
            title="Spokestack GitHub"
            icon={twitterIcon.id}
          />
          <SocialLink
            href="https://github.com/spokestack"
            title="Spokestack GitHub"
            icon={githubIcon.id}
          />
        </div>
      </header>
      <nav css={styles.nav}>
        <ul css={styles.links}>
          <li css={styles.listItem} style={{ width: '24%' }}>
            <a css={styles.navLink} href="/#services" className="nav-link nav-link-active">
              Products &amp; Services
            </a>
          </li>
          <li css={styles.listItem}>
            <a css={styles.navLink} href="/#demos" className="nav-link">
              Demos
            </a>
          </li>
          <li css={styles.listItem}>
            <a css={styles.navLink} href="/#about" className="nav-link">
              About
            </a>
          </li>
          <li css={styles.listItem}>
            <Link
              className="nav-link"
              css={styles.navLink}
              activeClassName="nav-link-active"
              to="/docs"
              title="Spokestack Documentation">
              Docs
            </Link>
          </li>
          <li css={styles.listItem}>
            <Link
              className="nav-link"
              css={styles.navLink}
              activeClassName="nav-link-active"
              to="/blog"
              title="Spokestack Blog">
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

const styles = {
  container: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    background-color: var(--primary-color);
    padding: 0 ${rhythm(0.8)};
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  `,
  header: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  socialLinks: css`
    width: 85px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  logo: css`
    margin: ${rhythm(0.2)} 0 0 ${rhythm(0.2)};
    width: 40px;
    height: 40px;
  `,
  nav: css`
    padding: 0 ${rhythm(0.4)};
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
  `,
  listItem: css`
    margin: 0;
    width: 19%;
    height: 100%;
  `,
  navLink: css`
    --nav-link-color: var(--text-color-dark-bg);
    color: var(--nav-link-color);
    font-size: ${14 / 18}em;
    line-height: 1.1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;
    background-image: none;
    transition: all 0.2s cubic-bezier(0.28, 0.32, 0.29, 0.79);
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
  `
}
