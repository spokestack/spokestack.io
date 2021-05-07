import * as theme from '../../styles/theme'

import { Global, SerializedStyles, css } from '@emotion/react'

import NavLink from './NavLink'
import React from 'react'
import SVGIcon from '../SVGIcon'

interface Props {
  children?: React.ReactNode
  extraCss?: SerializedStyles | SerializedStyles[]
  href?: string
  icon: string
  iconCss: SerializedStyles | SerializedStyles[]
  partiallyActive?: boolean
  title: string
  text: string
}

export default function NavDropdownLink({
  children,
  extraCss,
  href,
  icon,
  iconCss,
  partiallyActive,
  title,
  text
}: Props) {
  return (
    <NavLink
      mobileOnly
      partiallyActive={partiallyActive}
      className="nav-link-dropdown"
      extraCss={[styles.dropdownLink].concat(extraCss!)}
      to={href}
      title={title}>
      <Global
        styles={css`
          html.dark-mode .nav-link-dropdown {
            span:not(.blue),
            p {
              color: ${theme.textDarkBg};
            }
          }
        `}
      />
      <div css={styles.image}>
        <SVGIcon icon={icon} extraCss={iconCss} />
      </div>
      <div className="ie-fix" css={styles.content}>
        <span className={href ? 'blue' : ''} css={styles.title}>
          {title}
        </span>
        <p css={styles.text}>{text}</p>
        {children}
      </div>
    </NavLink>
  )
}

const styles = {
  dropdownLink: css`
    flex-direction: row;
    align-items: flex-start;
    color: ${theme.text} !important;
    height: auto;
    padding: 20px;
    white-space: normal;

    &,
    &:visited,
    &:hover,
    &:active {
      color: ${theme.text} !important;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      padding: 10px;
      border-radius: 7px;

      &:not(:last-of-type) {
        margin-bottom: 25px;
      }
    }

    ${theme.ieBreakpointMinDefault} {
      margin-bottom: 0 !important;
      min-height: 0 !important;
    }
  `,
  image: css`
    width: 50px;
    flex-shrink: 0;
  `,
  content: css`
    display: flex;
    flex-direction: column;
    margin-left: 5px;
  `,
  title: css`
    font-size: 21px;
    font-weight: 700;
    margin-bottom: 5px;
  `,
  text: css`
    font-weight: 400;
  `
}
