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
}

export default function StickyNav({ links = [], location, matchHash }: StickyNavProps) {
  if (!links.length || (matchHash && !location)) {
    return null
  }
  const [selectedId, setSelectedId] = useState<string>(null)
  if (matchHash) {
    useEffect(() => {
      const observer = new IntersectionObserver(
        function(entries) {
          console.log(
            entries.reduce((acc, entry) => {
              if (entry.isIntersecting) {
                acc.push(entry)
              }
              return acc
            }, [])
          )
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
            id={id}
            href={link.href}
            title={link.title}
            onClick={() => setSelectedId(id)}>
            {link.title}
          </a>
        ) : i === 0 ? (
          <a
            key={`sticky-nav-link-${i}`}
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
    position: sticky;
    top: 25px;
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;
  `,
  stickyNavLink: css`
    padding: 15px 45px;
  `
}
