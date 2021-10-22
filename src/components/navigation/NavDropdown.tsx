import * as theme from '../../styles/theme'

import { Global, SerializedStyles, css } from '@emotion/react'
import React, { useState } from 'react'

import NavLink from './NavLink'
import SVGIcon from '../SVGIcon'

interface Props {
  children: React.ReactNode
  maxMenuWidth?: number
  menuCss?: SerializedStyles | SerializedStyles[]
  title: string
}

export default function NavDropdown({
  children,
  maxMenuWidth = 1315,
  menuCss,
  title
}: Props) {
  const [open, setOpen] = useState(false)

  const menuStyles = [styles.dropdownMenu]
  if (open) {
    menuStyles.push(styles.dropdownMenuOpen)
  }
  return (
    <div className="nav-dropdown" css={styles.dropdown}>
      <Global
        styles={css`
          html.dark-mode {
            .nav-link {
              color: ${theme.textDarkBg} !important;
            }
            .dropdown-content {
              background-color: ${theme.authorBackground};
              border-color: ${theme.mainBorderDark};
            }
            .dropdown-icon {
              fill: ${theme.textDarkBg};
            }
          }
        `}
      />
      <NavLink
        aria-haspopup="true"
        aria-expanded={open ? 'true' : 'false'}
        href="#"
        onClick={(e) => {
          e.preventDefault()
          setOpen(!open)
        }}
        extraCss={styles.dropdownLink}
      >
        {title}
        <SVGIcon
          className="dropdown-icon"
          icon="#arrow-down"
          extraCss={styles.dropdownIcon}
        />
      </NavLink>
      <div
        className="dropdown-menu"
        css={menuStyles.concat(menuCss!)}
        style={{ maxWidth: `${maxMenuWidth}px` }}
      >
        <div className="dropdown-content" css={styles.dropdownContent}>
          <NavLink
            mobileOnly
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setOpen(false)
            }}
            extraCss={styles.dropdownBack}
          >
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
    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
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
    width: 10px;
    height: 10px;
    fill: ${theme.header};
    margin-left: 8px;
    transform: rotateZ(270deg);
    transition: transform 0.2s ${theme.transitionEasing};

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      transform: none;
      fill: ${theme.textDarkBg};
    }
  `,
  prevIcon: css`
    margin: 0 10px 0 0;
    transform: rotateZ(90deg);
  `,
  dropdownMenu: css`
    position: fixed;
    top: 60px; /* Space for nav */
    left: 0;
    right: 0;
    bottom: 94px; /* Space for login buttons */
    opacity: 0;
    transform: translateX(100%);
    visibility: hidden;
    transition: transform 0.2s ${theme.transitionEasing},
      opacity 0.2s ${theme.transitionEasing},
      visibility 0.2s ${theme.transitionEasing};
    will-change: transform, opacity;
    z-index: 9999;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      right: auto;
      bottom: auto;
      width: calc(100% - 100px);
      perspective: 2000px;
    }
  `,
  dropdownMenuOpen: css`
    ${theme.DEFAULT_MEDIA_QUERY} {
      opacity: 1;
      transform: none;
      visibility: visible;
    }
  `,
  dropdownContent: css`
    width: 100%;
    height: 100%;
    background-color: white;
    transition: transform 0.2s ${theme.transitionEasing};
    overflow: hidden;
    height: 100%;
    overflow-y: auto;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      border: 1px solid ${theme.mainBorder};
      border-radius: 7px;
      transform-origin: 50% -60px;
      transform: rotateX(-15deg);
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    }
  `,
  dropdownBack: css`
    font-weight: 700;
    border-bottom: 1px solid ${theme.mainBorder};

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `
}
