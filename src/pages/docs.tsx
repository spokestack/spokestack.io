import { PageRendererProps, graphql } from 'gatsby'

import DocsPage from '../components/DocsPage'
import { Query } from '../utils/graphql'
import React from 'react'

type Props = PageRendererProps & {
  data: Query & {
    firstPost: Query['allMarkdownRemark']
  }
}

export default function Docs({ data }: Props) {
  return <DocsPage selectFirst post={data.firstPost.edges[0].node} />
}

export const pageQuery = graphql`
  query {
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
