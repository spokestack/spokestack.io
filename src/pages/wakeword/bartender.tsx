import Layout from '../../components/Layout'
import { PageRendererProps } from 'gatsby'
import React from 'react'
import Wakeword from '../../components/Wakeword'

export default function WakewordBartender({ location }: PageRendererProps) {
  return (
    <Layout location={location}>
      <Wakeword
        assistant="spokestack-bartender"
        wakewords={['Hey bartender', 'Bartender']}
      />
    </Layout>
  )
}
