import { Global, SerializedStyles, css } from '@emotion/core'

import Footer from './Footer'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import Nav from './Nav'
import React from 'react'
import Sprite from '../svg-sprite.svg'
import globalStyles from '../styles/global.css'
import { ieBreakpoint } from '../styles/theme'
import { WindowLocation } from '@reach/router'

interface Props {
  banner?: React.ReactNode
  children: React.ReactNode
  contentStyle?: SerializedStyles
  extraCss?: SerializedStyles
  location: WindowLocation
  navStyle?: SerializedStyles
}

export default function Layout({
  banner,
  children,
  contentStyle,
  extraCss,
  location,
  navStyle
}: Props) {
  return (
    <>
      {banner}
      <div css={[styles.container, extraCss]}>
        <Global styles={globalStyles} />
        <Sprite />
        <Nav extraCss={navStyle} location={location} />
        <main css={[styles.content, contentStyle]}>{children}</main>
        <Footer />
      </div>
    </>
  )
}

const styles = {
  container: css`
    position: relative;
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
