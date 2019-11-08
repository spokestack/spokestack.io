import React, { ButtonHTMLAttributes } from 'react'
import { adjustFontSizeTo, rhythm } from '../utils/typography'

import { css } from '@emotion/core'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  large?: boolean
}

export default function Button({ large, style, ...props }: Props) {
  const buttonStyles = [styles.button]
  if (large) {
    buttonStyles.push(styles.buttonLarge)
  }
  return (
    <button
      css={buttonStyles}
      style={{
        ...adjustFontSizeTo('16px'),
        ...style
      }}
      {...props}
    />
  )
}

const styles = {
  button: css`
    height: 38px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: var(--button-background);
    border: 1px solid var(--button-background);
    border-radius: 24px;
    padding: 0 ${rhythm(1)};
    white-space: nowrap;
    transition: background-color 0.2s var(--transition-easing),
      border-color 0.2s var(--transition-easing);
    cursor: pointer;

    &:hover {
      background-color: var(--button-background-hover);
      border-color: var(--button-background-hover);
    }
    &:active {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
    }
  `,
  buttonLarge: css`
    height: 49px;
    padding: 0 ${rhythm(1.8)};
  `
}
