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
    href: '/account/services/nlu',
    title: 'Language Understanding',
    section: 'Services'
  },
  {
    href: '/account/services/tts',
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

if (process.env.NODE_ENV !== 'production') {
  links.push({
    href: '/account/graphql',
    title: 'Spokestack API GraphiQL',
    section: 'Developers'
  })
}

interface Props {
  children: React.ReactNode
  location?: WindowLocation
}

export default function AccountLayout({ children, location }: Props) {
  return (
    <Layout location={location}>
      <StickyNavLayout links={links} location={location}>
        {children}
      </StickyNavLayout>
    </Layout>
  )
}
