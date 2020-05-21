import * as theme from '../styles/theme'

import {
  DEFAULT_MEDIA_QUERY,
  DEFAULT_WIDTH,
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_LARGER_DISPLAY_MEDIA_QUERY
} from 'typography-breakpoint-constants'
import { Global, css } from '@emotion/core'
import StickyNav, { StickyNavProps } from './StickyNav'
import { ieBreakpoint, ieBreakpointMinDefault } from '../styles/theme'

import React from 'react'
import { rhythm } from '../styles/typography'

interface Props extends StickyNavProps {
  children: React.ReactNode
  id?: string
  header?: string
  rightContent?: React.ReactNode
}

export default function StickyNavLayout({
  children,
  id,
  header,
  ...props
}: Props) {
  return (
    <div id={id} css={styles.container}>
      <Global
        styles={css`
          html.dark-mode .sticky-nav-wrap {
            background-color: ${theme.stickyNavBackgroundDark};
          }
        `}
      />
      <div css={styles.stickyNavWrap} className="sticky-nav-wrap">
        {header && <h3 css={styles.stickyNavHeader}>{header}</h3>}
        <StickyNav {...props} />
      </div>
      <section className="main-content" css={styles.content}>
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
      grid-template-columns: minmax(300px, 365px) minmax(
          700px,
          ${DEFAULT_WIDTH}
        );
      grid-template-areas: 'sidenav content';
    }

    ${ieBreakpoint} {
      width: 100%;
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
      padding: 0 0 25px 50px;
    }
    ${ieBreakpointMinDefault} {
      padding-bottom: 50px;
    }
  `,
  stickyNavHeader: css`
    padding-left: 45px;
    ${DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  content: css`
    padding: ${rhythm(2)} 20px;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      grid-area: content;
      padding-left: ${rhythm(3)};
      padding-right: ${rhythm(2)};
    }
    ${MIN_LARGER_DISPLAY_MEDIA_QUERY} {
      padding-left: ${rhythm(4)};
    }

    ${ieBreakpoint} {
      width: 100%;
    }
  `
}
