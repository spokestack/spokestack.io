import { Global, css } from '@emotion/core'
import React, { useEffect, useState } from 'react'

import NavSelectedBackground from './NavSelectedBackground'
import { StickyLink } from '../types'
import StickyNavSection from './StickyNavSection'
import { WindowLocation } from '@reach/router'
import groupBy from 'lodash/groupby'
import hashToId from '../utils/hashToId'

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
  const groupedLinks = groupBy(links, 'section')
  const sections = Object.keys(groupedLinks)

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
      {sections.map((section) => (
        <StickyNavSection
          key={`sticky-nav-section-${section}`}
          headerText={section !== 'null' ? section : null}
          links={groupedLinks[section]}
          selectFirst={selectFirst}
          matchHash={matchHash}
          onSelect={(id) => setSelectedId(id)}
          selectedId={selectedId}
        />
      ))}
      <NavSelectedBackground selectedId={selectedId} />
    </nav>
  )
}

const styles = {
  stickyNav: css`
    --sticky-nav-link-color: #8da6e3;
    --sticky-nav-link-color-hover: var(--link-color-hover);
    --sticky-nav-link-color-active: var(--link-color);
    position: sticky;
    top: 25px;
    margin-bottom: 25px;
  `,
  section: css`
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
    &:hover {
      color: var(--sticky-nav-link-color-hover);
    }
  `
}
