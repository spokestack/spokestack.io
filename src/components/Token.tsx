import * as theme from '../utils/theme'

import {
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_MOBILE_MEDIA_QUERY,
  MIN_TABLET_MEDIA_QUERY
} from 'typography-breakpoint-constants'
import React, { useRef, useState } from 'react'

import { ApiKey } from '../types'
import SVGIcon from './SVGIcon'
import { css } from '@emotion/core'

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
            <div css={styles.labelWrap}>
              <div css={[styles.keyIconWrap]}>
                <SVGIcon icon="#key" extraCss={styles.keyIcon} />
              </div>
              <label>Label</label>
            </div>
            {token.displayName}
          </div>
          <a
            title="Revoke key"
            onClick={(e) => {
              e.preventDefault()
              onDelete(token)
            }}
            css={styles.iconWrap}>
            <SVGIcon icon="#delete" extraCss={styles.deleteIcon} />
          </a>
        </div>
        <div css={styles.row}>
          <label htmlFor={`token-${token.id}`}>Identity</label>
          <a title="Copy identity" onClick={copyId} css={styles.iconWrap}>
            <SVGIcon
              icon={copiedId ? '#checkmark' : '#copy'}
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
              icon={copiedSecret ? '#checkmark' : '#copy'}
              extraCss={styles.deleteIcon}
            />
          </a>
        )}
      </div>
      {token.key ? (
        <>
          <p css={styles.save}>
            Save this token somewhere safe. It can only be viewed once.
          </p>
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
    border: 1px solid ${theme.mainBorder};
    border-radius: 7px;
    padding: 10px 20px;

    label {
      font-size: 80%;
      font-weight: 800;
      margin-right: 10px;

      ${MIN_DEFAULT_MEDIA_QUERY} {
        font-size: 100%;
      }
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
  labelWrap: css`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  `,
  name: css`
    display: flex;
    flex-direction: column;

    ${MIN_TABLET_MEDIA_QUERY} {
      flex-direction: row;
      align-items: center;
    }
  `,
  iconWrap: css`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s ${theme.transitionEasing};
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    &:active {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.7);
    }
  `,
  keyIcon: css`
    fill: ${theme.text};
    width: 20px;
    height: 20px;
  `,
  keyIconWrap: css`
    pointer-events: none;
    margin-right: 10px;
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
    fill: ${theme.primary};
    width: 20px;
    height: 20px;
  `
}
