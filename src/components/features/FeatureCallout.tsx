import { css } from '@emotion/react'
import React from 'react'
import * as theme from '../../styles/theme'

interface Props {
  description?: React.ReactNode
  image: React.ReactNode
  title: string
}

export default function FeatureCallout({ description, image, title }: Props) {
  return (
    <div css={styles.callout}>
      <div css={styles.image}>{image}</div>
      <h3>{title}</h3>
      {typeof description === 'string' ? <p>{description}</p> : description}
    </div>
  )
}

const styles = {
  callout: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 40px;

    h3 {
      margin-bottom: 20px;
    }

    p {
      margin: 0 !important;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      max-width: 395px;

      &:nth-of-type(2n + 1) {
        margin-right: 20px;
      }

      &:nth-last-of-type(-n + 2) {
        margin-bottom: 0;
      }
    }
  `,
  image: css`
    width: 100%;
    margin-bottom: 15px;
  `
}
