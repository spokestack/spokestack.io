import { TeamImages, TeamMemberName } from '../types'
import { graphql, useStaticQuery } from 'gatsby'

import Image from 'gatsby-image'
import { MIN_LARGER_DISPLAY_MEDIA_QUERY } from 'typography-breakpoint-constants'
import { Query } from '../utils/graphql'
import React from 'react'
import { css } from '@emotion/core'
import { rhythm } from '../utils/typography'

type QueryType = Query & TeamImages

interface Props {
  author: TeamMemberName
}

export default function Author({ author }: Props) {
  const data = useStaticQuery<QueryType>(authorQuery)
  if (!author || !data.site) {
    return null
  }
  const { name, title } = data.site.siteMetadata.team[author]
  return (
    <div css={styles.container}>
      <div css={styles.content}>
        <p>Author</p>
        {data[author] && (
          <Image
            fixed={data[author].childImageSharp.fixed}
            alt={name}
            css={styles.imageWrap}
            imgStyle={styles.image}
          />
        )}
        <h3 css={styles.name}>{name}</h3>
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
    ${MIN_LARGER_DISPLAY_MEDIA_QUERY} {
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

    ${MIN_LARGER_DISPLAY_MEDIA_QUERY} {
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
  name: css`
    margin-bottom: 0;
  `,
  title: css`
    opacity: 0.5;
  `
}

const authorQuery = graphql`
  query authorQuery {
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
