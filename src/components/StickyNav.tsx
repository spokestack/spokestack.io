import * as theme from '../styles/theme'

import React, { useEffect, useRef, useState } from 'react'

import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import NavSelectedBackground from './NavSelectedBackground'
import Select from './Select'
import { StickyLink } from '../types'
import StickyNavSection from './StickyNavSection'
import { WindowLocation } from '@reach/router'
import { adjustFontSizeTo } from '../styles/typography'
import { css } from '@emotion/core'
import groupBy from 'lodash/groupBy'
import hashToId from '../utils/hashToId'
import throttle from 'lodash/throttle'

export interface StickyNavProps {
  hideSelect?: boolean
  links: StickyLink[]
  location: WindowLocation
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

let navigating = true

export default function StickyNav({
  hideSelect,
  links = [],
  location
}: StickyNavProps) {
  if (!links.length) {
    return null
  }
  const navRef = useRef<HTMLElement>(null)
  const [selectedLink, setSelectedLink] = useState<StickyLink>(null)
  const [selectedId, setSelectedId] = useState<string>(null)
  useEffect(() => {
    const locs: { [key: number]: HTMLElement } = {}
    const linksWithHash: StickyLink[] = []
    links.forEach((link) => {
      if (link.matchHash) {
        const elem =
          (link.ref && link.ref.current) ||
          document.querySelector(link.refSelector)
        if (elem) {
          locs[elem.offsetTop + elem.offsetHeight / 3] = elem
        }
        linksWithHash.push(link)
      } else if (linkIsSelected(link)) {
        setSelectedLink(link)
      }
    })
    const orderedLocs = Object.keys(locs).map(Number).sort().reverse()
    const onScroll = throttle(() => {
      if (navigating) {
        return
      }
      const scroll = window.scrollY + window.innerHeight
      for (const loc of orderedLocs) {
        if (scroll > loc + 120) {
          const id = `${locs[loc].id}-link`
          if (selectedId !== id) {
            setSelectedId(id)
          }
          return
        }
      }
    }, 50)
    document.addEventListener('scroll', onScroll, { passive: true })
    const timeout = setTimeout(() => {
      if (linksWithHash.length) {
        setSelectedId(
          `${hashToId(location.hash || linksWithHash[0].href)}-link`
        )
      }
      navigating = false
    }, 200)

    return () => {
      clearTimeout(timeout)
      document.removeEventListener('scroll', onScroll)
    }
  }, [])
  useEffect(() => {
    if (selectedLink) {
      const id = `${hashToId(selectedLink.href)}-link`
      const elem = document.getElementById(id)
      if (elem && navRef.current) {
        navRef.current.scrollTo({ top: elem.offsetTop - 25 })
      }
    }
  }, [selectedLink])
  const groupedLinks = groupBy(links, 'section')
  const sections = Object.keys(groupedLinks)

  return (
    <nav ref={navRef} css={styles.stickyNav}>
      {!hideSelect && (
        <Select
          id="sticky-nav"
          extraCss={styles.mobileNav}
          selectCss={styles.mobileNavSelect}
          labelCss={styles.mobileNavLabel}
          iconWrapCss={styles.mobileNavIconWrap}
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
          onSelect={(id) => {
            navigating = true
            setSelectedId(id)
            setTimeout(() => {
              navigating = false
            }, 200)
          }}
          selectedId={!selectedLink && selectedId}
        />
      ))}
      {!selectedLink && <NavSelectedBackground selectedId={selectedId} />}
    </nav>
  )
}

const styles = {
  stickyNav: css`
    position: relative;
    ${MIN_DEFAULT_MEDIA_QUERY} {
      position: sticky;
      top: 0;
      bottom: 0;
      padding: 25px 0;
      min-width: 250px;
      max-height: calc(100vh - 25px);
      overflow-y: auto;
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
