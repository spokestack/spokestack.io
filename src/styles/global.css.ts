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
  h1 a {
    color: ${theme.text};
  }
  a {
    transition: color 0.1s ${theme.transitionEasing},
      text-decoration-color 0.1s ${theme.transitionEasing};
  }
  img {
    margin: 0;
  }
  blockquote {
    color: hsl(0, 0%, 40%);
  }
  .title {
    font-size: ${adjustFontSizeTo('20px').fontSize};
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
    white-space: nowrap;
    cursor: pointer;
    text-decoration: none;
    font-weight: 300;
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
      ${adjustFontSizeTo('14px')};
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

    ${MIN_DEFAULT_MEDIA_QUERY} {
      font-size: 1rem;
    }
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
  .docs-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: ${rhythm(1)};

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
  }
  ${MIN_DEFAULT_MEDIA_QUERY} {
    h1 {
      font-size: ${adjustFontSizeTo('54px').fontSize};
    }
    h2 {
      font-size: ${adjustFontSizeTo('42px').fontSize};
    }
    h3 {
      font-size: ${adjustFontSizeTo('32px').fontSize};
    }
    h4,
    .title {
      font-size: ${adjustFontSizeTo('24px').fontSize};
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
