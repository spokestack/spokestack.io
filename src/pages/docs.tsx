import { PageRendererProps, graphql } from 'gatsby'

import DocsPage from '../components/DocsPage'
import { Query } from '../utils/graphql'
import React from 'react'

type Props = PageRendererProps & {
  data: Query
}

export default function Docs({ data }: Props) {
  return <DocsPage selectFirst post={data.markdownRemark} />
}

export const pageQuery = graphql`
  query {
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
