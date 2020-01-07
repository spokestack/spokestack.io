import React, { useState, FormEvent } from 'react'
import Button from './Button'
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
      <Button type="submit" primary submitting={submitting}>
        Add new token
      </Button>
    </form>
  )
}

const styles = {
  addToken: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid var(--main-border-color);
    border-radius: 7px;
    padding: 20px;

    .input-wrap {
      margin-right: 20px;
    }
  `
}
