import * as theme from '../styles/theme'

import { Global, css } from '@emotion/react'
import { Link, graphql, useStaticQuery } from 'gatsby'

import AppStoreButton from './AppStoreButton'
import Logo from './Logo'
import Newsletter from './Newsletter'
import { Query } from '../utils/graphql'
import React from 'react'
import SocialLink from './SocialLink'

export default function Footer() {
  const { site } = useStaticQuery<Query>(footerQuery)
  const contact = site!.siteMetadata!.contact!
  const social = site!.siteMetadata!.social!
  return (
    <footer css={styles.footer}>
      <Global
        styles={css`
          html:not(.dark-mode) .footer-logo {
            .logo-image,
            .logo-text {
              fill: ${theme.primary};
            }
          }
        `}
      />
      <Newsletter />
      <div css={styles.content}>
        <div css={styles.column}>
          <a href="/" css={styles.logoLink} aria-label="Spokestack Home">
            <Logo className="footer-logo" />
          </a>
          <p>
            Open source libraries + AutoML tools to put custom voice into your
            software.
          </p>
          <div css={styles.social}>
            <SocialLink
              transparent
              icon="#github"
              href={social.github!}
              title="GitHub"
              extraCss={styles.socialIcon}
              iconCss={styles.githubIcon}
            />
            <SocialLink
              transparent
              icon="#twitter"
              href={social.twitter!}
              title="Twitter"
              extraCss={styles.socialIcon}
              iconCss={styles.twitterIcon}
            />
            <SocialLink
              transparent
              icon="#linkedin"
              href={social.linkedin!}
              title="LinkedIn"
              extraCss={styles.socialIcon}
              iconCss={styles.linkedinIcon}
            />
            <SocialLink
              transparent
              icon="#youtube"
              href={social.youtube!}
              title="YouTube"
              extraCss={styles.socialIcon}
              iconCss={styles.youtubeIcon}
            />
            <SocialLink
              transparent
              icon="#facebook"
              href={social.facebook!}
              title="Facebook"
              extraCss={styles.socialIcon}
              iconCss={styles.facebookIcon}
            />
          </div>
          <div css={styles.appLink}>
            <img
              alt="Spokestack Studio"
              src="/mark.svg"
              css={styles.studioLogo}
            />
            <div className="ie-fix" css={styles.appLinkContent}>
              <p>
                Download Spokestack Studio to test wake word, text-to-speech,
                NLU, and ASR.
              </p>
              <AppStoreButton
                extraCss={styles.appStoreButton}
                transparent
                slug="https://apps.apple.com/us/app/spokestack-studio/id1508393980"
              />
            </div>
          </div>
        </div>
        <div css={styles.column}>
          <h5>Products</h5>
          <a css={styles.footerLink} href="https://github.com/spokestack">
            Spokestack Open Source
          </a>
          <Link css={styles.footerLink} to="/pricing#maker">
            Spokestack Maker
          </Link>
          <Link css={styles.footerLink} to="/pricing#pro">
            Spokestack Pro
            <span css={styles.comingSoon}>Coming Soon</span>
          </Link>
          <Link css={styles.footerLink} to="/docs/concepts/tray">
            Spokestack Tray
          </Link>
          <Link css={styles.footerLink} to="/features/speech-pipeline">
            Spokestack Speech Pipeline
          </Link>
          <h5>Native Platform SDKs</h5>
          <a
            css={styles.footerLink}
            href="https://github.com/spokestack/spokestack-ios">
            iOS (Swift, Obj-C)
          </a>
          <a
            css={styles.footerLink}
            href="https://github.com/spokestack/spokestack-android">
            Android (Java, Kotlin)
          </a>
          <a
            css={styles.footerLink}
            href="https://github.com/spokestack/spokestack-python">
            Python
          </a>
          <a
            css={styles.footerLink}
            href="https://github.com/spokestack/react-native-spokestack">
            React Native
          </a>
          <a
            css={styles.footerLink}
            href="https://github.com/spokestack/node-spokestack">
            Node
          </a>
        </div>
        <div css={styles.column}>
          <h5>Features</h5>
          <Link css={styles.footerLink} to="/features/wake-word">
            Wake Word
          </Link>
          <Link css={styles.footerLink} to="/features/keyword">
            Keyword Recognition
          </Link>
          <Link css={styles.footerLink} to="/features/tts">
            Text-to-Speech
          </Link>
          <Link css={styles.footerLink} to="/features/nlu">
            Natural Language Understanding (NLU)
          </Link>
          <Link css={styles.footerLink} to="/features/asr">
            Automatic Speech Recognition (ASR)
          </Link>
          <Link css={styles.footerLink} to="/features/vad">
            Voice Activity Detection (VAD)
          </Link>
          <h5>Resources</h5>
          <Link css={styles.footerLink} to="/docs">
            Developer Docs
          </Link>
          <a css={styles.footerLink} href="/tutorials">
            Tutorials
          </a>
          <Link css={styles.footerLink} to="/blog">
            Blog
          </Link>
          <Link css={styles.footerLink} to="/pricing">
            Pricing
          </Link>
          <a css={styles.footerLink} href="/account/create">
            Get Started Free
          </a>
          <a css={styles.footerLink} href="/account/login">
            Sign In
          </a>
        </div>
        <div css={styles.column}>
          <h5>Community</h5>
          <a css={styles.footerLink} href="/support">
            Support
          </a>
          <a css={styles.footerLink} href={social.github!}>
            GitHub
          </a>
          <a css={styles.footerLink} href={social.forum!}>
            Forum
          </a>
          <a css={styles.footerLink} href={social.stackoverflow!}>
            Stack Overflow
          </a>
          <h5>About</h5>
          <a css={styles.footerLink} href="/about/story">
            Story
          </a>
          <a css={styles.footerLink} href="/about/team">
            Team
          </a>
          <a css={styles.footerLink} href={`mailto:${contact.email}`}>
            Email Us
          </a>
        </div>
        <div css={styles.bottom}>
          <div css={styles.copyright}>
            Spokestack &copy; {new Date().getFullYear()}
          </div>
          <div css={styles.separator}>{`//`}</div>
          <a href="/privacy" css={[styles.footerLink, styles.privacyLink]}>
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: css`
    display: flex;
    flex-direction: column;
    padding: 0 20px 50px;

    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      padding-left: 50px;
      padding-right: 50px;
    }

    ${theme.MIN_LARGER_DISPLAY_MEDIA_QUERY} {
      padding-left: 100px;
      padding-right: 100px;
    }
  `,
  content: css`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 50px 0 75px;
    margin: 0 auto;

    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      flex-direction: row;
      justify-content: center;
      display: grid;
      grid-template-columns: 365px 240px 270px 240px;
      grid-gap: 20px;
    }
  `,
  column: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;

    h5 {
      text-transform: uppercase;
      color: ${theme.primary};
      margin: 10px 0;
    }

    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      align-items: flex-start;
      text-align: left;

      &:first-of-type {
        margin-right: 30px;
      }

      h5:first-of-type {
        margin-top: 0;
      }
    }

    ${theme.ieBreakpointMinLarge} {
      width: 25%;
      & + & {
        margin-left: 50px;
      }
    }
  `,
  logoLink: css`
    margin-top: -15px;
  `,
  social: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 50px;
  `,
  socialIcon: css`
    width: 50px;
    height: 50px;
  `,
  githubIcon: css`
    width: 17px;
    height: 16px;
  `,
  twitterIcon: css`
    width: 17px;
    height: 15px;
  `,
  linkedinIcon: css`
    width: 20px;
    height: 20px;
  `,
  youtubeIcon: css`
    width: 17px;
    height: 17px;
  `,
  facebookIcon: css`
    width: 17px;
    height: 17px;
  `,
  appLink: css`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 25px;
  `,
  studioLogo: css`
    width: 45px;
    height: 45px;
    border-radius: 7px;
  `,
  appLinkContent: css`
    display: flex;
    flex-direction: column;
    text-align: left;
    font-size: 14px;
    margin-left: 10px;
    max-width: 350px;
  `,
  appStoreButton: css`
    border-radius: 7px;
  `,
  footerLink: css`
    text-decoration: none;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 10px;

    &,
    &:visited {
      color: ${theme.header};
    }

    &:hover {
      color: ${theme.textColor.darken(0.3).hex()};
      text-decoration: underline;
    }

    &:active {
      color: ${theme.textColor.darken(0.6).hex()};
    }
  `,
  comingSoon: css`
    display: inline-block;
    background-color: #ccf2ff;
    border-radius: 30px;
    font-size: 12px;
    color: ${theme.primary};
    padding: 2px 12px;
    margin-left: 10px;
  `,
  bottom: css`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    white-space: nowrap;

    ${theme.MIN_TABLET_MEDIA_QUERY} {
      flex-direction: row;
    }
    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      justify-content: flex-start;
    }
  `,
  copyright: css`
    color: ${theme.mainBorderDark};
  `,
  separator: css`
    margin: 0 20px;
    display: none;

    ${theme.MIN_TABLET_MEDIA_QUERY} {
      display: block;
    }
  `,
  privacyLink: css`
    margin: 0;
    font-size: 18px;

    &,
    &:visited {
      color: ${theme.mainBorderDark};
    }
  `
}

const footerQuery = graphql`
  query footerQuery {
    site {
      siteMetadata {
        contact {
          email
          phone
        }
        social {
          twitter
          github
          forum
          stackoverflow
        }
      }
    }
  }
`
