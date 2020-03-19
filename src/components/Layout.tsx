import { Global, css } from '@emotion/core'
import React, { ReactNode } from 'react'

import Footer from './Footer'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import Nav from './Nav'
import globalStyles from '../utils/globalStyles'
import { ieBreakpoint } from '../utils/theme'
import Sprite from '../../svg-sprite.svg'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div css={styles.container}>
      <Global styles={globalStyles} />
      <Sprite />
      <Nav />
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
    /* Offset for the Nav */
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
