import * as theme from '../../styles/theme'

import { SerializedStyles, css } from '@emotion/react'

import React from 'react'

interface Props {
  title: string
  children: React.ReactNode
  id?: string
  extraCss?: SerializedStyles
  contentCss?: SerializedStyles
  rightContent?: React.ReactNode
}

export default function AccountCard({
  title,
  children,
  id,
  extraCss,
  contentCss,
  rightContent
}: Props) {
  return (
    <div css={[styles.card, extraCss]} className="card" id={id}>
      <div css={styles.cardHeader}>
        <h5>{title}</h5>
        {rightContent}
      </div>
      <div css={[styles.content, contentCss]}>{children}</div>
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
    margin-bottom: 15px;
  `,
  cardHeader: css`
    height: 60px;
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    border-bottom: 1px solid ${theme.mainBorder};
  `,
  content: css`
    position: relative;
    padding: 20px;
  `
}
