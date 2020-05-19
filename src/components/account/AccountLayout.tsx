import Layout from '../Layout'
import React from 'react'
import { StickyLink } from '../../types'
import StickyNavLayout from '../StickyNavLayout'
import { WindowLocation } from '@reach/router'

const links: StickyLink[] = [
  {
    href: '/account/settings/#general',
    matchHash: true,
    title: 'General',
    refSelector: '#general',
    section: 'Settings'
  },
  {
    href: '/account/settings/#api',
    matchHash: true,
    title: 'API Credentials',
    refSelector: '#api',
    section: 'Settings'
  },
  {
    href: '/account/services/text-to-speech',
    title: 'Text to Speech',
    section: 'Services'
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
      <StickyNavLayout header={title} links={links} location={location}>
        {children}
      </StickyNavLayout>
    </Layout>
  )
}
