import * as theme from '../../styles/theme'

import { CopyButton, DeleteButton } from '../EditButtons'
import {
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_MOBILE_MEDIA_QUERY,
  MIN_TABLET_MEDIA_QUERY
} from 'typography-breakpoint-constants'
import React, { useRef } from 'react'

import { ApiKey } from '../../types'
import SVGIcon from '../SVGIcon'
import { css } from '@emotion/core'

interface Props {
  token: Partial<ApiKey>
  onDelete: (token: Partial<ApiKey>) => void
}

export default function Token({ token, onDelete }: Props) {
  const idRef = useRef<HTMLInputElement>(null)
  const secretRef = useRef<HTMLTextAreaElement>(null)

  return (
    <div css={styles.container}>
      <div css={styles.summary}>
        <div css={styles.row}>
          <div css={styles.name}>
            <div css={styles.labelWrap}>
              <div css={[styles.keyIconWrap]}>
                <SVGIcon icon="#key" extraCss={styles.keyIcon} />
              </div>
              <label className="label">Label</label>
            </div>
            {token.displayName}
          </div>
          <DeleteButton title="Revoke key" onPress={() => onDelete(token)} />
        </div>
        <div css={styles.row}>
          <label className="label" htmlFor={`token-${token.id}`}>
            Identity
          </label>
          <CopyButton title="Copy identity" inputRef={idRef} />
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
        <label className="label" htmlFor={`secret-${token.id}`}>
          Secret key
        </label>
        {!!token.key && <CopyButton title="Copy key" inputRef={secretRef} />}
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
      margin-right: 10px;
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
  `
}
