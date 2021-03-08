import * as theme from '../styles/theme'

import { Link, graphql, useStaticQuery } from 'gatsby'
import { MarkdownRemark, Query } from '../utils/graphql'
import { RelatedLink, StickyLink } from '../types'

import Create from './homepage/Create'
import DarkModeButton from '../components/DarkModeButton'
import Layout from '../components/Layout'
import React from 'react'
import SEO from '../components/SEO'
import StickyNavLayout from '../components/StickyNavLayout'
import { WindowLocation } from '@reach/router'
import { css } from '@emotion/react'
import difference from 'lodash/difference'
import { isLoggedIn } from '../utils/auth'
import order from '../../content/docs/nav.json'
import sortBy from 'lodash/sortBy'
import uniqBy from 'lodash/uniqBy'

interface Props {
  location: WindowLocation
  post: MarkdownRemark
  related: RelatedLink[]
  selectFirst?: boolean
}

function checkDups(links: StickyLink[]) {
  const unique = uniqBy(links, (link) => link.navId)
  if (unique.length !== links.length) {
    const diff = difference(links, unique)
    throw new Error(
      `The following navIds are not unique: ${diff
        .map((link) => link.navId)
        .join(', ')}.`
    )
  }
}

function orderLinks(links: StickyLink[]) {
  checkDups(links)
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

export default function DocsPage({
  location,
  post,
  related,
  selectFirst
}: Props) {
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
    <Layout location={location}>
      <SEO
        title="Voice App Development Documentation | Spokestack"
        description={
          'Explore our Developer Docs to learn about Spokestack’s services, including TTS and on-device ASR, Wakeword, and NLU. All of our documentation is also available on GitHub.' +
          post.frontmatter.description
            ? ` ${post.frontmatter.description}`
            : ''
        }
      />
      <StickyNavLayout links={orderedLinks} location={location}>
        <header className="docs-header">
          {selectFirst ? (
            <h2>
              <a href={post.fields.slug}>{post.frontmatter.title}</a>
            </h2>
          ) : (
            <h2>{post.frontmatter.title}</h2>
          )}
          <DarkModeButton />
        </header>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <div css={styles.footer}>
          {!!related?.length && (
            <div css={styles.footerLeft}>
              See also
              <div css={styles.relatedLinks}>
                {related.map((link, i) => (
                  <Link key={`related-${i}`} to={link.href}>
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div css={styles.footerRight}>
            Something missing here?
            <a
              href={post.fields.githubLink}
              rel="noopener noreferrer"
              target="_blank">
              Edit this doc!
            </a>
            Questions?{' '}
            <a href="https://forum.spokestack.io/">Visit our forum</a>
          </div>
        </div>
        {!isLoggedIn() && <Create small />}
      </StickyNavLayout>
    </Layout>
  )
}

const styles = {
  footer: css`
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    margin-bottom: 15px;
    border-top: 1px solid ${theme.mainBorder};
    border-bottom: 1px solid ${theme.mainBorder};

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      justify-content: space-between;
    }
  `,
  footerLeft: css`
    margin-bottom: 15px;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      margin: 0;
    }
  `,
  footerRight: css`
    display: flex;
    flex-direction: column;
  `,
  relatedLinks: css`
    display: flex;
    flex-direction: column;
  `
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
