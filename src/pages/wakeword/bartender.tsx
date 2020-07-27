import Layout from '../../components/Layout'
import { PageRendererProps } from 'gatsby'
import React from 'react'
import Wakeword from '../../components/Wakeword'
import SEO from '../../components/SEO'

export default function WakewordBartender({ location }: PageRendererProps) {
  return (
    <Layout location={location}>
      <SEO title="Spokestack - Wakeword Training for Bartender" />
      <Wakeword assistant="spokestack-bartender" />
    </Layout>
  )
}
