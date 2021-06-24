import * as theme from '../styles/theme'

import { GitHub_Repository, Query } from '../utils/graphql'
import { graphql, useStaticQuery } from 'gatsby'

import GitHubRepo from './GitHubRepo'
import React from 'react'
import { css, SerializedStyles } from '@emotion/react'

interface ReposQuery extends Omit<Query, 'github'> {
  github: {
    organization: {
      [key: string]: GitHub_Repository
    }
  }
}

interface Props {
  extraCss?: SerializedStyles | SerializedStyles[]
  repos?: string[]
}

const defaultRepos = [
  'python',
  'android',
  'ios',
  'rn',
  'node',
  'rntray',
  'iostray',
  'androidtray'
]

export default function GitHubRepos({ extraCss, repos = defaultRepos }: Props) {
  const data = useStaticQuery<ReposQuery>(githubReposQuery)
  return (
    <div className="ie-fix" css={[styles.repos].concat(extraCss!)}>
      {repos.map((key) => {
        const repo = data.github.organization[key]
        return <GitHubRepo key={repo.id} repo={repo} />
      })}
    </div>
  )
}

const styles = {
  repos: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    max-width: 1240px;
    margin: 0 auto 30px;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
  `
}

const githubReposQuery = graphql`
  query githubReposQuery {
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
