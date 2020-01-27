/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import { Query } from '../utils/graphql'

type Meta =
  | { name: string; content: any; property?: undefined }
  | { property: string; content: any; name?: undefined }

interface Props {
  title: string
  description?: string
  lang?: string
  keywords?: string[]
  meta?: Meta[]
}

export default function SEO({
  title,
  description = '',
  lang = 'en',
  meta = [],
  keywords = []
}: Props) {
  const { site } = useStaticQuery<Query>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={
        site.siteMetadata.title === title
          ? `%s`
          : `${site.siteMetadata.title} | %s`
      }
      meta={[
        {
          name: 'description',
          content: metaDescription
        },
        {
          property: 'og:title',
          content: title
        },
        {
          property: 'og:description',
          content: metaDescription
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          name: 'twitter:card',
          content: 'summary'
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata.author
        },
        {
          name: 'twitter:title',
          content: title
        },
        {
          name: 'twitter:description',
          content: metaDescription
        }
      ]
        .concat(
          keywords.length > 0
            ? {
                name: 'keywords',
                content: keywords.join(', ')
              }
            : []
        )
        .concat(meta)}
    />
  )
}
