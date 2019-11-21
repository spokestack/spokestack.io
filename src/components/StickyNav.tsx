import { Global, css } from '@emotion/core'
import React, { MutableRefObject, useEffect, useState } from 'react'

import { Link } from 'gatsby'
import NavSelectedBackground from './NavSelectedBackground'
import { WindowLocation } from '@reach/router'
import hashToId from '../utils/hashToId'

export interface StickyLink {
  href: string
  title: string
  ref?: MutableRefObject<Element>
}

export interface StickyNavProps {
  links: StickyLink[]
  location?: WindowLocation
  matchHash?: boolean
  selectFirst?: boolean
}

export default function StickyNav({
  links = [],
  location,
  matchHash,
  selectFirst
}: StickyNavProps) {
  if (!links.length || (matchHash && !location)) {
    return null
  }
  const [selectedId, setSelectedId] = useState<string>(null)
  if (matchHash) {
    useEffect(() => {
      const observer = new IntersectionObserver(
        function(entries) {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              return setSelectedId(`${entry.target.id}-link`)
            }
          }
        },
        {
          root: null,
          threshold: 1
        }
      )
      links.forEach((link) => {
        observer.observe(link.ref.current)
      })
      setSelectedId(`${hashToId(location.hash || links[0].href)}-link`)
    }, [])
  }

  return (
    <nav css={styles.stickyNav}>
      <Global
        styles={css`
          .sticky-nav-link-active {
            color: var(--sticky-nav-link-color-active) !important;
            border-radius: 50px 0 0 50px;
            background-color: var(--main-background);
          }
        `}
      />
      {links.map((link, i) => {
        const id = `${hashToId(link.href)}-link`
        return matchHash ? (
          <a
            key={`sticky-nav-link-${i}`}
            css={styles.stickyNavLink}
            style={{
              color:
                id === selectedId
                  ? 'var(--sticky-nav-link-color-active)'
                  : 'var(--sticky-nav-link-color)'
            }}
            id={id}
            href={link.href}
            title={link.title}
            onClick={() => setSelectedId(id)}>
            {link.title}
          </a>
        ) : selectFirst && i === 0 ? (
          <a
            key={`sticky-nav-link-${i}`}
            id={id}
            css={styles.stickyNavLink}
            className="sticky-nav-link-active"
            href={link.href}
            title={link.title}>
            {link.title}
          </a>
        ) : (
          <Link
            key={`sticky-nav-link-${i}`}
            css={styles.stickyNavLink}
            activeClassName="sticky-nav-link-active"
            to={link.href}
            title={link.title}>
            {link.title}
          </Link>
        )
      })}
      <NavSelectedBackground selectedId={selectedId} />
    </nav>
  )
}

const styles = {
  stickyNav: css`
    --sticky-nav-link-color: #8da6e3;
    --sticky-nav-link-color-active: var(--link-color);
    position: sticky;
    top: 25px;
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;
  `,
  stickyNavLink: css`
    padding: 15px 45px;
    text-decoration: none;
    user-select: none;
    color: var(--sticky-nav-link-color);

    &:visited {
      color: var(--sticky-nav-link-color);
    }
  `
}
