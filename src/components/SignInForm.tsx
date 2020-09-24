import * as theme from '../styles/theme'

import React, { useEffect, useState } from 'react'

import Card from './Card'
import { Link } from 'gatsby'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import SVGIcon from './SVGIcon'
import { createLink as createGitHubLink } from '../utils/oauthGitHub'
import { createLink as createGoogleLink } from '../utils/oauthGoogle'
import { css, SerializedStyles } from '@emotion/core'

interface Props {
  extraCss?: SerializedStyles | SerializedStyles[]
  header?: string
  isCreate?: boolean
}

export default function SignInForm({ extraCss, header, isCreate }: Props) {
  const [gitHubLink, setGitHubLink] = useState<string>(null)
  const [googleLink, setGoogleLink] = useState<string>(null)
  useEffect(() => {
    setGitHubLink(createGitHubLink)
    setGoogleLink(createGoogleLink)
  }, [])

  return (
    <Card extraCss={[styles.container].concat(extraCss)}>
      {!!header && <h4 css={styles.header}>{header}</h4>}
      <a href={gitHubLink} className="btn btn-large" css={styles.button}>
        <div css={styles.iconWrap}>
          <SVGIcon icon="#github" css={styles.linkIcon} />
        </div>
        {isCreate ? 'Sign up' : 'Sign in'} with GitHub
      </a>
      <a href={googleLink} className="btn btn-large" css={styles.button}>
        <div css={styles.iconWrap}>
          <SVGIcon icon="#google" css={styles.linkIcon} />
        </div>
        {isCreate ? 'Sign up' : 'Sign in'} with Google
      </a>
      {isCreate ? (
        <p css={styles.footerText}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      ) : (
        <p css={styles.footerText}>
          New to Spokestack? <Link to="/create">Sign up free</Link>
        </p>
      )}
    </Card>
  )
}

const styles = {
  container: css`
    width: 100%;

    ${MIN_DEFAULT_MEDIA_QUERY} {
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
    margin-bottom: 20px;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
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
