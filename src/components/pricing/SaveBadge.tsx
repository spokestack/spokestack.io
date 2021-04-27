import * as theme from '../../styles/theme'

import React from 'react'
import SVGIcon from '../SVGIcon'
import { css } from '@emotion/react'

interface Props {
  percent: number
}

export default function SaveBadge({ percent }: Props) {
  return (
    <div css={styles.saveBadge}>
      <SVGIcon icon="#star" extraCss={styles.starIcon} />
      <strong>-{percent}%</strong>
    </div>
  )
}

const styles = {
  saveBadge: css`
    position: relative;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-right: 10px;
    transition: opacity 0.2s ${theme.transitionEasing};

    strong {
      position: relative;
      font-size: 16px;
      color: ${theme.header};
    }
  `,
  starIcon: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 60px;
  `
}
