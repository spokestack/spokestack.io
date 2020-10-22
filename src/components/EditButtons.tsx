import * as theme from '../styles/theme'

import React, { useRef, useState } from 'react'
import { SerializedStyles, css } from '@emotion/core'

import SVGIcon from './SVGIcon'

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

interface CopyInputProps {
  extraCss?: SerializedStyles | SerializedStyles[]
  id: string
  title: string
  value: string
}

export function CopyInputWithButton({
  extraCss,
  id,
  title,
  value
}: CopyInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div css={[styles.copyInput].concat(extraCss)}>
      <div css={styles.row}>
        <label className="label" htmlFor={id}>
          {title}
        </label>
        <CopyButton title={`Copy ${title}`} inputRef={inputRef} />
      </div>
      <input
        ref={inputRef}
        readOnly
        id={id}
        type="text"
        className="input"
        onFocus={() => inputRef.current.select()}
        value={value}
      />
    </div>
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
  `,
  copyInput: css`
    display: flex;
    flex-direction: column;
  `,
  row: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `
}
