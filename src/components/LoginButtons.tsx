import * as theme from '../styles/theme'

import { SerializedStyles, css } from '@emotion/core'
import { isLoggedIn, logout } from '../utils/auth'

import { Link } from 'gatsby'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import React from 'react'
import NavDropdown from './NavDropdown'
import SignInForm from './SignInForm'

interface Props {
  btnClassName?: string
  className?: string
  extraCss?: SerializedStyles | SerializedStyles[]
  loginDropdown?: boolean
}

export default function LoginButtons({
  btnClassName,
  className,
  extraCss,
  loginDropdown
}: Props) {
  return (
    <div className={className} css={[styles.loginButtons].concat(extraCss)}>
      {isLoggedIn() ? (
        <>
          <Link
            to="/account"
            css={styles.loginLink}
            partiallyActive
            activeStyle={{ display: 'none' }}>
            Account
          </Link>
          <a className={`btn ${btnClassName || ''}`} onClick={() => logout()}>
            Log out
          </a>
        </>
      ) : (
        <>
          {loginDropdown ? (
            <NavDropdown title="Sign in" menuCss={styles.dropdown}>
              <SignInForm extraCss={styles.loginForm} />
            </NavDropdown>
          ) : (
            <Link
              to="/login"
              css={styles.loginLink}
              activeStyle={{ display: 'none' }}>
              Sign in
            </Link>
          )}
          <Link
            className={`btn ${btnClassName || ''}`}
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
  `,
  dropdown: css`
    width: 100% !important;
    max-width: 610px !important;
    left: auto !important;
    right: 20px !important;
    transform: none !important;
  `,
  loginForm: css`
    border: none;
    padding: 20px !important;
  `
}
