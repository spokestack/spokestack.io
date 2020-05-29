import { Account } from '../../types'
import AccountCard from './AccountCard'
import AccountLayout from './AccountLayout'
import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { css } from '@emotion/core'

interface Props extends RouteComponentProps {
  account: Account
}

export default function Billing({ location }: Props) {
  return (
    <AccountLayout location={location}>
      <h2>Billing</h2>
      <AccountCard title="Overview" id="overview">
        <div className="input-wrap">
          <label>Current Balance</label>
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
