import * as theme from '../utils/theme'

import { Link } from 'gatsby'
import React from 'react'
import { css } from '@emotion/core'

interface Props {
  // Url that represents showing all tags
  allUrl?: string
  header: string
  tags: string[]
}

const rspaces = /\s+/g

export default function Tags({ header, allUrl, tags }: Props) {
  if (!tags || !tags.length) {
    return null
  }
  return (
    <>
      {header && <h6>{header}</h6>}
      <div css={styles.tags}>
        {allUrl && (
          <Link
            to={allUrl}
            activeClassName="tag-active"
            className="btn btn-primary btn-small">
            All
          </Link>
        )}
        {tags.map((tag, i) => (
          <Link
            key={`tag-${i}`}
            to={`/blog/tag/${tag.toLowerCase().replace(rspaces, '-')}`}
            activeClassName="tag-active"
            className="btn btn-primary btn-small">
            {tag}
          </Link>
        ))}
      </div>
    </>
  )
}

const styles = {
  tags: css`
    display: flex;
    flex-wrap: wrap;
    margin: -5px;

    .btn {
      display: inline-flex;
      margin: 5px;
    }

    .tag-active {
      background-color: ${theme.primary} !important;
      border-color: ${theme.primary} !important;
      color: white !important;
      cursor: default;
    }
  `
}
