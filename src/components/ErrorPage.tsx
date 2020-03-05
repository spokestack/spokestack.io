import Layout from '../components/Layout'
import React from 'react'
import SEO from '../components/SEO'
import { css } from '@emotion/core'

interface Props {
  title: string
  children?: React.ReactNode
}

export default function ErrorPage({ title, children }: Props) {
  return (
    <Layout>
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
