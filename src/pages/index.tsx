import { PageRendererProps, graphql } from 'gatsby'

import Create from '../components/homepage/Create'
import Flexible from '../components/homepage/Flexible'
import Header from '../components/homepage/Header'
import Layout from '../components/Layout'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import News from '../components/homepage/News'
import Platforms from '../components/homepage/Platforms'
import Problem from '../components/homepage/Problem'
import Products from '../components/homepage/Products'
import { Query } from '../utils/graphql'
import React from 'react'
import SEO from '../components/SEO'
import Solution from '../components/homepage/Solution'
import { css } from '@emotion/core'

interface Props extends PageRendererProps {
  data: Query
}

export default function Index({ data }: Props) {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout extraCss={styles.container} navStyle={styles.nav}>
      <SEO title={siteTitle} />
      <Header />
      <Problem />
      <Solution />
      <Platforms />
      <Flexible />
      <Products />
      <News />
      <Create />
    </Layout>
  )
}

export const pageQuery = graphql`
  query indexQuery {
    site {
      siteMetadata {
        title
        events {
          title
        }
      }
    }
  }
`

const styles = {
  container: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding-top: 80px;
    }
  `,
  nav: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding-top: 20px;
      height: 80px;
    }
  `
}
