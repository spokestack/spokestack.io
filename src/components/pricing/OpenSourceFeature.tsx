import * as theme from '../../styles/theme'

import React from 'react'
import { css } from '@emotion/react'

interface Props {
  title: string
  description: React.ReactNode
  children: React.ReactNode
}

export default function OpenSourceFeature({
  title,
  description,
  children
}: Props) {
  return (
    <div css={styles.container}>
      <h4>{title}</h4>
      {typeof description === 'string' ? <p>{description}</p> : description}
      {children}
    </div>
  )
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    padding: 25px 0;

    &:not(:first-of-type) {
      background-image: ${theme.pricingBorderHorizontal};
      background-position: top left;
      background-repeat: no-repeat;
    }

    a {
      font-weight: 400;
    }

    ${theme.ieBreakpointMinDefault} {
      width: 305px;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      padding-right: 25px;

      &:nth-of-type(3n + 2),
      &:nth-of-type(3n + 3) {
        padding-left: 25px;
      }

      &:nth-of-type(-n + 3) {
        padding-top: 0;
        padding-bottom: 50px;
      }
      &:nth-of-type(n + 4) {
        padding-top: 50px;
      }
      &:nth-last-of-type(-n + 3) {
        padding-bottom: 0;
      }

      &:first-of-type,
      &:nth-of-type(2) {
        background-image: ${theme.pricingBorderVertical};
        background-position: top right;
        background-repeat: no-repeat;
      }

      &:nth-of-type(3) {
        background-image: none;
      }

      &:nth-of-type(3n + 1):not(:first-of-type),
      &:nth-of-type(3n + 2):not(:nth-of-type(2)) {
        background-image: ${theme.pricingBorderHorizontal},
          ${theme.pricingBorderVertical};
        background-position: top left, top right;
      }
    }
  `
}
