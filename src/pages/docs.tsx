import { PageRendererProps, graphql } from 'gatsby'

import DocsPage from '../components/DocsPage'
import { Query } from '../utils/graphql'
import React from 'react'

type Props = PageRendererProps & {
  data: Query
}

export default function Docs({ data, location }: Props) {
  return <DocsPage selectFirst location={location} post={data.markdownRemark} />
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
