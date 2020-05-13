import {
  DEFAULT_WIDTH,
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_LARGE_DISPLAY_MEDIA_QUERY
} from 'typography-breakpoint-constants'
import { RelatedLink, TeamMemberName } from '../types'

import Author from './Author'
import DarkModeButton from './DarkModeButton'
import Layout from '../components/Layout'
import { Link } from 'gatsby'
import { MarkdownRemark } from '../utils/graphql'
import React from 'react'
import SEO from '../components/SEO'
import Tags from './Tags'
import { css } from '@emotion/core'
import { rhythm } from '../utils/typography'
import findImage from '../utils/findImage'

interface Props {
  post: MarkdownRemark
  related?: RelatedLink[]
}

export default function BlogPost({ post, related }: Props) {
  return (
    <Layout>
      <SEO
        title="Blog"
        longTitle={post.frontmatter.title}
        description={post.frontmatter.description || 'The Spokestack Blog'}
        image={findImage(post.html)}
      />
      <div css={styles.container}>
        <section css={styles.author}>
          <Author author={post.frontmatter.author as TeamMemberName} />
        </section>
        <section className="main-content" css={styles.content}>
          <header className="docs-header">
            <h1>{post.frontmatter.title}</h1>
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
                <div>
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
    </Layout>
  )
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    padding: 20px 20px ${rhythm(2)};

    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding: ${rhythm(2)} 40px;
      display: grid;
      grid-template-columns: minmax(200px, 350px) minmax(
          700px,
          ${DEFAULT_WIDTH}
        );
      grid-template-rows: auto 1fr;
      grid-template-areas:
        'author  content'
        'related content';
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
  `,
  content: css`
    grid-area: content;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      margin-left: 50px;
    }
  `,
  related: css`
    grid-area: related;
    padding: 0 20px;
  `
}
