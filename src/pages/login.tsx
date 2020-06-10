import Login from '../components/Login'
import React from 'react'
import { PageRendererProps } from 'gatsby'

export default function createPage({ location }: PageRendererProps) {
  return <Login header="Sign in" location={location} />
}
