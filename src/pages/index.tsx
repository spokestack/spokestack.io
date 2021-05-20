import { PageRendererProps, graphql } from 'gatsby'

import Banner from '../components/Banner'
import Create from '../components/Create'
import Header from '../components/homepage/Header'
import Layout from '../components/Layout'
import { MIN_DEFAULT_MEDIA_QUERY } from '../styles/theme'
import News from '../components/homepage/News'
import { Query } from '../utils/graphql'
import React from 'react'
import SEO from '../components/SEO'
import { css } from '@emotion/react'
import Problems from '../components/homepage/Problems'
import Benefits from '../components/homepage/Benefits'
import Solution from '../components/homepage/Solution'

interface Props extends PageRendererProps {
  data: Query
}

export default function Index({ data }: Props) {
  const siteTitle = data!.site!.siteMetadata!.title!

  return (
    <Layout
      banner={
        <Banner href="/account/create">
          <p>
            Spokestack Maker - Self-Service Tools for Personal Voice Model
            Creation
          </p>
        </Banner>
      }
      extraCss={styles.container}
      navStyle={styles.nav}>
      <SEO title={siteTitle} />
      <Header />
      <Problems />
      <Benefits />
      <Solution />
      <News />
      <Create />
    </Layout>
  )
}

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

export const pageQuery = graphql`
  query indexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
