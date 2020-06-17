import {
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_TABLET_MEDIA_QUERY
} from 'typography-breakpoint-constants'
import { graphql, useStaticQuery } from 'gatsby'

import Img from 'gatsby-image'
import { Query } from '../utils/graphql'
import React from 'react'
import TeamMember from './TeamMember'
import { css } from '@emotion/core'
import findAuthorImage from '../utils/findAuthorImage'

export default function Team() {
  const data = useStaticQuery<Query>(teamQuery)
  const team = data.site.siteMetadata.team
  return (
    <div css={styles.teamMembers}>
      {team.map((member) => {
        if (member.key === 'daniel') {
          return null
        }
        return (
          <TeamMember
            key={`team-member-${member.key}`}
            avatar={
              <Img
                alt={member.name}
                fixed={findAuthorImage(data, member.key)}
                style={styles.memberImage}
              />
            }
            name={member.name}
            title={member.title}
          />
        )
      })}
    </div>
  )
}

const styles = {
  teamMembers: css`
    display: flex;
    display: grid;
    grid-template-columns: 100%;
    max-width: 608px;
    margin: 0 auto;

    ${MIN_TABLET_MEDIA_QUERY} {
      flex-direction: row;
      flex-wrap: wrap;
      grid-gap: 25px;
      grid-template-columns: 185px 185px 185px;
    }
    ${MIN_DEFAULT_MEDIA_QUERY} {
      margin: 0;
    }
  `,
  memberImage: {
    borderRadius: '50%',
    flexShrink: 0
  }
}

const teamQuery = graphql`
  query teamQuery {
    site {
      siteMetadata {
        team {
          key
          name
          title
          bio
          social {
            twitter
            linkedin
            email
          }
        }
      }
    }
    allImageSharp(
      filter: { fixed: { originalName: { regex: "/headshot/" } } }
    ) {
      edges {
        node {
          fixed(width: 186, height: 186) {
            ...GatsbyImageSharpFixed_withWebp
            originalName
          }
        }
      }
    }
  }
`
