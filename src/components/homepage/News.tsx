import * as theme from '../../styles/theme'

import { graphql, useStaticQuery } from 'gatsby'

import NewsItem from './NewsItem'
import { Query } from '../../utils/graphql'
import React from 'react'
import { css } from '@emotion/react'

function sortPosts(posts: Query['allMdx']['edges']) {
  return posts.sort((a, b) => {
    const aDate = +new Date(a.node.frontmatter!.date)
    const bDate = +new Date(b.node.frontmatter!.date)
    return bDate - aDate
  })
}

type QueryType = Query & {
  articles: Query['allMdx']
}

export default function News() {
  const data = useStaticQuery<QueryType>(newsQuery)
  const posts = data.articles.edges
  return (
    <div id="news" className="ie-fix" css={styles.container}>
      <h2>News &amp; Tutorials</h2>
      <p className="title">
        The latest tutorials, low-code integrations, and Spokestack news
      </p>
      <div className="ie-fix" css={styles.content}>
        {sortPosts(posts).map((edge) => {
          const post = edge.node
          const frontmatter = post.frontmatter!
          const author = frontmatter.author!
          return (
            <NewsItem
              key={post.id}
              author={author}
              authorHref={`/blog/author/${author}`}
              date={frontmatter.date}
              title={frontmatter.title!}
              imageUrl={frontmatter.hero!.publicURL!}
              to={post.fields!.slug!}
              type={
                frontmatter.tags!.includes('Tutorial') ? 'Tutorial' : 'Blog'
              }
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
    text-align: center;
    padding: 50px 20px 100px;
    min-height: 638px;

    h2 {
      margin-bottom: 25px;
    }
    p {
      margin: 0;
    }
  `,
  content: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    text-align: center;
    gap: 25px;
    margin-top: 60px;

    ${theme.ieBreakpoint} {
      flex-direction: column;
    }

    ${theme.ieBreakpointMinDefault} {
      flex-direction: row;
    }
  `
}

const newsQuery = graphql`
  query newsQuery {
    articles: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        frontmatter: { draft: { ne: true } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 4
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            author
            date(formatString: "MMM DD, YYYY")
            hero {
              publicURL
            }
            tags
            title
          }
        }
      }
    }
  }
`
