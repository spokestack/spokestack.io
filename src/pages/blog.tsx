import { PageRendererProps, graphql } from 'gatsby'

import Author from '../components/Author'
import Layout from '../components/Layout'
import { Query } from '../utils/graphql'
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
    firstPost: Query['allMarkdownRemark']
  }
}

export default function Blog({ data }: Props) {
  const posts = data.allMarkdownRemark.edges
  const links: StickyLink[] = []
  posts.forEach(({ node }) => {
    links.push({
      href: node.fields.slug,
      title: node.frontmatter.title
    })
  })
  const post = data.firstPost.edges[0].node
  const author = data.site.siteMetadata.authors[post.frontmatter.author]

  return (
    <Layout>
      <SEO title="Blog" keywords={['spokestack', 'voice', 'artificial intelligence']} />
      <StickyNavLayout selectFirst links={links} rightContent={<Author {...author} />}>
        <h1>
          <a href={post.fields.slug}>{post.frontmatter.title}</a>
        </h1>
        <p>{post.frontmatter.date}</p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </StickyNavLayout>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...Authors
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/blog/" }, frontmatter: { draft: { ne: true } } }
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
      filter: { fileAbsolutePath: { regex: "/blog/" }, frontmatter: { draft: { ne: true } } }
      limit: 1
    ) {
      edges {
        node {
          html
          fields {
            slug
          }
          frontmatter {
            author
            date(formatString: "MMMM DD, YYYY")
            description
            title
          }
        }
      }
    }
  }
`
