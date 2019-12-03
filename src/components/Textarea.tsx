import React, { TextareaHTMLAttributes } from 'react'
import { SerializedStyles, css } from '@emotion/core'

interface Props extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  id: string
  label: string
  extraCss?: SerializedStyles
  labelCss?: SerializedStyles
  onChange?: (value: string) => void
}

export default React.forwardRef<HTMLTextAreaElement, Props>(function Textarea(
  { id, extraCss, labelCss, label, onChange, ...props }: Props,
  ref
) {
  return (
    <div css={[styles.container, extraCss]}>
      <div css={styles.textareaWrap}>
        <textarea
          ref={ref}
          id={id}
          css={styles.textarea}
          onChange={(event) => onChange(event.target.value)}
          {...props}
        />
      </div>
      <label htmlFor={id} css={[styles.label, labelCss]}>
        {label}
      </label>
    </div>
  )
})

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
  `,
  textareaWrap: css`
    width: 100%;
    line-height: 0;
  `,
  textarea: css`
    width: 100%;
    min-height: 120px;
    line-height: 1.4;
    border: 1px solid var(--main-border-color);
    padding: 15px 20px;
    border-radius: 7px 7px 0 0;
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
