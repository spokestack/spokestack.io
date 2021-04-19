import { MarkdownRemark, Query } from '../utils/graphql'
import { PageRendererProps, graphql } from 'gatsby'

import DocsPage from '../components/DocsPage'
import React from 'react'
import { RelatedLink } from '../types'

type Props = PageRendererProps & {
  data: Query
  // Created by createPage in gatsby-node.js
  pageContext: {
    slug: string
    previous: MarkdownRemark
    next: MarkdownRemark
    related: RelatedLink[]
  }
}

export default function DocsPageTemplate({
  data,
  location,
  pageContext
}: Props) {
  return (
    <DocsPage
      location={location}
      post={data.markdownRemark!}
      related={pageContext.related}
    />
  )
}

export const pageQuery = graphql`
  query docsPageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        githubLink
        tags
      }
      frontmatter {
        description
        hero {
          publicURL
        }
        seoImage {
          publicURL
        }
        title
      }
    }
  }
`
