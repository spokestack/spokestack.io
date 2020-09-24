import * as theme from '../styles/theme'

import {
  LARGE_DISPLAY_WIDTH,
  MIN_DEFAULT_MEDIA_QUERY
} from 'typography-breakpoint-constants'

import Layout from '../components/Layout'
import React from 'react'
import SignInForm from './SignInForm'
import { WindowLocation } from '@reach/router'
import { css } from '@emotion/core'
import { rhythm } from '../styles/typography'

interface Props {
  children?: React.ReactNode
  header: string
  isCreate?: boolean
  location: WindowLocation
}

export default function Login({ children, header, isCreate, location }: Props) {
  return (
    <Layout location={location}>
      {children}
      <div css={styles.container}>
        <div css={styles.content}>
          <SignInForm header={header} isCreate={isCreate} />
          <div css={styles.details}>
            <h2 css={styles.header}>Welcome to Spokestack!</h2>

            <div css={styles.feature}>
              <img src="/login/design.svg" css={styles.featureImage} />
              <div css={styles.featureContent}>
                <h4 css={styles.featureHeader}>Design &amp; demo</h4>
                <p>
                  Prototype new experiences quickly with our{' '}
                  <a href="/docs/Design/getting-started">design guides</a> and
                  figma plugin.
                </p>
              </div>
            </div>
            <div css={styles.feature}>
              <img src="/login/develop.svg" css={styles.featureImage} />
              <div css={styles.featureContent}>
                <h4 css={styles.featureHeader}>Develop &amp; learn</h4>
                <p>
                  Get started with our extensive{' '}
                  <a href="/docs">documentation</a> and{' '}
                  <a href="https://github.com/spokestack">
                    open source libraries
                  </a>
                  .
                </p>
              </div>
            </div>
            <div css={styles.feature}>
              <img src="/login/deploy.svg" css={styles.featureImage} />
              <div css={styles.featureContent}>
                <h4 css={styles.featureHeader}>Deploy &amp; engage</h4>
                <p>Track user engagement for every app you deploy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const styles = {
  container: css`
    padding: 20px;
    max-width: ${LARGE_DISPLAY_WIDTH};
    margin: 0 auto;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding: ${rhythm(4)} 30px;
    }
  `,
  header: css`
    text-align: center;
    margin-bottom: ${rhythm(1.5)};
  `,
  content: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row-reverse;
    }
  `,
  details: css`
    margin-top: ${rhythm(2)};

    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding: 0 40px;
      margin: 0 20px 0 0;
    }
  `,
  feature: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: ${rhythm(1)};
  `,
  featureImage: css`
    display: block;
    width: 85px;
    height: 85px;
    margin: 0 20px 0 0;
  `,
  featureContent: css`
    display: flex;
    flex-direction: column;

    p {
      margin: 0;
    }
  `,
  featureHeader: css`
    color: ${theme.primaryDark};
    margin: 0;
  `
}
