import React, { useRef, useState, FormEvent } from 'react'
import Button from './Button'
import validateEmail from '../utils/validateEmail'
import { css } from '@emotion/core'
import SVGIcon from './SVGIcon'
import iconArrow from '../icons/arrow-forward.svg'
import * as theme from '../utils/theme'
import { MIN_TABLET_MEDIA_QUERY } from 'typography-breakpoint-constants'

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
      <h3>Subscribe to SpokeDaily</h3>
      <p>
        Today&rsquo;s must reads on mobile voice &amp; conversational
        technologies, straight to your inbox on weekdays. Brought to you by
        Spokestack.
      </p>
      <div css={styles.inputWrap}>
        <input
          type="email"
          name="email"
          className={`input${invalid ? ' error' : ''}`}
          placeholder="Enter email"
        />
        <Button type="submit">
          Subscribe
          <SVGIcon icon={iconArrow.id} extraCss={styles.icon} />
        </Button>
      </div>
    </form>
  )
}

const styles = {
  form: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    h3 {
      color: white;
    }

    p {
      width: 100%;
      max-width: 600px;
    }
  `,
  inputWrap: css`
    display: flex;
    flex-direction: column;

    .input {
      padding-left: 30px;
      margin-bottom: 20px;
    }
    .input,
    .btn {
      height: 50px;
    }

    ${MIN_TABLET_MEDIA_QUERY} {
      flex-direction: row;
      .input {
        border-radius: 24px 0 0 24px;
        margin-bottom: 0;
      }
      .btn {
        border-radius: 0 24px 24px 0;
      }
    }
  `,
  icon: css`
    width: 17px;
    height: 17px;
    fill: ${theme.text};
  `
}
