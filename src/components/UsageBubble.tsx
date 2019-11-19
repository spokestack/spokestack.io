import { SerializedStyles, css } from '@emotion/core'

import React from 'react'
import { rhythm } from '../utils/typography'

interface Props {
  className?: string
  icon?: React.ReactNode
  extraCss?: SerializedStyles
  text: string
}

export default function UsageBubble({ className, icon, extraCss, text }: Props) {
  return (
    <div css={[styles.bubble, extraCss]} className={className}>
      {icon ? <div css={styles.iconWrap}>{icon}</div> : null}
      <p>{text}</p>
    </div>
  )
}

const styles = {
  bubble: css`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: var(--primary-color);
    border-radius: 50%;
    color: white;

    p {
      margin: 0;
    }
  `,
  iconWrap: css`
    margin-bottom: ${rhythm(0.4)};
  `
}
