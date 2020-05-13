import React from 'react'
import { css } from '@emotion/core'

interface Props {
  header: string
  tags: string[]
}

export default function Tags({ header, tags }: Props) {
  if (!tags || !tags.length) {
    return null
  }
  return (
    <>
      {header && <h6>{header}</h6>}
      <div css={styles.tags}>
        {tags.map((tag, i) => (
          <a
            // href="#"
            key={`tag-${i}`}
            className="btn btn-primary btn-small">
            {tag}
          </a>
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
  `
}
