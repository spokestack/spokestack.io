import * as theme from '../../styles/theme'

import Issue, { IssueProps } from './Issue'

import React from 'react'
import { css } from '@emotion/react'

interface Props {
  issues?: IssueProps[]
}

export default function IssueList({ issues }: Props) {
  return (
    <div css={styles.issueList}>
      {issues?.map((issue) => (
        <Issue key={`issue-${issue.id}`} {...issue} />
      ))}
    </div>
  )
}

const styles = {
  issueList: css`
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    width: 100%;
    max-width: 526px;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      padding: 50px;
      flex-shrink: 0;
    }
  `
}
