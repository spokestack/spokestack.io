import * as theme from '../styles/theme'

import { Global, css } from '@emotion/core'
import {
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_TABLET_MEDIA_QUERY
} from 'typography-breakpoint-constants'
import React, { FormEvent, useRef, useState } from 'react'

import Button from './Button'
import SVGIcon from './SVGIcon'
import validateEmail from '../utils/validateEmail'

export default function Newsletter() {
  const formRef = useRef<HTMLFormElement>(null)
  const [invalid, setInvalid] = useState(false)
  function submit(e: FormEvent<HTMLFormElement>) {
    const form = formRef.current
    if (!form) {
      return
    }
    const email = form.email.value
    if (!email || !validateEmail(email)) {
      e.preventDefault()
      setInvalid(true)
      return
    }
    setInvalid(false)
  }
  return (
    <form
      ref={formRef}
      action="https://spokedaily.substack.com/api/v1/free?nojs=true"
      method="post"
      onSubmit={submit}
      css={styles.form}>
      <Global
        styles={css`
          html.dark-mode .input {
            border-color: ${theme.primaryLight};
            color: white;
          }
        `}
      />
      <p>Stay up-to-date with the latest news from the Spokestack community</p>
      <div css={styles.inputWrap}>
        <input
          type="email"
          name="email"
          className={`input${invalid ? ' error' : ''}`}
          placeholder="Enter email"
        />
        <Button type="submit" transparent extraCss={styles.button}>
          Subscribe
          <SVGIcon
            className="icon"
            icon="#arrow-forward"
            extraCss={styles.icon}
          />
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
    border-bottom: 1px solid ${theme.mainBorder};

    p {
      width: 100%;
      max-width: 400px;
      margin-bottom: 25px;
    }

    ${MIN_DEFAULT_MEDIA_QUERY} {
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

    ${MIN_TABLET_MEDIA_QUERY} {
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
    width: 17px;
    height: 17px;
    margin-left: 5px;
    fill: ${theme.primary};
  `
}
