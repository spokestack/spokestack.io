import * as theme from '../styles/theme'

import { Global, css } from '@emotion/core'
import { graphql, useStaticQuery } from 'gatsby'

import AuthorImage from './AuthorImage'
import Callout from './Callout'
import { Query } from '../utils/graphql'
import React from 'react'
import { rhythm } from '../styles/typography'
import find from 'lodash/find'

interface Props {
  author: string
}

export default function Author({ author }: Props) {
  const data = useStaticQuery<Query>(authorQuery)
  if (!author || !data.site) {
    return null
  }
  const { name, title } = find(data.site.siteMetadata.team, { key: author })
  return (
    <Callout to={`/blog/author/${author}`} extraCss={styles.author}>
      <Global
        styles={css`
          html.dark-mode {
            .author-bio {
              color: white;
            }
          }
        `}
      />
      <AuthorImage author={author} extraCss={styles.image} />
      <p css={styles.about}>About the Author</p>
      <h4 css={styles.name}>{name}</h4>
      <p className="author-bio" css={styles.bio}>
        {title}
      </p>
    </Callout>
  )
}

const styles = {
  author: css`
    margin-top: 5px;
  `,
  image: css`
    margin: 0 0 ${rhythm(1)};
    min-width: 95px;
  `,
  about: css`
    font-size: 16px;
    font-style: italic;
    margin: 0 0 5px;
  `,
  name: css`
    margin-bottom: 0;
    a {
      color: ${theme.header};

      &:hover {
        color: ${theme.linkHover};
      }
      &:active {
        color: ${theme.linkActive};
      }
    }
  `,
  bio: css`
    color: ${theme.headerColor.fade(0.25).toString()};
    margin: 0;
  `
}

const authorQuery = graphql`
  query authorQuery {
    site {
      siteMetadata {
        team {
          key
          name
          title
        }
      }
    }
  }
`
