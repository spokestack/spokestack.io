import * as theme from '../styles/theme'

import React, { useEffect, useState } from 'react'
import { SerializedStyles, css } from '@emotion/react'
import { isLoggedIn } from '../utils/auth'

import { Link } from 'gatsby'

interface Props {
  btnClassName?: string
  className?: string
  extraCss?: SerializedStyles | SerializedStyles[]
  loginDropdown?: boolean
}

export default function LoginButtons({
  btnClassName,
  className,
  extraCss
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
        <Link to="/account" css={styles.loginLink}>
          Account
        </Link>
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
        <a className={`btn ${btnClassName || ''}`} href="/api/auth/logout">
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
  `
}
