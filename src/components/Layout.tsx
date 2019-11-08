import React, { ReactNode } from 'react'

import Footer from './Footer'
import { Global } from '@emotion/core'
import Nav from './Nav'
import globalStyles from '../utils/globalStyles'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Global styles={globalStyles} />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
