import { css } from '@emotion/react'
import React from 'react'
import * as theme from '../../styles/theme'

interface Props {
  title?: string
  children: React.ReactNode
}

export default function Section({ title, children }: Props) {
  return (
    <section css={styles.section}>
      {!!title && <h2>{title}</h2>}
      {children}
    </section>
  )
}

const styles = {
  section: css`
    padding: 50px 0;
    max-width: 815px;
    margin: 0 auto;

    h2,
    h4,
    p,
    blockquote {
      margin-top: 0;
      margin-bottom: 25px;
    }

    > :last-child:not(div) {
      margin: 0;
    }

    &:not(:first-of-type) {
      background: ${theme.pricingBorderHorizontal} no-repeat top center;
    }
  `
}
