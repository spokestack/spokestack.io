import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import SocialLink from './SocialLink'
import { SerializedStyles } from '@emotion/core'
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
  extraCss?: SerializedStyles
}

export default function SocialLinks({ iconSize, extraCss }: Props) {
  const { site } = useStaticQuery(socialQuery)
  const { social } = site.siteMetadata
  return (
    <>
      <SocialLink
        href={social.twitter}
        title="Spokestack Twitter"
        icon={twitterIcon.id}
        iconSize={iconSize}
        extraCss={extraCss}
      />
      <SocialLink
        href={social.github}
        title="Spokestack GitHub"
        icon={githubIcon.id}
        iconSize={iconSize}
        extraCss={extraCss}
      />
    </>
  )
}
