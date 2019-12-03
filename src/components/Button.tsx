import React, { ButtonHTMLAttributes } from 'react'

import { SerializedStyles } from '@emotion/core'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  extraCss?: SerializedStyles
  large?: boolean
}

export default function Button({ extraCss, large, ...props }: Props) {
  return <button className={`btn${large ? ' btn-large' : ''}`} css={extraCss} {...props} />
}
