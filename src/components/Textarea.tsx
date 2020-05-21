import * as theme from '../styles/theme'

import React, { TextareaHTMLAttributes } from 'react'
import { SerializedStyles, css } from '@emotion/core'

import LoadingIcon from './LoadingIcon'
import { MIN_TABLET_MEDIA_QUERY } from 'typography-breakpoint-constants'

interface Props
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  id: string
  label: string
  extraCss?: SerializedStyles
  labelCss?: SerializedStyles
  onChange?: (value: string) => void
  /* Show a loading animation on the textarea */
  loading?: boolean
}

export default React.forwardRef<HTMLTextAreaElement, Props>(function Textarea(
  { id, extraCss, labelCss, label, loading, onChange, ...props }: Props,
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
        {loading && <LoadingIcon extraCss={styles.loading} />}
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
    position: relative;
    width: 100%;
    line-height: 0;
  `,
  textarea: css`
    width: 100%;
    min-height: 200px;
    line-height: 1.4;
    border: 1px solid ${theme.mainBorder};
    padding: 15px 20px;
    border-radius: 7px 7px 0 0;
    resize: vertical;

    ${MIN_TABLET_MEDIA_QUERY} {
      min-height: 120px;
    }
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
