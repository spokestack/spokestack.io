import { MarkdownRemark, Query } from '../utils/graphql'
import { StickyLink, TeamMemberName } from '../types'
import { graphql, useStaticQuery } from 'gatsby'

import Author from './Author'
import Layout from '../components/Layout'
import React from 'react'
import SEO from '../components/SEO'
import StickyNavLayout from '../components/StickyNavLayout'

interface Props {
  post: MarkdownRemark
  selectFirst?: boolean
}

export default function Blog({ post, selectFirst }: Props) {
  const links: StickyLink[] = []
  const data = useStaticQuery<Query>(blogPageQuery)
  const posts = data.allMarkdownRemark.edges
  posts.forEach(({ node }) => {
    links.push({
      href: node.fields.slug,
      section: node.fields.folder,
      title: node.frontmatter.title
    })
  })
  if (selectFirst) {
    links[0].forceSelect = true
  }
  return (
    <Layout>
      <SEO title="Blog" keywords={['spokestack', 'blog', 'voice', 'artificial intelligence']} />
      <StickyNavLayout
        links={links}
        rightContent={<Author author={post.frontmatter.author as TeamMemberName} />}>
        {selectFirst ? (
          <h1>
            <a href={post.fields.slug}>{post.frontmatter.title}</a>
          </h1>
        ) : (
          <h1>{post.frontmatter.title}</h1>
        )}
        <p>{post.frontmatter.date}</p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </StickyNavLayout>
    </Layout>
  )
}

export const blogPageQuery = graphql`
  query blogPageQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/blog/" }, frontmatter: { draft: { ne: true } } }
      limit: 10
    ) {
      edges {
        node {
          fields {
            folder
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            description
            title
          }
        }
      }
    }
  }
`
