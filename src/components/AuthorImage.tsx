import { SerializedStyles, css } from '@emotion/core'
import { graphql, useStaticQuery } from 'gatsby'

import Image from 'gatsby-image'
import { Query } from '../utils/graphql'
import React from 'react'
import find from 'lodash/find'
import findAuthorImage from '../utils/findAuthorImage'

interface Props {
  author: string
  extraCss?: SerializedStyles
}

export default function AuthorImage({ author, extraCss }: Props) {
  const data = useStaticQuery<Query>(authorImageQuery)
  if (!author || !data.site) {
    return null
  }
  const { name } = find(data.site.siteMetadata.team, { key: author })
  return (
    <Image
      fixed={findAuthorImage(data, author)}
      alt={name}
      css={[styles.imageWrap, extraCss]}
      imgStyle={styles.image}
    />
  )
}

const styles = {
  imageWrap: css`
    border-radius: 50%;
  `,
  image: {
    borderRadius: '50%'
  }
}

const authorImageQuery = graphql`
  query authorImageQuery {
    site {
      siteMetadata {
        team {
          key
          name
        }
      }
    }
    allImageSharp(
      filter: { fixed: { originalName: { regex: "/headshot/" } } }
    ) {
      edges {
        node {
          fixed(width: 95, height: 95) {
            ...GatsbyImageSharpFixed_withWebp
            originalName
          }
        }
      }
    }
  }
`
