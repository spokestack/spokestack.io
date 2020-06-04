import * as theme from '../../styles/theme'

import React, { useState } from 'react'
import { SerializedStyles, css } from '@emotion/core'

import { adjustFontSizeTo } from '../../styles/typography'

interface Props {
  yearly: boolean
  onChange: (yearly: boolean) => void
  extraCss?: SerializedStyles
}

export default function Switch({ yearly, onChange, extraCss }: Props) {
  const [moving, setMoving] = useState(false)
  const [x, setX] = useState(yearly ? 0 : 81)
  function startMove(e: React.PointerEvent) {
    e.preventDefault()
    const prevX = x
    const startX = e.clientX
    setMoving(true)

    function constrainX(x: number) {
      return Math.max(0, Math.min(81, x))
    }

    function move(e: PointerEvent) {
      e.preventDefault()
      e.stopPropagation()
      const nextX = constrainX(e.clientX - startX + prevX)
      setX(nextX)
    }

    function stopMove(e: PointerEvent) {
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointercancel', stopMove)
      document.removeEventListener('pointerup', stopMove)
      e.preventDefault()
      setMoving(false)
      const nextX = constrainX(e.clientX - startX + prevX)
      onChange(nextX < 40)
    }

    document.addEventListener('pointermove', move)
    document.addEventListener('pointercancel', stopMove)
    document.addEventListener('pointerup', stopMove)
  }
  return (
    <button
      css={[styles.button, extraCss]}
      onClick={() => {
        setX(yearly ? 81 : 0)
        onChange(!yearly)
      }}>
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
        className={moving ? 'moving' : ''}
        onPointerDown={startMove}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        style={{
          transform: moving
            ? `translateX(${x}px)`
            : yearly
            ? 'none'
            : 'translateX(81px)'
        }}>
        <div
          className="switch-text"
          css={styles.text}
          style={{ opacity: moving ? (40.5 - x) / 40.5 : yearly ? 1 : 0 }}>
          Bill Yearly
        </div>
        <div
          className="switch-text"
          css={styles.text}
          style={{ opacity: moving ? (x - 40.5) / 40.5 : yearly ? 0 : 1 }}>
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

    &:not(.moving) {
      transition: transform 0.1s ${theme.transitionEasing};

      .switch-text {
        transition: opacity 0.1s ${theme.transitionEasing};
      }
    }

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
  `
}
