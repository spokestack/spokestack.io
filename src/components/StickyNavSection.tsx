import React, { useEffect, useState } from 'react'

import { Link } from 'gatsby'
import SVGIcon from './SVGIcon'
import { StickyLink } from '../types'
import { css } from '@emotion/core'
import hashToId from '../utils/hashToId'
import iconArrowDown from '../icons/arrow-down.svg'
import { rhythm } from '../utils/typography'

interface Props {
  headerText: string
  links: StickyLink[]
  selectFirst?: boolean

  // Hash matching only
  matchHash?: boolean
  onSelect?: (id: string) => void
  selectedId?: string
}

export default function StickyNavSection({
  headerText,
  links,
  selectFirst,
  matchHash,
  onSelect,
  selectedId
}: Props) {
  const storageKey = `sticky-nav-section-${headerText}`
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fromStorage = localStorage.getItem(storageKey)
    if (fromStorage != null) {
      setOpen(fromStorage !== 'false')
    }
  }, [])
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(open))
  }, [open])

  return (
    <div css={styles.stickyNavSection}>
      {headerText && (
        <h3 css={styles.stickyNavHeader} onClick={() => setOpen(!open)}>
          <a href="#">
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
              style={{
                color:
                  id === selectedId
                    ? 'var(--sticky-nav-link-color-active)'
                    : 'var(--sticky-nav-link-color)'
              }}
              id={id}
              href={link.href}
              title={link.title}
              onClick={() => onSelect(id)}>
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
      </div>
    </div>
  )
}

const styles = {
  stickyNavSection: css`
    display: flex;
    flex-direction: column;
    margin-bottom: ${rhythm(1)};
  `,
  stickyNavHeader: css`
    margin: 0 0 10px;
    padding: 0 15px 0 45px;

    a {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 0;
      color: var(--header-color);
    }
  `,
  headerIcon: css`
    fill: var(--header-color);
    width: 25px;
    height: 25px;

    &.open {
      transform: rotateZ(-180deg);
    }
  `,
  stickyNavDetails: css`
    display: none;
    flex-direction: column;

    &.open {
      display: flex;
    }
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
