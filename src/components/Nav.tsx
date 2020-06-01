import * as theme from '../styles/theme'

import {
  DEFAULT_MEDIA_QUERY,
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_LARGE_DISPLAY_MEDIA_QUERY
} from 'typography-breakpoint-constants'
import { Global, SerializedStyles, css } from '@emotion/core'
import React, { useState } from 'react'

import Hamburger from './Hamburger'
import Libraries from './Libraries'
import LoginButtons from './LoginButtons'
import Logo from './Logo'
import NavDropdown from './NavDropdown'
import NavLink from './NavLink'
import NavLinkDropdown from './NavLinkDropdown'

interface Props {
  extraCss?: SerializedStyles
}

export default function Nav({ extraCss }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const contentStyles = [styles.navContent]
  if (mobileOpen) {
    contentStyles.push(styles.navContentOpen)
  }
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
      <div css={contentStyles}>
        <ul css={styles.links}>
          <li css={styles.listItem}>
            <NavLink partiallyActive to="/features" title="Spokestack Features">
              Features
            </NavLink>
          </li>
          <li css={styles.listItem}>
            <NavDropdown title="Resources">
              <div css={styles.dropdownContent}>
                <div css={styles.dropdownColumn}>
                  <NavLinkDropdown
                    href="/docs"
                    title="Developer Docs"
                    imageUrl="/navigation/docs.svg"
                    text="Start integrating voice using our tools &amp; services"
                  />
                  <NavLinkDropdown
                    href="/blog/tag/tutorial"
                    title="Tutorials"
                    imageUrl="/navigation/tutorials.svg"
                    text="Step-by-step instructions to build real-world products"
                  />
                  <NavLinkDropdown
                    href="/blog"
                    title="Blog"
                    imageUrl="/navigation/blog.svg"
                    text="How-to articles on creating voice assistants from our
                    team"
                  />
                </div>
                <div css={[styles.dropdownColumn, styles.desktopOnly]}>
                  <NavLinkDropdown
                    title="Libraries"
                    imageUrl="/navigation/libraries.svg"
                    text="Build a voice-enabled app using one of our open source
                    libraries:">
                    <Libraries />
                  </NavLinkDropdown>
                </div>
                <div
                  css={[
                    styles.dropdownColumn,
                    styles.dropdownColumnFull,
                    styles.desktopOnly
                  ]}>
                  <h4>
                    <a href="/docs">Get Started</a>
                  </h4>
                  <p>Get up &amp; running with Spokestack</p>
                  <a className="btn btn-primary" href="/docs">
                    View Docs
                  </a>
                </div>
              </div>
            </NavDropdown>
          </li>
          <li css={styles.listItem}>
            <NavLink partiallyActive to="/pricing" title="Spokestack Pricing">
              Pricing
            </NavLink>
          </li>
          <li css={styles.listItem}>
            <NavLink partiallyActive to="/support" title="Spokestack Support">
              Support
            </NavLink>
          </li>
        </ul>
        <LoginButtons extraCss={styles.mobileLogin} />
      </div>
      <LoginButtons extraCss={styles.desktopOnly} />
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
  navContentOpen: css`
    ${DEFAULT_MEDIA_QUERY} {
      transform: translateY(0);
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
  dropdownContent: css`
    display: flex;
    flex-direction: row;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  `,
  dropdownColumn: css`
    display: flex;
    flex-direction: column;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding: 20px 0 20px 20px;
    }
  `,
  dropdownColumnFull: css`
    grid-column: span 2;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: ${theme.primaryLighter};

    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding: 50px;
    }

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      grid-column: auto;
    }
  `,
  mobileLogin: css`
    height: 94px;
    background-color: ${theme.primary};

    ${MIN_DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  desktopOnly: css`
    display: none;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      display: flex;
    }
  `
}
