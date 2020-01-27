import React, { ButtonHTMLAttributes } from 'react'

import { SerializedStyles, css } from '@emotion/core'
import LoadingIcon from './LoadingIcon'
import * as theme from '../utils/theme'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  extraCss?: SerializedStyles
  large?: boolean
  small?: boolean
  primary?: boolean
  submitting?: boolean
}

export default function Button({
  children,
  extraCss,
  large,
  small,
  primary,
  submitting,
  ...props
}: Props) {
  const classNames = ['btn']
  if (large) {
    classNames.push('btn-large')
  }
  if (small) {
    classNames.push('btn-small')
  }
  if (primary) {
    classNames.push('btn-primary')
  }
  if (submitting) {
    classNames.push('btn-submitting')
  }
  return (
    <button css={extraCss} className={classNames.join(' ')} {...props}>
      <div
        css={styles.childrenWrap}
        style={{ visibility: submitting ? 'hidden' : 'visible' }}>
        {children}
      </div>
      {submitting && (
        <LoadingIcon extraCss={styles.loading} color={theme.secondary} />
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
  `
}
