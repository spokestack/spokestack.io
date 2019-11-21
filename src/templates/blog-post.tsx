import { MarkdownRemark, Query } from '../utils/graphql'
import { PageRendererProps, graphql } from 'gatsby'

import Author from '../components/Author'
import Layout from '../components/Layout'
import React from 'react'
import SEO from '../components/SEO'
import { StickyLink } from '../components/StickyNav'
import StickyNavLayout from '../components/StickyNavLayout'

type Props = PageRendererProps & {
  data: Query & {
    site: {
      siteMetadata: {
        authors: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          [key: string]: any
        }
      }
    }
  }
  // Created by createPage in gatsby-node.js
  pageContext: {
    slug: string
    previous: MarkdownRemark
    next: MarkdownRemark
  }
}

export default function BlogPostTemplate({ data }: Props) {
  const posts = data.allMarkdownRemark.edges
  const links: StickyLink[] = []
  posts.forEach(({ node }) => {
    links.push({
      href: node.fields.slug,
      title: node.frontmatter.title
    })
  })
  const post = data.markdownRemark
  const author = data.site.siteMetadata.authors[post.frontmatter.author]
  // const { previous, next } = pageContext

  return (
    <Layout>
      <SEO title="Blog" keywords={['spokestack', 'voice', 'artificial intelligence']} />
      <StickyNavLayout links={links} rightContent={<Author {...author} />}>
        <h1>{post.frontmatter.title}</h1>
        <p>{post.frontmatter.date}</p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </StickyNavLayout>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      ...TeamMembers
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/blog/" }, frontmatter: { draft: { ne: true } } }
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
      frontmatter {
        author
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
