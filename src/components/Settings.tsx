import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { css } from '@emotion/core'
import AccountCard from './AccountCard'
import { adjustFontSizeTo } from '../utils/typography'
import AccountLayout from './AccountLayout'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Account } from '../types'

const ACCOUNT_QUERY = gql`
  {
    getAccount {
      id
    }
  }
`

interface QueryProps {
  getAccount: Partial<Account>
}

export default function Settings({ location }: RouteComponentProps) {
  const { data, loading, error } = useQuery<QueryProps>(ACCOUNT_QUERY)
  const account = (data && data.getAccount) || {}
  return (
    <AccountLayout location={location}>
      <h2>Settings</h2>
      <AccountCard title="My Profile" id="profile">
        <div className="input-wrap">
          <label htmlFor="profile-name">Name</label>
          <input type="text" id="profile-name" className="input" />
        </div>
        <div className="input-wrap">
          <label htmlFor="profile-email">Email</label>
          <input type="email" id="profile-email" className="input" />
        </div>
        <div className="input-wrap">
          <label>Account ID</label>
          <div className={`input-value${error ? ' error' : ''}`}>
            {error ? error.message : loading ? 'Loading...' : account.id}
          </div>
        </div>
      </AccountCard>
      <AccountCard title="API Credentials" id="api" contentCss={styles.apiContent}>
        <h4 css={[styles.credsHeader, { borderTop: 'none' }]}>Live Credentials</h4>
        <h4 css={styles.credsHeader}>Test Credentials</h4>
      </AccountCard>
    </AccountLayout>
  )
}

const styles = {
  apiContent: css`
    padding: 0;
  `,
  credsHeader: css`
    ${adjustFontSizeTo('18px')};
    font-weight: 400;
    text-transform: uppercase;
    padding: 10px 20px;
    background-color: var(--text-color-dark-bg);
    border-top: 1px solid var(--main-border-color);
    border-bottom: 1px solid var(--main-border-color);
  `
}
