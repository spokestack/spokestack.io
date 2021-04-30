import * as theme from '../styles/theme'

import { Global, SerializedStyles, css } from '@emotion/react'
import React, { useState } from 'react'

import Hamburger from './Hamburger'
import Libraries from './Libraries'
import LoginButtons from './LoginButtons'
import Logo from './Logo'
import NavDropdown from './NavDropdown'
import NavLink from './NavLink'
import NavLinkDropdown from './NavLinkDropdown'
import { WindowLocation } from '@reach/router'
import { StaticImage } from 'gatsby-plugin-image'

interface Props {
  extraCss?: SerializedStyles | SerializedStyles[]
  location: WindowLocation
}

export default function Nav({ extraCss }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const contentStyles = [styles.navContent]
  if (mobileOpen) {
    contentStyles.push(styles.navContentOpen)
  }
  return (
    <nav css={[styles.nav].concat(extraCss!)}>
      <Global
        styles={css`
          ${theme.MIN_DEFAULT_MEDIA_QUERY} {
            .nav-link-active {
              color: ${theme.secondary} !important;
              font-weight: 700;
              cursor: default !important;

              &:after {
                width: 100% !important;
                height: 4px !important;
                left: 0 !important;
              }
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
            ${theme.DEFAULT_MEDIA_QUERY} {
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
            <NavDropdown title="Features">
              <div css={styles.dropdownContent}>
                <div css={styles.dropdownColumn}>
                  <NavLinkDropdown
                    extraCss={styles.navLinkDropdown}
                    href="/features/asr"
                    partiallyActive
                    title="Automatic Speech recognition"
                    image={
                      <StaticImage
                        css={styles.dropdownLinkImage}
                        alt="Automatic Speech Recognition"
                        src="../images/navigation/asr.png"
                      />
                    }
                    text="Start integrating voice using our tools &amp; services"
                  />
                  <NavLinkDropdown
                    extraCss={styles.navLinkDropdown}
                    href="/features/tts"
                    title="Text-to-Speech"
                    image={
                      <StaticImage
                        css={styles.dropdownLinkImage}
                        alt="Text-to-Speech"
                        src="../images/navigation/tts.png"
                      />
                    }
                    text="Step-by-step instructions to build real-world products"
                  />
                  <NavLinkDropdown
                    extraCss={styles.navLinkDropdown}
                    href="/features/nlu"
                    partiallyActive
                    title="Natural Language Understanding"
                    image={
                      <StaticImage
                        css={styles.dropdownLinkImage}
                        alt="Natural Language Understanding"
                        src="../images/navigation/nlu.png"
                      />
                    }
                    text="How-to articles on creating voice assistants from our team"
                  />
                </div>
                <div css={styles.dropdownColumn}>
                  <NavLinkDropdown
                    extraCss={styles.navLinkDropdown}
                    href="/features/wake-word"
                    partiallyActive
                    title="Wake word"
                    image={
                      <StaticImage
                        css={styles.dropdownLinkImage}
                        alt="Wake word"
                        src="../images/navigation/wake-word.png"
                      />
                    }
                    text="How-to articles on creating voice assistants from our team"
                  />
                  <NavLinkDropdown
                    extraCss={styles.navLinkDropdown}
                    href="/features/keyword"
                    partiallyActive
                    title="Keyword"
                    image={
                      <StaticImage
                        css={styles.dropdownLinkImage}
                        alt="Keyword"
                        src="../images/navigation/keyword.png"
                      />
                    }
                    text="How-to articles on creating voice assistants from our team"
                  />
                  <NavLinkDropdown
                    extraCss={styles.navLinkDropdown}
                    href="/features/speech-pipeline"
                    partiallyActive
                    title="Speech Pipeline"
                    image={
                      <StaticImage
                        css={styles.dropdownLinkImage}
                        alt="Speech Pipeline"
                        src="../images/navigation/speech-pipeline.png"
                      />
                    }
                    text="How-to articles on creating voice assistants from our team"
                  />
                </div>
                <div
                  className="dropdown-col-full"
                  css={[
                    styles.dropdownColumn,
                    styles.dropdownColumnFull,
                    styles.desktopOnly
                  ]}>
                  <h4>
                    <a href="/account/create">Get started</a>
                  </h4>
                  <p>No credit card required</p>
                  <a className="btn btn-primary" href="/account/create">
                    Sign up free
                  </a>
                </div>
              </div>
            </NavDropdown>
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
                    href="/tutorials"
                    title="Tutorials"
                    imageUrl="/navigation/tutorials.svg"
                    text="Step-by-step instructions to build real-world products"
                  />
                  <NavLinkDropdown
                    extraCss={styles.navLinkDropdown}
                    href="/blog"
                    partiallyActive
                    title="Blog"
                    imageUrl="/navigation/blog.svg"
                    text="How-to articles on creating voice assistants from our team"
                  />
                </div>
                <div css={styles.dropdownColumn}>
                  <NavLinkDropdown
                    extraCss={styles.navLinkDropdown}
                    title="Libraries"
                    imageUrl="/navigation/libraries.svg"
                    text="Build a voice-enabled app using one of our open source libraries:">
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
        loginDropdown
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

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      position: absolute;
      flex-direction: row;
      justify-content: space-between;
      padding-left: 30px;
      padding-right: 30px;
    }

    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      padding-left: 100px;
      padding-right: 100px;
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

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      justify-content: flex-start;
      background: none;
    }
  `,
  hamburger: css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 5px;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
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

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
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
    ${theme.DEFAULT_MEDIA_QUERY} {
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
    padding: 0;
    height: 100%;
    overflow-y: auto;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      justify-content: flex-start;
      overflow: hidden;
    }
  `,
  listItem: css`
    width: 100%;
    margin: 0;

    ${theme.DEFAULT_MEDIA_QUERY} {
      position: relative;
      & + & > .nav-link:after,
      & + & > .nav-dropdown > .nav-link:after {
        ${borderTopStyle};
      }
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      width: auto;
    }
  `,
  dropdownContent: css`
    display: flex;
    flex-direction: column;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    padding-left: 20px;
  `,
  dropdownColumn: css`
    display: flex;
    flex-direction: column;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      padding: 20px 20px 20px 0;
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

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      padding: 50px;
    }

    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      grid-column: auto;
    }
  `,
  navLinkDropdown: css`
    ${theme.DEFAULT_MEDIA_QUERY} {
      position: relative;
      &:after {
        ${borderTopStyle};
      }
    }
  `,
  dropdownLinkImage: css`
    flex-shrink: 0;
    width: 60px;
    margin-right: 10px;
  `,
  mobileLogin: css`
    position: relative;
    height: 94px;
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &:after {
      ${borderTopStyle};
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  desktopOnly: css`
    display: none;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      display: flex;
    }
  `
}
