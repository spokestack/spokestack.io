import Image, { FixedObject } from 'gatsby-image'
import { graphql, useStaticQuery } from 'gatsby'

import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import { Query } from '../utils/graphql'
import React from 'react'
import { css } from '@emotion/core'
import { rhythm } from '../utils/typography'

type QueryType = Query & {
  avatar: { childImageSharp: { fixed: FixedObject } }
}

export default function Bio() {
  const { site, avatar } = useStaticQuery<QueryType>(bioQuery)
  const { author } = site.siteMetadata
  return (
    <div css={styles.container}>
      <p>Author</p>
      <Image
        fixed={avatar.childImageSharp.fixed}
        alt={author}
        css={styles.imageWrap}
        imgStyle={styles.image}
      />
      <h3>Noel Weichbrodt</h3>
      <p css={styles.title}>Solutions Engineer</p>
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

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/headshots/noel.jpg/" }) {
      childImageSharp {
        fixed(width: 95, height: 95) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
      }
    }
  }
`
