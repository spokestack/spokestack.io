import { PageRendererProps, graphql } from 'gatsby'
import React, { Fragment } from 'react'

import BlogList from '../components/BlogList'
import { PageContext } from '../types'
import { Query } from '../utils/graphql'
import SEO from '../components/SEO'

type Props = PageRendererProps & {
  data: Query
  pageContext: PageContext
}

const descriptions = {
  tags: 'The Spokestack blog shares articles for voice assistant and app creators and enthusiasts. See product updates and tips to build better voice experiences.',
  tutorials:
    'Learn from Spokestack developers, app creators, and enthusiasts and build your own independent voice assistant.'
}

export default function BlogListTagTemplate({
  data,
  pageContext: { currentPage, numPages, slug, tag, tags, total }
}: Props) {
  const isTutorial = tag === 'Tutorial'
  const posts = data.allMdx.edges
  const longTitle = isTutorial
    ? 'Tutorials'
    : `${total} articles tagged with "${tag}"`
  return (
    <Fragment>
      <SEO
        title={`Voice App Developer ${
          isTutorial ? 'Tutorials' : 'Blog'
        } | Spokestack`}
        description={isTutorial ? descriptions.tutorials : descriptions.tags}
      />
      <BlogList
        currentPage={currentPage}
        homeUrl={slug}
        numPages={numPages}
        posts={posts}
        tags={tags}
        title={longTitle}
      />
    </Fragment>
  )
}

export const blogListQuery = graphql`
  query blogListTagQuery(
    $skip: Int!
    $limit: Int!
    $tag: String!
    $dev: Boolean!
  ) {
    allMdx(
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        fields: { tags: { in: [$tag] } }
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
