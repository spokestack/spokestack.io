import * as theme from '../../styles/theme'

import { SerializedStyles, css } from '@emotion/react'

import React from 'react'

interface Props {
  className?: string
  extraCss?: SerializedStyles | SerializedStyles[]
  header: string
  id: string
  image: React.ReactNode
  imageCss?: SerializedStyles | SerializedStyles[]
  imageLeft?: boolean
  subHeader: string
  text: React.ReactNode
}

export default function Section({
  className,
  extraCss,
  header,
  id,
  image,
  imageCss,
  imageLeft,
  subHeader,
  text
}: Props) {
  return (
    <section
      id={id}
      className={`ie-fix ${className}`}
      css={[
        styles.container,
        css`
          ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
            flex-direction: ${imageLeft ? 'row-reverse' : 'row'};
          }
        `
      ].concat(extraCss!)}>
      <div css={styles.content} className="ie-fix">
        <h4 className="blue">{subHeader}</h4>
        <h3>{header}</h3>
        {typeof text === 'string' ? <p className="title">{text}</p> : text}
      </div>
      <div style={{ width: '100px', height: '50px', flexShrink: 0 }} />
      <div css={[styles.image].concat(imageCss!)}>{image}</div>
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
    max-width: 1440px;
    margin: 0 auto;

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
