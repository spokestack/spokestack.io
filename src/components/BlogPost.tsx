import * as theme from '../styles/theme'

import Author from './Author'
import Create from './Create'
import DarkModeButton from './DarkModeButton'
import Layout from '../components/Layout'
import { Link } from 'gatsby'
import { MarkdownRemark } from '../utils/graphql'
import React from 'react'
import { PageContext } from '../types'
import SEO from '../components/SEO'
import Tags from './Tags'
import { css } from '@emotion/react'
import findImage from '../utils/findImage'
import { isLoggedIn } from '../utils/auth'
import removeTrailingSlash from '../utils/removeTrailingSlash'
import DraftBadge from './DraftBadge'

interface Props {
  post: MarkdownRemark
  related?: PageContext['related']
}

export default function BlogPost({ post, related }: Props) {
  const frontmatter = post.frontmatter!
  return (
    <Layout contentStyle={styles.post}>
      <SEO
        title={`${frontmatter.title} - Spokestack`}
        description={frontmatter.description!}
        image={
          frontmatter.seoImage?.publicURL
            ? `${removeTrailingSlash(process.env.SITE_URL!)}${
                frontmatter.seoImage.publicURL
              }`
            : findImage(post.html!)
        }
      />
      <div className="ie-fix" css={styles.container}>
        {frontmatter.draft && <DraftBadge />}
        <section css={styles.author}>
          <Author author={frontmatter.author!} />
        </section>
        <section className="main-content" css={styles.content}>
          <header className="docs-header">
            <h2>{frontmatter.title}</h2>
            <DarkModeButton />
          </header>
          <div dangerouslySetInnerHTML={{ __html: post.html! }} />
          <p css={styles.date}>Originally posted {frontmatter.date}</p>
        </section>
        {post.fields && (
          <section css={styles.related}>
            <Tags
              tags={post.fields.tags?.filter(Boolean) as string[]}
              header="Related Tags"
            />
            {!!related?.blog.length && (
              <div css={styles.relatedLinks}>
                <h6>Related Articles</h6>
                {related.blog.map((link, i) => (
                  <Link
                    key={`related-${i}`}
                    to={link.href}
                    className="content-link">
                    {link.title}
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
      {!isLoggedIn() && <Create />}
    </Layout>
  )
}

const styles = {
  post: css`
    padding-bottom: 50px;
  `,
  container: css`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 20px 20px 30px;
    width: 100%;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      display: grid;
      grid-template-columns:
        minmax(${theme.MIN_SIDEBAR_WIDTH}, ${theme.MAX_SIDEBAR_WIDTH})
        minmax(${theme.MIN_TEXT_WIDTH}, ${theme.MAX_BLOG_TEXT_WIDTH})
        minmax(${theme.MIN_SIDEBAR_WIDTH}, ${theme.MAX_SIDEBAR_WIDTH});
      grid-template-rows: auto 1fr;
      grid-template-areas:
        'author  content'
        'related content';
      padding: 30px 40px;
      margin: 0 auto;
    }
    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      padding-left: 100px;
      padding-right: 100px;
    }
  `,
  author: css`
    grid-area: author;
    margin-bottom: 50px;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      margin-bottom: 0;
    }

    ${theme.ieBreakpoint} {
      min-width: 200px;
    }
  `,
  content: css`
    grid-area: content;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      margin-left: 50px;
    }

    ${theme.ieBreakpoint} {
      width: 100%;
      min-width: 500px;
    }
  `,
  date: css`
    font-style: italic;
  `,
  related: css`
    grid-area: related;
    padding: 15px 20px;

    ${theme.ieBreakpoint} {
      min-width: 200px;
    }
  `,
  relatedLinks: css`
    display: flex;
    flex-direction: column;
    margin-top: 15px;

    a {
      margin-bottom: 10px;
    }
  `
}
