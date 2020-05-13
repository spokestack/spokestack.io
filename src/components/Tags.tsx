import * as theme from '../utils/theme'

import { Link } from 'gatsby'
import React from 'react'
import { css } from '@emotion/core'

interface Props {
  header: string
  selected?: string
  tags: string[]
}

const rspaces = /\s+/g

export default function Tags({ header, selected, tags }: Props) {
  if (!tags || !tags.length) {
    return null
  }
  return (
    <>
      {header && <h6>{header}</h6>}
      <div css={styles.tags}>
        {tags.map((tag, i) => (
          <Link
            key={`tag-${i}`}
            to={`/blog/tag/${tag.toLowerCase().replace(rspaces, '-')}`}
            className={`btn btn-primary btn-small${
              selected === tag ? ' tag-active' : ''
            }`}>
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
