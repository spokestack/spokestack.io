import React, { SVGAttributes } from 'react'
import { SerializedStyles, css } from '@emotion/core'

interface Props extends SVGAttributes<SVGElement> {
  icon: string
  extraCss?: SerializedStyles
}

export default function SVGIcon({ icon, extraCss, ...props }: Props) {
  return (
    <svg css={[styles.icon, extraCss]} {...props}>
      <use xlinkHref={`#${icon}`} />
    </svg>
  )
}

const styles = {
  icon: css`
    display: inline-block;
    fill: white;
    line-height: 0;
  `
}
