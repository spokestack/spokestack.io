import * as theme from '../../styles/theme'

import Image, { FixedObject } from 'gatsby-image'
import { TeamImages, TeamMemberName } from '../../types'
import { graphql, useStaticQuery } from 'gatsby'

import Callout from '../Callout'
import { Query } from '../../utils/graphql'
import React from 'react'
import { adjustFontSizeTo } from '../../styles/typography'
import { css } from '@emotion/core'

function sortPosts(posts: Query['allMarkdownRemark']['edges']) {
  return posts.sort((a, b) => {
    const aDate = +new Date(a.node.frontmatter.date)
    const bDate = +new Date(b.node.frontmatter.date)
    return bDate - aDate
  })
}

type QueryType = Query &
  TeamImages & {
    contest: TeamImages['brent']
    spokestack: TeamImages['brent']
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
  console.log(data)
  return (
    <div id="news" className="ie-fix" css={styles.container}>
      <h2>News &amp; Tutorials</h2>
      <p className="title">How-to articles and updates about Spokestack</p>
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
          const author = post.frontmatter.author as TeamMemberName
          const name = data.site.siteMetadata.team[author].name
          return (
            <NewsItem
              key={post.id}
              author={name}
              authorHref={`/blog/author/${author}`}
              date={post.frontmatter.date}
              header={post.frontmatter.title}
              image={data[author].childImageSharp.fixed}
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
      ...TeamMembers
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
    brent: file(absolutePath: { regex: "/headshots/brent.png/" }) {
      childImageSharp {
        fixed(width: 32, height: 32) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    daniel: file(absolutePath: { regex: "/headshots/daniel.png/" }) {
      childImageSharp {
        fixed(width: 32, height: 32) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    elizabeth: file(absolutePath: { regex: "/headshots/elizabeth.png/" }) {
      childImageSharp {
        fixed(width: 32, height: 32) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    josh: file(absolutePath: { regex: "/headshots/josh.png/" }) {
      childImageSharp {
        fixed(width: 32, height: 32) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    mike: file(absolutePath: { regex: "/headshots/mike.png/" }) {
      childImageSharp {
        fixed(width: 32, height: 32) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    neil: file(absolutePath: { regex: "/headshots/neil.png/" }) {
      childImageSharp {
        fixed(width: 32, height: 32) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    noel: file(absolutePath: { regex: "/headshots/noel.png/" }) {
      childImageSharp {
        fixed(width: 32, height: 32) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    timmy: file(absolutePath: { regex: "/headshots/timmy.jpg/" }) {
      childImageSharp {
        fixed(width: 32, height: 32) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    will: file(absolutePath: { regex: "/headshots/will.png/" }) {
      childImageSharp {
        fixed(width: 32, height: 32) {
          ...GatsbyImageSharpFixed
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
