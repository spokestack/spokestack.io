import * as theme from '../../styles/theme'
import React from 'react'
import { css, Global } from '@emotion/react'

interface Props {
  children: React.ReactNode
  header: string
}

export default function FooterCard({ children, header }: Props) {
  return (
    <div className="footer-card" css={styles.container}>
      <Global
        styles={css`
          html.dark-mode .footer-card {
            background-color: ${theme.mainBackgroundDark};
          }
        `}
      />
      <h5 css={styles.header}>{header}</h5>
      <div css={styles.content}>{children}</div>
    </div>
  )
}

const styles = {
  container: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 1px solid ${theme.mainBorder};
    border-radius: 7px;

    & + & {
      margin-top: 10px;
    }
  `,
  header: css`
    font-size: 14px;
    text-transform: uppercase;
    padding: 10px 20px;
    margin: 0 !important;
    background: ${theme.pricingBorderHorizontal} bottom center no-repeat;
    color: ${theme.headerColor.fade(0.2).toString()};
  `,
  content: css`
    display: flex;
    flex-direction: column;
    padding: 15px 20px;
  `
}
