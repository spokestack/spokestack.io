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
import { WindowLocation } from '@reach/router'

interface Props {
  extraCss?: SerializedStyles
  location: WindowLocation
}

export default function Nav({ extraCss, location }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const contentStyles = [styles.navContent]
  if (mobileOpen) {
    contentStyles.push(styles.navContentOpen)
  }
  return (
    <nav css={[styles.nav, extraCss]}>
      <Global
        styles={css`
          ${MIN_DEFAULT_MEDIA_QUERY} {
            .nav-link-active {
              color: ${theme.secondary} !important;
              font-weight: 700;
              cursor: default !important;
            }
            .nav-link-active:after {
              width: 100% !important;
              height: 4px !important;
              left: 0 !important;
            }
          }
          html.dark-mode {
            .nav-link {
              color: ${theme.textDarkBg} !important;
            }
            .dropdown-col-full {
              background-color: ${theme.navFullColumnDark};

              .btn:not(:hover):not(:active) {
                color: ${theme.text};
              }
            }
            ${DEFAULT_MEDIA_QUERY} {
              .nav-content,
              .mobile-login-buttons {
                background-color: ${theme.authorBackground};
              }
            }
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
        <a href="/" css={styles.logoLink} aria-label="Spokestack Home">
          <Logo />
        </a>
      </header>
      <div className="nav-content" css={contentStyles}>
        <ul css={styles.links}>
          <li css={styles.listItem} aria-label="Features Navigation">
            <NavLink partiallyActive to="/features" title="Spokestack Features">
              Features
            </NavLink>
          </li>
          <li css={styles.listItem} aria-label="Resources Navigation">
            <NavDropdown title="Resources">
              <div css={styles.dropdownContent}>
                <div css={styles.dropdownColumn}>
                  <NavLinkDropdown
                    extraCss={styles.navLinkDropdown}
                    href="/docs"
                    partiallyActive
                    title="Developer Docs"
                    imageUrl="/navigation/docs.svg"
                    text="Start integrating voice using our tools &amp; services"
                  />
                  <NavLinkDropdown
                    extraCss={styles.navLinkDropdown}
                    href="/blog/tag/tutorial"
                    title="Tutorials"
                    imageUrl="/navigation/tutorials.svg"
                    text="Step-by-step instructions to build real-world products"
                  />
                  <NavLinkDropdown
                    extraCss={styles.navLinkDropdown}
                    href="/blog"
                    partiallyActive={location.pathname !== '/blog/tag/tutorial'}
                    title="Blog"
                    imageUrl="/navigation/blog.svg"
                    text="How-to articles on creating voice assistants from our
                    team"
                  />
                </div>
                <div css={styles.dropdownColumn}>
                  <NavLinkDropdown
                    extraCss={styles.navLinkDropdown}
                    title="Libraries"
                    imageUrl="/navigation/libraries.svg"
                    text="Build a voice-enabled app using one of our open source
                    libraries:">
                    <Libraries />
                  </NavLinkDropdown>
                </div>
                <div
                  className="dropdown-col-full"
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
          <li css={styles.listItem} aria-label="Pricing Navigation">
            <NavLink partiallyActive to="/pricing" title="Spokestack Pricing">
              Pricing
            </NavLink>
          </li>
          <li css={styles.listItem} aria-label="Support Navigation">
            <NavLink partiallyActive to="/support" title="Spokestack Support">
              Support
            </NavLink>
          </li>
        </ul>
        <LoginButtons
          className="mobile-login-buttons"
          extraCss={styles.mobileLogin}
        />
      </div>
      <LoginButtons
        btnClassName="btn-secondary btn-transparent"
        extraCss={styles.desktopOnly}
      />
    </nav>
  )
}

const borderTopStyle = css`
  content: '';
  position: absolute;
  top: 0;
  left: 20px;
  right: 20px;
  height: 1px;
  background-color: ${theme.mainBorder};
`

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
      padding: 0 30px;
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
    transform: translateY(-50%);
    left: 5px;

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
    background-color: white;
    z-index: 9998;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      position: static;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      bottom: auto;
      padding: 0;
      transform: none;
      background-color: transparent;
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
    width: 100%;
    margin: 0;

    ${DEFAULT_MEDIA_QUERY} {
      position: relative;
      & + & > .nav-link:after,
      & + & > .nav-dropdown > .nav-link:after {
        ${borderTopStyle};
      }
    }

    ${MIN_DEFAULT_MEDIA_QUERY} {
      width: auto;
    }
  `,
  dropdownContent: css`
    display: flex;
    flex-direction: row;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  `,
  dropdownColumn: css`
    display: flex;
    flex-direction: column;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding: 20px 0 20px 20px;
    }

    ${theme.ieBreakpoint} {
      width: 100%;
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
  navLinkDropdown: css`
    ${DEFAULT_MEDIA_QUERY} {
      position: relative;
      &:after {
        ${borderTopStyle};
      }
    }
  `,
  mobileLogin: css`
    height: 94px;
    background-color: white;
    position: relative;

    &:after {
      ${borderTopStyle};
    }

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
