import {
  MAX_SIDEBAR_WIDTH,
  MAX_TEXT_WIDTH,
  MIN_SIDEBAR_WIDTH,
  MIN_TEXT_WIDTH,
  ieBreakpoint
} from '../styles/theme'
import {
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_LARGE_DISPLAY_MEDIA_QUERY
} from 'typography-breakpoint-constants'

import Author from './Author'
import Create from './homepage/Create'
import DarkModeButton from './DarkModeButton'
import Layout from '../components/Layout'
import { Link } from 'gatsby'
import { MarkdownRemark } from '../utils/graphql'
import React from 'react'
import { RelatedLink } from '../types'
import SEO from '../components/SEO'
import Tags from './Tags'
import { WindowLocation } from '@reach/router'
import { css } from '@emotion/core'
import findImage from '../utils/findImage'
import { isLoggedIn } from '../utils/auth'
import { rhythm } from '../styles/typography'

interface Props {
  location: WindowLocation
  post: MarkdownRemark
  related?: RelatedLink[]
}

export default function BlogPost({ location, post, related }: Props) {
  return (
    <Layout contentStyle={styles.post} location={location}>
      <SEO
        title={`${post.frontmatter.title} - Spokestack`}
        description={post.frontmatter.description}
        image={findImage(post.html)}
      />
      <div className="ie-fix" css={styles.container}>
        <section css={styles.author}>
          <Author author={post.frontmatter.author} />
        </section>
        <section className="main-content" css={styles.content}>
          <header className="docs-header">
            <h2>{post.frontmatter.title}</h2>
            <DarkModeButton />
          </header>
          <p>{post.frontmatter.date}</p>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </section>
        {post.fields && (
          <section css={styles.related}>
            <Tags tags={post.fields.tags} header="Related Tags" />
            {related && !!related.length && (
              <>
                <h6>Related Articles</h6>
                <div css={styles.relatedLinks}>
                  {related.map((link, i) => (
                    <Link
                      key={`related-${i}`}
                      to={link.href}
                      className="content-link">
                      {link.title}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </section>
        )}
      </div>
      {!isLoggedIn() && <Create small />}
    </Layout>
  )
}

const styles = {
  post: css`
    padding-bottom: 50px;
  `,
  container: css`
    display: flex;
    flex-direction: column;
    padding: 20px 20px ${rhythm(2)};

    ${MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      display: grid;
      grid-template-columns:
        minmax(${MIN_SIDEBAR_WIDTH}, ${MAX_SIDEBAR_WIDTH}) minmax(
          ${MIN_TEXT_WIDTH},
          ${MAX_TEXT_WIDTH}
        )
        minmax(${MIN_SIDEBAR_WIDTH}, ${MAX_SIDEBAR_WIDTH});
      grid-template-rows: auto 1fr;
      grid-template-areas:
        'author  content'
        'related content';
      padding: ${rhythm(2)} 40px;
      max-width: calc(
        ${MAX_SIDEBAR_WIDTH} + ${MAX_TEXT_WIDTH} + ${MAX_SIDEBAR_WIDTH}
      );
      margin: 0 auto;
    }
    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      padding-left: 100px;
      padding-right: 100px;
    }
  `,
  author: css`
    grid-area: author;
    margin-bottom: 50px;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      margin-bottom: 0;
    }

    ${ieBreakpoint} {
      min-width: 200px;
    }
  `,
  content: css`
    grid-area: content;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      margin-left: 50px;
    }

    ${ieBreakpoint} {
      width: 100%;
      min-width: 500px;
    }
  `,
  related: css`
    grid-area: related;
    padding: 0 20px;

    ${ieBreakpoint} {
      min-width: 200px;
    }
  `,
  relatedLinks: css`
    display: flex;
    flex-direction: column;

    a {
      margin-bottom: 10px;
    }
  `
}
