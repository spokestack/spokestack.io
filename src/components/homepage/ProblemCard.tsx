import { css } from '@emotion/react'
import React from 'react'
import * as theme from '../../styles/theme'

interface Props {
  description: string
  full?: boolean
  image: React.ReactNode
  title: string
}

export default function ProblemCard({
  description,
  full,
  image,
  title
}: Props) {
  return (
    <div className={full ? 'full' : ''} css={styles.problem}>
      <div css={styles.image}>{image}</div>
      <div css={styles.content}>
        <h3>{title}</h3>
        <p className="title">{description}</p>
      </div>
    </div>
  )
}

const styles = {
  problem: css`
    position: relative;
    border: 1px solid ${theme.mainBorder};
    border-radius: 7px;
    background-color: white;
    padding-top: 230px;
    overflow: hidden;
    width: 100%;

    &:not(.full) {
      max-width: 518px;
      margin: 0 auto;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      &:not(.full) {
        height: 580px;
      }
    }

    ${theme.ieBreakpoint} {
      margin-bottom: 50px;
    }
  `,
  image: css`
    position: absolute;
    top: 0;
    left: -90px;
    right: -90px;
    height: 230px;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      left: 0;
      right: 0;
    }
  `,
  content: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 50px 20px;

    h3 {
      font-size: 24px;
    }

    p {
      margin: 0;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      padding-left: 50px;
      padding-right: 50px;

      h3 {
        font-size: 32px;
      }
    }
  `
}
