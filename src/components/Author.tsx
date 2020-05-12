import * as theme from '../utils/theme'

import { Global, css } from '@emotion/core'
import { TeamImages, TeamMemberName } from '../types'
import { graphql, useStaticQuery } from 'gatsby'

import Image from 'gatsby-image'
import { Query } from '../utils/graphql'
import React from 'react'
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
    <div className="author" css={styles.container}>
      <Global
        styles={css`
          html.dark-mode {
            .author {
              background-color: ${theme.codeBackground};
              border-left-color: ${theme.mainBorderDark};
              border-right-color: ${theme.mainBorderDark};
              border-bottom-color: ${theme.mainBorderDark};
            }
            .author-bio {
              color: white;
            }
          }
        `}
      />
      {data[author] && (
        <Image
          fixed={data[author].childImageSharp.fixed}
          alt={name}
          css={styles.imageWrap}
          imgStyle={styles.image}
        />
      )}
      <p css={styles.about}>About the Author</p>
      <h4 css={styles.name}>
        {/* <a href={`/blog/author/${author}`}>{name}</a> */}
        {name}
      </h4>
      <p className="author-bio" css={styles.bio}>
        {title}
      </p>
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
    background-color: white;
    padding: 25px;
    margin-top: 5px;
    border: 1px solid ${theme.mainBorder};
    border-top: 3px solid ${theme.primaryLight};
    border-radius: 0 0 7px 7px;
  `,
  imageWrap: css`
    margin: 0 0 ${rhythm(1)};
    min-width: 95px;
    border-radius: 50%;
  `,
  image: {
    borderRadius: '50%'
  },
  about: css`
    font-size: 16px;
    font-style: italic;
    margin: 0 0 5px;
  `,
  name: css`
    margin-bottom: 0;
    a {
      color: ${theme.header};

      &:hover {
        color: ${theme.linkHover};
      }
      &:active {
        color: ${theme.linkActive};
      }
    }
  `,
  bio: css`
    color: ${theme.headerColor.fade(0.25).toString()};
    margin: 0;
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
