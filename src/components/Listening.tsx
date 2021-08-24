import * as theme from '../styles/theme'

import { SerializedStyles, css, keyframes } from '@emotion/react'

import React from 'react'

interface Props {
  extraCss?: SerializedStyles | SerializedStyles[]
  dotCss?: SerializedStyles | SerializedStyles[]
}

export default function Listening({ extraCss, dotCss }: Props) {
  return (
    <div css={[styles.listening, extraCss]}>
      <div css={[styles.dot, dotCss]} />
      <div css={[styles.dot, dotCss]} style={{ animationDelay: '0.15s' }} />
      <div css={[styles.dot, dotCss]} style={{ animationDelay: '0.3s' }} />
    </div>
  )
}

const dotAnimation = keyframes`
  from {
    transform: scale(0.5);
  }
  to {
    transform: scale(1);
  }
`

const styles = {
  listening: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  dot: css`
    width: 8px;
    height: 8px;
    margin: 0 1px;
    background-color: white;
    border-radius: 50%;
    animation: ${dotAnimation} 0.45s infinite alternate
      ${theme.transitionEasing};
  `
}
