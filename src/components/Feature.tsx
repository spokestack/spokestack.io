import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import React from 'react'
import { css } from '@emotion/core'

interface Props {
  id: string
  imageUrl: string
  name: string
  text: string
}

export default function Feature({ id, imageUrl, name, text }: Props) {
  return (
    <div id={id} css={styles.feature}>
      <img src={imageUrl} css={styles.image} />
      <div className="ie-fix" css={styles.featureContent}>
        <h3>{name}</h3>
        <p>{text}</p>
      </div>
    </div>
  )
}

const styles = {
  feature: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      align-items: flex-start;

      img {
        margin-right: 25px;
      }
    }
  `,
  image: css`
    width: 80px;
    height: 80px;
    display: block;
    flex-shrink: 0;
  `,
  featureContent: css`
    display: flex;
    flex-direction: column;
  `
}
