import { css } from '@emotion/react'
import React from 'react'
import * as theme from '../styles/theme'

interface Props {
  title: string
  href: string
}

export default function YouTubeLink({ title, href }: Props) {
  return (
    <a href={href} css={styles.link}>
      <img alt="YouTube Logo" src="/youtube.svg" width="72" height="50" />
      {title}
    </a>
  )
}

const styles = {
  link: css`
    width: max-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: white;
    border: 1px solid ${theme.mainBorder};
    border-radius: 7px;
    padding: 20px;
    font-weight: 400;
    margin: 0 auto;

    &,
    &:visited {
      color: ${theme.text};
    }

    &:hover {
      background-color: ${theme.mainBackground};
    }

    &:active {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
    }

    img {
      display: block;
      margin-right: 20px;
    }
  `
}
