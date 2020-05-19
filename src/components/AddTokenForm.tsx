import * as theme from '../utils/theme'

import React, { FormEvent, useState } from 'react'

import Button from './Button'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import { css } from '@emotion/core'

interface Props {
  submitting: boolean
  onSubmit?: (token: string) => void
}

export default function AddTokenForm({ submitting, onSubmit }: Props) {
  const [token, setToken] = useState('')
  const [invalid, setInvalid] = useState(false)

  function createToken(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!token) {
      setInvalid(true)
      return
    }
    setInvalid(false)
    onSubmit(token)
  }
  return (
    <form css={styles.addToken} onSubmit={createToken}>
      <div className="input-wrap">
        <label htmlFor="token-label">Token label</label>
        <input
          type="text"
          id="token-label"
          className={`input${invalid ? ' error' : ''}`}
          disabled={submitting}
          value={token}
          onChange={(e) => {
            setToken(e.target.value)
            setInvalid(false)
          }}
        />
      </div>
      <Button type="submit" submitting={submitting}>
        Add new token
      </Button>
    </form>
  )
}

const styles = {
  addToken: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid ${theme.mainBorder};
    border-radius: 7px;
    padding: 20px;

    .btn {
      width: 100%;
      margin-top: 20px;
    }

    ${MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;

      .input-wrap {
        margin-right: 20px;
      }

      .btn {
        width: auto;
        margin: 0;
      }
    }
  `
}
