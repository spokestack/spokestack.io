import * as theme from '../../styles/theme'

import { graphql, useStaticQuery } from 'gatsby'

import NewsItem from './NewsItem'
import { Query } from '../../utils/graphql'
import React from 'react'
import { css } from '@emotion/react'

function sortPosts(posts: Query['allMarkdownRemark']['edges']) {
  return posts.sort((a, b) => {
    const aDate = +new Date(a.node.frontmatter.date)
    const bDate = +new Date(b.node.frontmatter.date)
    return bDate - aDate
  })
}

type QueryType = Query & {
  articles: Query['allMarkdownRemark']
}

export default function News() {
  const data = useStaticQuery<QueryType>(newsQuery)
  const posts = data.articles.edges
  return (
    <div id="news" className="ie-fix" css={styles.container}>
      <h2>News &amp; Tutorials</h2>
      <p className="title">
        Stay informed and learn to build your own Independent Voice Assistant
      </p>
      <div css={styles.content}>
        {sortPosts(posts).map((edge) => {
          const post = edge.node
          const author = post.frontmatter.author
          return (
            <NewsItem
              key={post.id}
              author={author}
              authorHref={`/blog/author/${author}`}
              date={post.frontmatter.date}
              header={post.frontmatter.title}
              to={post.fields.slug}
              type={
                post.frontmatter.tags.includes('Tutorial') ? 'Tutorial' : 'Blog'
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
  `
}

const newsQuery = graphql`
  query newsQuery {
    articles: allMarkdownRemark(
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
            tags
            title
          }
        }
      }
    }
  }
`
