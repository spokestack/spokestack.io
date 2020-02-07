import React, { useEffect, useState } from 'react'

import * as theme from '../utils/theme'
import { DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import { Link } from 'gatsby'
import SVGIcon from './SVGIcon'
import { StickyLink } from '../types'
import { css } from '@emotion/core'
import hashToId from '../utils/hashToId'
import iconArrowDown from '../icons/arrow-down.svg'
import { adjustFontSizeTo } from '../utils/typography'
import { WindowLocation } from '@reach/router'

interface Props {
  headerText: string
  links: StickyLink[]
  location: WindowLocation

  // Hash matching only
  matchHash?: boolean
  onSelect?: (id: string) => void
  selectedId?: string
}

export default function StickyNavSection({
  headerText,
  links,
  location,
  matchHash,
  onSelect,
  selectedId
}: Props) {
  const storageKey = `sticky-nav-section-${headerText}`
  const [open, setOpen] = useState(
    typeof window !== 'undefined'
      ? localStorage.getItem(storageKey) !== 'false'
      : true
  )
  useEffect(() => {
    if (headerText) {
      localStorage.setItem(storageKey, JSON.stringify(open))
    }
  }, [open])

  return (
    <div css={styles.stickyNavSection}>
      {headerText && (
        <h3 css={styles.stickyNavHeader} onClick={() => setOpen(!open)}>
          <a>
            {headerText}
            <SVGIcon
              className={open ? 'open' : ''}
              extraCss={styles.headerIcon}
              icon={iconArrowDown.id}
            />
          </a>
        </h3>
      )}
      <div className={open ? 'open' : ''} css={styles.stickyNavDetails}>
        {links.map((link, i) => {
          const id = `${hashToId(link.href)}-link`
          return matchHash ? (
            <a
              key={`sticky-nav-link-${i}`}
              css={styles.stickyNavLink}
              className={
                id === selectedId ? 'sticky-nav-link-active-no-bg' : ''
              }
              id={id}
              href={link.href.replace(
                new RegExp(location.pathname + '\\/?'),
                ''
              )}
              title={link.title}
              onClick={() => onSelect(id)}>
              {link.title}
            </a>
          ) : link.forceSelect ? (
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
      </div>
    </div>
  )
}

const styles = {
  stickyNavSection: css`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    ${DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  stickyNavHeader: css`
    margin: 0 0 10px;
    padding: 0 15px 0 45px;
    ${adjustFontSizeTo('16px')};

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
    width: 25px;
    height: 25px;

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
    font-size: ${adjustFontSizeTo('16px').fontSize};
    line-height: 1.2;
    padding: 10px 45px;
    text-decoration: none;
    user-select: none;
    color: ${theme.linkStickyNav};

    &:visited {
      color: ${theme.linkStickyNav};
    }
    &:hover {
      color: ${theme.linkStickyNavHover};
    }
    &.sticky-nav-link-active,
    &.sticky-nav-link-active-no-bg {
      color: ${theme.linkStickyNavActive} !important;
      cursor: default;
      pointer-events: none;
    }
    &.sticky-nav-link-active {
      border-radius: 50px 0 0 50px;
      background-color: ${theme.mainBackground};
    }
  `
}
