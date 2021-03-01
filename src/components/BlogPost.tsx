import {
  MAX_SIDEBAR_WIDTH,
  MAX_BLOG_TEXT_WIDTH,
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_LARGE_DISPLAY_MEDIA_QUERY,
  MIN_SIDEBAR_WIDTH,
  MIN_TEXT_WIDTH,
  mainBorder,
  ieBreakpoint
} from '../styles/theme'
import React, { Fragment } from 'react'

import Author from './Author'
import Create from './homepage/Create'
import DarkModeButton from './DarkModeButton'
import Layout from '../components/Layout'
import { Link } from 'gatsby'
import { MarkdownRemark } from '../utils/graphql'
import { RelatedLink } from '../types'
import SEO from '../components/SEO'
import Tags from './Tags'
import { WindowLocation } from '@reach/router'
import { css } from '@emotion/react'
import findImage from '../utils/findImage'
import { isLoggedIn } from '../utils/auth'

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
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <div className="main-footer" css={styles.footer}>
            <h6>Originally posted {post.frontmatter.date}</h6>
          </div>
        </section>
        {post.fields && (
          <section css={styles.related}>
            <Tags tags={post.fields.tags} header="Related Tags" />
            {related && !!related.length && (
              <Fragment>
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
              </Fragment>
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
    padding: 20px 20px 30px;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      display: grid;
      grid-template-columns:
        minmax(${MIN_SIDEBAR_WIDTH}, ${MAX_SIDEBAR_WIDTH}) minmax(
          ${MIN_TEXT_WIDTH},
          ${MAX_BLOG_TEXT_WIDTH}
        )
        minmax(${MIN_SIDEBAR_WIDTH}, ${MAX_SIDEBAR_WIDTH});
      grid-template-rows: auto 1fr;
      grid-template-areas:
        'author  content'
        'related content';
      padding: 30px 40px;
      max-width: calc(100vm - ${MAX_SIDEBAR_WIDTH});
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
  footer: css`
    grid-area: content;
    border-top: 1px solid ${mainBorder};
    border-bottom: 1px solid ${mainBorder};
    padding-bottom: 15px;
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
