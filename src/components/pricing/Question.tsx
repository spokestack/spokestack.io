import { css } from '@emotion/react'
import debounce from 'lodash/debounce'
import React, { useEffect, useRef, useState } from 'react'
import * as theme from '../../styles/theme'
import getTextHeight from '../../utils/getTextHeight'

interface Props {
  question: React.ReactNode
  answer: React.ReactNode
}

export default function Question({ question, answer }: Props) {
  const [open, setOpen] = useState(true)
  const [height, setHeight] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const answerRef = useRef<HTMLDivElement>(null)
  const answerStyle = [styles.answer]

  useEffect(() => {
    function resetHeight() {
      if (answerRef.current && ref.current) {
        // Add 20 for bottom padding
        setHeight(
          20 +
            getTextHeight(
              answerRef.current.innerHTML!,
              ref.current,
              'padding:0 65px 0 25px'
            )
        )
      }
    }
    resetHeight()
    setOpen(false)

    const debouncedReset = debounce(resetHeight, 100)
    window.addEventListener('resize', debouncedReset)

    return () => {
      window.removeEventListener('resize', debouncedReset)
    }
  }, [])

  if (open) {
    answerStyle.push(styles.open)
    if (height > 0) {
      answerStyle.push(
        css`
          height: ${height}px;
        `
      )
    }
  } else {
    answerStyle.push(
      css`
        height: 0;
      `
    )
  }

  return (
    <div css={styles.question} ref={ref}>
      <a
        className="question-link"
        css={styles.questionLink}
        onClick={() => setOpen(!open)}>
        {question}
        <span css={styles.icon}>{open ? '\u2013' : '+'}</span>
      </a>
      <div css={answerStyle} ref={answerRef}>
        {answer}
      </div>
    </div>
  )
}

const styles = {
  question: css`
    p {
      margin: 0;
    }
    &:not(:first-of-type) .question-link {
      background: white ${theme.pricingBorderHorizontal} top left no-repeat;

      &:active {
        background-color: ${theme.mainBackground};
      }
    }
  `,
  questionLink: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #1f2833 !important;
    padding: 20px;
    background-color: white;
    cursor: pointer;

    &:active {
      background-color: ${theme.mainBackground};
    }
  `,
  icon: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 25px;
    height: 25px;
    border: 1px solid ${theme.primary};
    border-radius: 50%;
    color: ${theme.primary};
    font-size: 20px;
    font-weight: 400;
    margin-left: 10px;
    padding-top: 2px;
  `,
  answer: css`
    position: relative;
    opacity: 0;
    padding: 0 65px 0 20px;
    transition: height 0.2s ${theme.transitionEasing},
      padding-bottom 0.2s ${theme.transitionEasing},
      opacity 0.2s ${theme.transitionEasing};
    overflow: hidden;
  `,
  open: css`
    opacity: 1;
    padding-bottom: 20px;
  `
}
