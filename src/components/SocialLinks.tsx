import { graphql, useStaticQuery } from 'gatsby'

import React from 'react'
import { SerializedStyles } from '@emotion/core'
import SocialLink from './SocialLink'

const socialQuery = graphql`
  query socialQuery {
    site {
      siteMetadata {
        social {
          twitter
          github
          stackoverflow
        }
      }
    }
  }
`

interface Props {
  iconSize?: number
  extraCss?: SerializedStyles
  titleCss?: SerializedStyles
}

export default function SocialLinks({ iconSize, extraCss, titleCss }: Props) {
  const { site } = useStaticQuery(socialQuery)
  const { social } = site.siteMetadata
  return (
    <>
      <SocialLink
        href={social.twitter}
        title="Twitter"
        icon="#twitter"
        iconSize={iconSize}
        extraCss={extraCss}
        titleCss={titleCss}
      />
      <SocialLink
        href={social.github}
        title="GitHub"
        icon="#github"
        iconSize={iconSize}
        extraCss={extraCss}
        titleCss={titleCss}
      />
      <SocialLink
        href={social.stackoverflow}
        title="Stack Overflow"
        icon="#stackoverflow"
        iconSize={iconSize}
        extraCss={extraCss}
        titleCss={titleCss}
      />
    </>
  )
}
