import React, { TextareaHTMLAttributes } from 'react'
import { css, SerializedStyles } from '@emotion/core'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  label: string
  extraCss?: SerializedStyles
}

export default function Textarea({ id, extraCss, label, ...props }: Props) {
  return (
    <div css={[styles.container, extraCss]}>
      <textarea id={id} css={styles.textarea} {...props} />
      <label htmlFor={id} css={styles.label}>
        {label}
      </label>
    </div>
  )
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
  `,
  textarea: css`
    border: 1px solid var(--main-border-color);
    padding: 15px 20px;
    border-radius: 7px 7px 0 0;
    min-height: 120px;
    resize: vertical;
  `,
  label: css`
    width: 100%;
    background-color: var(--text-color-dark-bg);
    color: var(--text-color-light);
    border: 1px solid var(--main-border-color);
    border-top: 0;
    border-radius: 0 0 7px 7px;
    padding: 20px;
    text-align: center;
  `
}
