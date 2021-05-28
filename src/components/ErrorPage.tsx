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
      <div css={styles.container}>
        {children}
        <div css={styles.links}>
          <a href="/">Home</a>&nbsp;|&nbsp;<a href="/blog">Blog</a>&nbsp;|&nbsp;
          <a href="/docs">Docs</a>&nbsp;|&nbsp;<a href="/account">Account</a>
        </div>
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
    padding: 100px 20px;
  `,
  links: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 20px;
  `
}
