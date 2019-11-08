import { LARGER_DISPLAY_WIDTH, MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import { adjustFontSizeTo, rhythm } from '../utils/typography'
import { graphql, useStaticQuery } from 'gatsby'

import React from 'react'
import SocialLinks from './SocialLinks'
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
        <a href="/">
          <img src="/logo.svg" css={styles.logo} />
        </a>
        <div css={styles.links}>
          <a href="/#products" className="header-link">
            <h2>Features</h2>
          </a>
          <a href="/#branded-voice">Custom Branded Voice</a>
          <a href="/#asr-manager">Open source ASR Manager</a>
          <a href="/#wakeword-creation">Wakeword Creation</a>
          <a href="/#nlu">Natural Language Understanding</a>
        </div>
        {/* <div css={styles.links}>
          <a href="/#demos" className="header-link">
            <h2>Demos</h2>
          </a>
          <a href="/#surve-demo">Survey</a>
          <a href="/#rss-demo">RSS Feed</a>
          <a href="/#media-controls">Media Controls</a>
          <a href="/#Weather">Weather</a>
        </div> */}
        <div css={styles.links}>
          {/* <a href="/about" className="header-link">
            <h2>About</h2>
          </a>
          <a href="/docs" className="header-link">
            <h2>Docs</h2>
          </a>
          <a href="/blog" className="header-link">
            <h2>Blog</h2>
          </a> */}
          <SocialLinks iconSize={25} style={{ marginLeft: '-10px', width: '95px' }} />
          <p>
            &copy; {new Date().getFullYear()} {author}
          </p>
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
      font-size: ${adjustFontSizeTo('22px').fontSize};
      margin-bottom: 15px;

      &:hover {
        color: hsl(0, 0%, 80%);
      }
      &:active {
        color: hsl(0, 0%, 50%);
      }
    }

    h2 {
      color: var(--secondary-color);
      margin-bottom: 20px;
    }
  `
}
