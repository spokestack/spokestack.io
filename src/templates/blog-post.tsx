import { MarkdownRemark, Query } from '../utils/graphql'
import { PageRendererProps, graphql } from 'gatsby'

import BlogPost from '../components/BlogPost'
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

export default function BlogPostTemplate({
  data,
  location,
  pageContext
}: Props) {
  return (
    <BlogPost
      location={location}
      post={data.markdownRemark}
      related={pageContext.related}
    />
  )
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
