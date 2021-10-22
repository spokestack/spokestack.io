import * as theme from '../styles/theme'

import { Global, css } from '@emotion/react'
import { Mdx, Query } from '../utils/graphql'
import { graphql, useStaticQuery } from 'gatsby'

import Color from 'color'
import React from 'react'
import Tags from './Tags'
import find from 'lodash/find'
import DraftBadge from './DraftBadge'

interface Props {
  post: Mdx
}

export default function BlogListItem({ post }: Props) {
  const frontmatter = post.frontmatter!
  const author = frontmatter.author
  const data = useStaticQuery<Query>(blogListItemQuery)
  if (!author || !data || !data.site) {
    return null
  }
  const { name, title, image } = find(data!.site!.siteMetadata!.team, {
    key: author
  })!
  return (
    <div
      onClick={(e) => {
        if ((e.target as HTMLAnchorElement).nodeName.toLowerCase() !== 'a') {
          window.location.href = post.fields!.slug!
        }
      }}
      css={styles.container}
      className="blog-list-item"
    >
      <Global
        styles={css`
          html.dark-mode .blog-list-item {
            background-color: ${theme.authorBackground};
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
              background-color: ${theme.authorBackgroundColor
                .darken(0.1)
                .hex()};
            }
          }
        `}
      />
      {post.frontmatter?.draft && <DraftBadge />}
      <div css={styles.author}>
        <img alt={name!} css={styles.image} src={image!} />
        <p>
          <span>
            {name}, {title}
          </span>
        </p>
      </div>
      <div>
        {!!frontmatter.hero?.publicURL && (
          <img
            alt={frontmatter.description!}
            css={styles.hero}
            src={frontmatter.hero.publicURL}
          />
        )}
        <h4>{frontmatter.title}</h4>
        <p css={styles.excerpt}>{post.excerpt}</p>
        <div css={styles.tags}>
          <Tags
            tags={post.fields!.tags!.filter(Boolean) as string[]}
            header=""
          />
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: css`
    position: relative;
    display: block;
    padding: 30px;
    background-color: white;
    border: 1px solid ${theme.mainBorder};
    border-left: 6px solid ${theme.primaryLight};
    margin-bottom: 15px;
    text-decoration: none;
    font-weight: 400;
    cursor: pointer;

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
  tags: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 15px;
  `,
  image: css`
    display: block;
    width: 34px;
    border-radius: 50%;
    margin-right: 10px;
  `,
  hero: css`
    float: right;
    width: 150px;
    border-radius: 7px;
    margin-left: 10px;
  `,
  excerpt: css`
    margin-bottom: 10px;
  `
}

const blogListItemQuery = graphql`
  query blogListItemQuery {
    site {
      siteMetadata {
        team {
          key
          name
          title
          image
        }
      }
    }
  }
`
