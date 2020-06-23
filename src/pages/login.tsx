import Login from '../components/Login'
import { PageRendererProps } from 'gatsby'
import React from 'react'
import SEO from '../components/SEO'

export default function createPage({ location }: PageRendererProps) {
  return (
    <Login header="Sign in" location={location}>
      <SEO
        title="Sign In — Spokestack"
        description="Log in to Spokestack to access our voice assistant developer API, access our on-device NLU engine, see our library of TTS voices, get support, and more."
      />
    </Login>
  )
}
