import { css, Global } from '@emotion/react'
import React from 'react'
import * as theme from '../styles/theme'
import SVGIcon from './SVGIcon'

interface Props {
  children: React.ReactNode
}

export default function Info({ children }: Props) {
  return (
    <div className="info-box" css={styles.info}>
      <Global
        styles={css`
          html.dark-mode .info-box {
            background-color: #2c3d50;
            border-color: ${theme.mainBorderDark};

            code:not(pre > code) {
              background-color: ${theme.stickyNavBackgroundDark};
            }
          }
        `}
      />
      <SVGIcon icon="#info" extraCss={styles.infoIcon} />
      <div>{children}</div>
    </div>
  )
}

const styles = {
  info: css`
    display: flex;
    flex-direction: row;
    background-color: #ccf2ff;
    border: 1px solid ${theme.primaryLight};
    border-radius: 7px;
    margin-bottom: 25px;
    padding: 20px;

    code:not(pre > code) {
      background-color: #99e5ff;
      border: none;
      font-weight: 400;
    }
  `,
  infoIcon: css`
    width: 25px;
    height: 25px;
    fill: ${theme.primary};
    flex-shrink: 0;
    margin-right: 10px;
  `
}
