import { Query } from '../utils/graphql'
import { PageRendererProps, graphql } from 'gatsby'

import BlogPost from '../components/BlogPost'
import React from 'react'
import { PageContext } from '../types'

type Props = PageRendererProps & {
  data: Query
  // Created by createPage in gatsby-node.js
  pageContext: PageContext
}

export default function BlogPostTemplate({ data, pageContext }: Props) {
  return <BlogPost post={data.markdownRemark!} related={pageContext.related} />
}

export const pageQuery = graphql`
  query blogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        githubLink
        tags
      }
      frontmatter {
        author
        date(formatString: "MMMM DD, YYYY")
        description
        draft
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
