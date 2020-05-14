import * as theme from '../utils/theme'

import { Global, css } from '@emotion/core'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { MarkdownRemark, Query } from '../utils/graphql'

import AuthorImage from './AuthorImage'
import Color from 'color'
import React from 'react'
import { TeamMemberName } from '../types'

interface Props {
  post: MarkdownRemark
}

export default function BlogListItem({ post }: Props) {
  const author = post.frontmatter.author as TeamMemberName
  const data = useStaticQuery<Query>(blogListItemQuery)
  if (!author || !data || !data.site) {
    return null
  }
  const { name, title } = data.site.siteMetadata.team[author]
  return (
    <Link
      to={post.fields.slug}
      css={styles.container}
      className="blog-list-item">
      <Global
        styles={css`
          html.dark-mode .blog-list-item {
            background-color: ${theme.codeBackground};
            border-top-color: ${theme.mainBorderDark};
            border-right-color: ${theme.mainBorderDark};
            border-bottom-color: ${theme.mainBorderDark};

            &,
            &:visited,
            &:hover,
            &:active {
              color: ${theme.textDarkBg};
            }

            &:hover {
              background-color: ${theme.codeBackgroundColor.darken(0.1).hex()};
            }
          }
        `}
      />
      <div css={styles.author}>
        <Link css={styles.authorImageLink} to={`/blog/author/${author}`}>
          <AuthorImage author={author} extraCss={styles.image} />
        </Link>
        <p>
          <Link css={styles.authorLink} to={`/blog/author/${author}`}>
            {name}, {title}
          </Link>
          <span css={styles.dot}>•</span>
          <span css={styles.date}>{post.frontmatter.date}</span>
        </p>
      </div>
      <h4>{post.frontmatter.title}</h4>
      <p css={styles.excerpt}>{post.excerpt}</p>
    </Link>
  )
}

const styles = {
  container: css`
    display: block;
    padding: 30px;
    background-color: white;
    border: 1px solid ${theme.mainBorder};
    border-left: 6px solid ${theme.primaryLight};
    margin-bottom: 15px;
    text-decoration: none;
    font-weight: 400;

    &,
    &:visited,
    &:hover,
    &:active {
      color: ${theme.text};
    }

    &:hover {
      background-color: ${Color('#fff').darken(0.03).hex()};
    }

    &:active {
      box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.5);
    }

    h4 {
      margin-bottom: 10px;
    }
  `,
  author: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;

    p {
      margin: 0;
    }
  `,
  authorImageLink: css`
    line-height: 0;
  `,
  authorLink: css`
    text-decoration: none;

    &,
    &:visited {
      color: ${theme.text};
      font-weight: 400;
    }

    &:hover {
      color: ${theme.linkHover};
    }
    &:active {
      color: ${theme.linkActive};
    }
  `,
  dot: css`
    margin: 0 5px;
  `,
  image: css`
    max-width: 34px;
    max-height: 34px;
    margin-right: 10px;
  `,
  date: css`
    font-style: italic;
  `,
  excerpt: css`
    margin-bottom: 10px;
  `
}

const blogListItemQuery = graphql`
  query blogListItemQuery {
    site {
      ...TeamMembers
    }
  }
`
