import Layout from '../../components/Layout'
import { PageRendererProps } from 'gatsby'
import React from 'react'
import Wakeword from '../../components/Wakeword'
import SEO from '../../components/SEO'

export default function WakewordDealMachine({ location }: PageRendererProps) {
  return (
    <Layout location={location}>
      <SEO title="Spokestack - Wakeword Training for Deal Machine" />
      <Wakeword assistant="deal-machine" />
    </Layout>
  )
}
