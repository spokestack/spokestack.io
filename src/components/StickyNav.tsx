import * as theme from '../styles/theme'

import React, { useEffect, useRef, useState } from 'react'
import StickyNavSection, { StickyLink } from './StickyNavSection'

import NavSelectedBackground from './NavSelectedBackground'
import Select from './Select'
import { WindowLocation } from '@reach/router'
import { css } from '@emotion/react'
import currentPath from '../utils/currentPath'
import groupBy from 'lodash/groupBy'
import hashToId from '../utils/hashToId'
import throttle from 'lodash/throttle'

export type { StickyLink }

export interface StickyNavProps {
  hideSelect?: boolean
  links: StickyLink[]
  location: WindowLocation
  startOpen?: boolean
}

function isSection(section: string) {
  return section !== 'undefined' && section !== 'null'
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
  location,
  startOpen
}: StickyNavProps) {
  if (!links.length) {
    return null
  }
  const navRef = useRef<HTMLElement>(null)
  const [selectedLink, setSelectedLink] = useState<StickyLink>(null)
  const [selectedId, setSelectedId] = useState<string>(null)
  const [selectedElemVisible, setSelectedElemVisible] = useState<boolean>(null)
  useEffect(() => {
    const locs: { [key: number]: HTMLElement } = {}
    const linksWithHash: StickyLink[] = []
    const rcurrentPath = currentPath(location.pathname)
    links.forEach((link) => {
      if (link.matchHash) {
        const elem =
          (link.ref && link.ref.current) ||
          document.querySelector(link.refSelector)
        if (elem) {
          locs[elem.offsetTop + elem.offsetHeight / 3] = elem
        }
        linksWithHash.push(link)
      } else if (link.forceSelect || rcurrentPath.test(link.href)) {
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
    const timeout = setTimeout(() => {
      document.addEventListener('scroll', onScroll, { passive: true })
      if (linksWithHash.length) {
        const id = `${hashToId(location.hash || linksWithHash[0].href)}-link`
        setSelectedId(id)
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
      if (elem && navRef.current && navRef.current.scrollTo) {
        navRef.current.scrollTo({ top: elem.offsetTop - 25 })
      }
    }
  }, [selectedLink])
  const groupedLinks = groupBy(links, 'section')
  const sections = Object.keys(groupedLinks)
  const selectedElem =
    !selectedLink && selectedId && document.getElementById(selectedId)
  function updateSelectedElemVisible() {
    if (selectedElem) {
      setSelectedElemVisible(selectedElem.getClientRects().length > 0)
    }
  }
  useEffect(updateSelectedElemVisible, [selectedElem])

  return (
    <nav ref={navRef} css={styles.stickyNav}>
      {!hideSelect && (
        <Select
          id="sticky-nav"
          extraCss={styles.mobileNav}
          selectCss={styles.mobileNavSelect}
          labelCss={styles.mobileNavLabel}
          selected={
            selectedLink
              ? {
                  title: selectedLink.title,
                  value: selectedLink.href
                }
              : {
                  title: links[0].title,
                  value: links[0].href
                }
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
          startOpen={
            startOpen ||
            (selectedLink && selectedLink.section === section) ||
            (selectedId &&
              groupedLinks[section].some(
                (link) => `${hashToId(link.href)}-link` === selectedId
              ))
          }
          headerText={isSection(section) ? section : null}
          links={groupedLinks[section]}
          location={location}
          onOpenChange={updateSelectedElemVisible}
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
      {/* Check if the selected element is visible */}
      {selectedElem && selectedElemVisible && (
        <NavSelectedBackground selected={selectedElem} />
      )}
    </nav>
  )
}

const styles = {
  stickyNav: css`
    position: relative;
    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      position: sticky;
      top: 0;
      bottom: 0;
      padding: 30px 0;
      min-width: 250px;
      max-height: calc(100vh - 60px);
      overflow-y: auto;
    }
    ${theme.MIN_LARGER_DISPLAY_MEDIA_QUERY} {
      padding-top: 60px;
      max-height: calc(100vh - 90px);
    }
  `,
  mobileNav: css`
    height: 64px;
    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
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
      font-size: 20px;
    }
  `,
  section: css`
    display: flex;
    flex-direction: column;
  `
}
