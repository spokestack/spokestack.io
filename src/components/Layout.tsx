import { Global, SerializedStyles, css } from '@emotion/react'
import { MIN_DEFAULT_MEDIA_QUERY, ieBreakpoint } from '../styles/theme'
import React, { Fragment } from 'react'

import Footer from './Footer'
import Nav from './Nav'
import Sprite from '../svg-sprite.svg'
import { WindowLocation } from '@reach/router'
import globalStyles from '../styles/global.css'

interface Props {
  banner?: React.ReactNode
  children: React.ReactNode
  contentStyle?: SerializedStyles | SerializedStyles[]
  extraCss?: SerializedStyles | SerializedStyles[]
  location: WindowLocation
  navStyle?: SerializedStyles | SerializedStyles[]
}

export default function Layout({
  banner,
  children,
  contentStyle,
  extraCss,
  location,
  navStyle
}: Props) {
  const style = [styles.container]
  if (banner) {
    style.push(css`
      top: 40px;
    `)
  }

  return (
    <Fragment>
      {banner}
      <div css={style.concat(extraCss!)}>
        <Global styles={globalStyles} />
        <Sprite />
        <Nav extraCss={navStyle} location={location} />
        <main css={[styles.content].concat(contentStyle!)}>{children}</main>
        <Footer />
      </div>
    </Fragment>
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
    grid-template-rows: max-content;
    min-height: 300px;
    position: relative;

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
