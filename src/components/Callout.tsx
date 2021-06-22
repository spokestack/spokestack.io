import * as theme from '../styles/theme'

import { Global, SerializedStyles, css } from '@emotion/react'
import React, { Fragment } from 'react'

import Color from 'color'
import { Link } from 'gatsby'

interface Props {
  children: React.ReactNode
  extraCss?: SerializedStyles | SerializedStyles[]
  href?: string
  to?: string
}

export default function Callout({ children, extraCss, href, to }: Props) {
  const style = [styles.callout].concat(extraCss!)
  return (
    <Fragment>
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
      {to ? (
        <Link css={style} to={to} className="callout" tabIndex={0}>
          {children}
        </Link>
      ) : href ? (
        <a css={style} href={href} className="callout" tabIndex={0}>
          {children}
        </a>
      ) : (
        <div css={style} className="callout">
          {children}
        </div>
      )}
    </Fragment>
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
      font-size: 14px;
      color: ${theme.primary};
      text-transform: uppercase;
    }
  `
}
