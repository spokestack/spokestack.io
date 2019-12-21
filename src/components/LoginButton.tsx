import React from 'react'
import { isLoggedIn, logout } from '../utils/auth'
import iconArrow from '../icons/arrow-forward.svg'
import SVGIcon from './SVGIcon'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import { DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'

export default function LoginButton() {
  return isLoggedIn() ? (
    <a className="btn" css={styles.loginButton} onClick={() => logout()}>
      Sign Out
      <SVGIcon
        icon={iconArrow.id}
        style={{ fill: 'var(--secondary-color)', width: '17px', height: '17px' }}
      />
    </a>
  ) : (
    <Link className="btn" activeStyle={{ display: 'none' }} to="/login" css={styles.loginButton}>
      Sign In
      <SVGIcon
        icon={iconArrow.id}
        style={{ fill: 'var(--secondary-color)', width: '17px', height: '17px' }}
      />
    </Link>
  )
}

const styles = {
  loginButton: css`
    background-color: transparent !important;
    color: var(--secondary-color) !important;
    transition: background-color 0.2s var(--transition-easing), color 0.2s var(--transition-easing);
    margin-left: 20px;

    svg {
      transition: fill 0.2s var(--transition-easing);
    }

    &:hover {
      color: var(--primary-color) !important;
      background-color: var(--secondary-color) !important;

      svg {
        fill: var(--primary-color) !important;
      }
    }

    ${DEFAULT_MEDIA_QUERY} {
      border: none;
      padding-right: 0;
    }
  `
}
