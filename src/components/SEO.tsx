import { graphql, useStaticQuery } from 'gatsby'

import { Helmet } from 'react-helmet'
import { Query } from '../utils/graphql'
import React from 'react'

type Meta =
  | { name: string; content: any; property?: undefined }
  | { property: string; content: any; name?: undefined }

interface Props {
  title: string
  longTitle?: string
  description?: string
  image?: string
  lang?: string
  meta?: Meta[]
}

export default function SEO({
  title,
  longTitle,
  description = '',
  image,
  lang = 'en',
  meta = []
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
          content: longTitle || title
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
          property: 'og:image',
          content: image || 'https://spokestack.io/mark.svg'
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
          content: longTitle || title
        },
        {
          name: 'twitter:description',
          content: metaDescription
        },
        {
          name: 'twitter:image',
          content: image || 'https://spokestack.io/mark.svg'
        }
      ].concat(meta)}
    />
  )
}
