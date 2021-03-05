import { PageRendererProps, graphql } from 'gatsby'
import { RelatedLink } from '../types'
import DocsPage from '../components/DocsPage'
import { MarkdownRemark, Query } from '../utils/graphql'
import React from 'react'

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
      post={data.markdownRemark}
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
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
