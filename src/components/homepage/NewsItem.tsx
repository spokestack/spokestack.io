import * as theme from '../../styles/theme'

import { Link, graphql, useStaticQuery } from 'gatsby'

import { Query } from '../../utils/graphql'
import React from 'react'
import { css } from '@emotion/react'
import find from 'lodash/find'

interface Props {
  author: string
  authorHref: string
  date?: string
  title: string
  imageUrl: string
  to: string
  type: string
}

export default function NewsItem({
  author,
  authorHref,
  title,
  imageUrl,
  to,
  type
}: Props) {
  const data = useStaticQuery<Query>(newsItemQuery)
  const { name, image: authorImage } = find(data.site!.siteMetadata!.team, {
    key: author
  })!
  return (
    <div css={styles.newsItem}>
      <img css={styles.image} alt={title} src={imageUrl} />
      <div css={styles.details}>
        <Link css={styles.title} to={to}>
          <h5 className="blue">{type}</h5>
          <h4>{title}</h4>
        </Link>
        <a href={authorHref} css={styles.authorLink}>
          <img alt={name!} css={styles.authorImage} src={authorImage!} />
          {name}
        </a>
      </div>
    </div>
  )
}

const styles = {
  newsItem: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    width: 290px;
    height: 528px;
    margin-bottom: 25px;
    border: 1px solid ${theme.mainBorder};
    border-radius: 7px;
    overflow: hidden;
  `,
  image: css`
    height: 229px;
  `,
  details: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    flex-grow: 1;
    background-color: white;
    padding: 20px;
    width: 100%;

    &:hover {
      background-color: #f6f6f6;
    }
  `,
  title: css`
    padding-top: 20px;
    flex-grow: 1;
    h5.blue {
      text-transform: uppercase;
      margin-bottom: 12px;
    }
  `,
  authorLink: css`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    white-space: nowrap;
    font-weight: 400;

    &,
    &:visited {
      color: ${theme.text};
    }
    &:hover {
      color: ${theme.linkHover};
    }
    &:active {
      color: ${theme.linkActive};
    }
  `,
  authorImage: css`
    display: inline-block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 10px;
  `
}

const newsItemQuery = graphql`
  query newsItemQuery {
    site {
      siteMetadata {
        team {
          key
          name
          image
        }
      }
    }
  }
`
