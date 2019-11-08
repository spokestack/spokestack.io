import React, { HTMLAttributes } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import SocialLink from './SocialLink'
import { css } from '@emotion/core'
import githubIcon from '../icons/github.svg'
import twitterIcon from '../icons/twitter.svg'

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
    </div>
  )
}

const styles = {
  socialLinks: css`
    width: 85px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `
}
