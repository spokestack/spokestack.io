import React, { useEffect, useState } from 'react'

import { DEFAULT_WIDTH } from 'typography-breakpoint-constants'
import Layout from '../components/Layout'
import { css } from '@emotion/core'
import { navigate } from 'gatsby'
import { rhythm } from '../styles/typography'

interface Props {
  checkAuth: () => Promise<string | null>
}

export default function OAuth({ checkAuth }: Props) {
  const [status, setStatus] = useState('Getting ready...')
  async function check() {
    const error = await checkAuth()
    if (error) {
      setStatus(error)
    } else {
      navigate('/account/settings/')
    }
  }
  useEffect(() => {
    setStatus('Authorizing...')
    check()
  }, [])
  return (
    <Layout>
      <noscript>
        Please <a href="https://enable-javascript.com/">enable JavaScript</a> to
        sign in.
      </noscript>
      <div css={styles.container}>
        <p>{status}</p>
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
