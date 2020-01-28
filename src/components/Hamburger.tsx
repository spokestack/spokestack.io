import React, { AnchorHTMLAttributes } from 'react'
import { SerializedStyles, css } from '@emotion/core'

import { transitionEasing } from '../utils/theme'

interface Props {
  open: boolean
  onClick: AnchorHTMLAttributes<HTMLAnchorElement>['onClick']
  extraCss?: SerializedStyles
}

export default function Hamburger({ extraCss, open, onClick }: Props) {
  return (
    <a
      css={[styles.hamburger, extraCss]}
      className={open ? 'open' : ''}
      onClick={onClick}>
      <span css={styles.line} style={{ top: 0 }} />
      <span css={styles.line} style={{ top: 7 }} />
      <span css={styles.line} style={{ top: 14 }} />
    </a>
  )
}

const styles = {
  hamburger: css`
    position: relative;
    width: 15px;
    height: 15px;
    cursor: pointer;

    &.open {
      span:first-of-type {
        transform: rotateZ(45deg) translate(5px, 5px) scaleX(1.2);
      }
      span:nth-of-type(2) {
        transform: rotateZ(135deg) scaleX(1.2);
      }
      span:last-of-type {
        transform: translateY(-8px) scale(0);
        opacity: 0;
      }
    }
  `,
  line: css`
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background-color: white;
    transition: opacity 0.2s ${transitionEasing},
      transform 0.2s ${transitionEasing};
  `
}
