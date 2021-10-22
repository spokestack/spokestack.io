import * as theme from '../styles/theme'

import { Global, css } from '@emotion/react'
import React, { FormEvent, Fragment, useRef, useState } from 'react'

import Button from './Button'
import SVGIcon from './SVGIcon'
import validateEmail from '../utils/validateEmail'

export default function Newsletter() {
  const formRef = useRef<HTMLFormElement>(null)
  const [invalid, setInvalid] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = formRef.current
    if (!form || success) {
      return
    }
    const email = form.email.value
    if (!email || !validateEmail(email)) {
      setInvalid(true)
      return
    }
    setInvalid(false)
    setSubmitting(true)
    fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
      .then((response) => {
        setSubmitting(false)
        if (response.ok) {
          setSuccess(true)
        } else {
          console.error(response)
          setError(
            'There was a problem subscribing. Please refresh and try again.'
          )
        }
      })
      .catch((error) => {
        setSubmitting(false)
        console.error(error)
        setError(
          'There was a problem subscribing. Please refresh and try again.'
        )
      })
  }
  return (
    <form ref={formRef} onSubmit={submit} css={styles.form}>
      <Global
        styles={css`
          html.dark-mode .input {
            border-color: ${theme.primaryLight};
            color: white;
          }
        `}
      />
      <p>Sign up for developer and community updates:</p>
      {error && <p className="error">{error}</p>}
      <div css={styles.inputWrap}>
        <input
          aria-label="Email address"
          type="email"
          name="email"
          readOnly={success}
          className={`input${invalid ? ' error' : ''}`}
          placeholder="Enter email"
        />
        <Button
          type="submit"
          large
          transparent
          submitting={submitting}
          extraCss={success ? [styles.button, styles.success] : styles.button}
        >
          {success ? (
            <Fragment>
              Subscribed
              <SVGIcon
                className="icon"
                icon="#checkmark"
                extraCss={styles.icon}
              />
            </Fragment>
          ) : (
            <Fragment>Sign up</Fragment>
          )}
        </Button>
      </div>
      <p css={styles.privacy}>
        You can unsubscribe at any time. Read our{' '}
        <a href="/privacy">privacy policy</a>.
      </p>
    </form>
  )
}

const styles = {
  form: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 50px 0;
    border-top: 1px solid ${theme.mainBorder};
    border-bottom: 1px solid ${theme.mainBorder};
  `,
  inputWrap: css`
    display: flex;
    flex-direction: row;
    margin: 10px 0 25px;

    .input {
      font-size: 14px;
      padding-left: 20px;
      background-color: transparent;
      border-color: ${theme.primary};
      border-radius: 30px 0 0 30px;
      border-right: none;
    }
    .btn {
      border-radius: 0 30px 30px 0;
    }
    .input,
    .btn {
      height: 42px;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      width: 100%;
      max-width: 590px;
    }
  `,
  button: css`
    ${theme.ieBreakpoint} {
      width: 200px;
    }
  `,
  success: css`
    color: ${theme.greenDark} !important;
    border-color: ${theme.green} !important;
    background-color: ${theme.green} !important;
  `,
  icon: css`
    width: 24px;
    height: 24px;
    margin-left: 5px;
    fill: ${theme.primary};
  `,
  privacy: css`
    max-width: 290px;
    color: ${theme.textColor.fade(0.25).toString()};

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      max-width: none;
    }
  `
}
