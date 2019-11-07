import { graphql, PageRendererProps } from 'gatsby'
import React from 'react'
import SEO from '../components/SEO'
import { Query } from '../utils/graphql'
import Layout from '../components/Layout'

type Props = PageRendererProps & {
  data: Query
}

export default function Index({ data }: Props) {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout>
      <SEO title={siteTitle} keywords={['spokestack', 'mobile', 'voice']} />
    </Layout>
  )
}

// const styles = {}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
