import React, { ReactNode } from 'react'
import Wrapper from './Wrapper'
// import Footer from './Footer'
import Nav from './Nav'
import { Global } from '@emotion/core'
import globalStyles from '../utils/globalStyles'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Global styles={globalStyles} />
      <Nav />
      <Wrapper>
        <main>{children}</main>
      </Wrapper>
      {/* <Footer /> */}
    </>
  )
}
