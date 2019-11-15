import Image, { FixedObject } from 'gatsby-image'
import { graphql, useStaticQuery } from 'gatsby'

import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import { Query } from '../utils/graphql'
import React from 'react'
import { css } from '@emotion/core'
import { rhythm } from '../utils/typography'

type QueryType = Query & {
  noel: { childImageSharp: { fixed: FixedObject } }
  timmy: { childImageSharp: { fixed: FixedObject } }
}

interface Props {
  // Add a key here and avatar below
  // to add a new author
  avatar: 'noel' | 'timmy'
  name: string
  title: string
}

export const authorsFragment = graphql`
  fragment Authors on Site {
    siteMetadata {
      authors {
        noel {
          avatar
          name
          title
        }
      }
    }
  }
`

const avatarsQuery = graphql`
  query AuthorQuery {
    noel: file(absolutePath: { regex: "/headshots/noel.jpg/" }) {
      childImageSharp {
        fixed(width: 95, height: 95) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    timmy: file(absolutePath: { regex: "/headshots/timmy.jpg/" }) {
      childImageSharp {
        fixed(width: 95, height: 95) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default function Author({ avatar, name, title }: Props) {
  const data = useStaticQuery<QueryType>(avatarsQuery)
  if (!name && !data[avatar]) {
    return null
  }
  return (
    <div css={styles.container}>
      <p>Author</p>
      {data[avatar] && (
        <Image
          fixed={data[avatar].childImageSharp.fixed}
          alt={name}
          css={styles.imageWrap}
          imgStyle={styles.image}
        />
      )}
      <h3>{name}</h3>
      <p css={styles.title}>{title}</p>
    </div>
  )
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    margin: ${rhythm(1)} 0;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      margin-top: ${rhythm(8)};
      padding-left: 20px;
      padding-right: 100px;
    }
  `,
  imageWrap: css`
    margin: 0 0 ${rhythm(1)};
    min-width: 95px;
    border-radius: 50%;
  `,
  image: {
    borderRadius: '50%'
  },
  title: css`
    opacity: 0.5;
  `
}
