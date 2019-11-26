import { Global, css } from '@emotion/core'
import React, { useEffect, useState } from 'react'

import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import NavSelectedBackground from './NavSelectedBackground'
import { StickyLink } from '../types'
import StickyNavSection from './StickyNavSection'
import { WindowLocation } from '@reach/router'
import groupBy from 'lodash/groupBy'
import hashToId from '../utils/hashToId'
import Select from './Select'
import { adjustFontSizeTo } from '../utils/typography'

export interface StickyNavProps {
  links: StickyLink[]
  location?: WindowLocation
  matchHash?: boolean
}

function isSection(section: string) {
  return section !== 'undefined' && section !== 'null'
}

function linkIsSelected(link: StickyLink) {
  return link.forceSelect || window.location.pathname.indexOf(link.href) > -1
}

export default function StickyNav({ links = [], location, matchHash }: StickyNavProps) {
  if (!links.length || (matchHash && !location)) {
    return null
  }
  const [selectedLink, setSelectedLink] = useState<StickyLink>({ title: null, href: null })
  const [selectedId, setSelectedId] = useState<string>(null)
  useEffect(() => {
    if (matchHash) {
      return
    }
    links.forEach((link) => {
      if (linkIsSelected(link)) {
        setSelectedLink(link)
      }
    })
  }, [])
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
  function optionsFromLinks(links: StickyLink[]) {
    return links.map((link) => (
      <option key={`option-${link.title}`} value={link.href}>
        {link.title}
      </option>
    ))
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
      {!matchHash && (
        <Select
          id="sticky-nav"
          extraCss={styles.mobileNav}
          labelCss={styles.mobileNavLabel}
          iconWrapCss={styles.mobileNavIconWrap}
          iconCss={styles.mobileNavIcon}
          selected={{ title: selectedLink.title, value: selectedLink.href }}
          onChange={(value) => {
            window.location.href = value
          }}>
          {sections.map((section) =>
            isSection(section) ? (
              <optgroup label={section} key={`optgroup-${section}`}>
                {optionsFromLinks(groupedLinks[section])}
              </optgroup>
            ) : (
              optionsFromLinks(groupedLinks[section])
            )
          )}
        </Select>
      )}
      {sections.map((section) => (
        <StickyNavSection
          key={`sticky-nav-section-${section}`}
          headerText={isSection(section) ? section : null}
          links={groupedLinks[section]}
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

    ${MIN_DEFAULT_MEDIA_QUERY} {
      position: sticky;
      top: 25px;
      margin-bottom: 25px;
    }
  `,
  mobileNav: css`
    height: 64px;
    ${MIN_DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  mobileNavLabel: css`
    border: none;
    border-radius: 0;

    p {
      font-size: ${adjustFontSizeTo('20px').fontSize};
      font-weight: 700;
    }
  `,
  mobileNavIconWrap: css`
    border: none;
    background: transparent;
  `,
  mobileNavIcon: css`
    fill: var(--header-color);
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
