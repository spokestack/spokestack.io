import ErrorPage from '../components/ErrorPage'
import React from 'react'
import { PageRendererProps } from 'gatsby'

export default function NotFoundPage({ location }: PageRendererProps) {
  return (
    <ErrorPage location={location} title="404: Not Found">
      <h1>404</h1>
      <h3>Page not found :(</h3>
      <p>The requested page could not be found.</p>
    </ErrorPage>
  )
}
