import * as theme from '../styles/theme'

import { Global, css } from '@emotion/react'
import StickyNav, { StickyLink, StickyNavProps } from './StickyNav'

import React from 'react'

export type { StickyLink }

interface Props extends StickyNavProps {
  children: React.ReactNode
  id?: string
  header?: string
  rightContent?: React.ReactNode
}

export default function StickyNavLayout({ children, id, ...props }: Props) {
  return (
    <div id={id} css={styles.container} className="ie-fix">
      <Global
        styles={css`
          html.dark-mode .sticky-nav-wrap {
            background-color: ${theme.stickyNavBackgroundDark};
          }
        `}
      />
      <div css={styles.stickyNavWrap} className="sticky-nav-wrap">
        <StickyNav {...props} />
      </div>
      <section className="main-content ie-fix" css={styles.content}>
        <div css={styles.contentWrap}>{children}</div>
      </section>
    </div>
  )
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    width: 100%;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      display: grid;
      grid-template-columns:
        minmax(${theme.MIN_SIDEBAR_WIDTH}, ${theme.MAX_SIDEBAR_WIDTH})
        1fr;
      grid-template-areas: 'sidenav content';
    }

    ${theme.MIN_LARGER_DISPLAY_MEDIA_QUERY} {
      grid-template-columns:
        minmax(${theme.MIN_SIDEBAR_WIDTH}, ${theme.MAX_SIDEBAR_WIDTH})
        1fr
        minmax(${theme.MIN_SIDEBAR_WIDTH}, ${theme.MAX_SIDEBAR_WIDTH});
    }
  `,
  mobileNav: css`
    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  stickyNavWrap: css`
    background-color: ${theme.stickyNavBackground};
    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      grid-area: sidenav;
      padding-left: 30px;
    }
    ${theme.MIN_LARGER_DISPLAY_MEDIA_QUERY} {
      padding-left: 100px;
    }
    ${theme.ieBreakpointMinDefault} {
      padding-bottom: 50px;
    }
  `,
  content: css`
    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      grid-area: content;
      overflow: hidden;
    }
  `,
  contentWrap: css`
    padding: 30px 20px;
    max-width: ${theme.MAX_TEXT_WIDTH};
    margin: 0 auto;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      padding-left: 50px;
      padding-right: 30px;
    }
    ${theme.MIN_LARGER_DISPLAY_MEDIA_QUERY} {
      padding-left: 70px;
    }
  `
}
