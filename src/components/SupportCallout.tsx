import { SerializedStyles, css } from '@emotion/react'

import Callout from './Callout'
import React from 'react'
import { ieBreakpoint } from '../styles/theme'

interface Props {
  extraCss?: SerializedStyles | SerializedStyles[]
  imageUrl: string
  name: string
  slug: string
  text: string
}

export default function SupportCallout({
  extraCss,
  imageUrl,
  name,
  slug,
  text
}: Props) {
  return (
    <Callout href={slug} extraCss={[styles.container].concat(extraCss!)}>
      <img src={imageUrl} alt={name} css={styles.image} />
      <h4 css={styles.header}>{name}</h4>
      <p css={styles.text}>{text}</p>
    </Callout>
  )
}

const styles = {
  container: css`
    height: 290px;
    justify-content: center;
    max-width: 290px;

    ${ieBreakpoint} {
      width: 280px;
      margin: 10px;
    }
  `,
  image: css`
    width: 80px;
    height: 63px;
    margin-bottom: 15px;
  `,
  header: css`
    margin-bottom: 10px;
  `,
  text: css`
    font-size: 16px;
    margin: 0;
  `
}
