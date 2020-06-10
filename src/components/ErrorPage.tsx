import Layout from '../components/Layout'
import React from 'react'
import SEO from '../components/SEO'
import { css } from '@emotion/core'
import { WindowLocation } from '@reach/router'

interface Props {
  children?: React.ReactNode
  location: WindowLocation
  title: string
}

export default function ErrorPage({ children, location, title }: Props) {
  return (
    <Layout location={location}>
      <SEO title={title} />
      <div css={styles.container}>{children}</div>
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
    padding: 0 20px;
  `
}
