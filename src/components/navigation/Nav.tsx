import * as theme from '../../styles/theme'

import { Global, SerializedStyles, css } from '@emotion/react'
import React, { useState } from 'react'

import Hamburger from './Hamburger'
import Libraries from './Libraries'
import LoginButtons from './LoginButtons'
import Logo from '../Logo'
import NavDropdown from './NavDropdown'
import NavDropdownLink from './NavDropdownLink'
import NavLink from './NavLink'

interface Props {
  contentCss?: SerializedStyles | SerializedStyles[]
  extraCss?: SerializedStyles | SerializedStyles[]
}

export default function Nav({ contentCss, extraCss }: Props) {
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
      <div className="nav-content" css={contentStyles.concat(contentCss!)}>
        <ul css={styles.links}>
          <li css={styles.listItem} aria-label="Features Navigation">
            <NavDropdown title="Features">
              <div css={styles.dropdownContent}>
                <div css={styles.dropdownColumn}>
                  <NavDropdownLink
                    href="/features/wake-word"
                    partiallyActive
                    title="Wake word"
                    extraCss={styles.featuresLink}
                    icon="#wake-word"
                    iconCss={css`
                      width: 42px;
                      height: 36px;
                    `}
                    text="Recognize one or more multilingual, on-device wake words to activate listening in your software."
                  />
                  <NavDropdownLink
                    href="/features/keyword"
                    partiallyActive
                    title="Keyword"
                    extraCss={styles.featuresLink}
                    icon="#keyword"
                    iconCss={css`
                      width: 40px;
                      height: 38px;
                    `}
                    text="Respond to any particular word or sound, whether or not it's part of a language."
                  />
                  <NavDropdownLink
                    href="/features/tts"
                    title="Text-to-Speech"
                    extraCss={styles.featuresLink}
                    icon="#tts"
                    iconCss={css`
                      width: 40px;
                      height: 39px;
                    `}
                    text="Create your own AI voice or use one of ours. Personal AI voice clones &mdash; it's your voice, not a deepfake!"
                  />
                </div>
                <div css={styles.dropdownColumn}>
                  <NavDropdownLink
                    href="/features/vad"
                    partiallyActive
                    title="Voice Activity Detection"
                    extraCss={styles.featuresLink}
                    icon="#vad"
                    iconCss={css`
                      width: 48px;
                      height: 38px;
                    `}
                    text="Determine whether or not an audio snippet contains human speech."
                  />
                  <NavDropdownLink
                    href="/features/nlu"
                    partiallyActive
                    title="Natural Language Understanding"
                    extraCss={styles.featuresLink}
                    icon="#nlu"
                    iconCss={css`
                      width: 34px;
                      height: 38px;
                    `}
                    text="Turn speech into software commands by classifying intent and slot variables from speech."
                  />
                </div>
                <div css={styles.dropdownColumn}>
                  <NavDropdownLink
                    href="/features/asr"
                    partiallyActive
                    title="Automatic Speech Recognition"
                    extraCss={styles.featuresLink}
                    icon="#asr"
                    iconCss={css`
                      width: 46px;
                      height: 39px;
                    `}
                    text="Analyze and transcribe your software's audio to perform a function or simply record."
                  />
                  <NavDropdownLink
                    href="/features/speech-pipeline"
                    partiallyActive
                    title="Speech Pipeline"
                    extraCss={styles.featuresLink}
                    icon="#speech-pipeline"
                    iconCss={css`
                      width: 43px;
                      height: 38px;
                    `}
                    text="Process audio with Spokestack's powerful and extensible speech pipeline."
                  />
                </div>
              </div>
            </NavDropdown>
          </li>
          <li css={styles.listItem} aria-label="Resources Navigation">
            <NavDropdown title="Resources" maxMenuWidth={969}>
              <div css={styles.dropdownContent}>
                <div css={styles.dropdownColumn}>
                  <NavDropdownLink
                    href="/docs"
                    partiallyActive
                    title="Developer Docs"
                    icon="#docs"
                    iconCss={css`
                      width: 34px;
                      height: 36px;
                    `}
                    text="Quickstart guides, concept overviews, and platform-specific documentation"
                  />
                  <NavDropdownLink
                    href="/tutorials"
                    title="Tutorials"
                    icon="#tutorials"
                    iconCss={css`
                      width: 34px;
                      height: 37px;
                    `}
                    text="Step-by-step instructions to build real-world products"
                  />
                  <NavDropdownLink
                    href="/blog"
                    partiallyActive
                    title="Blog"
                    icon="#blog"
                    iconCss={css`
                      width: 36px;
                      height: 37px;
                    `}
                    text="How-to articles and news about voice from our team"
                  />
                </div>
                <div css={styles.dropdownColumn}>
                  <NavDropdownLink
                    title="Libraries"
                    icon="#sdks"
                    iconCss={css`
                      width: 36px;
                      height: 37px;
                    `}
                    text="Open source libraries for integrating Spokestack into your apps">
                    <Libraries />
                  </NavDropdownLink>
                  {/* <NavDropdownLink
                    href="/community"
                    title="Community"
                    icon="#community"
                    iconCss={css`
                      width: 34px;
                      height: 36px;
                    `}
                    text="Find other makers and help each other create better voice-enabled software."
                  /> */}
                  <NavDropdownLink
                    href="/support"
                    title="Support"
                    icon="#support"
                    iconCss={css`
                      width: 34px;
                      height: 34px;
                    `}
                    text="We offer multiple support channels that best suit the topic and product. Choose one that would best fits your needs."
                  />
                </div>
              </div>
            </NavDropdown>
          </li>
          <li css={styles.listItem} aria-label="Pricing Navigation">
            <NavLink to="/pricing" title="Spokestack Pricing">
              Pricing
            </NavLink>
          </li>
          <li css={styles.listItem} aria-label="Community Navigation">
            <NavLink to="/community" title="Spokestack Community">
              Community
            </NavLink>
          </li>
          <li css={styles.listItem} aria-label="Support Navigation">
            <NavLink to="/support" title="Spokestack Support">
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
    border-bottom: 1px solid ${theme.mainBorder};

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      width: auto;
      border: none;
    }
  `,
  dropdownColumn: css`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
  dropdownContent: css`
    display: flex;
    flex-direction: column;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      flex-wrap: wrap;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 10px;
      padding: 40px;
    }
  `,
  featuresLink: css`
    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      min-height: 137px;
    }
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
      content: '';
      position: absolute;
      top: 0;
      left: 20px;
      right: 20px;
      height: 1px;
      background-color: ${theme.mainBorder};
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
