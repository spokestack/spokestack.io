import ErrorPage from '../components/ErrorPage'
import React from 'react'

export default function NotFoundPage() {
  return (
    <ErrorPage title="404: Not Found">
      <h1>404</h1>
      <h3>Page not found :(</h3>
      <p>The requested page could not be found.</p>
    </ErrorPage>
  )
}
