import * as theme from '../utils/theme'

import { Global, css } from '@emotion/core'
import {
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_LARGE_DISPLAY_MEDIA_QUERY
} from 'typography-breakpoint-constants'

import BlogListItem from '../components/BlogListItem'
import DarkModeButton from '../components/DarkModeButton'
import Layout from '../components/Layout'
import { MarkdownRemarkEdge } from '../utils/graphql'
import React from 'react'
import SEO from '../components/SEO'
import SVGIcon from '../components/SVGIcon'
import Tags from '../components/Tags'
import { rhythm } from '../utils/typography'

interface Props {
  currentPage: number
  numPages: number
  posts: MarkdownRemarkEdge[]
  selectedTag?: string
  tags: string[]
  title: string
}

export default function BlogList({
  currentPage,
  numPages,
  posts,
  selectedTag,
  tags,
  title
}: Props) {
  const hasPrevious = currentPage > 1
  const hasNext = currentPage < numPages

  return (
    <Layout>
      <Global
        styles={css`
          html.dark-mode .blog-nav-links a {
            .icon {
              fill: white;
            }

            &:hover .icon {
              fill: ${theme.linkDarkHover};
            }
          }
        `}
      />
      <SEO
        title="Blog"
        description={
          'The Spokestack Blog. Check out all of our articles related to voice assistants, voice search, Alexa skills, and more.'
        }
      />
      <div className="blog-list" css={styles.container}>
        <div css={styles.sidenav}>
          <Tags header="All Tags" tags={tags} selected={selectedTag} />
        </div>
        <div css={styles.content}>
          <header className="docs-header">
            <h1>{title}</h1>
            <DarkModeButton />
          </header>
          {posts.map(({ node }) => (
            <BlogListItem key={node.fields.slug} post={node} />
          ))}
          {(hasPrevious || hasNext) && (
            <div className="blog-nav-links" css={styles.blogNavLinks}>
              {hasPrevious ? (
                <a href={`/blog/${currentPage - 1}`} css={styles.blogNavLink}>
                  <SVGIcon
                    className="icon"
                    icon="#arrow-forward"
                    extraCss={css`
                      ${styles.iconArrow}
                      transform: rotateY(180deg);
                    `}
                  />
                  Previous
                </a>
              ) : (
                <div />
              )}
              {hasNext && (
                <a href={`/blog/${currentPage + 1}`} css={styles.blogNavLink}>
                  Next
                  <SVGIcon
                    className="icon"
                    icon="#arrow-forward"
                    extraCss={styles.iconArrow}
                  />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    padding: 20px 20px ${rhythm(2)};

    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding: ${rhythm(2)} 40px;
      flex-direction: row;
      display: grid;
      grid-template-columns: minmax(300px, 365px) 608px;
      grid-template-areas: 'sidenav content';
    }

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      padding-left: 100px;
      padding-right: 100px;
    }

    ${theme.ieBreakpoint} {
      width: 100%;
    }
  `,
  sidenav: css`
    grid-area: sidenav;
  `,
  content: css`
    grid-area: content;
  `,
  blogNavLinks: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  blogNavLink: css`
    display: flex;
    align-items: center;
    margin: 10px 20px 0;
    text-decoration: none;

    .icon {
      margin: 0 5px;
      transition: fill 0.1s ${theme.transitionEasing};
      fill: ${theme.link};
    }

    &:hover .icon {
      fill: ${theme.linkHover};
    }
  `,
  iconArrow: css`
    width: 18px;
    height: 18px;
  `
}
