import { DEFAULT_MEDIA_QUERY, MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import StickyNav, { StickyNavProps } from './StickyNav'

import React from 'react'
import { css } from '@emotion/core'
import { rhythm } from '../utils/typography'

interface Props extends StickyNavProps {
  children: React.ReactNode
  rightContent?: React.ReactNode
}

export default function StickyNavLayout({ children, rightContent, ...props }: Props) {
  const style = [styles.container]
  if (rightContent) {
    style.push(styles.containerWithRight)
  }
  return (
    <div css={style}>
      <div css={styles.stickyNavWrap}>
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
      grid-template-columns: 365px 1fr;
    }
  `,
  containerWithRight: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      grid-template-columns: 365px 1fr 285px;
    }
  `,
  stickyNavWrap: css`
    background-color: white;
    padding: 25px 0 0 50px;
    ${DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  content: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding-left: ${rhythm(4)};
    }
  `
}
