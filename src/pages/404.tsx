import Layout from '../components/Layout'
import React from 'react'
import SEO from '../components/SEO'
import { css } from '@emotion/core'

export default function NotFoundPage() {
  return (
    <Layout>
      <SEO title="404: Not Found" />
      <div css={styles.container}>
        <h1>404</h1>
        <h3>Page not found :(</h3>
        <p>The requested page could not be found.</p>
      </div>
    </Layout>
  )
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  `
}
