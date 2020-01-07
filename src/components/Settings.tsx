import { Account, ApiKey } from '../types'
import AccountCard from './AccountCard'
import AccountLayout from './AccountLayout'
import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import SVGIcon from './SVGIcon'
import Token from './Token'
import { adjustFontSizeTo } from '../utils/typography'
import { css } from '@emotion/core'
import gql from 'graphql-tag'
import iconAddCircle from '../icons/add-circle.svg'
import { useQuery, useMutation } from '@apollo/react-hooks'
import AddTokenForm from './AddTokenForm'

const ACCOUNT_QUERY = gql`
  query GetAccount {
    getAccount {
      apiKeys {
        displayName
        id
      }
      id
    }
  }
`

const ADD_TOKEN = gql`
  mutation CreateKey($accountId: ID!, $displayName: String!) {
    createKey(accountId: $accountId, displayName: $displayName, type: PRODUCTION) {
      displayName
      id
      key
    }
  }
`

interface QueryProps {
  getAccount: Partial<Account>
}

interface MutationProps {
  createKey: Partial<ApiKey>
}

export default function Settings({ location }: RouteComponentProps) {
  const [showForm, setShowForm] = useState(true)
  const { data, loading, error } = useQuery<QueryProps>(ACCOUNT_QUERY, { ssr: false })
  const [addToken, { data: addTokenData, loading: addTokenLoading }] = useMutation<MutationProps>(
    ADD_TOKEN,
    {
      onCompleted: () => {
        setShowForm(false)
      }
    }
  )
  const account = (data && data.getAccount) || {}
  const message = error ? error.message : loading ? 'Loading...' : null
  return (
    <AccountLayout location={location}>
      <h2>Settings</h2>
      <AccountCard title="General" id="general">
        <div className="input-wrap">
          <label>Project name</label>
          <div className="input-value">{message || account.displayName}</div>
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
          !showForm &&
          !message && (
            <a href="#" css={styles.addLink} onClick={() => setShowForm(true)}>
              <SVGIcon icon={iconAddCircle.id} extraCss={styles.addIcon} />
              Add token
            </a>
          )
        }>
        <p>
          This is a list of the API access tokens associated with the current account. Tokens can
          only be viewed when creating them. Remove any tokens that don&lsquo;t look familiar.
        </p>
        {showForm && !message && (
          <div css={styles.tokens}>
            {showForm && (
              <AddTokenForm
                submitting={addTokenLoading}
                onSubmit={() => {
                  addToken({
                    variables: {
                      accountId: account.id,
                      displayName: account.displayName
                    }
                  })
                }}
              />
            )}
            {addTokenData && <Token token={addTokenData.createKey} />}
            {account.apiKeys &&
              account.apiKeys.map((token) => <Token key={`token-${token.id}`} token={token} />)}
          </div>
        )}
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
  `,
  tokens: css`
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 20px;
  `
}
