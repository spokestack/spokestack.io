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
  ::selection {
    color: ${theme.text};
    background-color: ${theme.primaryLighter};
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
    font-size: 32px;
    line-height: 1.45;
    margin-bottom: 15px;
  }
  h3 {
    font-size: 24px;
    line-height: 1.45;
    margin-bottom: 15px;
  }
  h4 {
    font-size: 1em;
    line-height: 1.45;
    margin-bottom: 15px;
  }
  h5 {
    font-size: 1em;
    margin: 0;
  }
  h6 {
    font-size: 0.8rem;
    font-weight: 400;
    font-style: italic;
    margin-bottom: 15px;
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

    &.link-secondary {
      color: ${theme.linkSecondary};

      .icon {
        fill: ${theme.linkSecondary};
        transition: fill 0.1s ${theme.transitionEasing};
      }

      &:visited {
        color: ${theme.linkSecondaryVisited};

        .icon {
          fill: ${theme.linkSecondaryVisited};
        }
      }
      &:hover {
        color: ${theme.linkSecondaryHover};

        .icon {
          fill: ${theme.linkSecondaryHover};
        }
      }
      &:active {
        color: ${theme.linkSecondaryActive};

        .icon {
          fill: ${theme.linkSecondaryActive};
        }
      }
    }
  }
  .link-with-icon {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  h1 a {
    color: ${theme.text};
  }
  img,
  form {
    margin: 0;
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
    border-left: 6px solid ${theme.primaryLight};
    font-size: 24px;
    margin: 0;
    padding: 5px 20px;

    * {
      margin: 0;
    }
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
  // get gatsby images to show in IE11
  // see https://github.com/gatsbyjs/gatsby/issues/30053
  .object-fit-polyfill[style] {
    position: static !important;
  }
  h1 a,
  h2 a,
  h3 a,
  h4 a,
  h5 a {
    text-decoration: none;
  }
  code[class*='language-'],
  pre[class*='language-'] {
    font-size: 16px;
    tab-size: 2;
  }
  pre[class*='language-'] {
    margin: 0 0 15px;
  }
  code:not(pre > code) {
    background-color: ${theme.codeBackground};
    border: 1px solid ${theme.mainBorder};
    border-radius: 7px;
    font-weight: 600;
    padding: 2px 5px;
  }
  pre code {
    padding: 0;
  }
  div.code-toolbar > .toolbar {
    right: 20px;
  }
  ul {
    margin: 0 0 20px;
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
      color 0.1s ${theme.transitionEasing},
      opacity 0.2s ${theme.transitionEasing};

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
      font-size: 14px;
      height: 37px;
    }
    &.btn-wide {
      font-size: 14px;

      ${theme.MIN_DEFAULT_MEDIA_QUERY} {
        min-width: 155px;
      }
    }
    &.btn-full {
      width: 100%;
    }
    &.btn-link {
      background: none;
      border: none;
      border-radius: 0;
      color: ${theme.primary};
      padding: 5px 10px;
      height: auto;

      &:hover:not([disabled]),
      &:active:not([disabled]),
      &.btn-submitting {
        background: none;
        border: none;
        color: ${theme.primaryDark};
      }
    }
  }
  .input-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
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
  input[readonly]:focus {
    outline: 0;
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
  .main-content {
    table {
      margin-bottom: 20px;
      border-spacing: 0;
    }
    th,
    td {
      text-align: left;
      padding-left: 10px;
      padding-right: 10px;
      border-top: 1px solid ${theme.mainBorder};
      border-left: 1px solid ${theme.mainBorder};
    }
    tr:last-of-type td {
      border-bottom: 1px solid ${theme.mainBorder};
    }
    th:last-of-type,
    td:last-of-type {
      border-right: 1px solid ${theme.mainBorder};
    }
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 15px;
    }
  }
  .columns {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .columns-mobile {
    display: flex;
    flex-direction: row;
    width: 100%;

    .column-half {
      width: calc(50% - 12.5px);

      &:first-of-type {
        margin-right: 25px;
      }
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
      .icon {
        fill: ${theme.textDarkBg};
      }
      &:hover {
        color: ${theme.linkDarkHover};

        .icon {
          fill: ${theme.linkDarkHover};
        }
      }
      &:active {
        color: ${theme.linkDarkActive};

        .icon {
          fill: ${theme.linkDarkActive};
        }
      }
    }
    .main-content a:not(.btn),
    a.content-link,
    .privacy-text a {
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
    .btn {
      background-color: ${theme.buttonBackgroundDark};
      border-color: ${theme.buttonBackgroundDark};

      &,
      &:visited {
        color: ${theme.text};
      }

      .icon {
        fill: ${theme.text};
      }

      &:hover:not([disabled]),
      &:active:not([disabled]),
      &.btn-submitting {
        background-color: ${theme.buttonBackgroundDarkHover};
        border-color: ${theme.buttonBackgroundDarkHover};
        color: ${theme.textDarkBg};
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
    .blue {
      color: ${theme.primaryLight} !important;
    }
    .select-label {
      background-color: ${theme.stickyNavBackgroundDark};
      color: ${theme.textDarkBg};
    }
    .main-content {
      td,
      th {
        border-color: ${theme.mainBorderDark};
      }
      tr:nth-of-type(2n) {
        background-color: ${theme.navFullColumnDark};
      }
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
    .columns {
      flex-direction: row;

      .column-half {
        width: calc(50% - 12.5px);

        &:first-of-type {
          margin-right: 25px;
        }
      }
      .column-third {
        width: calc(33% - ${40 / 3}px);

        &:nth-last-of-type(n + 2) {
          margin-right: 20px;
        }
      }
    }
    .input-wrap {
      flex-direction: row;
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
    h3 {
      width: 100%;
    }

    .input-wrap label {
      width: 180px;
    }
  }
`
