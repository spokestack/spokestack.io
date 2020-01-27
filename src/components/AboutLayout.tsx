import Layout from './Layout'
import React from 'react'
import SEO from './SEO'
import StickyNavLayout from './StickyNavLayout'

const links = [
  {
    href: '/about/story/',
    title: 'Story'
  },
  {
    href: '/about/team/',
    title: 'Team'
  }
]

interface Props {
  children: React.ReactNode
}

export default function About({ children }: Props) {
  return (
    <Layout>
      <SEO
        title="About us"
        description="About our team"
        keywords={[
          'spokestack',
          'about',
          'our story',
          'voice',
          'artificial intelligence'
        ]}
      />
      <StickyNavLayout header="About" links={links}>
        {children}
      </StickyNavLayout>
    </Layout>
  )
}
