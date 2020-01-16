import React from 'react'
import { isLoggedIn, logout } from '../utils/auth'
import iconArrow from '../icons/arrow-forward.svg'
import SVGIcon from './SVGIcon'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import { DEFAULT_MEDIA_QUERY, MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import { secondary, transitionEasing, primary } from '../utils/theme'

export default function LoginButton() {
  return isLoggedIn() ? (
    <a className="btn" css={styles.loginButton} onClick={() => logout()}>
      Sign Out
      <SVGIcon icon={iconArrow.id} style={{ fill: secondary, width: '17px', height: '17px' }} />
    </a>
  ) : (
    <Link className="btn" activeStyle={{ display: 'none' }} to="/login" css={styles.loginButton}>
      Sign In / Create
      <SVGIcon icon={iconArrow.id} style={{ fill: secondary, width: '17px', height: '17px' }} />
    </Link>
  )
}

const styles = {
  loginButton: css`
    background-color: transparent !important;
    color: ${secondary} !important;
    transition: background-color 0.2s ${transitionEasing}, color 0.2s ${transitionEasing};
    margin-left: 20px;

    svg {
      transition: fill 0.2s ${transitionEasing};
    }

    ${MIN_DEFAULT_MEDIA_QUERY} {
      &:hover {
        color: ${primary} !important;
        background-color: ${secondary} !important;

        svg {
          fill: ${primary} !important;
        }
      }
    }

    ${DEFAULT_MEDIA_QUERY} {
      border: none;
      padding: 0 10px;
      border-radius: 0;

      &:hover {
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, ${secondary} 50%);
        background-repeat: repeat-x;
        background-size: 0.2em 0.2em;
        background-position: 0 100%;
      }

      &:active {
        box-shadow: none !important;
      }
    }
  `
}
