import { PageRendererProps, graphql } from 'gatsby'

import BlogPost from '../components/BlogPost'
import { Query } from '../utils/graphql'
import React from 'react'

type Props = PageRendererProps & {
  data: Query & {
    firstPost: Query['allMarkdownRemark']
  }
}

export default function Blog({ data }: Props) {
  return <BlogPost selectFirst post={data.firstPost.edges[0].node} />
}

export const pageQuery = graphql`
  query {
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
            githubLink
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
