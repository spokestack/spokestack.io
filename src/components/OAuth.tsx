import React, { useEffect, useState } from 'react'

import { DEFAULT_WIDTH } from '../styles/theme'
import Layout from '../components/Layout'
import { WindowLocation } from '@reach/router'
import { clearStorage } from '../utils/auth'
import { css } from '@emotion/react'
import { navigate } from 'gatsby'

interface Props {
  checkAuth: () => Promise<string | null>
  location: WindowLocation
}

export default function OAuth({ checkAuth, location }: Props) {
  const [status, setStatus] = useState('Getting ready...')
  async function check() {
    const error = await checkAuth()
    if (error) {
      clearStorage()
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
    <Layout location={location}>
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
    padding: 15px;
    max-width: ${DEFAULT_WIDTH};
    margin: 0 auto;
  `
}
