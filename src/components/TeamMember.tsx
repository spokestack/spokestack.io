import { MIN_TABLET_MEDIA_QUERY, ieBreakpoint } from '../styles/theme'

import React from 'react'
import { css } from '@emotion/react'

interface Props {
  avatar: React.ReactNode
  name: string
  title: string
}

export default function TeamMember({ avatar, name, title }: Props) {
  return (
    <div css={styles.teamMember}>
      {avatar}
      <h4>{name}</h4>
      <p>{title}</p>
    </div>
  )
}

const styles = {
  teamMember: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    max-width: 185px;
    margin: 0 auto 15px;
    height: 330px;

    h4 {
      margin-top: 15px;
    }
    p {
      margin: 0;
    }

    ${MIN_TABLET_MEDIA_QUERY} {
      margin-bottom: 30px;
    }

    ${ieBreakpoint} {
      margin-right: 20px;
    }
  `
}
