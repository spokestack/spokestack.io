import AboutLayout from '../../components/AboutLayout'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import { PageRendererProps } from 'gatsby'
import React from 'react'
import SEO from '../../components/SEO'
import TeamMembers from '../../components/TeamMembers'
import { css } from '@emotion/core'

export default function Team({ location }: PageRendererProps) {
  return (
    <AboutLayout location={location}>
      <SEO
        title="Team | Spokestack"
        description="From our CEO and CTO to Engineering to UX &amp; Product Design, we've built a robust and experienced text to speech development team at Spokestack. Meet us."
      />
      <h1 css={styles.header}>Team</h1>
      <TeamMembers />
    </AboutLayout>
  )
}

const styles = {
  header: css`
    text-align: center;
    ${MIN_DEFAULT_MEDIA_QUERY} {
      text-align: left;
    }
  `
}
