import { PageRendererProps, graphql } from 'gatsby'

import BlogList from '../components/BlogList'
import { PageContext } from '../types'
import { Query } from '../utils/graphql'
import React from 'react'

type Props = PageRendererProps & {
  data: Query
  pageContext: PageContext
}

export default function BlogListTagTemplate({
  data,
  location,
  pageContext: { currentPage, numPages, slug, tag, tags, total }
}: Props) {
  const posts = data.allMarkdownRemark.edges
  const longTitle = `${total} articles tagged with "${tag}"`
  return (
    <BlogList
      currentPage={currentPage}
      homeUrl={slug}
      location={location}
      numPages={numPages}
      posts={posts}
      tags={tags}
      title={longTitle}
    />
  )
}

export const blogListQuery = graphql`
  query blogListTagQuery($skip: Int!, $limit: Int!, $tag: String!) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        fields: { tags: { in: [$tag] } }
        frontmatter: { draft: { ne: true } }
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
