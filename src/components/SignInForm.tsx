import * as theme from '../styles/theme'

import React, { useEffect } from 'react'
import { SerializedStyles, css } from '@emotion/react'

import Card from './Card'
import SVGIcon from './SVGIcon'
import { checkState } from '../utils/auth'

interface Props {
  extraCss?: SerializedStyles | SerializedStyles[]
  header?: string
  isCreate?: boolean
}

export default function SignInForm({ extraCss, header, isCreate }: Props) {
  useEffect(() => {
    checkState()
  }, [])
  return (
    <Card extraCss={[styles.container].concat(extraCss)}>
      {!!header && <h4 css={styles.header}>{header}</h4>}
      <a href="/api/auth/github" className="btn btn-large" css={styles.button}>
        <div css={styles.iconWrap}>
          <SVGIcon icon="#github" css={styles.linkIcon} />
        </div>
        {isCreate ? 'Sign up' : 'Sign in'} with GitHub
      </a>
      <a href="/api/auth/google" className="btn btn-large" css={styles.button}>
        <div css={styles.iconWrap}>
          <SVGIcon icon="#google" css={styles.linkIcon} />
        </div>
        {isCreate ? 'Sign up' : 'Sign in'} with Google
      </a>
      {isCreate ? (
        <p css={styles.footerText}>
          Already have an account? <a href="/account/login">Sign in</a>
        </p>
      ) : (
        <p css={styles.footerText}>
          New to Spokestack? <a href="/account/create">Create free account</a>
        </p>
      )}
    </Card>
  )
}

const styles = {
  container: css`
    width: 100%;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      max-width: 610px;
      padding: 100px 40px;
    }
  `,
  header: css`
    max-width: 365px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  `,
  button: css`
    padding-left: 0 !important;
    padding-right: 20px !important;
    margin-bottom: 20px !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    flex-wrap: wrap !important;
  `,
  iconWrap: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 100%;
    flex-shrink: 0;
    margin-right: 15px;
    background-color: white;
    border-radius: 25px 0 0 25px;
    border-right: 1px solid ${theme.primary};
  `,
  linkIcon: css`
    fill: ${theme.primary};
    width: 25px;
    height: 25px;
  `,
  footerText: css`
    font-size: 14px;
    text-align: center;
    margin: 0;

    a {
      text-decoration: none;
      font-weight: 400;
    }
  `
}
