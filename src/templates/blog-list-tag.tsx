import { PageRendererProps, graphql } from 'gatsby'

import BlogList from '../components/BlogList'
import { PageContext } from '../types'
import { Query } from '../utils/graphql'
import React from 'react'
import SEO from '../components/SEO'

type Props = PageRendererProps & {
  data: Query
  pageContext: PageContext
}

export default function BlogListTagTemplate({
  data,
  pageContext: { currentPage, numPages, tag, tags }
}: Props) {
  const posts = data.allMarkdownRemark.edges
  const longTitle = `${posts.length} articles tagged with "${tag}"`
  return (
    <>
      <SEO
        title="Blog"
        longTitle={longTitle}
        description="Check out all of our articles related to voice assistants, voice search, Alexa skills, and more."
      />
      <BlogList
        currentPage={currentPage}
        homeUrl="/blog"
        numPages={numPages}
        posts={posts}
        tags={tags}
        title={longTitle}
      />
    </>
  )
}

export const blogListQuery = graphql`
  query blogListTagQuery($skip: Int!, $limit: Int!, $tag: String!) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        fields: { tags: { in: [$tag] } }
      }
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
