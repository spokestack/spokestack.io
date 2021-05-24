import * as theme from '../styles/theme'

import { Global, SerializedStyles, css } from '@emotion/react'
import React, { Fragment } from 'react'

import Footer from './Footer'
import Nav from './navigation/Nav'
import Sprite from '../svg-sprite.svg'
import globalStyles from '../styles/global.css'

interface Props {
  banner?: React.ReactNode
  children: React.ReactNode
  contentStyle?: SerializedStyles | SerializedStyles[]
  extraCss?: SerializedStyles | SerializedStyles[]
  navStyle?: SerializedStyles | SerializedStyles[]
}

export default function Layout({
  banner,
  children,
  contentStyle,
  extraCss,
  navStyle
}: Props) {
  const style = [styles.container]
  const navStyles = []
  const navContentStyles = []
  if (banner) {
    style.push(css`
      top: 40px;
    `)
    const navPushStyle = css`
      ${theme.DEFAULT_MEDIA_QUERY} {
        top: 80px;
      }
    `
    navStyles.push(navPushStyle)
    navContentStyles.push(navPushStyle)
  }

  return (
    <Fragment>
      {banner}
      <div css={style.concat(extraCss!)}>
        <Global styles={globalStyles} />
        <Sprite />
        <Nav
          extraCss={navStyles.concat(navStyle!)}
          contentCss={navContentStyles}
        />
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

    ${theme.ieBreakpoint} {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `
}
