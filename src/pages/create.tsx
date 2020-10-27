import Login from '../components/Login'
import { PageRendererProps } from 'gatsby'
import React from 'react'
import SEO from '../components/SEO'

export default function createPage({ location }: PageRendererProps) {
  return (
    <Login
      isCreate
      header="Create a free account, no credit card required"
      location={location}>
      <SEO
        title="Create a Free Voice App Developer Account | Spokestack"
        description="Create a free account — no credit card required. Get access to Spokestack's API training and support resources for VUI, NLU, TTS, and more."
      />
    </Login>
  )
}
