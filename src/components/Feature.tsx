import { MIN_DEFAULT_MEDIA_QUERY } from '../styles/theme'
import React from 'react'
import { css } from '@emotion/react'

interface Props {
  id: string
  image: React.ReactNode
  name: string
  text: string
}

export default function Feature({ id, image, name, text }: Props) {
  return (
    <div id={id} css={styles.feature}>
      {image}
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
    }
  `,
  featureContent: css`
    display: flex;
    flex-direction: column;
  `
}
