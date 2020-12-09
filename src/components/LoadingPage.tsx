import Layout from './Layout'
import LoadingIcon from './LoadingIcon'
import React from 'react'
import { WindowLocation } from '@reach/router'
import { css } from '@emotion/react'

interface Props {
  location: WindowLocation
}

export default function LoadingPage({ location }: Props) {
  return (
    <Layout location={location}>
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
