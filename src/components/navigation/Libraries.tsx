import React from 'react'
import SVGIcon from '../SVGIcon'
import { css } from '@emotion/react'

export default function Libraries() {
  return (
    <div css={styles.libraries}>
      <div css={styles.libraryColumn}>
        <a
          css={styles.libraryLink}
          href="https://github.com/spokestack/spokestack-ios"
        >
          <SVGIcon icon="#ios" className="icon" />
          iOS
        </a>
        <a
          css={styles.libraryLink}
          href="https://github.com/spokestack/spokestack-android"
        >
          <SVGIcon icon="#android" className="icon" />
          Android
        </a>
        <a
          css={styles.libraryLink}
          href="https://github.com/spokestack/spokestack-python"
        >
          <SVGIcon icon="#python" className="icon" />
          Python
        </a>
      </div>
      <div css={styles.libraryColumn}>
        <a
          css={styles.libraryLink}
          href="https://github.com/spokestack/react-native-spokestack"
        >
          <SVGIcon icon="#react-native" className="icon" />
          React Native
        </a>
        <a
          css={styles.libraryLink}
          href="https://github.com/spokestack/node-spokestack"
        >
          <SVGIcon icon="#node" className="icon" />
          Node
        </a>
      </div>
    </div>
  )
}

const styles = {
  libraries: css`
    display: flex;
    flex-direction: row;
  `,
  libraryColumn: css`
    display: flex;
    flex-direction: column;
  `,
  libraryLink: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    height: 34px;
    width: 170px;
    padding: 0 5px;
    border-radius: 7px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    &:active {
      background-color: rgba(0, 0, 0, 0.2);
    }

    .icon {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  `
}
