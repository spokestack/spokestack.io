import { SerializedStyles, css } from '@emotion/core'

import Callout from './Callout'
import React from 'react'
import { adjustFontSizeTo } from '../styles/typography'

interface Props {
  extraCss?: SerializedStyles
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
    <Callout href={slug} extraCss={[styles.container, extraCss]}>
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
    font-size: ${adjustFontSizeTo('16px').fontSize};
    margin: 0;
  `
}
