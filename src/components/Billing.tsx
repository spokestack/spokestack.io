import React from 'react'
import { RouteComponentProps } from '@reach/router'
import AccountCard from './AccountCard'
import { css } from '@emotion/core'

export default function Billing({}: RouteComponentProps) {
  return (
    <div>
      <h2>Billing</h2>
      <AccountCard title="Overview" id="overview">
        <div className="input-wrap">
          <label htmlFor="balance">Current Balance</label>
          <div css={styles.balance}>19.62474</div>
        </div>
      </AccountCard>
    </div>
  )
}

const styles = {
  balance: css`
    font-weight: 700;
    color: #00b655;
  `
}
