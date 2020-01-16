import { css } from '@emotion/core'
import React, { useEffect, useState } from 'react'

import * as theme from '../utils/theme'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import NavSelectedBackground from './NavSelectedBackground'
import Select from './Select'
import { StickyLink } from '../types'
import StickyNavSection from './StickyNavSection'
import { WindowLocation } from '@reach/router'
import { adjustFontSizeTo } from '../utils/typography'
import groupBy from 'lodash/groupBy'
import hashToId from '../utils/hashToId'

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

function optionsFromLinks(links: StickyLink[]) {
  return links.map((link) => (
    <option key={`option-${link.title}`} value={link.href}>
      {link.title}
    </option>
  ))
}

export default function StickyNav({ links = [], location, matchHash }: StickyNavProps) {
  if (!links.length || (matchHash && !location)) {
    return null
  }
  const [selectedLink, setSelectedLink] = useState<StickyLink>(null)
  const [selectedId, setSelectedId] = useState<string>(null)
  useEffect(() => {
    if (matchHash) {
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
        const elem = (link.ref && link.ref.current) || document.querySelector(link.refSelector)
        if (elem) {
          observer.observe(elem)
        }
      })
      setTimeout(() => {
        setSelectedId(`${hashToId(location.hash || links[0].href)}-link`)
      }, 200)
    }
    links.forEach((link) => {
      if (linkIsSelected(link)) {
        setSelectedLink(link)
      }
    })
  }, [])
  const groupedLinks = groupBy(links, 'section')
  const sections = Object.keys(groupedLinks)

  return (
    <nav css={styles.stickyNav}>
      {!matchHash && (
        <Select
          id="sticky-nav"
          extraCss={styles.mobileNav}
          selectCss={styles.mobileNavSelect}
          labelCss={styles.mobileNavLabel}
          iconWrapCss={styles.mobileNavIconWrap}
          iconCss={styles.mobileNavIcon}
          selected={
            selectedLink
              ? {
                  title: selectedLink.title,
                  value: selectedLink.href
                }
              : undefined
          }
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
          location={location}
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
    ${MIN_DEFAULT_MEDIA_QUERY} {
      position: sticky;
      top: 25px;
      margin-bottom: 25px;
      min-width: 250px;
    }
  `,
  mobileNav: css`
    height: 64px;
    ${MIN_DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  mobileNavSelect: css`
    height: 64px;
    padding-left: 20px;
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
    fill: ${theme.header};
  `,
  section: css`
    display: flex;
    flex-direction: column;
  `,
  stickyNavLink: css`
    padding: 15px 45px;
    text-decoration: none;
    user-select: none;
    color: ${theme.linkStickyNav};

    &:visited {
      color: ${theme.linkStickyNav};
    }
    &:hover {
      color: ${theme.linkStickyNavHover};
    }
  `
}
