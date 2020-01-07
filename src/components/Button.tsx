import React, { ButtonHTMLAttributes } from 'react'

import { SerializedStyles } from '@emotion/core'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  extraCss?: SerializedStyles
  large?: boolean
  small?: boolean
}

export default function Button({ extraCss, large, small, ...props }: Props) {
  return (
    <button
      className={`btn${large ? ' btn-large' : ''}${small ? ' btn-small' : ''}`}
      css={extraCss}
      {...props}
    />
  )
}
