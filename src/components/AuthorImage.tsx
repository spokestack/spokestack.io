import { SerializedStyles, css } from '@emotion/core'
import { TeamImages, TeamMemberName } from '../types'
import { graphql, useStaticQuery } from 'gatsby'

import Image from 'gatsby-image'
import { Query } from '../utils/graphql'
import React from 'react'

type QueryType = Query & TeamImages

interface Props {
  author: TeamMemberName
  extraCss?: SerializedStyles
}

export default function AuthorImage({ author, extraCss }: Props) {
  const data = useStaticQuery<QueryType>(authorImageQuery)
  if (!author || !data.site || !data[author]) {
    return null
  }
  const { name } = data.site.siteMetadata.team[author]
  return (
    <Image
      fixed={data[author].childImageSharp.fixed}
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
      ...TeamMembers
    }
    brent: file(absolutePath: { regex: "/headshots/brent.png/" }) {
      childImageSharp {
        fixed(width: 95, height: 95) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    elizabeth: file(absolutePath: { regex: "/headshots/elizabeth.png/" }) {
      childImageSharp {
        fixed(width: 95, height: 95) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    josh: file(absolutePath: { regex: "/headshots/josh.png/" }) {
      childImageSharp {
        fixed(width: 95, height: 95) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    mike: file(absolutePath: { regex: "/headshots/mike.png/" }) {
      childImageSharp {
        fixed(width: 95, height: 95) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    neil: file(absolutePath: { regex: "/headshots/neil.png/" }) {
      childImageSharp {
        fixed(width: 95, height: 95) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    noel: file(absolutePath: { regex: "/headshots/noel.png/" }) {
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
    will: file(absolutePath: { regex: "/headshots/will.png/" }) {
      childImageSharp {
        fixed(width: 95, height: 95) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
