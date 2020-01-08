import React, { useRef, useState } from 'react'

import { ApiKey } from '../types'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import SVGIcon from './SVGIcon'
import { css } from '@emotion/core'
import iconCheckmark from '../icons/checkmark.svg'
import iconCopy from '../icons/copy.svg'
import iconDelete from '../icons/delete.svg'
// import iconEye from '../icons/eye.svg'
import iconKey from '../icons/key.svg'

interface Props {
  token: Partial<ApiKey>
  onDelete: (token: Partial<ApiKey>) => void
}

export default function Token({ token, onDelete }: Props) {
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  function copy() {
    if (textareaRef.current) {
      textareaRef.current.select()
      const success = document.execCommand('copy')
      if (success) {
        setCopied(true)
        setTimeout(() => setCopied(false), 300)
      }
    }
  }
  return (
    <div css={styles.container}>
      <div css={styles.summary}>
        <div css={styles.row}>
          <div css={[styles.iconWrap, styles.keyIconWrap]}>
            <SVGIcon icon={iconKey.id} extraCss={styles.keyIcon} />
          </div>
          <strong>Label:</strong>&nbsp;{token.displayName}
        </div>
        <div css={styles.row}>
          {/* <a href="#" css={styles.iconWrap}>
            <SVGIcon icon={iconEye.id} extraCss={styles.deleteIcon} />
          </a> */}
          {token.key ? (
            <a onClick={copy} css={styles.iconWrap}>
              <SVGIcon
                icon={copied ? iconCheckmark.id : iconCopy.id}
                extraCss={styles.deleteIcon}
              />
            </a>
          ) : (
            <div css={styles.tokenText}>•••••••••••••••••••••••••</div>
          )}
          <a
            onClick={(e) => {
              e.preventDefault()
              onDelete(token)
            }}
            css={styles.iconWrap}>
            <SVGIcon icon={iconDelete.id} extraCss={styles.deleteIcon} />
          </a>
        </div>
      </div>
      {token.key && (
        <textarea ref={textareaRef} readOnly className="input" css={styles.key} value={token.key} />
      )}
    </div>
  )
}

const styles = {
  container: css`
    border: 1px solid var(--main-border-color);
    border-radius: 7px;
    padding: 10px;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding: 10px 20px;
    }
  `,
  summary: css`
    display: flex;
    flex-direction: column;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  `,
  row: css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  iconWrap: css`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s var(--transition-easing);

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    &:active {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.7);
    }
  `,
  keyIcon: css`
    fill: var(--text-color);
    width: 20px;
    height: 20px;
  `,
  keyIconWrap: css`
    pointer-events: none;
  `,
  tokenText: css`
    margin: 0 5px;
  `,
  key: css`
    margin-top: 10px;
    resize: none;
  `,
  deleteIcon: css`
    fill: var(--primary-color);
    width: 20px;
    height: 20px;
  `
}
