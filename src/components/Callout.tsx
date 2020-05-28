import * as theme from '../styles/theme'

import { Global, SerializedStyles, css } from '@emotion/core'

import Color from 'color'
import { Link } from 'gatsby'
import React from 'react'
import { adjustFontSizeTo } from '../styles/typography'

interface Props {
  children: React.ReactNode
  extraCss?: SerializedStyles
  href?: string
}

export default function Callout({ children, extraCss, href }: Props) {
  return (
    <>
      <Global
        styles={css`
          html.dark-mode {
            .callout {
              background-color: ${theme.authorBackground};
              border-left-color: ${theme.mainBorderDark};
              border-right-color: ${theme.mainBorderDark};
              border-bottom-color: ${theme.mainBorderDark};

              &,
              &:visited,
              &:hover,
              &:active {
                color: ${theme.textDarkBg};
              }

              &:hover {
                background-color: ${theme.authorBackgroundColor
                  .darken(0.1)
                  .hex()};
              }
            }
          }
        `}
      />
      {href ? (
        <Link css={[styles.callout, extraCss]} to={href} className="callout">
          {children}
        </Link>
      ) : (
        <div css={[styles.callout, extraCss]} className="callout">
          {children}
        </div>
      )}
    </>
  )
}

const styles = {
  callout: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    background-color: white;
    border: 1px solid ${theme.mainBorder};
    border-top: 6px solid ${theme.primaryLight};
    border-radius: 0 0 7px 7px;
    padding: 25px;
    text-decoration: none;
    font-weight: 400;

    &,
    &:visited,
    &:hover,
    &:active {
      color: ${theme.text};
    }

    &[href]:hover {
      background-color: ${Color('#fff').darken(0.03).hex()};
    }

    &[href]:active {
      box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.5);
    }

    h5 {
      font-size: ${adjustFontSizeTo('14px').fontSize};
      color: ${theme.primary};
      text-transform: uppercase;
    }
  `
}
