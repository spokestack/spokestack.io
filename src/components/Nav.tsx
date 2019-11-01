import { css } from '@emotion/core'
import { Link } from 'gatsby'
import React from 'react'
import { rhythm } from '../utils/typography'

export default function Nav() {
  return (
    <div css={styles.wrapper}>
      <style>{`
        .nav-link-active:after {
          left: 50% !important;
          height: 0 !important;
          width: 0 !important;
        }
      `}</style>
      <Link
        className="nav-link"
        css={styles.navLink}
        activeStyle={styles.navLinkActive}
        to="/"
        title="Write more, build more">
        Write more, build more
      </Link>
      <div css={styles.rightSide}>
        <Link
          className="nav-link"
          css={styles.navLink}
          activeClassName="nav-link-active"
          activeStyle={styles.navLinkActive}
          to="/blog"
          title="Blog">
          Blog
        </Link>
      </div>
    </div>
  )
}

const styles = {
  wrapper: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: ${rhythm(2)};
    padding-left: ${rhythm(1 / 2)};
    padding-right: ${rhythm(1 / 2)};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--main-border-color);
    background-color: var(--main-background);
  `,
  rightSide: css`
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  navLink: css`
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: ${rhythm(1 / 2)};
    padding-right: ${rhythm(1 / 2)};
    font-family: 'Rosario, sans-serif';
    text-shadow: none;
    background-image: none;
    transition: all 0.2s cubic-bezier(0.28, 0.32, 0.29, 0.79);

    &:hover,
    &:visited {
      color: var(--link-color);
      text-decoration: none;
      background-image: none;
    }
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      right: 0;
      width: 0;
      height: 0;
      transition: width 0.1s ease-in-out, height 0.1s ease-in-out, left 0.1s ease-in-out;
      background-color: var(--link-color-hover);
    }
    &:hover:after {
      left: 0;
      height: 4px;
      width: 100%;
    }
    &:active {
      text-shadow: 0 0 1px rgba(39, 110, 202, 0.6);
    }
  `,
  navLinkActive: {
    color: 'var(--main-color)',
    backgroundColor: 'var(--main-background)',
    boxShadow: 'none',
    textShadow: 'none',
    cursor: 'default'
  }
}
