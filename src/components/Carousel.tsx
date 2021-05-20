import { css } from '@emotion/react'
import React, { PureComponent } from 'react'
import * as theme from '../styles/theme'
import Button from './Button'
import SVGIcon from './SVGIcon'

interface Props {
  children: React.ReactNode
  keys: string[]
  maxWidth: number
  interval?: number
}

interface State {
  index: number
  moving: boolean
  x: number
}

const rtransform = /matrix(?:3d)?\(([^)]+)\)/
const rcomma = /,\s*/

export default class Carousel extends PureComponent<Props, State> {
  private timeout?: NodeJS.Timeout
  private dragged?: boolean
  private prevX?: number
  private startX?: number
  private container = React.createRef<HTMLDivElement>()
  private slides = React.createRef<HTMLDivElement>()

  static defaultProps = {
    interval: 5000
  }

  state = {
    index: 0,
    moving: false,
    x: 0
  }

  componentDidMount() {
    this.start()
    if (this.slides.current) {
      this.slides.current.addEventListener('mousedown', this.preventDefault)
      this.slides.current.addEventListener('touchstart', this.preventDefault)
    }
  }

  componentWillUnmount() {
    this.stop()
    if (this.slides.current) {
      this.slides.current.removeEventListener('mousedown', this.preventDefault)
      this.slides.current.removeEventListener('touchstart', this.preventDefault)
    }
    this.removeListeners()
  }

  preventDefault(e: React.MouseEvent | React.TouchEvent | Event) {
    e.preventDefault()
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

  getCurrentTranslateX() {
    if (!this.slides.current) {
      return 0
    }
    const transform = window.getComputedStyle(this.slides.current).transform
    const matrix = rtransform.exec(transform)
    if (matrix) {
      const values = matrix[1].split(rcomma)
      return Number(values[12] || values[4]) || 0
    }
    return 0
  }

  startMove = (e: React.PointerEvent) => {
    if (!this.slides.current) {
      return
    }
    e.preventDefault()
    e.stopPropagation()
    this.stop()
    this.prevX = this.getCurrentTranslateX()
    this.startX = e.clientX
    this.dragged = false
    this.setState({ moving: true, x: this.prevX })
    this.addListeners()
  }

  getNumSlides() {
    return this.slides.current?.childElementCount || 1
  }

  getCurrentWidth() {
    if (!this.container.current) {
      return 0
    }
    return this.container.current.getBoundingClientRect().width
  }

  constrainX(x: number) {
    const width = this.getCurrentWidth()
    const { index } = this.state
    const len = this.getNumSlides()
    return Math.max(
      -width * (index < len - 1 ? index + 1 : index),
      Math.min(-width * (index > 0 ? index - 1 : index), x)
    )
  }

  nextX(clientX: number) {
    return this.constrainX(clientX - this.startX! + this.prevX!)
  }

  move = (e: PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const nextX = this.nextX(e.clientX)
    this.dragged = this.dragged || Math.abs(nextX - this.prevX!) > 5
    requestAnimationFrame(() => {
      this.setState({ x: nextX })
    })
  }

  stopMove = (e: PointerEvent) => {
    this.removeListeners()
    e.preventDefault()
    if (this.dragged) {
      const width = this.getCurrentWidth()
      const { index } = this.state
      const nextX = this.nextX(e.clientX)
      const diff = Math.abs(nextX) - width * index
      if (diff > 0 && diff > width / 3) {
        this.next()
      } else if (diff < 0 && Math.abs(diff) > width / 3) {
        this.prev()
      }
    }
    this.setState({ moving: false })
  }

  next = () => {
    const { index } = this.state
    const len = this.getNumSlides()
    this.setState({
      index: (index + 1) % len,
      moving: false
    })
  }

  prev = () => {
    const { index } = this.state
    const len = this.getNumSlides()
    this.setState({
      index: (index + len - 1) % len,
      moving: false
    })
  }

  start() {
    this.timeout = setInterval(this.next, this.props.interval)
  }

  stop() {
    clearTimeout(this.timeout!)
  }

  render() {
    const { children, keys, maxWidth } = this.props
    const { index, moving, x } = this.state

    return (
      <div ref={this.container} style={{ maxWidth }}>
        <div css={styles.buttons}>
          {keys.map((key, i) => (
            <Button
              key={key}
              transparent={i !== index}
              extraCss={[
                styles.button,
                css`
                  ${theme.DEFAULT_MEDIA_QUERY} {
                    :not(:nth-of-type(${index + 1})) {
                      display: none;
                    }
                  }
                `
              ]}
              onClick={() => {
                this.stop()
                if (
                  window.matchMedia(`(min-width:${theme.DEFAULT_WIDTH}px)`)
                    .matches
                ) {
                  this.setState({ index: i })
                } else {
                  this.next()
                }
              }}>
              {key}
            </Button>
          ))}
        </div>
        <div css={styles.content}>
          <div css={styles.slidesWrap}>
            <div
              ref={this.slides}
              onPointerDown={this.startMove}
              onClick={this.preventDefault}
              className={moving ? 'moving' : ''}
              css={styles.slides}
              style={{
                transform: moving
                  ? `translateX(${x}px)`
                  : `translateX(-${index * 25}%)`,
                width: `${keys.length * 100}%`
              }}>
              {children}
            </div>
          </div>
          <Button
            link
            onClick={() => {
              this.stop()
              this.prev()
            }}
            extraCss={[styles.moveButton, styles.prevButton]}>
            <SVGIcon
              icon="#arrow-down"
              extraCss={[styles.arrow, styles.backArrow]}
            />
          </Button>
          <Button
            link
            onClick={() => {
              this.stop()
              this.next()
            }}
            extraCss={[styles.moveButton, styles.nextButton]}>
            <SVGIcon icon="#arrow-down" extraCss={[styles.arrow]} />
          </Button>
        </div>
      </div>
    )
  }
}

const styles = {
  buttons: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 50px 0;
  `,
  button: css`
    ${theme.DEFAULT_MEDIA_QUERY} {
      width: 100%;
      max-width: 250px;
    }
    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      :nth-of-type(n + 2) {
        margin-left: 25px;
      }
    }
  `,
  content: css`
    position: relative;
  `,
  slidesWrap: css`
    overflow: hidden;
  `,
  slides: css`
    display: flex;
    flex-direction: row;

    &:not(.moving) {
      transition: transform 0.2s ${theme.transitionEasing};
    }
  `,
  moveButton: css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  prevButton: css`
    left: -20px;
  `,
  nextButton: css`
    right: -20px;
  `,
  arrow: css`
    width: 14px;
    height: 15px;
    transform: rotateZ(-90deg);
  `,
  backArrow: css`
    transform: rotateZ(90deg);
  `
}
