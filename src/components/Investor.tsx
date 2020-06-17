import React from 'react'
import { SiteSiteMetadataInvestors } from '../utils/graphql'
import { css } from '@emotion/core'

export default function Investor({ name, titles }: SiteSiteMetadataInvestors) {
  return (
    <div css={styles.investor}>
      <h5 className="blue">{name}</h5>
      {titles.map((title) => (
        <p key={name}>
          {title.title}, <em>{title.company}</em>
        </p>
      ))}
    </div>
  )
}

const styles = {
  investor: css`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    width: 100%;

    h5 {
      margin-bottom: 5px;
    }
    p {
      margin: 0;
    }
  `
}
