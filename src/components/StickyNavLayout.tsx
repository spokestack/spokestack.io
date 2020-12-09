import * as theme from '../styles/theme'

import { Global, css } from '@emotion/react'
import {
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_LARGER_DISPLAY_MEDIA_QUERY,
  MIN_LARGE_DISPLAY_MEDIA_QUERY,
  TABLET_WIDTH,
  ieBreakpointMinDefault
} from '../styles/theme'
import StickyNav, { StickyNavProps } from './StickyNav'

import React from 'react'

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
        {children}
      </section>
    </div>
  )
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      display: grid;
      grid-template-columns:
        minmax(${theme.MIN_SIDEBAR_WIDTH}, ${theme.MAX_SIDEBAR_WIDTH})
        minmax(${theme.MAX_TEXT_WIDTH}, ${TABLET_WIDTH});
      grid-template-areas: 'sidenav content';
    }
  `,
  mobileNav: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  stickyNavWrap: css`
    background-color: ${theme.stickyNavBackground};
    ${MIN_DEFAULT_MEDIA_QUERY} {
      grid-area: sidenav;
      padding: 0 0 25px 25px;
    }
    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      padding-left: 50px;
    }
    ${ieBreakpointMinDefault} {
      padding-bottom: 50px;
    }
  `,
  content: css`
    padding: 30px 20px;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      grid-area: content;
      padding-left: 50px;
      padding-right: 30px;
    }
    ${MIN_LARGER_DISPLAY_MEDIA_QUERY} {
      padding-left: 70px;
    }
  `
}
