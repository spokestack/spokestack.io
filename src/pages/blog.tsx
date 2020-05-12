import { MarkdownRemark, Query } from '../utils/graphql'
import { PageRendererProps, graphql, navigate } from 'gatsby'

import { RelatedLink } from '../types'
import { useEffect } from 'react'

type Props = PageRendererProps & {
  data: Query & {
    firstPost: Query['allMarkdownRemark']
  }
  // Created by createPage in gatsby-node.js
  pageContext: {
    related: RelatedLink[]
    slug: string
    previous: MarkdownRemark
    next: MarkdownRemark
  }
}

export default function Blog({ data }: Props): null {
  useEffect(() => {
    navigate(data.firstPost.edges[0].node.fields.slug)
  }, [])
  return null
}

export const pageQuery = graphql`
  query blogQuery {
    firstPost: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        frontmatter: { draft: { ne: true } }
      }
      limit: 1
    ) {
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
  }
`
