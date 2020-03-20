import * as theme from '../utils/theme'

import React, { useEffect, useState } from 'react'
import { getDarkModePref, setDarkModePref } from '../utils/auth'

import { css } from '@emotion/core'

export default function DarkModeButton() {
  const [dark, setDark] = useState(getDarkModePref())

  function toggleDarkMode() {
    const html = document.querySelector('html')
    if (!html) {
      return
    }
    const newDark = !dark
    setDark(newDark)
    setDarkModePref(newDark)
    html.classList[newDark ? 'add' : 'remove']('dark-mode')
  }

  useEffect(() => {
    setDark(getDarkModePref())
  }, [])

  return (
    <button css={styles.button} onClick={toggleDarkMode}>
      <div
        css={styles.track}
        style={{
          backgroundColor: dark ? theme.codeBackground : theme.mainBorder
        }}
      />
      <div
        css={styles.knob}
        style={{
          transform: `translateX(${dark ? '12px' : '0'})`,
          boxShadow: `0 0 0 1px ${
            dark ? theme.codeBackground : theme.mainBorder
          }`,
          backgroundColor: dark
            ? theme.mainBackgroundDark
            : theme.mainBackground
        }}>
        <div
          css={[styles.icon, styles.lightIcon]}
          style={{ opacity: dark ? 0 : 1 }}>
          <svg
            style={{ width: '12px', height: '12px' }}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M3.828 5.243L2.343 3.757a1 1 0 0 1 1.414-1.414l1.486 1.485a5.027 5.027 0 0 0-1.415 1.415zM7 3.1V1a1 1 0 1 1 2 0v2.1a5.023 5.023 0 0 0-2 0zm3.757.728l1.486-1.485a1 1 0 1 1 1.414 1.414l-1.485 1.486a5.027 5.027 0 0 0-1.415-1.415zM12.9 7H15a1 1 0 0 1 0 2h-2.1a5.023 5.023 0 0 0 0-2zm-.728 3.757l1.485 1.486a1 1 0 1 1-1.414 1.414l-1.486-1.485a5.027 5.027 0 0 0 1.415-1.415zM9 12.9V15a1 1 0 0 1-2 0v-2.1a5.023 5.023 0 0 0 2 0zm-3.757-.728l-1.486 1.485a1 1 0 0 1-1.414-1.414l1.485-1.486a5.027 5.027 0 0 0 1.415 1.415zM3.1 9H1a1 1 0 1 1 0-2h2.1a5.023 5.023 0 0 0 0 2zM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
          </svg>
        </div>
        <div
          css={[styles.icon, styles.darkIcon]}
          style={{ opacity: dark ? 1 : 0 }}>
          <svg
            style={{ width: '12px', height: '12px' }}
            viewBox="0 0 17 16"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M7.914 0a6.874 6.874 0 0 0-1.26 3.972c0 3.875 3.213 7.017 7.178 7.017.943 0 1.843-.178 2.668-.5C15.423 13.688 12.34 16 8.704 16 4.174 16 .5 12.41.5 7.982.5 3.814 3.754.389 7.914 0z"></path>
          </svg>
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
    width: 30px;
    flex-shrink: 0;
  `,
  track: css`
    position: absolute;
    top: 3px;
    left: 0;
    right: 0;
    height: 12px;
    border-radius: 16px;
    transition: background-color 0.1s ${theme.transitionEasing};
  `,
  knob: css`
    position: relative;
    width: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: transform 0.1s ${theme.transitionEasing};
  `,
  icon: css`
    position: absolute;
    display: flex;
    transition: opacity 0.1s ${theme.transitionEasing};

    svg {
      fill: currentColor;
    }
  `,
  lightIcon: css`
    color: ${theme.primary};
  `,
  darkIcon: css`
    color: ${theme.textDarkBg};
  `
}
