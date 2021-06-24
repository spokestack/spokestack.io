import { PageRendererProps, graphql } from 'gatsby'
import React, { Fragment } from 'react'

import BlogList from '../components/BlogList'
import { PageContext } from '../types'
import { Query } from '../utils/graphql'
import SEO from '../components/SEO'

type Props = PageRendererProps & {
  data: Query
  // Created by createPage in gatsby-node.js
  pageContext: PageContext
}

export default function BlogListTemplate({
  data,
  pageContext: { currentPage, numPages, slug, tags }
}: Props) {
  return (
    <Fragment>
      <SEO
        title="Voice App Developer Blog | Spokestack"
        description="The Spokestack blog shares articles for voice assistant and app creators and enthusiasts. See product updates and tips to build better voice experiences."
      />
      <BlogList
        currentPage={currentPage}
        homeUrl={slug}
        numPages={numPages}
        posts={data.allMdx.edges}
        tags={tags}
        title="Blog"
      />
    </Fragment>
  )
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!, $dev: Boolean!) {
    allMdx(
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        frontmatter: { draft: { in: [false, $dev] } }
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
            draft
            hero {
              publicURL
            }
            title
          }
        }
      }
    }
  }
`
