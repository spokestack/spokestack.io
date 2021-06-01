import * as theme from '../styles/theme'

import { Global, css } from '@emotion/react'
import React, { MutableRefObject, useEffect, useState } from 'react'

import { Link } from 'gatsby'
import SVGIcon from './SVGIcon'
import { WindowLocation } from '@reach/router'
import currentPath from '../utils/currentPath'
import getHash from '../utils/getHash'
import hashToId from '../utils/hashToId'

export interface StickyLink {
  forceSelect?: boolean
  href: string
  matchHash?: boolean
  navId?: string
  ref?: MutableRefObject<HTMLElement>
  refSelector?: string
  section?: string
  title: string
}

interface Props {
  startOpen?: boolean
  headerText?: string
  links: StickyLink[]
  location: WindowLocation
  onOpenChange: (open: boolean) => void
  onSelect: (id: string) => void
  selectedId?: string
}

export default function StickyNavSection({
  headerText,
  links,
  location,
  onOpenChange,
  onSelect,
  selectedId,
  startOpen = false
}: Props) {
  const storageKey = `sticky-nav-section-${headerText}`
  const [open, setOpen] = useState(startOpen || !headerText)
  useEffect(() => {
    const openStorageValue = localStorage.getItem(storageKey)
    if (
      (!startOpen &&
        openStorageValue !== null &&
        openStorageValue === 'true') ||
      (!open && startOpen) ||
      !headerText
    ) {
      setOpen(true)
      requestAnimationFrame(() => onOpenChange(true))
    }
  }, [startOpen])
  useEffect(() => {
    if (headerText) {
      localStorage.setItem(storageKey, JSON.stringify(open))
    }
  }, [headerText, open])

  const rcurrentPath = currentPath(location.pathname)

  return (
    <div css={styles.stickyNavSection}>
      <Global
        styles={css`
          .sticky-nav-link.active,
          .nav-selected-bg {
            background-color: ${theme.mainBackground};
          }
          .sticky-nav-link.active,
          .sticky-nav-link.active-no-bg {
            color: ${theme.link} !important;
          }
          .sticky-nav-wrap .select-label .icon,
          .sticky-nav-header-icon {
            fill: ${theme.header};
          }

          html.dark-mode {
            .nav-selected-bg,
            .sticky-nav-link.active {
              background-color: ${theme.mainBackgroundDark};
            }
            .sticky-nav-link.active,
            .sticky-nav-link.active-no-bg {
              color: ${theme.linkDark} !important;
            }
            .sticky-nav-wrap .select-label .icon,
            .sticky-nav-header-icon {
              fill: ${theme.textDarkBg};
            }
          }
        `}
      />
      {headerText && (
        <h5
          css={styles.stickyNavHeader}
          onClick={() => {
            setOpen(!open)
            requestAnimationFrame(() => onOpenChange(!open))
          }}>
          <a>
            {headerText}
            <SVGIcon
              className={`sticky-nav-header-icon ${open ? 'open' : ''}`}
              icon="#arrow-down"
              extraCss={styles.headerIcon}
            />
          </a>
        </h5>
      )}
      <div className={open ? 'open' : ''} css={styles.stickyNavDetails}>
        {links.map((link, i) => {
          const hash = getHash(link.href)
          const id = `${hashToId(hash)}-link`
          return link.matchHash && rcurrentPath.test(link.href) ? (
            <a
              key={`sticky-nav-link-${i}`}
              css={styles.stickyNavLink}
              className={`sticky-nav-link ${
                id === selectedId ? 'active-no-bg' : ''
              }`}
              id={id}
              href={'#' + hash}
              title={link.title}
              onClick={() => onSelect(id)}>
              {link.title}
            </a>
          ) : link.forceSelect ? (
            <a
              key={`sticky-nav-link-${i}`}
              id={id}
              css={styles.stickyNavLink}
              className="sticky-nav-link active"
              href={link.href}
              title={link.title}>
              {link.title}
            </a>
          ) : (
            <Link
              key={`sticky-nav-link-${i}`}
              css={styles.stickyNavLink}
              className="sticky-nav-link"
              id={id}
              activeClassName="active"
              title={link.title}
              to={link.href}>
              {link.title}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

const styles = {
  stickyNavSection: css`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    ${theme.DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  stickyNavHeader: css`
    padding: 0 20px;
    margin-bottom: 10px;
    font-size: 16px;
    text-transform: uppercase;

    a {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 0;
      color: ${theme.header};
      cursor: pointer;
    }
  `,
  headerIcon: css`
    fill: ${theme.header};
    width: 13px;
    height: 13px;

    &.open {
      transform: rotateZ(-180deg);
    }
  `,
  stickyNavDetails: css`
    display: none;
    flex-direction: column;
    z-index: 1;

    &.open {
      display: flex;
    }
  `,
  stickyNavLink: css`
    line-height: 1.2;
    padding: 10px 20px;
    text-decoration: none;
    user-select: none;
    font-weight: 400;
    font-size: 16px;

    &,
    &:visited {
      color: ${theme.headerColor.fade(0.25).toString()};
    }
    &:hover {
      color: ${theme.linkHover};
    }
    &.active,
    &.active-no-bg {
      cursor: default;
      pointer-events: none;
      font-weight: 700;
    }
    &.active {
      border-radius: 50px 0 0 50px;
    }
  `
}
