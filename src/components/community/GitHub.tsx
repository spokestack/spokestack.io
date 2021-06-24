import * as theme from '../../styles/theme'

import { Query } from '../../utils/graphql'
import { graphql, useStaticQuery } from 'gatsby'

import GitHubRepos from '../GitHubRepos'
import React from 'react'
import SVGIcon from '../SVGIcon'
import { css } from '@emotion/react'
import CommunityHeader from './Header'

export default function GitHub() {
  const data = useStaticQuery<Query>(githubCommunityQuery)
  return (
    <div className="ie-fix" css={styles.container}>
      <CommunityHeader
        href={data.site!.siteMetadata!.social!.github!}
        icon={
          <SVGIcon
            icon="#github"
            className="icon"
            extraCss={styles.githubIcon}
          />
        }
        linkText="See All Repos"
        text="Expore Open Source Repositories"
      />
      <GitHubRepos extraCss={styles.repos} />
    </div>
  )
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0 100px;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      padding: 100px 70px 100px;
    }
  `,
  githubIcon: css`
    width: 17px;
    height: 16px;
  `,
  repos: css`
    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      justify-content: center;
    }
  `
}

const githubCommunityQuery = graphql`
  query githubCommunityQuery {
    site {
      siteMetadata {
        social {
          github
        }
      }
    }
  }
`
