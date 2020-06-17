import * as theme from '../../styles/theme'

import Image, { FixedObject } from 'gatsby-image'
import { graphql, useStaticQuery } from 'gatsby'

import Callout from '../Callout'
import { Query } from '../../utils/graphql'
import React from 'react'
import { adjustFontSizeTo } from '../../styles/typography'
import { css } from '@emotion/core'
import { SharpImage } from '../../types'
import find from 'lodash/find'
import findAuthorImage from '../../utils/findAuthorImage'

function sortPosts(posts: Query['allMarkdownRemark']['edges']) {
  return posts.sort((a, b) => {
    const aDate = +new Date(a.node.frontmatter.date)
    const bDate = +new Date(b.node.frontmatter.date)
    return bDate - aDate
  })
}

type QueryType = Query & {
  contest: SharpImage
  spokestack: SharpImage
  danielArticle: Query['allMarkdownRemark']
  elizabethArticle: Query['allMarkdownRemark']
  mikeArticle: Query['allMarkdownRemark']
}

interface Props {
  author: string
  authorHref: string
  date?: string
  header: string
  href?: string
  image: FixedObject
  to?: string
  type: string
}

const NewsItem = ({
  author,
  authorHref,
  date,
  header,
  href,
  image,
  to,
  type
}: Props) => (
  <Callout extraCss={styles.callout} href={href} to={to}>
    <div css={styles.title}>
      <h5>{type}</h5>
      <h4>{header}</h4>
    </div>
    <div css={styles.about}>
      <Image
        fixed={image}
        alt={author}
        css={styles.imageWrap}
        imgStyle={styles.image}
      />
      <div
        css={styles.authorLink}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          window.location.href = authorHref
        }}>
        {author}
      </div>
      {date && (
        <>
          <div css={styles.separator}>•</div>
          <div>{date}</div>
        </>
      )}
    </div>
  </Callout>
)

export default function News() {
  const data = useStaticQuery<QueryType>(newsQuery)
  const posts = data.danielArticle.edges.concat(
    data.elizabethArticle.edges.concat(data.mikeArticle.edges)
  )
  return (
    <div id="news" className="ie-fix" css={styles.container}>
      <h2>News &amp; Tutorials</h2>
      <p className="title">
        Stay informed and learn to build your own Independent Voice Assistant
      </p>
      <div css={styles.content}>
        <NewsItem
          author="Voicebot.ai"
          authorHref="https://voicebot.ai"
          header={`Spokestack Launches "Voice First Mobile" Model`}
          href="https://voicebot.ai/2020/06/16/spokestack-launches-voice-first-mobile-model-to-make-mobile-voice-apps-perform-like-smart-speaker-skills/"
          image={data.contest.childImageSharp.fixed}
          type="News"
        />
        {sortPosts(posts).map((edge) => {
          const post = edge.node
          const author = post.frontmatter.author
          const { name } = find(data.site.siteMetadata.team, { key: author })
          return (
            <NewsItem
              key={post.id}
              author={name}
              authorHref={`/blog/author/${author}`}
              date={post.frontmatter.date}
              header={post.frontmatter.title}
              image={findAuthorImage(data, author)}
              to={post.fields.slug}
              type={author === 'daniel' ? 'Tutorial' : 'Blog'}
            />
          )
        })}
      </div>
    </div>
  )
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px 20px;
    min-height: 638px;

    h2 {
      margin-bottom: 10px;
    }
    .title {
      margin-bottom: 20px;
    }
  `,
  content: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    text-align: center;

    ${theme.ieBreakpoint} {
      flex-direction: column;
    }

    ${theme.ieBreakpointMinDefault} {
      flex-direction: row;
    }
  `,
  callout: css`
    justify-content: space-between;
    align-items: flex-start;
    text-align: left;
    width: 290px;
    height: 300px;
    margin: 10px;
  `,
  title: css`
    display: flex;
    flex-direction: column;
    width: 100%;

    h5 {
      margin-bottom: 5px;
    }
  `,
  about: css`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: ${adjustFontSizeTo('14px').fontSize};
    white-space: nowrap;
  `,
  authorLink: css`
    color: ${theme.link};
    font-weight: 700;
    margin-left: 5px;

    &:visited {
      color: ${theme.linkVisited};
    }
    &:hover {
      color: ${theme.linkHover};
    }
    &:active {
      color: ${theme.linkActive};
    }
  `,
  imageWrap: css`
    border-radius: 50%;
  `,
  image: {
    borderRadius: '50%'
  },
  separator: css`
    margin: 0 5px;
  `
}

const newsQuery = graphql`
  query newsQuery {
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
          fixed(width: 32, height: 32) {
            ...GatsbyImageSharpFixed_withWebp
            originalName
          }
        }
      }
    }
    danielArticle: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        frontmatter: { draft: { ne: true }, author: { eq: "daniel" } }
      }
      sort: { fields: [frontmatter___date], order: ASC }
      limit: 1
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            author
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
    elizabethArticle: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        frontmatter: { draft: { ne: true }, author: { eq: "elizabeth" } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            author
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
    mikeArticle: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        frontmatter: { draft: { ne: true }, author: { eq: "mike" } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            author
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
    spokestack: file(absolutePath: { regex: "/logo.png/" }) {
      childImageSharp {
        fixed(width: 32, height: 32) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    contest: file(absolutePath: { regex: "/contest.png/" }) {
      childImageSharp {
        fixed(width: 32, height: 32) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
