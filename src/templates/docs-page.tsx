import { MarkdownRemark, Query } from '../utils/graphql'
import { PageRendererProps, graphql } from 'gatsby'

import Layout from '../components/Layout'
import React from 'react'
import SEO from '../components/SEO'
import { StickyLink } from '../components/StickyNav'
import StickyNavLayout from '../components/StickyNavLayout'
import { css } from '@emotion/core'

type Props = PageRendererProps & {
  data: Query
  // Created by createPage in gatsby-node.js
  pageContext: {
    previous: MarkdownRemark
    next: MarkdownRemark
  }
}

export default function DocsPageTemplate({ data }: Props) {
  const posts = data.allMarkdownRemark.edges
  const links: StickyLink[] = []
  posts.forEach(({ node }) => {
    links.push({
      href: node.fields.slug,
      title: node.frontmatter.title
    })
  })
  const post = data.markdownRemark
  // const { previous, next } = pageContext

  return (
    <Layout>
      <SEO title="Blog" keywords={['spokestack', 'voice', 'artificial intelligence']} />
      <StickyNavLayout links={links}>
        <h1>{post.frontmatter.title}</h1>
        <div css={styles.aboutContent}>
          <p>{post.frontmatter.date}</p>
          <a href={post.fields.githubLink} target="_blank" rel="noopener noreferrer">
            Edit on GitHub
          </a>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </StickyNavLayout>
    </Layout>
  )
}

const styles = {
  aboutContent: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  `
}

export const pageQuery = graphql`
  query DocsPageBySlug($slug: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/docs/" }, frontmatter: { draft: { ne: true } } }
      limit: 10
    ) {
      edges {
        node {
          excerpt(pruneLength: 160)
          fields {
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        githubLink
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
