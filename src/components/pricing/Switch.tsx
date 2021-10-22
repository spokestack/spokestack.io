import * as theme from '../../styles/theme'

import React, { PureComponent } from 'react'
import { SerializedStyles, css } from '@emotion/react'

interface Props {
  yearly: boolean
  onChange: (yearly: boolean) => void
  extraCss?: SerializedStyles
}

interface State {
  moving: boolean
  x: number
}

const KNOB_WIDTH = 83

export default class Switch extends PureComponent<Props, State> {
  private dragged?: boolean
  private prevX?: number
  private startX?: number
  private knob = React.createRef<HTMLDivElement>()

  state: State = {
    moving: false,
    x: this.props.yearly ? 0 : KNOB_WIDTH
  }

  componentDidMount() {
    if (this.knob.current) {
      this.knob.current.addEventListener('mousedown', this.preventBubble)
      this.knob.current.addEventListener('touchstart', this.preventBubble)
    }
  }

  componentWillUnmount() {
    if (this.knob.current) {
      this.knob.current.removeEventListener('mousedown', this.preventBubble)
      this.knob.current.removeEventListener('touchstart', this.preventBubble)
    }
    this.removeListeners()
  }

  startMove = (e: React.PointerEvent) => {
    const { x } = this.state
    e.preventDefault()
    e.stopPropagation()
    this.prevX = x
    this.startX = e.clientX
    this.dragged = false
    this.setState({ moving: true })
    this.addListeners()
  }

  move = (e: PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const nextX = this.nextX(e.clientX)
    this.dragged = this.dragged || Math.abs(nextX - this.prevX!) > 5
    this.setState({ x: nextX })
  }

  stopMove = (e: PointerEvent) => {
    const { yearly } = this.props
    this.removeListeners()
    e.preventDefault()
    this.setState({
      moving: false
    })
    if (this.dragged) {
      const nextX = this.nextX(e.clientX)
      this.updateYearly(nextX < KNOB_WIDTH / 2)
    } else {
      this.updateYearly(!yearly)
    }
  }

  updateYearly = (newYearly: boolean) => {
    this.setState({
      x: newYearly ? 0 : KNOB_WIDTH
    })
    this.props.onChange(newYearly)
  }

  nextX(clientX: number) {
    return this.constrainX(clientX - this.startX! + this.prevX!)
  }

  constrainX(x: number) {
    return Math.max(0, Math.min(KNOB_WIDTH, x))
  }

  addListeners() {
    document.addEventListener('pointermove', this.move)
    document.addEventListener('pointercancel', this.stopMove)
    document.addEventListener('pointerup', this.stopMove)
  }

  removeListeners() {
    document.removeEventListener('pointermove', this.move)
    document.removeEventListener('pointercancel', this.stopMove)
    document.removeEventListener('pointerup', this.stopMove)
  }

  preventBubble(e: React.MouseEvent | React.TouchEvent | Event) {
    e.preventDefault()
    e.stopPropagation()
  }

  render() {
    const { yearly, extraCss } = this.props
    const { moving, x } = this.state
    const halfWidth = KNOB_WIDTH / 2
    return (
      <button
        tabIndex={0}
        css={[styles.button, extraCss]}
        onClick={() => this.updateYearly(!yearly)}
        onKeyDown={(e) => {
          if (
            !e.shiftKey &&
            !e.altKey &&
            !e.ctrlKey &&
            !e.metaKey &&
            // Enter (13) or Space (32) triggers a toggle
            (e.keyCode === 13 || e.keyCode === 32)
          ) {
            e.preventDefault()
            this.updateYearly(!yearly)
          }
        }}
      >
        <div css={styles.track}>
          <div className="switch-text" css={styles.text}>
            Yearly
          </div>
          <div className="switch-text" css={styles.text}>
            Monthly
          </div>
        </div>
        <div
          ref={this.knob}
          css={styles.knob}
          className={moving ? 'moving' : ''}
          onPointerDown={this.startMove}
          onClick={this.preventBubble}
          style={{
            transform: moving
              ? `translateX(${x}px)`
              : yearly
              ? 'none'
              : `translateX(${KNOB_WIDTH}px)`
          }}
        >
          <div
            className="switch-text"
            css={styles.text}
            style={{
              opacity: moving ? (halfWidth - x) / halfWidth : yearly ? 1 : 0
            }}
          >
            Yearly
          </div>
          <div
            className="switch-text"
            css={styles.text}
            style={{
              opacity: moving ? (x - halfWidth) / halfWidth : yearly ? 0 : 1
            }}
          >
            Monthly
          </div>
        </div>
      </button>
    )
  }
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
    height: 31px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    border-radius: 25px;
    background-color: white;
    border: 1px solid ${theme.primary};

    .switch-text {
      padding-top: 1px;
    }
  `,
  knob: css`
    position: relative;
    width: ${KNOB_WIDTH}px;
    height: 31px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    background-color: ${theme.primary};

    &:not(.moving) {
      transition: transform 0.1s ${theme.transitionEasing};

      .switch-text {
        transition: opacity 0.1s ${theme.transitionEasing};
      }
    }

    .switch-text {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: white;
    }
  `,
  text: css`
    color: ${theme.primary};
    font-size: 12px;
  `
}
