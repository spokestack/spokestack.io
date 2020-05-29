import Layout from './Layout'
import LoadingIcon from './LoadingIcon'
import React from 'react'
import { css } from '@emotion/core'

export default function LoadingPage() {
  return (
    <Layout>
      <div css={styles.container}>
        <LoadingIcon />
      </div>
    </Layout>
  )
}

const styles = {
  container: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `
}
