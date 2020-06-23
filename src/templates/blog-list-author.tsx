import * as theme from '../styles/theme'

import { Global, css } from '@emotion/core'
import { PageRendererProps, graphql } from 'gatsby'

import AuthorImage from '../components/AuthorImage'
import BlogList from '../components/BlogList'
import DarkModeButton from '../components/DarkModeButton'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import { PageContext } from '../types'
import { Query } from '../utils/graphql'
import React from 'react'
import SocialLink from '../components/SocialLink'
import find from 'lodash/find'

type Props = PageRendererProps & {
  data: Query
  pageContext: PageContext
}

export default function BlogListAuthorTemplate({
  data,
  location,
  pageContext: { author, currentPage, numPages, slug, tags }
}: Props) {
  const posts = data.allMarkdownRemark.edges
  const { name, bio, social, title } = find(data.site.siteMetadata.team, {
    key: author
  })
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
      <BlogList
        currentPage={currentPage}
        extraCss={styles.bloglist}
        location={location}
        numPages={numPages}
        posts={posts}
        tags={tags}
        homeUrl={slug}
        header={
          <div css={styles.author}>
            <AuthorImage author={author} extraCss={styles.image} />
            <h4 css={styles.name}>{name}</h4>
            <p className="author-bio" css={styles.bio}>
              {bio || title}
            </p>
            <div css={styles.social}>
              {social.twitter && (
                <SocialLink
                  icon="#twitter"
                  href={social.twitter}
                  title="Twitter"
                  extraCss={styles.socialIcon}
                  iconCss={styles.twitterIcon}
                />
              )}
              {social.linkedin && (
                <SocialLink
                  icon="#linkedin"
                  href={social.linkedin}
                  title="LinkedIn"
                  extraCss={styles.socialIcon}
                  iconCss={styles.linkedinIcon}
                />
              )}
              {social.email && (
                <SocialLink
                  icon="#email"
                  href={`mailto:${social.email}`}
                  title="Email"
                  extraCss={styles.socialIcon}
                  iconCss={styles.emailIcon}
                />
              )}
            </div>
            <div css={styles.headerBottom}>
              <DarkModeButton />
            </div>
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
        padding-top: 445px;
      }
    }
  `,
  author: css`
    position: relative;
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
  `,
  headerBottom: css`
    position: absolute;
    right: 0;
    bottom: 20px;
  `,
  social: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 20px 0;
  `,
  socialIcon: css`
    width: 50px;
    height: 50px;
  `,
  twitterIcon: css`
    width: 17px;
    height: 15px;
  `,
  linkedinIcon: css`
    width: 20px;
    height: 20px;
  `,
  emailIcon: css`
    width: 20px;
    height: 20px;
  `
}

export const blogListQuery = graphql`
  query blogListAuthorQuery($skip: Int!, $limit: Int!, $author: String!) {
    site {
      siteMetadata {
        team {
          key
          name
          title
          bio
          social {
            twitter
            linkedin
            email
          }
        }
      }
    }
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        frontmatter: { author: { eq: $author }, draft: { ne: true } }
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
