import { Query } from '../utils/graphql'
import { PageRendererProps, graphql } from 'gatsby'

import DocsPage from '../components/DocsPage'
import React from 'react'

type Props = PageRendererProps & {
  data: Query
}

export default function Docs({ data, location }: Props) {
  return (
    <DocsPage selectFirst location={location} post={data.markdownRemark!} />
  )
}

export const pageQuery = graphql`
  query docsQuery {
    markdownRemark(fields: { slug: { eq: "/docs/overview" } }) {
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
