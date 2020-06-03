import * as theme from '../../styles/theme'

import { SerializedStyles, css } from '@emotion/core'

import React from 'react'
import { adjustFontSizeTo } from '../../styles/typography'

interface Props {
  yearly: boolean
  onPress: () => void
  extraCss?: SerializedStyles
}

export default function Switch({ yearly, onPress, extraCss }: Props) {
  return (
    <button css={[styles.button, extraCss]} onClick={() => onPress()}>
      <div css={styles.track}>
        <div className="switch-text" css={styles.text}>
          Bill Yearly
        </div>
        <div className="switch-text" css={styles.text}>
          Bill Monthly
        </div>
      </div>
      <div
        css={styles.knob}
        style={{ transform: yearly ? 'none' : 'translateX(81px)' }}>
        <div
          className="switch-text"
          css={styles.text}
          style={{ opacity: yearly ? 1 : 0 }}>
          Bill Yearly
        </div>
        <div
          className="switch-text"
          css={styles.text}
          style={{ opacity: yearly ? 0 : 1 }}>
          Bill Monthly
        </div>
      </div>
    </button>
  )
}

const styles = {
  button: css`
    position: relative;
    appearance: none;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    width: 166px;
    flex-shrink: 0;
  `,
  track: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 35px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 17px;
    border-radius: 22px;
    background-color: ${theme.mainBorder};

    .switch-text {
      opacity: 0.5;
      padding-top: 1px;
    }
  `,
  knob: css`
    position: relative;
    width: 81px;
    height: 31px;
    margin: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 22px;
    background-color: white;
    transition: transform 0.1s ${theme.transitionEasing};

    .switch-text {
      font-weight: 700;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  `,
  text: css`
    color: ${theme.header};
    font-size: ${adjustFontSizeTo('11px').fontSize};
    transition: opacity 0.1s ${theme.transitionEasing};
  `
}
