import * as theme from '../styles/theme'

import { Global, css } from '@emotion/core'
import { Link, graphql, useStaticQuery } from 'gatsby'
import {
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_LARGE_DISPLAY_MEDIA_QUERY,
  MIN_TABLET_MEDIA_QUERY
} from 'typography-breakpoint-constants'

import Logo from './Logo'
import Newsletter from './Newsletter'
import { Query } from '../utils/graphql'
import React from 'react'

export default function Footer() {
  const { site } = useStaticQuery<Query>(footerQuery)
  const { contact, social } = site.siteMetadata
  return (
    <footer css={styles.footer}>
      <Global
        styles={css`
          html:not(.dark-mode) .footer-logo {
            .logo--image,
            .logo--text {
              fill: ${theme.primary};
            }
          }
        `}
      />
      <Newsletter />
      <div css={styles.content}>
        <div css={styles.column}>
          <a href="/" css={styles.logoLink}>
            <Logo className="footer-logo" />
          </a>
          <a css={styles.footerLink} href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <a css={styles.footerLink} href={`tel:${contact.phone}`}>
            {contact.phone}
          </a>
        </div>
        <div css={styles.column}>
          <h5>Features</h5>
          <Link css={styles.footerLink} to="/features#understanding">
            Natural Language Understanding
          </Link>
          <Link css={styles.footerLink} to="/features#speech-recognition">
            Automatic Speech Recognition
          </Link>
          <Link css={styles.footerLink} to="/features#text-to-speech">
            Text-to-Speech &amp; Custom Voices
          </Link>
          <Link css={styles.footerLink} to="/features#wakeword">
            Wake Word
          </Link>
          <Link css={styles.footerLink} to="/pricing">
            Pricing
          </Link>
        </div>
        <div css={styles.column}>
          <h5>Resources</h5>
          <Link css={styles.footerLink} to="/docs">
            Developer Docs
          </Link>
          {/* <a css={styles.footerLink} href="/blog/tag/tutorial">
            Tutorials
          </a> */}
          <Link css={styles.footerLink} to="/blog">
            Blog
          </Link>
          <a
            css={styles.footerLink}
            href="https://github.com/spokestack/spokestack-ios">
            iOS Library
          </a>
          <a
            css={styles.footerLink}
            href="https://github.com/spokestack/spokestack-android">
            Android Library
          </a>
          <a
            css={styles.footerLink}
            href="https://github.com/spokestack/react-native-spokestack">
            React Native Library
          </a>
        </div>
        <div css={styles.column}>
          <h5>Community</h5>
          <a css={styles.footerLink} href="/support">
            Support
          </a>
          <a css={styles.footerLink} href={social.github}>
            GitHub
          </a>
          <a css={styles.footerLink} href={social.twitter}>
            Twitter
          </a>
          <a css={styles.footerLink} href={social.forum}>
            Forum
          </a>
          <a css={styles.footerLink} href={social.stackoverflow}>
            Stack Overflow
          </a>
        </div>
        <div css={styles.column}>
          <h5>About</h5>
          <a css={styles.footerLink} href="/about/team">
            Team
          </a>
          <a css={styles.footerLink} href="/about/story">
            Story
          </a>
          <a css={styles.footerLink} href="/about/investors">
            Investors
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
    padding: 0 20px 40px;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding-left: 100px;
      padding-right: 100px;
    }
  `,
  content: css`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 25px 0 50px;
    margin: 0 auto;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      justify-content: center;
    }
  `,
  column: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 25px 0;

    h5 {
      text-transform: uppercase;
      color: ${theme.primary};
      margin-bottom: 25px;
    }

    ${MIN_DEFAULT_MEDIA_QUERY} {
      align-items: flex-start;

      & + & {
        margin-left: 40px;
      }
    }

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      &:not(:first-of-type) + & {
        margin-left: 80px;
      }
    }
  `,
  logoLink: css`
    margin-top: -25px;
  `,
  footerLink: css`
    text-decoration: none;
    font-weight: 400;
    margin-bottom: 15px;

    &,
    &:visited {
      color: ${theme.text};
    }

    &:hover {
      color: ${theme.textColor.darken(0.3).hex()};
      text-decoration: underline;
    }

    &:active {
      color: ${theme.textColor.darken(0.6).hex()};
    }
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

    ${MIN_TABLET_MEDIA_QUERY} {
      flex-direction: row;
      justify-content: flex-start;
    }
  `,
  copyright: css`
    color: ${theme.mainBorderDark};
  `,
  separator: css`
    margin: 0 20px;
    display: none;

    ${MIN_TABLET_MEDIA_QUERY} {
      display: block;
    }
  `,
  privacyLink: css`
    margin: 0;
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
