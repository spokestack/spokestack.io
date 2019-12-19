import Layout from './Layout'
import React from 'react'
import { StickyLink } from '../types'
import StickyNavLayout from './StickyNavLayout'

const links: StickyLink[] = [
  {
    href: '/account/settings/',
    title: 'Settings'
  },
  {
    href: '/account/billing/',
    title: 'Billing'
  }
]

interface Props {
  children: React.ReactNode
  selectFirst?: boolean
}

export default function AccountLayout({ children, selectFirst }: Props) {
  if (selectFirst) {
    links[0].forceSelect = true
  }
  return (
    <Layout>
      <StickyNavLayout header="Account" links={links}>
        {children}
      </StickyNavLayout>
    </Layout>
  )
}
