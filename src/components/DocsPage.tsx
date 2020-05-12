import { MarkdownRemark, Query } from '../utils/graphql'
import { graphql, useStaticQuery } from 'gatsby'

import DarkModeButton from '../components/DarkModeButton'
import Layout from '../components/Layout'
import React from 'react'
import SEO from '../components/SEO'
import { StickyLink } from '../types'
import StickyNavLayout from '../components/StickyNavLayout'
import order from '../../content/docs/nav.json'
import sortBy from 'lodash/sortBy'

interface Props {
  post: MarkdownRemark
  selectFirst?: boolean
}

function orderLinks(links: StickyLink[]) {
  return sortBy(links, (link) => {
    const index = order.indexOf(link.navId)
    if (index === -1) {
      throw new Error(
        `Docs page with title ${link.title} has navId ${link.navId}, which does not exist in nav.json.`
      )
    }
    return index
  })
}

export default function DocsPage({ post, selectFirst }: Props) {
  const links: StickyLink[] = []
  const data = useStaticQuery<Query>(docsPageQuery)
  const posts = data.allMarkdownRemark.edges
  posts.forEach(({ node }) => {
    links.push({
      href: node.fields.slug,
      section: node.fields.folder,
      title: node.frontmatter.title,
      navId: node.frontmatter.navId
    })
  })
  const orderedLinks = orderLinks(links)
  if (selectFirst) {
    orderedLinks[0].forceSelect = true
  }

  return (
    <Layout>
      <SEO
        title="Docs"
        description={
          post.frontmatter.description || 'Documentation for the Spokestack API'
        }
      />
      <StickyNavLayout links={orderedLinks}>
        <header className="docs-header">
          {selectFirst ? (
            <h1>
              <a href={post.fields.slug}>{post.frontmatter.title}</a>
            </h1>
          ) : (
            <h1>{post.frontmatter.title}</h1>
          )}
          <DarkModeButton />
        </header>
        <p>
          <a
            href={post.fields.githubLink}
            rel="noopener noreferrer"
            target="_blank">
            Edit on GitHub
          </a>
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </StickyNavLayout>
    </Layout>
  )
}

export const docsPageQuery = graphql`
  query docsPageQuery {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/docs/" }
        frontmatter: { draft: { ne: true } }
      }
    ) {
      edges {
        node {
          fields {
            slug
            folder
          }
          frontmatter {
            description
            navId
            title
          }
        }
      }
    }
  }
`
