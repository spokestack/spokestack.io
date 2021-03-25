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
      <p>Stay up-to-date with the latest news from the Spokestack community</p>
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
          transparent={!success}
          submitting={submitting}
          extraCss={styles.button}>
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
            <Fragment>
              Subscribe
              <SVGIcon
                className="icon"
                icon="#arrow-forward"
                extraCss={styles.icon}
              />
            </Fragment>
          )}
        </Button>
      </div>
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

    p {
      width: 100%;
      max-width: 400px;
      margin-bottom: 25px;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;

      p {
        margin: 0;
      }
    }
  `,
  inputWrap: css`
    display: flex;
    flex-direction: column;

    .input {
      padding-left: 30px;
      margin-bottom: 20px;
      background-color: transparent;
      border-color: ${theme.primary};
    }
    .input,
    .btn {
      height: 50px;
    }

    ${theme.MIN_TABLET_MEDIA_QUERY} {
      flex-direction: row;
      margin: 0 0 0 25px;

      .input {
        border-radius: 24px 0 0 24px;
        margin-bottom: 0;
        border-right: none;
      }
      .btn {
        border-radius: 0 24px 24px 0;
      }
    }
  `,
  button: css`
    ${theme.ieBreakpoint} {
      width: 200px;
    }
  `,
  icon: css`
    width: 24px;
    height: 24px;
    margin-left: 5px;
    fill: ${theme.primary};
  `
}
