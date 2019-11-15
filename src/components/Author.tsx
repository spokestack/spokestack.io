import Image, { FixedObject } from 'gatsby-image'
import { graphql, useStaticQuery } from 'gatsby'

import { MIN_LARGE_DISPLAY_MEDIA_QUERY } from 'typography-breakpoint-constants'
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
      <div css={styles.content}>
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
    </div>
  )
}

const styles = {
  container: css`
    grid-area: author;
    display: flex;
    justify-content: center;
    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      justify-content: flex-start;
    }
  `,
  content: css`
    min-width: 285px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    margin: ${rhythm(1)} 0;

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      padding-right: 100px;
      margin-top: ${rhythm(8)};
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
