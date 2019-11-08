import React, { SVGAttributes } from 'react'

import { css } from '@emotion/core'

interface Props extends SVGAttributes<SVGElement> {
  icon: string
}

export default function SVGIcon({ icon, ...props }: Props) {
  return (
    <svg css={styles.icon} {...props}>
      <use xlinkHref={`#${icon}`} />
    </svg>
  )
}

const styles = {
  icon: css`
    width: 17px;
    height: 17px;
    display: inline-block;
    fill: white;
    line-height: 0;
  `
}
