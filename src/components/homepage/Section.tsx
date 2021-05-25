import * as theme from '../../styles/theme'

import React from 'react'
import { css } from '@emotion/react'

interface Props {
  header: string
  id: string
  image: React.ReactNode
  imageLeft?: boolean
  subHeader: string
  text: React.ReactNode
}

export default function Section({
  header,
  id,
  image,
  imageLeft,
  subHeader,
  text
}: Props) {
  return (
    <section
      id={id}
      className="ie-fix"
      css={[
        styles.container,
        css`
          ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
            flex-direction: ${imageLeft ? 'row-reverse' : 'row'};
          }
        `
      ]}>
      <div css={styles.content} className="ie-fix">
        <h4 className="blue">{subHeader}</h4>
        <h3>{header}</h3>
        {typeof text === 'string' ? <p className="title">{text}</p> : text}
      </div>
      <div style={{ width: '100px', height: '50px', flexShrink: 0 }} />
      <div css={styles.image}>{image}</div>
    </section>
  )
}

const styles = {
  container: css`
    padding: 0 20px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      flex-direction: row;
      padding-left: 65px;
      padding-right: 65px;
    }
  `,
  content: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    max-width: 610px;

    h4.blue {
      text-transform: uppercase;
    }

    h3 {
      margin-bottom: 50px;
    }
    p {
      margin: 0;
    }

    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      h3 {
        margin-bottom: 25px;
      }
    }
  `,
  image: css`
    flex-shrink: 0;
  `
}
