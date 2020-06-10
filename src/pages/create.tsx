import Login from '../components/Login'
import React from 'react'
import { PageRendererProps } from 'gatsby'

export default function createPage({ location }: PageRendererProps) {
  return (
    <Login
      isCreate
      header="Create an account, no credit card required"
      location={location}
    />
  )
}
