import { PageRendererProps, graphql } from 'gatsby'

import Banner from '../components/Banner'
import Create from '../components/Create'
import Flexible from '../components/homepage/Flexible'
import Header from '../components/homepage/Header'
import Layout from '../components/Layout'
import { MIN_DEFAULT_MEDIA_QUERY } from '../styles/theme'
import News from '../components/homepage/News'
import Platforms from '../components/homepage/Platforms'
import { Query } from '../utils/graphql'
import React from 'react'
import SEO from '../components/SEO'
import Tray from '../components/homepage/Tray'
import { css } from '@emotion/react'

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
      <Tray />
      <Platforms />
      <Flexible />
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
        events {
          title
        }
      }
    }
  }
`
