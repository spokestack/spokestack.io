import * as theme from '../styles/theme'

import { PageRendererProps, graphql, useStaticQuery } from 'gatsby'
import { MarkdownRemark, Query } from '../utils/graphql'

import Create from './Create'
import DarkModeButton from '../components/DarkModeButton'
import Layout from '../components/Layout'
import React from 'react'
import { PageContext } from '../types'
import SEO from '../components/SEO'
import { StickyLink } from '../components/StickyNav'
import StickyNavLayout from '../components/StickyNavLayout'
import { css, Global } from '@emotion/react'
import difference from 'lodash/difference'
import findImage from '../utils/findImage'
import { isLoggedIn } from '../utils/auth'
import order from '../../content/docs/nav.json'
import removeTrailingSlash from '../utils/removeTrailingSlash'
import sortBy from 'lodash/sortBy'
import uniqBy from 'lodash/uniqBy'
import Related from './Related'
import hashToId from '../utils/hashToId'

interface Props {
  location: PageRendererProps['location']
  post: MarkdownRemark
  related?: PageContext['related']
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
    const fields = node.fields!
    const frontmatter = node.frontmatter!
    const title = frontmatter.title!
    links.push({
      href: fields.slug!,
      section: fields.folder!,
      title,
      navId: frontmatter.navId!,
      navTitle: frontmatter.navTitle || title
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
        <div dangerouslySetInnerHTML={{ __html: post.html! }} />
        <Related
          description="Want to dive deeper into the world of Android voice integration? We've got a lot to say on the subject:"
          githubLink={post.fields!.githubLink!}
          related={related}
        />
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
            navTitle
            title
          }
        }
      }
    }
  }
`
