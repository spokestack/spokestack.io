import * as theme from '../styles/theme'

import { SerializedStyles, css } from '@emotion/core'

import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import React from 'react'

interface Props {
  title: string
  children: React.ReactNode
  extraCss?: SerializedStyles
}

export default function Card({ title, children, extraCss }: Props) {
  return (
    <div css={[styles.card, extraCss]} className="card">
      <h4 css={styles.cardHeader}>{title}</h4>
      <div css={styles.content}>{children}</div>
    </div>
  )
}

const styles = {
  card: css`
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 1px solid ${theme.mainBorder};
    border-radius: 7px;
    overflow: hidden;
    ${MIN_DEFAULT_MEDIA_QUERY} {
      max-width: 700px;
    }
  `,
  cardHeader: css`
    width: 100%;
    background-color: ${theme.primary};
    color: ${theme.textDarkBg};
    padding: 10px 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    margin: 0;
  `,
  content: css`
    position: relative;
    padding: 20px;
  `
}
