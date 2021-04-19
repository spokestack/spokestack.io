import { MarkdownRemark, Query } from '../utils/graphql'
import { PageRendererProps, graphql } from 'gatsby'

import DocsPage from '../components/DocsPage'
import React from 'react'
import { RelatedLink } from '../types'

type Props = PageRendererProps & {
  data: Query
  // Created by createPage in gatsby-node.js
  pageContext: {
    related: RelatedLink[]
    slug: string
    previous: MarkdownRemark
    next: MarkdownRemark
  }
}

export default function Docs({ data, location, pageContext }: Props) {
  return (
    <DocsPage
      selectFirst
      location={location}
      post={data.markdownRemark!}
      related={pageContext.related}
    />
  )
}

export const pageQuery = graphql`
  query docsQuery {
    markdownRemark(fields: { slug: { eq: "/docs/welcome" } }) {
      id
      html
      fields {
        githubLink
        slug
      }
      frontmatter {
        title
        description
      }
    }
  }
`
