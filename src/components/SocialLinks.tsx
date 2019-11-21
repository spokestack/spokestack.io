import React, { HTMLAttributes } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import SocialLink from './SocialLink'
import { css } from '@emotion/core'
import githubIcon from '../icons/github.svg'
import twitterIcon from '../icons/twitter.svg'
import iconArrow from '../icons/arrow-forward.svg'
import SVGIcon from './SVGIcon'
import { rhythm } from '../utils/typography'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'

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
      />
      <SocialLink
        href={social.github}
        title="Spokestack GitHub"
        icon={githubIcon.id}
        iconSize={iconSize}
      />
      <a className="btn" href="mailto:hello@spokestack.io" css={styles.talkButton}>
        Talk to us
        <SVGIcon icon={iconArrow.id} style={{ fill: 'var(--secondary-color)' }} />
      </a>
    </div>
  )
}

const styles = {
  socialLinks: css`
    width: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      width: 310px;
    }
  `,
  talkButton: css`
    display: none;
    background-color: transparent;
    color: var(--secondary-color);
    transition: background-color 0.2s var(--transition-easing), color 0.2s var(--transition-easing);
    margin-left: ${rhythm(1.2)};

    svg {
      transition: fill 0.2s var(--transition-easing);
    }

    &:hover {
      color: var(--primary-color);
      background-color: var(--secondary-color);

      svg {
        fill: var(--primary-color) !important;
      }
    }

    ${MIN_DEFAULT_MEDIA_QUERY} {
      display: inherit;
    }
  `
}
