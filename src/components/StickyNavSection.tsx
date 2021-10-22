import * as theme from '../styles/theme'

import { Global, css } from '@emotion/react'
import React, { MutableRefObject, useState } from 'react'

import Color from 'color'
import SVGIcon from './SVGIcon'
import type { WindowLocation } from '@reach/router'
import currentPath from '../utils/currentPath'
import getHash from '../utils/getHash'
import hashToId from '../utils/hashToId'

export interface StickyLink {
  // Specifies an external link
  external?: boolean
  forceSelect?: boolean
  href: string
  matchHash?: boolean
  navId?: string
  // Can be used to set a different title in the nav
  // than the main header
  navTitle?: string
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
  const [open, setOpen] = useState(startOpen || !headerText)
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
            .sticky-nav-link,
            .sticky-nav-link:visited:not(:hover) {
              color: ${Color('#ffffff').fade(0.2).toString()};

              .icon {
                fill: ${Color('#ffffff').fade(0.2).toString()};
              }
            }
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
          }}
        >
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
              onClick={() => onSelect(id)}
            >
              {link.navTitle || link.title}
            </a>
          ) : (
            <a
              key={`sticky-nav-link-${i}`}
              id={id}
              css={styles.stickyNavLink}
              className={`sticky-nav-link${
                link.forceSelect || rcurrentPath.test(link.href)
                  ? ' active'
                  : ''
              }`}
              href={link.href}
              title={link.title}
            >
              {link.navTitle || link.title}
              {link.external && (
                <SVGIcon
                  icon="#external"
                  className="icon"
                  extraCss={styles.externalIcon}
                />
              )}
            </a>
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

    ${theme.DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  stickyNavHeader: css`
    padding: 12px 20px;
    margin: 0;
    font-size: 14px;
    font-weight: 700;

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
    fill: ${theme.primary};
    width: 11px;
    height: 16px;

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
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    line-height: 1.2;
    padding: 12px 20px 12px 22px;
    text-decoration: none;
    user-select: none;
    font-size: 14px;

    &,
    &:visited:not(:hover) {
      color: ${theme.headerColor.fade(0.25).toString()};

      .icon {
        fill: ${theme.headerColor.fade(0.25).toString()};
      }
    }
    &:hover {
      color: ${theme.linkHover};

      .icon {
        fill: ${theme.linkHover};
      }
    }
    &.active,
    &.active-no-bg {
      cursor: default;
      pointer-events: none;
    }
  `,
  externalIcon: css`
    width: 10px;
    height: 10px;
    margin-left: 7px;
  `
}
