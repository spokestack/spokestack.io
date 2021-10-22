import * as theme from '../../styles/theme'

import Color from 'color'
import React from 'react'
import { css } from '@emotion/react'

export interface IssueProps {
  author: string
  avatarUrl?: string
  id: string
  tags: string[]
  title: string
  url: string
}

const tagColorCache: Record<string, string> = {}
const tagColors = ['#ccf2ff', '#e7d3ed', '#fdebbf']

function getColorForTag(tag: string) {
  if (tagColorCache[tag]) {
    return tagColorCache[tag]
  }
  const len = tagColors.length
  const index = Object.keys(tagColorCache).length
  const color = tagColors[(index + len) % len]
  return (tagColorCache[tag] = color)
}

export default function Issue({
  author,
  avatarUrl,
  id,
  tags,
  title,
  url
}: IssueProps) {
  return (
    <a href={url} css={styles.issue}>
      {!!avatarUrl && <img css={styles.avatar} src={avatarUrl} />}
      <div css={styles.issueDetails}>
        <h5>{title}</h5>
        <p css={styles.author}>{author}</p>
        {tags.map((tag) => (
          <div
            key={`${id}-${tag}`}
            css={styles.tag}
            style={{
              backgroundColor: getColorForTag(tag)
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    </a>
  )
}

const styles = {
  issue: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    background-color: white;
    border-radius: 7px;
    border: 1px solid ${theme.mainBorder};
    padding: 20px 25px;
    text-decoration: none;
    cursor: pointer;
    width: 100%;

    & + & {
      margin-top: 15px;
    }

    &,
    &:visited,
    &:hover,
    &:active {
      color: ${theme.text};
    }

    &:hover {
      background-color: ${Color('#fff').darken(0.03).hex()};
    }

    &:active {
      box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.5);
    }
  `,
  avatar: css`
    display: block;
    width: 65px;
    height: 65px;
    border-radius: 50%;
    margin-right: 20px;
  `,
  issueDetails: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 1;

    h5 {
      width: 100%;
      margin-bottom: 5px;
    }
  `,
  author: css`
    font-size: 14px;
    margin-bottom: 10px;
  `,
  tag: css`
    font-size: 14px;
    border-radius: 30px;
    padding: 5px 15px;
  `
}
