import * as theme from './theme'

import { css } from '@emotion/react'

export default css`
  html {
    height: 100%;
    min-width: 300px;
    box-sizing: border-box;
    overflow-y: scroll;
    background-color: ${theme.mainBackground};
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }
  * {
    box-sizing: inherit;
  }
  body {
    font: 400 18px/1.45 Roboto, Georgia, sans-serif;
    color: ${theme.text};
    letter-spacing: 0.03em;
    margin: 0;
  }
  p {
    margin-top: 0;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    font: inherit;
    margin: 0;
  }
  button,
  select {
    text-transform: none;
  }
  button,
  input {
    overflow: visible;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    color: ${theme.header};
    font-weight: 700;
  }
  h1 {
    font-size: 42px;
    margin-bottom: 15px;
  }
  h2 {
    font-size: 28px;
    line-height: 1.45;
    margin: 15px 0;
  }
  h3 {
    font-size: 26px;
    line-height: 1.45;
    margin: 15px 0;
  }
  h4 {
    font-size: 24px;
    line-height: 1.45;
    margin: 15px 0;
  }
  h5 {
    font-size: 1rem;
    margin: 15px 0;
  }
  h6 {
    font-size: 0.8rem;
    font-weight: 400;
    font-style: italic;
    margin: 15px 0;
  }
  a {
    color: ${theme.link};
    font-weight: 700;
    text-decoration: none;
    text-decoration-color: ${theme.link};
    text-decoration-thickness: 0.1em;
    text-underline-offset: 2px;
    transition: color 0.1s ${theme.transitionEasing},
      text-decoration-color 0.1s ${theme.transitionEasing};

    &:visited {
      color: ${theme.linkVisited};
      text-decoration-color: ${theme.linkVisited};
    }
    &:hover {
      color: ${theme.linkHover};
      text-decoration-color: ${theme.linkHover};
    }
    &:active {
      color: ${theme.linkActive};
      text-decoration-color: ${theme.linkActive};
    }
  }
  h1 a {
    color: ${theme.text};
  }
  img,
  form {
    margin: 0;
  }
  td,
  th,
  th:first-of-tyoe,
  td:first-of-tyoe,
  th:last-of-type,
  td:last-of-type {
    padding-left: 10px;
    padding-right: 10px;
  }
  figcaption {
    font-size: 0.9rem;
    font-style: italic;
    padding-left: 5px;
    padding-right: 5px;
    margin: 0 auto;
    text-align: center;
  }
  blockquote {
    color: hsl(0, 0%, 40%);
    border-left: 6px solid ${theme.primaryLight};
    font-style: italic;
    margin-left: -15px;
    padding: 5px 10px;
  }
  blockquote * {
    margin: 0;
  }
  .title {
    font-size: 20px;
  }
  .blue {
    color: ${theme.primary} !important;
  }
  .yellow {
    color: ${theme.yellow};
  }
  .select-label {
    background-color: white;
    color: ${theme.header};
  }
  :focus {
    outline: ${theme.primary} auto 3px;
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
    margin: 0 0 15px;
  }
  code {
    background-color: ${theme.codeBackground};
    padding: 2px 3px;
  }
  pre code {
    padding: 0;
  }
  ul {
    margin: 0;
  }
  li *:last-child {
    margin-bottom: 0;
  }
  h3 code {
    font-size: 30px;
  }
  tr:nth-of-type(2n) {
    background-color: ${theme.codeBackground};
  }
  .btn {
    position: relative;
    height: 44px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: ${theme.buttonBackground};
    border: 1px solid ${theme.buttonBackground};
    border-radius: 24px;
    padding: 0 20px;
    font-weight: 400;
    white-space: nowrap;
    cursor: pointer;
    text-decoration: none;
    user-select: none;
    transition: background-color 0.1s ${theme.transitionEasing},
      border-color 0.1s ${theme.transitionEasing},
      color 0.1s ${theme.transitionEasing};

    .icon {
      fill: ${theme.textDarkBg};
      transition: fill 0.1s ${theme.transitionEasing};
    }

    &,
    &:visited {
      color: ${theme.textDarkBg};
    }
    &:hover:not([disabled]),
    &:active:not([disabled]) {
      background-color: ${theme.buttonBackgroundHover};
      border-color: ${theme.buttonBackgroundHover};
      color: ${theme.textDarkBg};

      .icon {
        fill: ${theme.textDarkBg};
      }
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
    &.btn-transparent {
      background-color: transparent;
      border-color: ${theme.primary};
      color: ${theme.primary};

      .icon {
        fill: ${theme.primary};
      }

      &:hover:not([disabled]),
      &:active:not([disabled]),
      &.btn-submitting {
        background-color: ${theme.primary};
        border-color: ${theme.primary};
        color: white;

        .icon {
          fill: white;
        }
      }
    }
    &.btn-secondary {
      background-color: ${theme.secondary};
      border-color: ${theme.secondary};
      color: ${theme.text};

      .icon {
        fill: ${theme.text};
      }

      &:hover:not([disabled]),
      &:active:not([disabled]),
      &.btn-submitting {
        background-color: ${theme.linkSecondaryHover};
        border-color: ${theme.linkSecondaryHover};
        color: ${theme.text};

        .icon {
          fill: ${theme.text};
        }
      }
    }
    &.btn-secondary.btn-transparent {
      background-color: transparent;
      border-color: ${theme.secondary};
      color: ${theme.secondary};

      .icon {
        fill: ${theme.secondary};
      }

      &:hover:not([disabled]),
      &:active:not([disabled]),
      &.btn-submitting {
        background-color: ${theme.linkSecondaryHover};
        border-color: ${theme.linkSecondaryHover};
        color: ${theme.primary};

        .icon {
          fill: ${theme.primary};
        }
      }
    }
    &.btn-large {
      height: 49px;
    }
    &.btn-small {
      height: 33px;
      padding: 1px 15px 0;
      font-size: 14px;
      font-weight: 600;
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
    &.input {
      border-color: ${theme.error};
    }
  }
  .label {
    font-size: 0.8rem;
    font-weight: 700;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      font-size: 1rem;
    }
  }
  .link-with-icon {
    text-decoration: none;

    svg {
      margin-left: 3px;
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
  .docs-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 15px;

    h2 {
      margin: 0;
      padding-right: 20px;
    }
  }
  .floating-image--left,
  .floating-image--right {
    margin: 20px auto;
  }
  html.dark-mode {
    background-color: ${theme.mainBackgroundDark};

    body,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    a,
    a:visited,
    h1 a,
    .main-content h1 a {
      color: ${theme.textDarkBg};
    }
    a {
      &:hover {
        color: ${theme.linkDarkHover};
      }
      &:active {
        color: ${theme.linkDarkActive};
      }
    }
    .btn {
      background-color: ${theme.buttonBackgroundDark};
      border-color: ${theme.buttonBackgroundDark};
      color: ${theme.text};

      &:hover:not([disabled]),
      &:active:not([disabled]),
      &.btn-submitting {
        background-color: ${theme.buttonBackgroundDarkHover};
        border-color: ${theme.buttonBackgroundDarkHover};
      }

      &.btn-transparent {
        background-color: transparent;
        border-color: ${theme.buttonBackgroundDark};
        color: ${theme.buttonBackgroundDark};

        .icon {
          fill: ${theme.buttonBackgroundDark};
        }

        &:hover:not([disabled]),
        &:active:not([disabled]),
        &.btn-submitting {
          background-color: ${theme.buttonBackgroundDark};
          border-color: ${theme.buttonBackgroundDark};
          color: ${theme.text};

          .icon {
            fill: ${theme.text};
          }
        }
      }
    }
    blockquote {
      color: hsl(0, 0%, 80%);
      border-left-color: hsl(0, 0%, 80%);
      padding-left: 20px;
      margin-left: 0;
    }
    .main-content a,
    a.content-link,
    a.library-link {
      color: ${theme.linkDark};
      text-decoration-color: ${theme.linkDark};

      &:hover {
        color: ${theme.linkDarkHover};
        text-decoration-color: ${theme.linkDarkHover};
      }
      &:active {
        color: ${theme.linkDarkActive};
        text-decoration-color: ${theme.linkDarkActive};
      }
    }
    .blue {
      color: ${theme.primaryLight} !important;
    }
    .select-label {
      background-color: ${theme.stickyNavBackgroundDark};
      color: ${theme.textDarkBg};
    }
    td,
    th {
      border-bottom-color: ${theme.mainBorderDark};
    }
    tr:nth-of-type(2n) {
      background-color: ${theme.navFullColumnDark};
    }
  }
  ${theme.MIN_DEFAULT_MEDIA_QUERY} {
    h1 {
      font-size: 54px;
    }
    h2 {
      font-size: 42px;
    }
    h3 {
      font-size: 32px;
    }
    h4,
    .title {
      font-size: 24px;
    }
    .input-wrap {
      grid-template-columns: 180px 1fr;

      label {
        justify-content: flex-end;
        text-align: right;
        margin: 0 20px 0 0;
      }
    }
    .floating-image--left {
      float: left;
      margin-right: 20px;
    }
    .floating-image--right {
      float: right;
      margin-left: 20px;
    }
    .floating-image--left,
    .floating-image--right {
      clear: both;
      margin-bottom: 20px;
    }
  }

  ${theme.ieBreakpoint} {
    .ie-fix,
    .title,
    p,
    h1,
    h2,
    h3,
    h4,
    h5 {
      width: 100%;
    }
  }
`
