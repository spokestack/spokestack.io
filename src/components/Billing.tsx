import React from 'react'
import { RouteComponentProps } from '@reach/router'
import AccountCard from './AccountCard'
import { css } from '@emotion/core'
import AccountLayout from './AccountLayout'

export default function Billing({ location }: RouteComponentProps) {
  return (
    <AccountLayout location={location}>
      <h2>Billing</h2>
      <AccountCard title="Overview" id="overview">
        <div className="input-wrap">
          <label htmlFor="balance">Current Balance</label>
          <div css={styles.balance}>19.62474</div>
        </div>
      </AccountCard>
    </AccountLayout>
  )
}

const styles = {
  balance: css`
    font-weight: 700;
    color: #00b655;
  `
}
