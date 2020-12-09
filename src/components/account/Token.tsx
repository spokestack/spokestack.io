import * as theme from '../../styles/theme'

import { CopyButton, CopyInputWithButton, DeleteButton } from '../EditButtons'
import React, { Fragment, useRef } from 'react'

import { ApiKey } from '../../types'
import SVGIcon from '../SVGIcon'
import { css } from '@emotion/react'

interface Props {
  token: Partial<ApiKey>
  onDelete: (token: Partial<ApiKey>) => void
}

export default function Token({ token, onDelete }: Props) {
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
        <CopyInputWithButton
          id={`token-${token.id}`}
          value={token.id}
          title="Identity"
        />
      </div>
      <div css={styles.row}>
        <label className="label" htmlFor={`secret-${token.id}`}>
          Secret key
        </label>
        {!!token.key && <CopyButton title="Copy key" inputRef={secretRef} />}
      </div>
      {token.key ? (
        <Fragment>
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
        </Fragment>
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

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
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

    ${theme.MIN_TABLET_MEDIA_QUERY} {
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

    ${theme.MIN_MOBILE_MEDIA_QUERY} {
      min-height: auto;
    }
  `
}
