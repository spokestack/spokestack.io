import { Account, AccountSummary } from '../types'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'

import ErrorPage from './ErrorPage'
import LoadingPage from './LoadingPage'
import React from 'react'
import { RouteComponentProps } from '@reach/router'
import gql from 'graphql-tag'
import { isLoggedIn } from '../utils/auth'
import { navigate } from 'gatsby'

const LIST_ACCOUNTS_QUERY = gql`
  query ListAccounts {
    listAccounts {
      displayName
      id
      isInvite
    }
  }
`

const ACCOUNT_QUERY = gql`
  query GetAccount($id: ID) {
    getAccount(id: $id) {
      apiKeys {
        displayName
        id
      }
      displayName
      id
    }
  }
`

interface ListAccountsQuery {
  listAccounts: AccountSummary[]
}

interface AccountQuery {
  getAccount: Account
}

interface Props extends RouteComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>
}

export default function RouteWithAccount({ component: Component, ...props }: Props) {
  if (!isLoggedIn()) {
    if (typeof window !== 'undefined') {
      navigate('/login')
    }
    return null
  }
  const listAccountsResult = useQuery<ListAccountsQuery>(LIST_ACCOUNTS_QUERY, {
    ssr: false,
    fetchPolicy: 'network-only'
  })
  // TODO: save the current account ID
  // to localStorage and pass that in
  // variables here
  const [getAccount, getAccountResult] = useLazyQuery<AccountQuery>(ACCOUNT_QUERY, {
    ssr: false,
    fetchPolicy: 'network-only'
  })
  const accounts = (listAccountsResult.data || {}).listAccounts || []
  const loading = listAccountsResult.loading || getAccountResult.loading
  const error = listAccountsResult.error || getAccountResult.error
  const account = getAccountResult.data && getAccountResult.data.getAccount

  if (error) {
    return (
      <ErrorPage title="Account Settings">
        <h4>There was a problem retrieving your account. Please refresh and try again.</h4>
        <p>Debugging details:</p>
        <p>
          <code>{error.message}</code>
        </p>
      </ErrorPage>
    )
  }
  if (loading) {
    return <LoadingPage />
  }

  if (accounts.length) {
    if (!getAccountResult.called) {
      getAccount({ variables: { id: accounts[0].id } })
    }
  } else {
    if (typeof window !== 'undefined') {
      navigate('/account/create')
    }
    return null
  }

  return <Component account={account} {...props} />
}
