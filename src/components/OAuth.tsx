import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { css } from '@emotion/core'
import { rhythm } from '../utils/typography'
import { DEFAULT_WIDTH } from 'typography-breakpoint-constants'
import { navigate } from 'gatsby'

interface Props {
  checkAuth: () => Promise<string | null>
}

export default function OAuth({ checkAuth }: Props) {
  const [error, setError] = useState<string>(null)
  async function check() {
    const error = await checkAuth()
    if (error) {
      setError(error)
    } else {
      navigate('/account')
    }
  }
  useEffect(() => {
    check()
  }, [])
  return (
    <Layout>
      <div css={styles.container}>
        <p>{error ? error : 'Authorizing...'}</p>
      </div>
    </Layout>
  )
}

const styles = {
  container: css`
    padding: ${rhythm(1)};
    max-width: ${DEFAULT_WIDTH};
    margin: 0 auto;
  `
}
