import AboutLayout from '../../components/AboutLayout'
import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import React from 'react'
import TeamMembers from '../../components/TeamMembers'
import { css } from '@emotion/core'

export default function Team() {
  return (
    <AboutLayout>
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
