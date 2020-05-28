import { PageRendererProps, graphql } from 'gatsby'

import Create from '../components/homepage/Create'
import Flexible from '../components/homepage/Flexible'
import Header from '../components/homepage/Header'
import Layout from '../components/Layout'
import News from '../components/homepage/News'
import Platforms from '../components/homepage/Platforms'
import Problem from '../components/homepage/Problem'
import Products from '../components/homepage/Products'
import { Query } from '../utils/graphql'
import React from 'react'
import SEO from '../components/SEO'
import Solution from '../components/homepage/Solution'

interface Props extends PageRendererProps {
  data: Query
}

export default function Index({ data }: Props) {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout>
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
