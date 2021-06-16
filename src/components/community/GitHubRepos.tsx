import * as theme from '../../styles/theme'

import { GitHub_Repository, Query } from '../../utils/graphql'
import { graphql, useStaticQuery } from 'gatsby'

import GitHubRepo from './GitHubRepo'
import React from 'react'
import SVGIcon from '../SVGIcon'
import { css } from '@emotion/react'
import CommunityHeader from './Header'

interface ReposQuery extends Omit<Query, 'github'> {
  github: {
    organization: {
      [key: string]: GitHub_Repository
    }
  }
}

export default function GitHubRepos() {
  const data = useStaticQuery<ReposQuery>(githubReposQuery)
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
      <div css={styles.repos}>
        {[
          'python',
          'android',
          'ios',
          'rn',
          'node',
          'rntray',
          'iostray',
          'androidtray'
        ].map((key) => {
          const repo = data.github.organization[key]
          return <GitHubRepo key={repo.id} repo={repo} />
        })}
      </div>
    </div>
  )
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 30px 100px;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      padding: 100px;
    }
  `,
  githubIcon: css`
    width: 17px;
    height: 16px;
  `,
  repos: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    max-width: 1240px;
    margin: 0 auto;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      flex-wrap: wrap;
    }
  `
}

const githubReposQuery = graphql`
  query githubReposQuery {
    site {
      siteMetadata {
        social {
          github
        }
      }
    }
    github {
      organization(login: "spokestack") {
        python: repository(name: "spokestack-python") {
          id
          forkCount
          stargazerCount
          url
          languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
            nodes {
              name
              color
              id
            }
          }
          name
          description
        }
        android: repository(name: "spokestack-android") {
          id
          forkCount
          stargazerCount
          url
          languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
            nodes {
              name
              color
              id
            }
          }
          name
          description
        }
        ios: repository(name: "spokestack-ios") {
          id
          forkCount
          stargazerCount
          url
          languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
            nodes {
              name
              color
              id
            }
          }
          name
          description
        }
        rn: repository(name: "react-native-spokestack") {
          id
          forkCount
          stargazerCount
          url
          languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
            nodes {
              name
              color
              id
            }
          }
          name
          description
        }
        node: repository(name: "node-spokestack") {
          id
          forkCount
          stargazerCount
          url
          languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
            nodes {
              name
              color
              id
            }
          }
          name
          description
        }
        rntray: repository(name: "react-native-spokestack-tray") {
          id
          forkCount
          stargazerCount
          url
          languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
            nodes {
              name
              color
              id
            }
          }
          name
          description
        }
        iostray: repository(name: "spokestack-tray-ios") {
          id
          forkCount
          stargazerCount
          url
          languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
            nodes {
              name
              color
              id
            }
          }
          name
          description
        }
        androidtray: repository(name: "spokestack-tray-android") {
          id
          forkCount
          stargazerCount
          url
          languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
            nodes {
              name
              color
              id
            }
          }
          name
          description
        }
      }
    }
  }
`
