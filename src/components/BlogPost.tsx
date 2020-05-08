import {
  DEFAULT_WIDTH,
  MIN_DEFAULT_MEDIA_QUERY
} from 'typography-breakpoint-constants'
import { MarkdownRemark, Query } from '../utils/graphql'
import { StickyLink, TeamMemberName } from '../types'
import { graphql, useStaticQuery } from 'gatsby'

import Author from './Author'
import DarkModeButton from './DarkModeButton'
import Layout from '../components/Layout'
import React from 'react'
import SEO from '../components/SEO'
import { css } from '@emotion/core'
import { rhythm } from '../utils/typography'

interface Props {
  post: MarkdownRemark
  selectFirst?: boolean
}

export default function Blog({ post, selectFirst }: Props) {
  const links: StickyLink[] = []
  const data = useStaticQuery<Query>(blogPageQuery)
  const posts = data.allMarkdownRemark.edges
  posts.forEach(({ node }) => {
    links.push({
      href: node.fields.slug,
      section: node.fields.folder,
      title: node.frontmatter.title
    })
  })
  if (selectFirst) {
    links[0].forceSelect = true
  }
  return (
    <Layout>
      <SEO
        title="Blog"
        description={post.frontmatter.description || 'The Spokestack Blog'}
        keywords={['spokestack', 'blog', 'voice', 'artificial intelligence']}
      />
      <div css={styles.container}>
        <section css={styles.author}>
          <Author author={post.frontmatter.author as TeamMemberName} />
        </section>
        <section className="main-content" css={styles.content}>
          <header className="docs-header">
            {selectFirst ? (
              <h1>
                <a href={post.fields.slug}>{post.frontmatter.title}</a>
              </h1>
            ) : (
              <h1>{post.frontmatter.title}</h1>
            )}
            <DarkModeButton />
          </header>
          <p>{post.frontmatter.date}</p>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </section>
        <section css={styles.related}>
          <h6>Related Tags</h6>
          <div css={styles.tags}>
            <a href="#" className="btn btn-primary btn-small">
              Business
            </a>
            <a href="#" className="btn btn-primary btn-small">
              Marketing
            </a>
            <a href="#" className="btn btn-primary btn-small">
              Design
            </a>
            <a href="#" className="btn btn-primary btn-small">
              NLU
            </a>
            <a href="#" className="btn btn-primary btn-small">
              Product
            </a>
          </div>
          <h6>Related Articles</h6>
          <div>
            <a href="#" className="content-link">
              Why We&rsquo;re Building Spokestack
            </a>
          </div>
        </section>
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
      padding: ${rhythm(2)} 100px;
      display: grid;
      grid-template-columns: minmax(290px, 350px) minmax(
          700px,
          ${DEFAULT_WIDTH}
        );
      grid-template-rows: auto 1fr;
      grid-template-areas:
        'author  content'
        'related content';
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

    h6 {
      margin: ${rhythm(1)} 0 ${rhythm(0.8)};
      font-style: italic;
      font-size: 80%;
    }
  `,
  tags: css`
    display: flex;
    flex-wrap: wrap;
    margin: -5px;

    .btn {
      display: inline-flex;
      margin: 5px;
    }
  `
}

export const blogPageQuery = graphql`
  query blogPageQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        frontmatter: { draft: { ne: true } }
      }
      limit: 10
    ) {
      edges {
        node {
          fields {
            folder
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            description
            title
          }
        }
      }
    }
  }
`
