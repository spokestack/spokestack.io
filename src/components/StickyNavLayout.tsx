import * as theme from '../styles/theme'

import { Global, css } from '@emotion/react'
import StickyNav, { StickyLink, StickyNavProps } from './StickyNav'

import React, { useEffect, useRef, useState } from 'react'
import { Link } from '../types'

export type { StickyLink }

interface Props extends StickyNavProps {
  children: React.ReactNode
  id?: string
  header?: string
  rightContent?: React.ReactNode
  showHeaderNav?: boolean
}

interface HeaderLink extends Link {
  selected: boolean
}

export default function StickyNavLayout({
  children,
  id,
  location,
  showHeaderNav,
  ...props
}: Props) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [headerLinks, setHeaderLinks] = useState<HeaderLink[]>([])

  useEffect(() => {
    const selectedId = location.hash.replace('#', '')
    const headers = Array.from(
      contentRef.current!.querySelectorAll('h1[id], h2[id], h3[id]')
    )
    const links = headers.map((header) => ({
      title: header.textContent!,
      href: `#${header.id}`,
      selected: header.id === selectedId
    }))
    setHeaderLinks(links)
  }, [children])

  return (
    <div id={id} css={styles.container} className="ie-fix">
      <Global
        styles={css`
          html.dark-mode .sticky-nav-wrap {
            background-color: ${theme.stickyNavBackgroundDark};
          }
        `}
      />
      <div css={styles.stickyNavWrap} className="sticky-nav-wrap">
        <StickyNav location={location} {...props} />
      </div>
      <article className="main-content ie-fix" css={styles.content}>
        <div css={styles.contentWrap} ref={contentRef}>
          {children}
        </div>
      </article>
      {showHeaderNav && (
        <div css={styles.headerNav}>
          <div css={styles.stickyHeaderNav}>
            {headerLinks.map((link, i) => (
              <a
                key={`header-link-${link.href}`}
                css={styles.headerLink}
                className={link.selected ? 'selected' : ''}
                href={link.href}>
                {i === 0 ? 'Introduction' : link.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    width: 100%;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      display: grid;
      grid-template-areas: 'sidenav content';
      grid-template-columns:
        minmax(${theme.MIN_SIDEBAR_WIDTH}, ${theme.MAX_SIDEBAR_WIDTH})
        1fr;
    }

    ${theme.MIN_LARGER_DISPLAY_MEDIA_QUERY} {
      grid-template-areas: 'sidenav content headernav';
      grid-template-columns:
        minmax(${theme.MIN_SIDEBAR_WIDTH}, ${theme.MAX_SIDEBAR_WIDTH})
        1fr
        ${theme.MIN_SIDEBAR_WIDTH};
    }
  `,
  mobileNav: css`
    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  stickyNavWrap: css`
    background-color: ${theme.stickyNavBackground};
    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      grid-area: sidenav;
    }
    ${theme.ieBreakpointMinDefault} {
      padding-bottom: 50px;
    }
  `,
  content: css`
    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      grid-area: content;
      overflow: hidden;
    }
  `,
  contentWrap: css`
    padding: 60px 20px 50px;
    max-width: ${theme.MAX_TEXT_WIDTH};
    margin: 0 auto;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      padding-left: 50px;
      padding-right: 50px;
    }
  `,
  headerNav: css`
    display: none;

    ${theme.MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      display: block;
      grid-area: headernav;
      border-left: 1px solid ${theme.mainBorder};
    }
  `,
  stickyHeaderNav: css`
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    padding: 60px 20px;
    overflow-y: auto;
  `,
  headerLink: css`
    font-size: 14px;

    &,
    &:visited {
      color: ${theme.header};
    }

    &.selected {
      font-weight: 700;
      color: ${theme.primary} !important;
    }

    & + & {
      margin-top: 10px;
    }
  `
}
