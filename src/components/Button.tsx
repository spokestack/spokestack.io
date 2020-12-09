import * as theme from '../styles/theme'

import React, { ButtonHTMLAttributes } from 'react'
import { SerializedStyles, css } from '@emotion/react'

import LoadingIcon from './LoadingIcon'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  extraCss?: SerializedStyles
  large?: boolean
  loadingColor?: string
  small?: boolean
  secondary?: boolean
  submitting?: boolean
  transparent?: boolean
}

export default function Button({
  children,
  extraCss,
  large,
  loadingColor = theme.secondary,
  small,
  secondary,
  submitting,
  transparent,
  ...props
}: Props) {
  const classNames = ['btn']
  if (large) {
    classNames.push('btn-large')
  }
  if (small) {
    classNames.push('btn-small')
  }
  if (secondary) {
    classNames.push('btn-secondary')
  }
  if (submitting) {
    classNames.push('btn-submitting')
  }
  if (transparent) {
    classNames.push('btn-transparent')
  }
  return (
    <button css={extraCss} className={classNames.join(' ')} {...props}>
      <div
        css={styles.childrenWrap}
        style={{ visibility: submitting ? 'hidden' : 'visible' }}>
        {children}
      </div>
      {submitting && (
        <LoadingIcon extraCss={styles.loading} color={loadingColor} />
      )}
    </button>
  )
}

const styles = {
  childrenWrap: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  loading: css`
    position: absolute;
    margin: 0 !important;
  `
}
