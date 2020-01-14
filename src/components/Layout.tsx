import { Global, css } from '@emotion/core'
import React, { ReactNode } from 'react'

import Footer from './Footer'
import Nav from './Nav'
import globalStyles from '../utils/globalStyles'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div css={styles.container}>
      <Global styles={globalStyles} />
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
  `,
  content: css`
    display: flex;
    flex-direction: column;
    display: grid;
    grid-template-columns: 100%;
  `
}
