import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

export default function NotFoundPage() {
  return (
    <Layout>
      <SEO title="404: Not Found" />
      <h1>404</h1>
      <h3>Page not found :(</h3>
      <p>The requested page could not be found.</p>
    </Layout>
  )
}
