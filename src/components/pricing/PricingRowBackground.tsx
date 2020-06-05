import * as theme from '../../styles/theme'

import { MIN_LARGE_DISPLAY_MEDIA_QUERY } from 'typography-breakpoint-constants'
import React from 'react'
import { css } from '@emotion/core'

interface Props {
  show: boolean
  y: number
}

export default function PricingRowBackground({ show, y }: Props) {
  return (
    <div
      className="row-background"
      css={styles.rowBackground}
      style={{ opacity: show ? 1 : 0, transform: `translateY(${y}px)` }}
    />
  )
}

const styles = {
  rowBackground: css`
    display: none;
    position: absolute;
    top: 0;
    left: calc(50% - 304px - 310px);
    right: calc(50% - 304px);
    height: 50px;
    background-color: ${theme.pricingRowBackground};
    z-index: 999;
    transition: opacity 0.2s ${theme.transitionEasing};

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      display: block;
    }
  `
}
