import Layout from './Layout'
import React from 'react'
import { StickyLink } from '../types'
import StickyNavLayout from './StickyNavLayout'
import { WindowLocation } from '@reach/router'

const links: StickyLink[] = [
  {
    href: '/account/settings/#general',
    title: 'General',
    refSelector: '#general',
    section: 'Settings'
  },
  {
    href: '/account/settings/#api',
    title: 'API Credentials',
    refSelector: '#api',
    section: 'Settings'
  },
  {
    href: '/account/settings/#voices',
    title: 'Sample Voices',
    refSelector: '#voices',
    section: 'Settings'
  }
  // {
  //   href: '/account/billing/#details',
  //   title: 'Billing',
  //   refSelector: '#details',
  //   section: 'Billing'
  // }
]

interface Props {
  children: React.ReactNode
  location?: WindowLocation
  title: string
}

export default function AccountLayout({ children, location, title }: Props) {
  return (
    <Layout>
      <StickyNavLayout
        matchHash
        header={title}
        links={links}
        location={location}>
        {children}
      </StickyNavLayout>
    </Layout>
  )
}
