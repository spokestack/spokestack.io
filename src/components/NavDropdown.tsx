import * as theme from '../styles/theme'

import {
  DEFAULT_MEDIA_QUERY,
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_LARGE_DISPLAY_MEDIA_QUERY
} from 'typography-breakpoint-constants'
import React, { useState } from 'react'

import NavLink from './NavLink'
import SVGIcon from './SVGIcon'
import { css } from '@emotion/core'

interface Props {
  children: React.ReactNode
  title: string
}

export default function NavDropdown({ children, title }: Props) {
  const [open, setOpen] = useState(false)

  const menuStyles = [styles.dropdownMenu]
  if (open) {
    menuStyles.push(styles.dropdownMenuOpen)
  }
  return (
    <div css={styles.dropdown}>
      <NavLink
        href="#"
        onClick={(e) => {
          e.preventDefault()
          setOpen(!open)
        }}
        extraCss={styles.dropdownLink}>
        {title}
        <SVGIcon
          className="dropdown-icon"
          icon="#arrow-down"
          extraCss={styles.dropdownIcon}
        />
      </NavLink>
      <div className="dropdown-menu" css={menuStyles}>
        <div className="dropdown-content" css={styles.dropdownContent}>
          <NavLink
            mobileOnly
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setOpen(false)
            }}
            css={styles.dropdownBack}>
            <SVGIcon
              className="dropdown-icon"
              icon="#arrow-down"
              extraCss={[styles.dropdownIcon, styles.prevIcon]}
            />
            {title}
          </NavLink>
          {children}
        </div>
      </div>
    </div>
  )
}

const styles = {
  dropdown: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      &:hover .nav-link:after {
        left: 0;
        height: 4px;
        width: 100%;
      }
      &:hover .dropdown-icon {
        transform: rotateZ(-180deg);
      }
      &:hover .dropdown-menu {
        opacity: 1;
        visibility: visible;
      }
      &:hover .dropdown-content {
        transform: none;
      }
    }
  `,
  dropdownLink: css`
    justify-content: space-between;
  `,
  dropdownIcon: css`
    width: 18px;
    height: 18px;
    fill: white;
    margin-left: 5px;
    transform: rotateZ(270deg);
    transition: transform 0.2s ${theme.transitionEasing};

    ${MIN_DEFAULT_MEDIA_QUERY} {
      transform: none;
    }
  `,
  prevIcon: css`
    margin: 0 10px 0 0;
    transform: rotateZ(90deg);
  `,
  dropdownMenu: css`
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 94px;
    opacity: 0;
    transform: translateX(100%);
    visibility: hidden;
    transition: transform 0.2s ${theme.transitionEasing},
      opacity 0.2s ${theme.transitionEasing},
      visibility 0.2s ${theme.transitionEasing};
    will-change: transform, opacity;
    z-index: 9999;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      right: auto;
      bottom: auto;
      width: calc(100% - 100px);
      max-width: 1300px;
      perspective: 2000px;
    }

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      width: calc(100% - 200px);
    }
  `,
  dropdownMenuOpen: css`
    ${DEFAULT_MEDIA_QUERY} {
      opacity: 1;
      transform: none;
      visibility: visible;
    }
  `,
  dropdownContent: css`
    width: 100%;
    height: 100%;
    background-color: ${theme.primary};
    transition: transform 0.2s ${theme.transitionEasing};
    overflow: hidden;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      background-color: white;
      border: 1px solid ${theme.mainBorder};
      border-radius: 7px;
      transform-origin: 50% -60px;
      transform: rotateX(-15deg);
    }
  `,
  dropdownBack: css`
    font-weight: 700;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `
}
