import * as theme from '../utils/theme'

import { Global, css } from '@emotion/core'
import { PageRendererProps, graphql } from 'gatsby'

import AuthorImage from '../components/AuthorImage'
import BlogList from '../components/BlogList'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import { Query } from '../utils/graphql'
import React from 'react'
import SEO from '../components/SEO'
import { TeamMemberName } from '../types'

type Props = PageRendererProps & {
  data: Query
  // Created by createPage in gatsby-node.js
  pageContext: {
    author: TeamMemberName
    currentPage: number
    limit: number
    numPages: number
    skip: number
    tags: string[]
  }
}

export default function BlogListTemplate({
  data,
  pageContext: { author, currentPage, numPages, tags }
}: Props) {
  const posts = data.allMarkdownRemark.edges
  const { name, bio, title } = data.site.siteMetadata.team[author]
  const longTitle = `Here are all of the articles from ${name}.`
  return (
    <>
      <Global
        styles={css`
          html.dark-mode {
            .author-bio {
              color: white;
            }
          }
        `}
      />
      <SEO
        title="Blog"
        longTitle={longTitle}
        description="Check out all of our articles related to voice assistants, voice search, Alexa skills, and more."
      />
      <BlogList
        currentPage={currentPage}
        extraCss={styles.bloglist}
        numPages={numPages}
        posts={posts}
        tags={tags}
        header={
          <div css={styles.author}>
            <AuthorImage author={author} extraCss={styles.image} />
            <h4 css={styles.name}>{name}</h4>
            <p className="author-bio" css={styles.bio}>
              {bio || title}
            </p>
          </div>
        }
      />
    </>
  )
}

const styles = {
  bloglist: css`
    flex-direction: column-reverse;
    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding-top: 60px;
      .bg-banner {
        height: 500px;
      }
      .sidenav {
        padding-top: 450px;
      }
    }
  `,
  author: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 400px;
  `,
  image: css`
    width: 136px;
    height: 136px;
    margin-bottom: 15px;
  `,
  name: css`
    margin-bottom: 15px;
  `,
  bio: css`
    color: ${theme.headerColor.fade(0.25).toString()};
    margin: 0;
    max-width: 450px;
  `
}

export const blogListQuery = graphql`
  query blogListAuthorQuery($skip: Int!, $limit: Int!, $author: String!) {
    site {
      ...TeamMembers
    }
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        frontmatter: { author: { eq: $author } }
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
