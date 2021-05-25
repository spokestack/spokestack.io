import * as theme from '../../styles/theme'

import React from 'react'
import { css } from '@emotion/react'

interface Props {
  height?: string
}

export default function PricingBackground({ height = '100%' }: Props) {
  return <div css={styles.background} style={{ height }} />
}

const styles = {
  background: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: ${theme.header} url(/pricing/wave.svg) no-repeat bottom center;
    background-size: 1440px 270px;
    z-index: -1;

    @media (min-width: 1440px) {
      background-size: 100% 270px;
    }
  `
}
