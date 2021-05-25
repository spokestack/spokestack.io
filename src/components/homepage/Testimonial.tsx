import * as theme from '../../styles/theme'

import React from 'react'
import { css } from '@emotion/react'

interface Props {
  quote: string
  name: string
  title: string
}

export default function Testimonial({ quote, name, title }: Props) {
  return (
    <div css={styles.testimonial}>
      <p className="title">&ldquo;{quote}&rdquo;</p>
      <h3>{name}</h3>
      <div css={styles.title}>{title}</div>
    </div>
  )
}

const styles = {
  testimonial: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
    background-color: white;
    border: 1px solid ${theme.mainBorder};
    border-left: 6px solid ${theme.primaryLight};
    border-radius: 0 7px 7px 0;
    padding: 50px;
    width: 100%;
    max-width: 750px;
    color: ${theme.text};

    h3 {
      margin: 10px 0 0;
    }
  `,
  title: css`
    font-style: italic;
    font-size: 24px;
  `
}
