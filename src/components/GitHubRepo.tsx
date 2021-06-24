import * as theme from '../styles/theme'

import { GitHub_Repository } from '../utils/graphql'
import React from 'react'
import SVGIcon from './SVGIcon'
import { css, Global } from '@emotion/react'

interface Props {
  repo: GitHub_Repository
}

export default function GitHubRepo({ repo }: Props) {
  return (
    <div className="github-repo" css={styles.container}>
      <Global
        styles={css`
          html.dark-mode .github-repo {
            background-color: ${theme.stickyNavBackgroundDark};
            border-color: ${theme.mainBorderDark};

            .github-icon {
              fill: white;
            }
            .language-link {
              color: white;
            }
          }
        `}
      />
      <a href={repo.url} css={styles.name}>
        <SVGIcon
          icon="#github-repo"
          className="github-icon"
          extraCss={styles.repoIcon}
        />
        {repo.name}
      </a>
      <p css={styles.description}>{repo.description}</p>
      <div css={styles.details}>
        {repo.languages!.nodes!.map((language) => (
          <div
            key={`${repo.id}-${language!.id}`}
            className="language-link"
            css={styles.githubLink}>
            <div
              css={styles.languageColor}
              style={{ backgroundColor: language!.color! }}
            />
            {language!.name}
          </div>
        ))}
        <a href={repo.url} css={styles.githubLink}>
          <SVGIcon
            icon="#github-star"
            className="github-icon"
            extraCss={styles.starIcon}
          />
          {repo.stargazerCount}
        </a>
        <a href={`${repo.url}/fork`} css={styles.githubLink}>
          <SVGIcon
            icon="#github-fork"
            className="github-icon"
            extraCss={styles.forkIcon}
          />
          {repo.forkCount}
        </a>
      </div>
    </div>
  )
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    padding: 16px;
    background-color: white;
    border-radius: 6px;
    width: 100%;
    max-width: 284px;
    border: 1px solid ${theme.mainBorder};

    .github-icon {
      fill: #586069;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      height: 165px;
    }
  `,
  name: css`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 8px;
    font-size: 16px;
  `,
  repoIcon: css`
    width: 13px;
    height: 16px;
    margin-right: 8px;
  `,
  description: css`
    font-size: 12px;
    font-weight: 300;
    margin-bottom: 16px;
    flex-grow: 1;
  `,
  details: css`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  `,
  githubLink: css`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    margin-right: 19px;
    line-height: 1em;

    &,
    &:visited {
      color: #586069;
    }
    &[href]:hover,
    &[href]:active {
      color: ${theme.header};
    }
  `,
  languageColor: css`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 6px;
  `,
  starIcon: css`
    width: 17px;
    height: 16px;
    margin-right: 6px;
  `,
  forkIcon: css`
    width: 15px;
    height: 16px;
    margin-right: 6px;
  `
}
