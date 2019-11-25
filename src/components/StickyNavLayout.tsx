import {
  DEFAULT_MEDIA_QUERY,
  DEFAULT_WIDTH,
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_LARGER_DISPLAY_MEDIA_QUERY
} from 'typography-breakpoint-constants'
import StickyNav, { StickyNavProps } from './StickyNav'

import React from 'react'
import { css } from '@emotion/core'
import { rhythm } from '../utils/typography'

interface Props extends StickyNavProps {
  children: React.ReactNode
  id?: string
  header?: string
  rightContent?: React.ReactNode
}

export default function StickyNavLayout({ children, id, header, rightContent, ...props }: Props) {
  const style = [styles.container]
  if (rightContent) {
    style.push(styles.containerWithRight)
  }
  return (
    <div id={id} css={style}>
      <div css={styles.stickyNavWrap}>
        {header && <h3 css={styles.stickyNavHeader}>{header}</h3>}
        <StickyNav {...props} />
      </div>
      <section css={styles.content}>{children}</section>
      {rightContent}
    </div>
  )
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      display: grid;
      grid-template-columns: minmax(250px, 365px) minmax(700px, ${DEFAULT_WIDTH});
      grid-template-areas:
        'sidenav content'
        'sidenav author';
    }
  `,
  containerWithRight: css`
    ${MIN_LARGER_DISPLAY_MEDIA_QUERY} {
      grid-template-columns: 365px minmax(700px, ${DEFAULT_WIDTH}) 1fr;
      grid-template-areas: 'sidenav content author';
    }
  `,
  mobileNav: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  stickyNavWrap: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      grid-area: sidenav;
      background-color: white;
      padding: 25px 0 0 50px;
    }
  `,
  stickyNavHeader: css`
    padding-left: 45px;
    ${DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  content: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      grid-area: content;
      padding-left: ${rhythm(3)};
      padding-right: ${rhythm(2)};
    }
    ${MIN_LARGER_DISPLAY_MEDIA_QUERY} {
      padding-left: ${rhythm(4)};
    }
  `
}
