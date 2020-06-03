import Layout from './Layout'
import React from 'react'
import SEO from './SEO'
import StickyNavLayout from './StickyNavLayout'
import { WindowLocation } from '@reach/router'

const links = [
  {
    href: '/about/story',
    title: 'Story'
  },
  {
    href: '/about/team',
    title: 'Team'
  }
]

interface Props {
  children: React.ReactNode
  location: WindowLocation
}

export default function About({ children, location }: Props) {
  return (
    <Layout>
      <SEO
        title="About us"
        longTitle="Learn about our company"
        description="About our team"
      />
      <StickyNavLayout links={links} location={location}>
        {children}
      </StickyNavLayout>
    </Layout>
  )
}
