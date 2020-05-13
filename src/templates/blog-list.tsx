import { PageRendererProps, graphql } from 'gatsby'

import BlogList from '../components/BlogList'
import { Query } from '../utils/graphql'
import React from 'react'
import SEO from '../components/SEO'

type Props = PageRendererProps & {
  data: Query
  // Created by createPage in gatsby-node.js
  pageContext: {
    currentPage: number
    limit: number
    numPages: number
    skip: number
    tags: string[]
  }
}

export default function BlogListTemplate({
  data,
  pageContext: { numPages, currentPage, tags }
}: Props) {
  return (
    <>
      <SEO
        title="Blog"
        longTitle="The Spokestack Blog"
        description="Check out all of our articles related to voice assistants, voice search, Alexa skills, and more."
      />
      <BlogList
        currentPage={currentPage}
        numPages={numPages}
        posts={data.allMarkdownRemark.edges}
        tags={tags}
        title="Blog"
      />
    </>
  )
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/blog/" } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 160)
          fields {
            slug
            tags
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
