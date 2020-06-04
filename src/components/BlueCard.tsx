import * as theme from '../styles/theme'

import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import React from 'react'
import { css } from '@emotion/core'

export interface BlueCardProps {
  button: React.ReactNode
  id?: string
  small?: boolean
  text: string
  title: string
}

export default function BlueCard({
  button,
  id,
  small,
  text,
  title
}: BlueCardProps) {
  const style = [styles.card]
  if (small) {
    style.push(styles.smallCard)
  }
  return (
    <section id={id} css={style}>
      <h3>{title}</h3>
      <div className="title">{text}</div>
      {button}
    </section>
  )
}

const styles = {
  card: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: ${theme.primaryLighter};
    border-radius: 7px;
    padding: 50px 20px;
    margin: 0 20px;

    h3 {
      margin-bottom: 15px;
    }

    .title {
      max-width: 815px;
      margin: 0 auto 30px;
    }

    ${MIN_DEFAULT_MEDIA_QUERY} {
      min-height: 400px;
      margin: 0 50px;
    }
  `,
  smallCard: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      max-width: 808px;
      margin: 0 auto;
      min-height: 0;
    }

    .title {
      max-width: 630px;
    }
  `
}
