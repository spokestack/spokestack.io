import React, { AnchorHTMLAttributes } from 'react'
import { SerializedStyles, css } from '@emotion/react'

import { transitionEasing } from '../../styles/theme'

interface Props {
  open: boolean
  onClick: AnchorHTMLAttributes<HTMLAnchorElement>['onClick']
  extraCss?: SerializedStyles
}

export default function Hamburger({ extraCss, open, onClick }: Props) {
  return (
    <a
      tabIndex={0}
      title="Toggle Mobile Navigation Menu"
      css={[styles.hamburger, extraCss]}
      className={open ? 'open' : ''}
      onClick={onClick}
    >
      <div className="lines" css={styles.lines}>
        <span css={styles.line} style={{ top: 0 }} />
        <span css={styles.line} style={{ top: 7 }} />
        <span css={styles.line} style={{ top: 14 }} />
      </div>
    </a>
  )
}

const styles = {
  hamburger: css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 44px;
    height: 44px;
    cursor: pointer;

    &.open {
      .lines span:first-of-type {
        transform: rotateZ(45deg) translate(5px, 5px) scaleX(1.2);
      }
      .lines span:nth-of-type(2) {
        transform: rotateZ(135deg) scaleX(1.2);
      }
      .lines span:last-of-type {
        transform: translateY(-8px) scale(0);
        opacity: 0;
      }
    }
  `,
  lines: css`
    position: relative;
    width: 15px;
    height: 15px;
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
