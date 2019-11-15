import React from 'react'
import { css } from '@emotion/core'
import { rhythm } from '../utils/typography'

interface Props {
  title: string
  children: React.ReactNode
}

export default function Card({ title, children }: Props) {
  return (
    <div css={styles.card} className="card">
      <h3 css={styles.cardHeader}>{title}</h3>
      <div css={styles.content}>{children}</div>
    </div>
  )
}

const styles = {
  card: css`
    display: flex;
    flex-direction: column;
    margin-bottom: ${rhythm(0.8)};
    background-color: white;
  `,
  cardHeader: css`
    background-color: var(--secondary-color);
    color: var(--primary-color);
    border-radius: 7px 7px 0 0;
    padding: 10px 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    margin: 0;
  `,
  content: css`
    padding: 20px;
    border: 1px solid var(--secondary-color);
    border-radius: 0 0 7px 7px;
  `
}
