import { Account } from '../types'
import AccountCard from './AccountCard'
import AccountLayout from './AccountLayout'
import React from 'react'
import { RouteComponentProps } from '@reach/router'
import SVGIcon from './SVGIcon'
import Token from './Token'
import { adjustFontSizeTo } from '../utils/typography'
import { css } from '@emotion/core'
import gql from 'graphql-tag'
import iconAddCircle from '../icons/add-circle.svg'
import { useQuery } from '@apollo/react-hooks'

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
  const message = error ? error.message : loading ? 'Loading...' : null
  return (
    <AccountLayout location={location}>
      <h2>Settings</h2>
      <AccountCard title="General" id="account">
        <div className="input-wrap">
          <label htmlFor="project-name">Project name</label>
          <input type="text" id="project-name" className="input" />
        </div>
        <div className="input-wrap">
          <label>Project ID</label>
          <div className={`input-value${error ? ' error' : ''}`}>{message || account.id}</div>
        </div>
      </AccountCard>
      <AccountCard
        title="API Credentials"
        id="api"
        rightContent={
          <a href="#" css={styles.addLink}>
            <SVGIcon icon={iconAddCircle.id} extraCss={styles.addIcon} />
            Add token
          </a>
        }>
        <p>
          This is a list of the API access tokens associated with the current account. Tokens can
          only be viewed when creating them. Remove any tokens that don&lsquo;t look familiar.
        </p>
        <Token token={{ displayName: 'Test 1' }} />
        <Token token={{ displayName: 'Test 2' }} />
      </AccountCard>
    </AccountLayout>
  )
}

const styles = {
  addLink: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    ${adjustFontSizeTo('16px')};
    text-decoration: none;

    &:hover svg {
      fill: var(--link-color-hover);
    }
    &:active svg {
      fill: var(--link-color-active);
    }
  `,
  addIcon: css`
    fill: var(--primary-color);
    width: 20px;
    height: 20px;
    margin: 0 5px 0 0;
  `
}
