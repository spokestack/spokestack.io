import { SerializedStyles, css } from '@emotion/core'

import React from 'react'
import { rhythm } from '../utils/typography'

interface Props {
  title: string
  children: React.ReactNode
  id?: string
  extraCss?: SerializedStyles
  contentCss?: SerializedStyles
}

export default function AccountCard({ title, children, id, extraCss, contentCss }: Props) {
  return (
    <div css={[styles.card, extraCss]} className="card" id={id}>
      <h5 css={styles.cardHeader}>{title}</h5>
      <div css={[styles.content, contentCss]}>{children}</div>
    </div>
  )
}

const styles = {
  card: css`
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 1px solid var(--main-border-color);
    border-radius: 7px;
    overflow: hidden;
    max-width: 700px;
    margin-bottom: ${rhythm(1)};
  `,
  cardHeader: css`
    height: 60px;
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    border-bottom: 1px solid var(--main-border-color);
  `,
  content: css`
    position: relative;
    padding: 20px;
  `
}
