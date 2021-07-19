import ErrorPage from '../components/ErrorPage'
import React from 'react'
import useLocalhostRedirect from '../utils/useLocalhostRedirect'

export default function NotFoundPage() {
  useLocalhostRedirect()
  return (
    <ErrorPage title="404: Not Found">
      <h1>404</h1>
      <h3>Page not found :(</h3>
      <p>The requested page could not be found.</p>
    </ErrorPage>
  )
}
