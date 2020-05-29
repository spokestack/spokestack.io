import * as theme from '../styles/theme'

import { SerializedStyles, css } from '@emotion/core'
import { isLoggedIn, logout } from '../utils/auth'

import { Link } from 'gatsby'
import React from 'react'

interface Props {
  extraCss?: SerializedStyles
}

export default function LoginButtons({ extraCss }: Props) {
  return isLoggedIn() ? (
    <div css={[styles.loginButtons, extraCss]}>
      <Link
        to="/account"
        css={styles.loginLink}
        partiallyActive
        activeStyle={{ display: 'none' }}>
        Account
      </Link>
      <a className="btn btn-secondary btn-transparent" onClick={() => logout()}>
        Log out
      </a>
    </div>
  ) : (
    <div css={[styles.loginButtons, extraCss]}>
      <Link
        to="/login"
        css={styles.loginLink}
        activeStyle={{ display: 'none' }}>
        Log in
      </Link>
      <Link
        className="btn btn-secondary btn-transparent"
        to="/create"
        activeStyle={{ display: 'none' }}>
        Sign up free
      </Link>
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
    color: white;
    font-weight: 400;
    margin-right: 20px;
    text-decoration: none;

    &,
    &:visited {
      color: white;
    }
    &:hover {
      color: ${theme.linkSecondaryHover};
    }
    &:active {
      color: ${theme.linkSecondaryActive};
    }
  `
}
