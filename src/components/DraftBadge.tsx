import { css } from '@emotion/react'
import React from 'react'
import * as theme from '../styles/theme'

export default function DraftBadge() {
  return (
    <div css={styles.container}>
      <div css={styles.draft}>Draft</div>
    </div>
  )
}

const styles = {
  container: css`
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
  `,
  draft: css`
    width: 100%;
    padding: 5px 20px;
    transform: rotateZ(45deg) translateY(-50px);
    background-color: ${theme.primary};
    color: white;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  `
}
