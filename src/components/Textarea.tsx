import * as theme from '../styles/theme'

import React, { TextareaHTMLAttributes } from 'react'
import { SerializedStyles, css } from '@emotion/react'

import LoadingIcon from './LoadingIcon'

interface Props
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  id: string
  label?: string
  extraCss?: SerializedStyles
  labelCss?: SerializedStyles
  onChange: (value: string) => void
  /* Show a loading animation on the textarea */
  loading?: boolean
}

export default React.forwardRef<HTMLTextAreaElement, Props>(function Textarea(
  { id, extraCss, labelCss, label, loading, onChange, ...props }: Props,
  ref
) {
  return (
    <div css={[styles.textareaContainer, extraCss]}>
      <div css={styles.textareaWrap}>
        <textarea
          ref={ref}
          id={id}
          css={styles.textarea}
          onChange={(event) => onChange(event.target.value)}
          {...props}
        />
        {loading && <LoadingIcon extraCss={styles.loading} />}
      </div>
      {!!label && (
        <label htmlFor={id} css={[styles.label, labelCss]}>
          {label}
        </label>
      )}
    </div>
  )
})

const styles = {
  textareaContainer: css`
    display: flex;
    flex-direction: column;
    display: grid;
    grid-template-rows: 1fr min-content;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      height: 100%;
    }
  `,
  textareaWrap: css`
    position: relative;
    width: 100%;
    line-height: 0;
  `,
  textarea: css`
    width: 100%;
    height: 100%;
    min-height: 200px;
    line-height: 1.4;
    border: 1px solid ${theme.mainBorder};
    padding: 15px 20px;
    border-radius: 7px 7px 0 0;
    resize: vertical;
    -webkit-appearance: none;
  `,
  label: css`
    width: 100%;
    background-color: ${theme.textDarkBg};
    color: ${theme.textLight};
    border: 1px solid ${theme.mainBorder};
    border-top: 0;
    border-radius: 0 0 7px 7px;
    padding: 20px;
    text-align: center;
  `,
  loading: css`
    position: absolute;
    bottom: 20px;
    right: 20px;
  `
}
