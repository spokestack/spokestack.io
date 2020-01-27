import React, { useEffect, useState } from 'react'
import * as theme from '../utils/theme'
import { css } from '@emotion/core'

interface Props {
  selectedId: string
}

export default function NavSelectedBackground({ selectedId }: Props) {
  const [selected, setSelected] = useState<HTMLElement>(null)
  useEffect(() => {
    setSelected(document.getElementById(selectedId))
  }, [selectedId])
  return selected ? (
    <div
      css={styles.container}
      style={{
        transform: `translateY(${selected.offsetTop}px)`,
        height: selected.getBoundingClientRect().height
      }}
    />
  ) : null
}

const styles = {
  container: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-radius: 50px 0 0 50px;
    background-color: ${theme.mainBackground};
    transition: transform 0.2s ${theme.transitionEasing},
      height 0.2s ${theme.transitionEasing};
    z-index: -1;
  `
}
