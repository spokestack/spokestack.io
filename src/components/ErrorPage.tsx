import Layout from '../components/Layout'
import React from 'react'
import SEO from '../components/SEO'
import { css } from '@emotion/react'

interface Props {
  children?: React.ReactNode
  title: string
}

export default function ErrorPage({ children, title }: Props) {
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
