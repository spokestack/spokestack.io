import { Global, SerializedStyles, css } from '@emotion/core'
import React, { ReactNode } from 'react'

import Footer from './Footer'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import Nav from './Nav'
import Sprite from '../svg-sprite.svg'
import globalStyles from '../styles/globalStyles'
import { ieBreakpoint } from '../styles/theme'

interface Props {
  children: ReactNode
  extraCss?: SerializedStyles
  navStyle?: SerializedStyles
}

export default function Layout({ children, extraCss, navStyle }: Props) {
  return (
    <div css={[styles.container, extraCss]}>
      <Global styles={globalStyles} />
      <Sprite />
      <Nav extraCss={navStyle} />
      <main css={styles.content}>{children}</main>
      <Footer />
    </div>
  )
}

const styles = {
  container: css`
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 100%;
    padding-top: 60px;
  `,
  content: css`
    display: grid;
    grid-template-columns: 100%;
    min-height: 300px;

    ${ieBreakpoint} {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    ${MIN_DEFAULT_MEDIA_QUERY} {
      min-height: calc(100vh - 60px);
    }
  `
}
