import { Link, graphql, useStaticQuery } from 'gatsby'
import React, { HTMLAttributes } from 'react'

import { DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import SVGIcon from './SVGIcon'
import SocialLink from './SocialLink'
import { css } from '@emotion/core'
import githubIcon from '../icons/github.svg'
import iconArrow from '../icons/arrow-forward.svg'
import { rhythm } from '../utils/typography'
import twitterIcon from '../icons/twitter.svg'
import { isLoggedIn, logout } from '../utils/auth'

const socialQuery = graphql`
  query socialQuery {
    site {
      siteMetadata {
        social {
          twitter
          github
        }
      }
    }
  }
`

interface Props {
  iconSize?: number
  style?: HTMLAttributes<HTMLDivElement>['style']
}

export default function SocialLinks({ iconSize, style }: Props) {
  const { site } = useStaticQuery(socialQuery)
  const { social } = site.siteMetadata
  return (
    <div css={styles.socialLinks} style={style}>
      <SocialLink
        href={social.twitter}
        title="Spokestack Twitter"
        icon={twitterIcon.id}
        iconSize={iconSize}
        extraCss={styles.socialLink}
      />
      <SocialLink
        href={social.github}
        title="Spokestack GitHub"
        icon={githubIcon.id}
        iconSize={iconSize}
        extraCss={styles.socialLink}
      />
      {isLoggedIn() ? (
        <a className="btn" css={styles.loginButton} onClick={() => logout()}>
          Sign Out
          <SVGIcon
            icon={iconArrow.id}
            style={{ fill: 'var(--secondary-color)', width: '17px', height: '17px' }}
          />
        </a>
      ) : (
        <Link
          className="btn"
          activeStyle={{ display: 'none' }}
          to="/login"
          css={styles.loginButton}>
          Sign In
          <SVGIcon
            icon={iconArrow.id}
            style={{ fill: 'var(--secondary-color)', width: '17px', height: '17px' }}
          />
        </Link>
      )}
    </div>
  )
}

const styles = {
  socialLinks: css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  socialLink: css`
    ${DEFAULT_MEDIA_QUERY} {
      display: none;
    }
  `,
  loginButton: css`
    background-color: transparent !important;
    color: var(--secondary-color) !important;
    transition: background-color 0.2s var(--transition-easing), color 0.2s var(--transition-easing);
    margin-left: ${rhythm(1.2)};

    svg {
      transition: fill 0.2s var(--transition-easing);
    }

    &:hover {
      color: var(--primary-color) !important;
      background-color: var(--secondary-color) !important;

      svg {
        fill: var(--primary-color) !important;
      }
    }

    ${DEFAULT_MEDIA_QUERY} {
      border: none;
      padding-right: 0;
    }
  `
}
