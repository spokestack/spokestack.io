import { css } from '@emotion/react'
import React from 'react'
import * as theme from '../../styles/theme'
import SVGIcon from '../SVGIcon'

interface Props {
  children: React.ReactNode
}

export default function Info({ children }: Props) {
  return (
    <div css={styles.info}>
      <SVGIcon icon="#info" extraCss={styles.infoIcon} />
      <div>{children}</div>
    </div>
  )
}

const styles = {
  info: css`
    display: flex;
    flex-direction: row;
    background-color: ${theme.primaryLighter};
    border: 1px solid ${theme.primaryLight};
    border-radius: 7px;
    margin-bottom: 25px;
    padding: 20px;
  `,
  infoIcon: css`
    width: 25px;
    height: 25px;
    fill: ${theme.primary};
    flex-shrink: 0;
    margin-right: 10px;
  `
}
