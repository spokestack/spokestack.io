import { MarkdownRemark, Query } from '../utils/graphql'
import { PageRendererProps, graphql } from 'gatsby'

import DocsPage from '../components/DocsPage'
import React from 'react'

type Props = PageRendererProps & {
  data: Query
  // Created by createPage in gatsby-node.js
  pageContext: {
    slug: string
    previous: MarkdownRemark
    next: MarkdownRemark
  }
}

export default function DocsPageTemplate({ data, location }: Props) {
  return <DocsPage location={location} post={data.markdownRemark} />
}

export const pageQuery = graphql`
  query docsPageBySlug($slug: String!) {
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
