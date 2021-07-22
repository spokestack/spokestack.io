import * as theme from '../styles/theme'

import { Global, css } from '@emotion/react'
import { Mdx, Query } from '../utils/graphql'
import { PageRendererProps, graphql, useStaticQuery } from 'gatsby'
import orderDocsLinks, { DocsLinks } from '../utils/orderDocsLinks'

import Create from './Create'
import DarkModeButton from '../components/DarkModeButton'
import Layout from '../components/Layout'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { PageContext } from '../types'
import React from 'react'
import Related from './Related'
import SEO from '../components/SEO'
import StickyNavLayout from '../components/StickyNavLayout'
import findImage from '../utils/findImage'
import hashToId from '../utils/hashToId'
import { isLoggedIn } from '../utils/auth'
import removeTrailingSlash from '../utils/removeTrailingSlash'

interface Props {
  location: PageRendererProps['location']
  post: Mdx
  related?: PageContext['related']
  selectFirst?: boolean
}

export default function DocsPage({
  location,
  post,
  related,
  selectFirst
}: Props) {
  const links: DocsLinks = {}
  const data = useStaticQuery<Query>(docsPageQuery)
  const posts = data.allMdx.edges
  posts.forEach(({ node }) => {
    const fields = node.fields!
    const frontmatter = node.frontmatter!
    const title = frontmatter.title!
    const navId = frontmatter.navId!
    if (links[navId] != null) {
      throw new Error(
        `The navId "${navId}" is not unique. Ensure only one doc has this navId.`
      )
    }
    links[navId] = {
      href: fields.slug!,
      section: fields.folder!,
      title,
      navId,
      navTitle: frontmatter.navTitle || title
    }
  })
  const orderedLinks = orderDocsLinks(links)
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
            : findImage(post.body!)
        }
      />
      <Global
        styles={css`
          .forum-link {
            .icon {
              stroke: ${theme.link};
            }
            &:hover .icon {
              stroke: ${theme.linkHover};
            }
            &:active .icon {
              stroke: ${theme.linkActive};
            }
          }
          html.dark-mode {
            .forum-link {
              .icon {
                stroke: ${theme.linkDark};
              }
              &:hover .icon {
                stroke: ${theme.linkDarkHover};
              }
              &:active .icon {
                stroke: ${theme.linkDarkActive};
              }
            }
          }
        `}
      />
      <StickyNavLayout showHeaderNav links={orderedLinks} location={location}>
        <header className="docs-header">
          {selectFirst ? (
            <h2 id={hashToId(frontmatter.title!)}>
              <a href={post.fields!.slug!}>{frontmatter.title}</a>
            </h2>
          ) : (
            <h2 id={hashToId(frontmatter.title!)}>{frontmatter.title}</h2>
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
        <MDXRenderer>{post.body!}</MDXRenderer>
        {post.fields?.slug !== '/docs/overview' && (
          <Related
            description="Want to dive deeper into the world of Android voice integration? We've got a lot to say on the subject:"
            githubLink={post.fields!.githubLink!}
            related={related}
          />
        )}
      </StickyNavLayout>
      {!isLoggedIn() && <Create />}
    </Layout>
  )
}

const styles = {
  hero: css`
    width: 100%;
    border-radius: 7px;
  `
}

export const docsPageQuery = graphql`
  query docsPageQuery {
    allMdx(
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
            navTitle
            title
          }
        }
      }
    }
  }
`
