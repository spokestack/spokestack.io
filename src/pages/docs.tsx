import { PageRendererProps, graphql } from 'gatsby'

import Layout from '../components/Layout'
import { Query } from '../utils/graphql'
import React from 'react'
import SEO from '../components/SEO'
import { StickyLink } from '../components/StickyNav'
import StickyNavLayout from '../components/StickyNavLayout'
import { css } from '@emotion/core'

type Props = PageRendererProps & {
  data: Query & {
    firstPost: Query['allMarkdownRemark']
  }
}

export default function Docs({ data }: Props) {
  const posts = data.allMarkdownRemark.edges
  const links: StickyLink[] = []
  posts.forEach(({ node }) => {
    links.push({
      href: node.fields.slug,
      title: node.frontmatter.title
    })
  })
  const post = data.firstPost.edges[0].node

  return (
    <Layout>
      <SEO
        title="Docs"
        description="Documentation for the Spokestack API"
        keywords={['spokestack', 'documentation', 'voice', 'artificial intelligence']}
      />
      <StickyNavLayout links={links}>
        <h1>
          <a href={post.fields.slug}>{post.frontmatter.title}</a>
        </h1>
        <div css={styles.aboutContent}>
          <p>{post.frontmatter.date}</p>
          <a href={post.fields.githubLink} rel="noopener noreferrer" target="_blank">
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
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/docs/" }, frontmatter: { draft: { ne: true } } }
      limit: 10
    ) {
      edges {
        node {
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
    firstPost: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/docs/" }, frontmatter: { draft: { ne: true } } }
      limit: 1
    ) {
      edges {
        node {
          html
          fields {
            slug
            githubLink
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
