import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { graphql, useStaticQuery } from 'gatsby'
import Image, { FixedObject } from 'gatsby-image'
import React from 'react'
import { Query } from '../utils/graphql'
import { rhythm } from '../utils/typography'

type QueryType = Query & { avatar: { childImageSharp: { fixed: FixedObject } } }

const SVGIcon = styled.svg`
  width: 16px;
  height: 16px;
  display: inline-block;
  fill: #2a7ae2;
  line-height: 0;
  padding-top: 1px;
  margin-right: 3px;
`

export default function Bio() {
  const { site, avatar } = useStaticQuery<QueryType>(bioQuery)
  const { author, social } = site.siteMetadata
  return (
    <div css={styles.container}>
      <Image
        fixed={avatar.childImageSharp.fixed}
        alt={author}
        css={styles.imageWrap}
        imgStyle={styles.image}
      />
      <p css={styles.writtenText}>
        Come at me:
        <a css={styles.twitterLink} href={`https://twitter.com/${social.twitter}`}>
          <SVGIcon
            dangerouslySetInnerHTML={{
              __html: '<use xlink:href="/minima-social-icons.svg#twitter"></use>'
            }}
          />
          {author}
        </a>
        .
      </p>
    </div>
  )
}

const styles = {
  container: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: ${rhythm(1)};
    margin-bottom: ${rhythm(1)};
  `,
  writtenText: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
  `,
  imageWrap: css`
    margin-right: ${rhythm(1 / 2)};
    margin-bottom: 0;
    min-width: 50;
    border-radius: 100%;
  `,
  twitterLink: css`
    margin-left: 5px;
  `,
  image: {
    borderRadius: '50%'
  }
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/me-headshot.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`
