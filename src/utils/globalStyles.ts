import * as theme from './theme'

import { adjustFontSizeTo, rhythm } from './typography'

import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import { css } from '@emotion/core'

export default css`
  html {
    height: 100%;
    min-width: 300px;
    background-color: ${theme.mainBackground};
  }
  :focus {
    outline: ${theme.primary} auto 1px;
  }
  .gatsby-resp-image-link {
    background-image: none;
  }
  h1 a,
  h2 a,
  h3 a,
  h4 a,
  h5 a {
    text-decoration: none;
  }
  pre[class*='language-'] {
    margin: 0 0 ${rhythm(1)};
  }
  code {
    background-color: ${theme.codeBackground};
    padding: ${rhythm(0.1)} ${rhythm(0.2)};
  }
  pre code {
    padding: 0;
  }
  h3 code {
    ${adjustFontSizeTo('30px')};
  }
  .btn {
    position: relative;
    height: 38px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: ${theme.buttonBackground};
    border: 1px solid ${theme.buttonBackground};
    border-radius: 24px;
    padding: 0 ${rhythm(1)};
    white-space: nowrap;
    transition: background-color 0.2s ${theme.transitionEasing},
      border-color 0.2s ${theme.transitionEasing};
    cursor: pointer;
    text-decoration: none;
    color: ${theme.text};
    font-weight: 400;
    user-select: none;

    svg {
      margin-left: ${rhythm(0.2)};
    }

    &:visited {
      color: ${theme.text};
    }
    &:hover:not([disabled]) {
      background-color: ${theme.buttonBackgroundHover};
      border-color: ${theme.buttonBackgroundHover};
      color: ${theme.text};
    }
    &:active:not([disabled]) {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.8);
    }
    &[disabled],
    &.btn-submitting {
      opacity: 0.5;
      cursor: default;
      pointer-events: none;
    }
    &.btn-primary {
      border-color: ${theme.primary};
      background-color: ${theme.primary};
      color: white;

      &:hover:not([disabled]) {
        background-color: ${theme.linkHover};
        border-color: ${theme.linkHover};
        color: white;
      }
    }
    &.btn-large {
      height: 49px;
      padding: 0 ${rhythm(1.8)};
    }
    &.btn-small {
      height: 28px;
      padding: 0 10px;
      ${adjustFontSizeTo('14px')};
    }
  }
  .input-wrap {
    width: 100%;
    display: grid;
    grid-template-columns: 100%;

    &:last-child {
      margin-bottom: 0;
    }

    label {
      text-transform: uppercase;
      margin: 0 0 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
  .input {
    width: 100%;
    border: 1px solid ${theme.mainBorder};
    border-radius: 7px;
    background-color: white;
    padding-left: 20px;
    padding-right: 20px;
  }
  .input,
  .input-value {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .error {
    color: ${theme.error};
  }
  .input.error {
    border-color: ${theme.error};
  }
  .link-with-icon {
    text-decoration: none;

    svg {
      margin-left: ${rhythm(0.2)};
      margin-bottom: -2px;
    }
  }
  .card ul {
    margin-left: 34px;
    margin-bottom: 0;
  }
  .card li:last-child {
    margin-bottom: 0;
  }
  .card li p {
    margin: 0;
  }
  .title {
    font-size: ${adjustFontSizeTo('22px').fontSize};
  }
  ${MIN_DEFAULT_MEDIA_QUERY} {
    h1 {
      font-size: ${adjustFontSizeTo('45px').fontSize};
    }
    h2 {
      font-size: ${adjustFontSizeTo('35px').fontSize};
    }
    h3 {
      font-size: ${adjustFontSizeTo('30px').fontSize};
    }
    h4,
    .title {
      font-size: ${adjustFontSizeTo('25px').fontSize};
    }
    .input-wrap {
      grid-template-columns: 180px 1fr;

      label {
        justify-content: flex-end;
        text-align: right;
        margin: 0 20px 0 0;
      }
    }
  }
`
