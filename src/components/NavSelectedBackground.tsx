import * as theme from '../styles/theme'

import React from 'react'

import { DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import { css } from '@emotion/core'

interface Props {
  selected: HTMLElement
}

export default function NavSelectedBackground({ selected }: Props) {
  return (
    <div
      className="nav-selected-bg"
      css={styles.container}
      style={{
        transform: `translateY(${selected.offsetTop}px)`,
        height: selected.getBoundingClientRect().height
      }}
    />
  )
}

const styles = {
  container: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-radius: 50px 0 0 50px;
    transition: transform 0.2s ${theme.transitionEasing},
      height 0.2s ${theme.transitionEasing};
    z-index: 0;

    ${DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `
}
