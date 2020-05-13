import * as theme from '../utils/theme'

import {
  DEFAULT_WIDTH,
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_LARGE_DISPLAY_MEDIA_QUERY
} from 'typography-breakpoint-constants'
import { Global, SerializedStyles, css } from '@emotion/core'

import BlogListItem from '../components/BlogListItem'
import DarkModeButton from '../components/DarkModeButton'
import Layout from '../components/Layout'
import { MarkdownRemarkEdge } from '../utils/graphql'
import React from 'react'
import SVGIcon from '../components/SVGIcon'
import Tags from '../components/Tags'
import { rhythm } from '../utils/typography'

interface Props {
  currentPage: number
  extraCss?: SerializedStyles
  header?: React.ReactNode
  numPages: number
  posts: MarkdownRemarkEdge[]
  tags: string[]
  title?: string
}

export default function BlogList({
  currentPage,
  extraCss,
  header,
  numPages,
  posts,
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
      <div className="blog-list" css={[styles.container, extraCss]}>
        <div className="bg-banner" css={styles.bgBanner} />
        <div className="sidenav" css={styles.sidenav}>
          <Tags header="Tags" tags={tags} />
        </div>
        <div css={styles.content}>
          {header ? (
            header
          ) : (
            <header className="docs-header" css={styles.header}>
              <h1>{title}</h1>
              <DarkModeButton />
            </header>
          )}
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
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 20px 20px ${rhythm(2)};

    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding-top: 215px;
      padding-left: 40px;
      padding-right: 40px;
      flex-direction: row;
      display: grid;
      grid-template-columns: minmax(300px, 365px) 1fr minmax(300px, 365px);
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
  bgBanner: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 260px;
      z-index: -1;
      background: linear-gradient(
          ${theme.primaryColor.fade(0.9).toString()},
          ${theme.primaryColor.fade(0.9).toString()}
        ),
        url(/logo-light-blue-rotated.svg) -180px -180px no-repeat,
        url(/logo-light-blue-flipped.svg) -180px 350px no-repeat,
        url(/logo-light-blue.svg) 380px 40px no-repeat,
        url(/logo-light-blue-rotated.svg) 900px -180px no-repeat,
        url(/logo-light-blue-flipped.svg) 900px 350px no-repeat,
        url(/logo-light-blue.svg) 1400px 40px no-repeat,
        url(/logo-light-blue-rotated.svg) 1900px -180px no-repeat,
        url(/logo-light-blue-flipped.svg) 1900px 350px no-repeat;
    }
  `,
  sidenav: css`
    grid-area: sidenav;
    padding-right: 20px;
    margin-bottom: 40px;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding-top: 50px;
    }
  `,
  content: css`
    position: relative;
    grid-area: content;
    max-width: ${DEFAULT_WIDTH};
    margin: 0 auto;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      min-width: 608px;
    }
  `,
  header: css`
    ${MIN_DEFAULT_MEDIA_QUERY} {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 100%;
    }
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
