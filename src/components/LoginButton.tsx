import {
  LARGE_DISPLAY_MEDIA_QUERY,
  MIN_LARGE_DISPLAY_MEDIA_QUERY
} from 'typography-breakpoint-constants'
import { grayDark, primary, secondary, transitionEasing } from '../utils/theme'
import { isLoggedIn, logout } from '../utils/auth'

import { Link } from 'gatsby'
import React from 'react'
import SVGIcon from './SVGIcon'
import { css } from '@emotion/core'

export default function LoginButton() {
  return isLoggedIn() ? (
    <a className="btn" css={styles.loginButton} onClick={() => logout()}>
      Sign Out
      <SVGIcon icon="#arrow-forward" extraCss={styles.icon} />
    </a>
  ) : (
    <Link className="btn" css={styles.loginButton} to="/login">
      Sign In / Sign Up
      <SVGIcon icon="#arrow-forward" extraCss={styles.icon} />
    </Link>
  )
}

const styles = {
  loginButton: css`
    position: absolute !important;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-color: white !important;
    color: ${primary} !important;
    font-weight: 700;
    border-radius: 0 !important;
    border: none !important;
    transition: background-color 0.2s ${transitionEasing},
      color 0.2s ${transitionEasing};
    flex-shrink: 0;
    svg {
      transition: fill 0.2s ${transitionEasing};
    }

    &:hover,
    &:active {
      background-color: ${grayDark} !important;
    }

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      position: relative !important;
      width: auto;
      font-weight: 400;
      height: 38px;
      background-color: transparent !important;
      color: ${secondary} !important;
      border: 1px solid ${secondary} !important;
      border-radius: 24px !important;

      &:hover,
      &:active {
        color: ${primary} !important;
        background-color: ${secondary} !important;

        svg {
          fill: ${primary} !important;
        }
      }
    }
  `,
  icon: css`
    fill: ${secondary};
    width: 17px;
    height: 17px;

    ${LARGE_DISPLAY_MEDIA_QUERY} {
      display: none;
    }
  `
}
