import { MIN_DEFAULT_MEDIA_QUERY, MIN_MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'
import React, { useRef, useState } from 'react'

import { ApiKey } from '../types'
import SVGIcon from './SVGIcon'
import { css } from '@emotion/core'
import iconCheckmark from '../icons/checkmark.svg'
import iconCopy from '../icons/copy.svg'
import iconDelete from '../icons/delete.svg'
import iconKey from '../icons/key.svg'

interface Props {
  token: Partial<ApiKey>
  onDelete: (token: Partial<ApiKey>) => void
}

export default function Token({ token, onDelete }: Props) {
  const [copiedId, setCopiedId] = useState(false)
  const [copiedSecret, setCopiedSecret] = useState(false)
  const idRef = useRef<HTMLInputElement>(null)
  const secretRef = useRef<HTMLTextAreaElement>(null)
  function copyId() {
    if (idRef.current) {
      idRef.current.select()
      const success = document.execCommand('copy')
      if (success) {
        setCopiedId(true)
        setTimeout(() => setCopiedId(false), 500)
      }
    }
  }
  function copySecret() {
    if (secretRef.current) {
      secretRef.current.select()
      const success = document.execCommand('copy')
      if (success) {
        setCopiedSecret(true)
        setTimeout(() => setCopiedSecret(false), 500)
      }
    }
  }
  return (
    <div css={styles.container}>
      <div css={styles.summary}>
        <div css={styles.row}>
          <div css={styles.name}>
            <div css={[styles.iconWrap, styles.keyIconWrap]}>
              <SVGIcon icon={iconKey.id} extraCss={styles.keyIcon} />
            </div>
            <label>Label:</label>
            {token.displayName}
          </div>
          <a
            title="Revoke key"
            onClick={(e) => {
              e.preventDefault()
              onDelete(token)
            }}
            css={styles.iconWrap}>
            <SVGIcon icon={iconDelete.id} extraCss={styles.deleteIcon} />
          </a>
        </div>
        <div css={styles.row}>
          <label htmlFor={`token-${token.id}`}>Identity</label>
          <a title="Copy identity" onClick={copyId} css={styles.iconWrap}>
            <SVGIcon
              icon={copiedId ? iconCheckmark.id : iconCopy.id}
              extraCss={styles.deleteIcon}
            />
          </a>
        </div>
        <input
          ref={idRef}
          readOnly
          id={`token-${token.id}`}
          type="text"
          className="input"
          value={token.id}
        />
      </div>
      <div css={styles.row}>
        <label htmlFor={`secret-${token.id}`}>Secret key</label>
        {!!token.key && (
          <a title="Copy key" onClick={copySecret} css={styles.iconWrap}>
            <SVGIcon
              icon={copiedSecret ? iconCheckmark.id : iconCopy.id}
              extraCss={styles.deleteIcon}
            />
          </a>
        )}
      </div>
      {token.key ? (
        <>
          <p css={styles.save}>Save this token somewhere safe. It can only be viewed once.</p>
          <textarea
            ref={secretRef}
            id={`secret-${token.id}`}
            readOnly
            className="input"
            css={styles.textarea}
            value={token.key}
          />
        </>
      ) : (
        <div css={styles.row}>••••••••••••••••••••••••••••••</div>
      )}
    </div>
  )
}

const styles = {
  container: css`
    border: 1px solid var(--main-border-color);
    border-radius: 7px;
    padding: 10px 20px;

    label {
      font-weight: 800;
      margin-right: 5px;
    }

    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding: 10px 20px;
    }
  `,
  summary: css`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  `,
  row: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  name: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    white-space: nowrap;
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
    cursor: pointer;

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
  save: css`
    margin-bottom: 10px;
  `,
  textarea: css`
    resize: none;
    min-height: 100px;

    ${MIN_MOBILE_MEDIA_QUERY} {
      min-height: auto;
    }
  `,
  deleteIcon: css`
    fill: var(--primary-color);
    width: 20px;
    height: 20px;
  `
}
