import * as theme from '../styles/theme'

import React, { useState } from 'react'

import SVGIcon from './SVGIcon'
import { css } from '@emotion/core'

interface CopyProps {
  inputRef: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement>
  title: string
}

export function CopyButton({ inputRef, title }: CopyProps) {
  const [copied, setCopied] = useState(false)
  function copy() {
    if (inputRef.current) {
      inputRef.current.select()
      const success = document.execCommand('copy')
      if (success) {
        setCopied(true)
        setTimeout(() => setCopied(false), 500)
      }
    }
  }
  return (
    <a title={title} onClick={copy} css={styles.editButton}>
      <SVGIcon icon={copied ? '#checkmark' : '#copy'} extraCss={styles.icon} />
    </a>
  )
}

interface DeleteProps {
  onPress: () => void
  title: string
}

export function DeleteButton({ onPress, title }: DeleteProps) {
  return (
    <a
      title={title}
      onClick={(e) => {
        e.preventDefault()
        onPress()
      }}
      css={styles.editButton}>
      <SVGIcon icon="#delete" extraCss={styles.icon} />
    </a>
  )
}

const styles = {
  editButton: css`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s ${theme.transitionEasing};
    cursor: pointer;
    flex-shrink: 0;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    &:active {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.7);
    }
  `,
  icon: css`
    fill: ${theme.primary};
    width: 20px;
    height: 20px;
  `
}
