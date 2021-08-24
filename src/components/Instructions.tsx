import * as theme from '../styles/theme'

import React from 'react'
import { css } from '@emotion/react'

interface Props {
  instructions: string[]
}

export default function Instructions({ instructions }: Props) {
  return (
    <div css={styles.instructions}>
      <div css={styles.instructionsContent}>
        <h5 css={styles.instructionsHeader}>Instructions</h5>
        <ol css={styles.instructionsList}>
          {instructions.map((instruction, i) => (
            <li key={`instruction-${i}`}>{instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}

const styles = {
  instructions: css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    background-color: ${theme.mainBackground};
    border-top: 1px solid ${theme.grayLighter};
    border-radius: 0 0 7px 7px;
    padding: 20px;
    color: ${theme.text};

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      padding-left: 40px;
      padding-right: 40px;
    }
  `,
  instructionsHeader: css`
    margin: 0 !important;
    color: ${theme.header} !important;
    font-size: 14px;
  `,
  instructionsContent: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  `,
  instructionsList: css`
    text-align: left;
    font-size: 14px;
    margin: 0;
    padding: 0 0 0 15px;

    li {
      margin: 0;
    }
  `
}
