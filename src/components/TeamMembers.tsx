import {
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_TABLET_MEDIA_QUERY
} from '../styles/theme'
import { graphql, useStaticQuery } from 'gatsby'

import { Query } from '../utils/graphql'
import React from 'react'
import TeamMember from './TeamMember'
import { css } from '@emotion/react'

export default function Team() {
  const data = useStaticQuery<Query>(teamQuery)
  const team = data.site.siteMetadata.team
  return (
    <div css={styles.teamMembers}>
      {team.map((member) => {
        if (member.external) {
          return null
        }
        return (
          <TeamMember
            key={`team-member-${member.key}`}
            avatar={
              <img alt={member.name} css={styles.image} src={member.image} />
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
  image: css`
    width: 186px;
    height: 186px;
    border-radius: 50%;
  `
}

const teamQuery = graphql`
  query teamQuery {
    site {
      siteMetadata {
        team {
          key
          name
          title
          image
          bio
          external
          social {
            twitter
            linkedin
            email
          }
        }
      }
    }
  }
`
