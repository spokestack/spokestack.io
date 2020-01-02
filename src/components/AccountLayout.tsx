import Layout from './Layout'
import React from 'react'
import { StickyLink } from '../types'
import StickyNavLayout from './StickyNavLayout'
import { WindowLocation } from '@reach/router'

const links: StickyLink[] = [
  {
    href: '/account/settings/#profile',
    title: 'My Profile',
    refSelector: '#profile',
    section: 'Settings'
  },
  {
    href: '/account/settings/#api',
    title: 'API Credentials',
    refSelector: '#api',
    section: 'Settings'
  },
  {
    href: '/account/billing/#details',
    title: 'Billing',
    refSelector: '#details',
    section: 'Billing'
  }
]

interface Props {
  children: React.ReactNode
  selectFirst?: boolean
  location?: WindowLocation
}

export default function AccountLayout({ children, location, selectFirst }: Props) {
  links[0].forceSelect = selectFirst
  return (
    <Layout>
      <StickyNavLayout matchHash header="Account" links={links} location={location}>
        {children}
      </StickyNavLayout>
    </Layout>
  )
}
