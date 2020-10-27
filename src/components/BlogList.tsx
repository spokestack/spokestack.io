import * as theme from '../styles/theme'

import { Global, SerializedStyles, css } from '@emotion/core'
import {
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_LARGE_DISPLAY_MEDIA_QUERY
} from 'typography-breakpoint-constants'

import BlogListItem from '../components/BlogListItem'
import DarkModeButton from '../components/DarkModeButton'
import Layout from '../components/Layout'
import { MarkdownRemarkEdge } from '../utils/graphql'
import React from 'react'
import SVGIcon from '../components/SVGIcon'
import Tags from '../components/Tags'
import { WindowLocation } from '@reach/router'
import { rhythm } from '../styles/typography'

interface Props {
  currentPage: number
  extraCss?: SerializedStyles
  header?: React.ReactNode
  // Url that shows all tags
  homeUrl?: string
  location: WindowLocation
  numPages: number
  posts: MarkdownRemarkEdge[]
  tags: string[]
  title?: string
}

export default function BlogList({
  currentPage,
  extraCss,
  header,
  homeUrl,
  location,
  numPages,
  posts,
  tags,
  title
}: Props) {
  const hasPrevious = currentPage > 1
  const hasNext = currentPage < numPages

  return (
    <Layout location={location}>
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
      <div className="blog-list ie-fix" css={[styles.container, extraCss]}>
        <div className="bg-banner" css={styles.bgBanner} />
        <section css={styles.blogContent}>
          <div className="sidenav" css={styles.sidenav}>
            {tags && !!tags.length && (
              <Tags allUrl="/blog" header="Tags" tags={tags} />
            )}
          </div>
          <div css={styles.content}>
            {header ? (
              header
            ) : (
              <header className="docs-header" css={styles.header}>
                <h2>{title}</h2>
                <DarkModeButton />
              </header>
            )}
            {posts.map(({ node }) => (
              <BlogListItem key={node.fields.slug} post={node} />
            ))}
            {(hasPrevious || hasNext) && (
              <div className="blog-nav-links" css={styles.blogNavLinks}>
                {hasPrevious ? (
                  <a
                    href={
                      currentPage === 2
                        ? homeUrl
                        : `${homeUrl}/${currentPage - 1}`
                    }
                    css={styles.blogNavLink}>
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
                  <a
                    href={`${homeUrl}/${currentPage + 1}`}
                    css={styles.blogNavLink}>
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
        </section>
      </div>
    </Layout>
  )
}

const styles = {
  container: css`
    position: relative;
    padding: 20px 20px ${rhythm(2)};

    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding-top: 215px;
      padding-left: 40px;
      padding-right: 40px;
    }

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      padding-left: 100px;
      padding-right: 100px;
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
  blogContent: css`
    display: flex;
    flex-direction: column;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      display: grid;
      grid-template-columns:
        minmax(${theme.MIN_SIDEBAR_WIDTH}, ${theme.MAX_SIDEBAR_WIDTH}) minmax(
          ${theme.MIN_TEXT_WIDTH},
          ${theme.MAX_TEXT_WIDTH}
        )
        minmax(${theme.MIN_SIDEBAR_WIDTH}, ${theme.MAX_SIDEBAR_WIDTH});
      grid-template-rows: auto 1fr;
      grid-template-areas: 'sidenav content';
      margin: 0 auto;
      max-width: calc(
        ${theme.MAX_SIDEBAR_WIDTH} + ${theme.MAX_TEXT_WIDTH} +
          ${theme.MAX_SIDEBAR_WIDTH}
      );
    }
  `,
  sidenav: css`
    grid-area: sidenav;
    padding-right: 20px;
    margin-bottom: 40px;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      padding-top: 50px;
    }

    ${theme.ieBreakpoint} {
      width: 100%;
      min-width: ${theme.MIN_SIDEBAR_WIDTH};
      max-width: ${theme.MAX_SIDEBAR_WIDTH};
    }
  `,
  content: css`
    position: relative;
    grid-area: content;
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
    fill: ${theme.primary};
  `
}
