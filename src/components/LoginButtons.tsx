import * as theme from '../styles/theme'

import { SerializedStyles, css } from '@emotion/core'
import { isLoggedIn, logout } from '../utils/auth'

import { Link } from 'gatsby'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import React from 'react'

interface Props {
  btnClassName?: string
  className?: string
  extraCss?: SerializedStyles
}

export default function LoginButtons({
  btnClassName,
  className,
  extraCss
}: Props) {
  return (
    <div className={className} css={[styles.loginButtons, extraCss]}>
      {isLoggedIn() ? (
        <>
          <Link
            to="/account"
            css={styles.loginLink}
            partiallyActive
            activeStyle={{ display: 'none' }}>
            Account
          </Link>
          <a className={`btn ${btnClassName}`} onClick={() => logout()}>
            Log out
          </a>
        </>
      ) : (
        <>
          <Link
            to="/login"
            css={styles.loginLink}
            activeStyle={{ display: 'none' }}>
            Log in
          </Link>
          <Link
            className={`btn ${btnClassName}`}
            to="/create"
            activeStyle={{ display: 'none' }}>
            Sign up free
          </Link>
        </>
      )}
    </div>
  )
}

const styles = {
  loginButtons: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  loginLink: css`
    font-weight: 400;
    margin-right: 20px;
    text-decoration: none;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      &,
      &:visited {
        color: ${theme.textDarkBg};
      }
      &:hover {
        color: ${theme.linkSecondaryHover};
      }
      &:active {
        color: ${theme.linkSecondaryActive};
      }
    }
  `
}
