import { LARGER_DISPLAY_WIDTH, MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import { rhythm } from '../utils/typography'
import { graphql, useStaticQuery } from 'gatsby'

import React from 'react'
import { css } from '@emotion/core'

const footerQuery = graphql`
  query footerQuery {
    site {
      siteMetadata {
        author
      }
    }
  }
`

export default function Footer() {
  const { site } = useStaticQuery(footerQuery)
  const { author } = site.siteMetadata
  return (
    <footer css={styles.footer}>
      <div css={styles.wrapper}>
        <div>
          <a href="/">
            <img src="/logo.svg" css={styles.logo} />
          </a>
        </div>
        <div css={styles.links}>
          <h3>
            <a href="mailto:hello@spokestack.io" className="header-link">
              Contact Us
            </a>
          </h3>
          <p>
            &copy; {new Date().getFullYear()} {author}
          </p>
          {/* <SocialLinks iconSize={25} style={{ marginLeft: '-10px', width: '95px' }} /> */}
        </div>
        <div css={styles.links}>
          <h3>
            <a href="/#products" className="header-link">
              Features
            </a>
          </h3>
          <a href="/#asr">ASR and VAD Management</a>
          <a href="/#tts">Text-to-Speech Integration</a>
          <a href="/#wakeword">Wakeword Creation</a>
          <a href="/#nlu">Spokestack NLU</a>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: css`
    background-color: var(--footer-background);
    color: var(--text-color-dark-bg);
    padding: ${rhythm(1)} ${rhythm(1.5)} ${rhythm(2)};
  `,
  wrapper: css`
    max-width: ${LARGER_DISPLAY_WIDTH};
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      justify-content: space-between;
      padding-right: ${rhythm(2)};
    }
  `,
  logo: css`
    margin: 0;
    width: 240px;
    margin-right: ${rhythm(1)};
  `,
  links: css`
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    a:not(.header-link) {
      color: white;
      margin-bottom: 15px;
      text-decoration: none;
      font-weight: 400;

      &:hover {
        color: hsl(0, 0%, 80%);
      }
      &:active {
        color: hsl(0, 0%, 50%);
      }
    }

    h3 {
      margin-bottom: 20px;

      a {
        color: var(--secondary-color);

        &:visited {
          color: var(--link-color-visited-secondary);
        }
        &:hover {
          color: var(--link-color-hover-secondary);
        }
        &:active {
          color: var(--link-color-active-secondary);
        }
      }
    }
  `
}
