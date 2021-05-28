import * as theme from '../styles/theme'

import { Link, PageRendererProps, graphql, useStaticQuery } from 'gatsby'
import { MarkdownRemark, Query } from '../utils/graphql'

import Create from './Create'
import DarkModeButton from '../components/DarkModeButton'
import Layout from '../components/Layout'
import React from 'react'
import { RelatedLink } from '../types'
import SEO from '../components/SEO'
import { StickyLink } from '../components/StickyNav'
import StickyNavLayout from '../components/StickyNavLayout'
import { css } from '@emotion/react'
import difference from 'lodash/difference'
import findImage from '../utils/findImage'
import { isLoggedIn } from '../utils/auth'
import order from '../../content/docs/nav.json'
import removeTrailingSlash from '../utils/removeTrailingSlash'
import sortBy from 'lodash/sortBy'
import uniqBy from 'lodash/uniqBy'

interface Props {
  location: PageRendererProps['location']
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
      href: node.fields!.slug!,
      section: node.fields!.folder!,
      title: node.frontmatter!.title!,
      navId: node.frontmatter!.navId!
    })
  })
  const orderedLinks = orderLinks(links)
  if (selectFirst) {
    orderedLinks[0].forceSelect = true
  }
  const frontmatter = post.frontmatter!

  return (
    <Layout>
      <SEO
        title={`${frontmatter.title} - Spokestack`}
        description={
          'Explore our Developer Docs to learn about Spokestack’s services, including TTS and on-device ASR, wake word, and NLU. All of our documentation is also available on GitHub.' +
          frontmatter.description
            ? ` ${frontmatter.description}`
            : ''
        }
        image={
          frontmatter.seoImage?.publicURL
            ? `${removeTrailingSlash(process.env.SITE_URL!)}${
                frontmatter.seoImage.publicURL
              }`
            : findImage(post.html!)
        }
      />
      <StickyNavLayout links={orderedLinks} location={location}>
        <header className="docs-header">
          {selectFirst ? (
            <h2>
              <a href={post.fields!.slug!}>{frontmatter.title}</a>
            </h2>
          ) : (
            <h2>{frontmatter.title}</h2>
          )}
          <DarkModeButton />
        </header>
        {!!frontmatter.hero?.publicURL && (
          <img
            alt={frontmatter.description!}
            css={styles.hero}
            src={frontmatter.hero.publicURL}
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: post.html! }} />
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
              href={post.fields!.githubLink!}
              rel="noopener noreferrer"
              target="_blank">
              Edit this doc!
            </a>
            Questions?{' '}
            <a href="https://forum.spokestack.io/">Visit our forum</a>
          </div>
        </div>
      </StickyNavLayout>
      {!isLoggedIn() && <Create />}
    </Layout>
  )
}

const styles = {
  footer: css`
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    border-top: 1px solid ${theme.mainBorder};

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
  hero: css`
    width: 100%;
    border-radius: 7px;
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
