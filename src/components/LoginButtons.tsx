import * as theme from '../styles/theme'

import React, { useEffect, useState } from 'react'
import { SerializedStyles, css } from '@emotion/react'
import { isLoggedIn, logout } from '../utils/auth'

import { Link } from 'gatsby'
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
  const [loggedIn, setLoggedIn] = useState(false)
  const style = [styles.loginButtons].concat(extraCss)
  const classes = [className]
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoggedIn(isLoggedIn())
    })

    return () => {
      clearTimeout(timeout)
    }
  }, [])
  if (loggedIn) {
    classes.push('logged-in')
  }
  return (
    <div className={classes.join(' ')} css={style}>
      <div className="login-buttons--login">
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
          Create free account
        </Link>
      </div>
      <div className="login-buttons--account">
        <Link
          to="/account"
          partiallyActive
          css={styles.loginLink}
          activeStyle={{ display: 'none' }}>
          Account
        </Link>
        <a className={`btn ${btnClassName || ''}`} onClick={() => logout()}>
          Log out
        </a>
      </div>
    </div>
  )
}

const styles = {
  loginButtons: css`
    .login-buttons--login,
    .login-buttons--account {
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .login-buttons--login {
      display: flex;
    }
    .login-buttons--account {
      display: none;
    }

    &.logged-in {
      .login-buttons--login {
        display: none;
      }
      .login-buttons--account {
        display: flex;
      }
    }
  `,
  loginLink: css`
    font-weight: 400;
    margin-right: 20px;
    text-decoration: none;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
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
