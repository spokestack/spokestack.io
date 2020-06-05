import * as theme from '../../styles/theme'

import { MIN_LARGE_DISPLAY_MEDIA_QUERY } from 'typography-breakpoint-constants'
import React from 'react'
import { css } from '@emotion/core'

interface Props {
  header: string
  id: string
  image: {
    url: string
    maxWidth: string
    left?: boolean
  }
  text: React.ReactNode
}

export default function Section({ id, image, header, text }: Props) {
  return (
    <section
      id={id}
      className="ie-fix"
      css={[
        styles.container,
        css`
          ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
            flex-direction: ${image.left ? 'row-reverse' : 'row'};
          }
        `
      ]}>
      <div css={styles.content} className="ie-fix">
        <h3>{header}</h3>
        <p className="title">{text}</p>
      </div>
      <div style={{ width: '132px' }} />
      <img
        src={image.url}
        css={styles.platformsImage}
        style={{ maxWidth: image.maxWidth }}
      />
    </section>
  )
}

const styles = {
  container: css`
    padding: 50px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 638px;

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      flex-direction: row;
      padding: 0 100px;
    }
  `,
  content: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: ${theme.MAX_TEXT_WIDTH};
    margin-bottom: 25px;
  `,
  platformsImage: css`
    width: 100%;
  `
}
