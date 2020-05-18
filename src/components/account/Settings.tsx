import * as theme from '../../utils/theme'

import { Account, ApiKey } from '../../types'
import React, { useState, useRef } from 'react'

import AccountCard from './AccountCard'
import AccountLayout from './AccountLayout'
import AddTokenForm from '../AddTokenForm'
import { RouteComponentProps } from '@reach/router'
import SVGIcon from '../SVGIcon'
import Token from './Token'
import { adjustFontSizeTo } from '../../utils/typography'
import { css } from '@emotion/core'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { CopyButton } from '../EditButtons'

const ADD_TOKEN = gql`
  mutation CreateKey($accountId: ID!, $displayName: String!) {
    createKey(
      accountId: $accountId
      displayName: $displayName
      type: PRODUCTION
    ) {
      displayName
      id
      key
    }
  }
`

const REMOVE_TOKEN = gql`
  mutation RevokeKey($accountId: ID!, $keyId: ID!) {
    revokeKey(accountId: $accountId, keyId: $keyId)
  }
`

interface Props extends RouteComponentProps {
  account: Account
}

interface CreateKeyMutation {
  createKey: ApiKey
}

interface RemoveKeyMutation {
  revokeKey: boolean
}

export default function Settings({ account, location }: Props) {
  const idRef = useRef<HTMLInputElement>(null)
  const [tokens, setTokens] = useState((account || {}).apiKeys || [])
  const [showForm, setShowForm] = useState(false)
  const [addToken, { loading: addTokenLoading }] = useMutation<
    CreateKeyMutation
  >(ADD_TOKEN, {
    onCompleted: ({ createKey: token }) => {
      setTokens(tokens.concat(token))
      setShowForm(false)
    }
  })
  const [removeToken] = useMutation<RemoveKeyMutation>(REMOVE_TOKEN)
  const displayName = (account || {}).displayName || ''
  const accountId = (account || {}).id || ''
  return (
    <AccountLayout matchHash location={location} title={displayName}>
      <h2>Settings</h2>
      <AccountCard title="General" id="general">
        <div css={styles.row}>
          <label>Project ID</label>
          <CopyButton title="Copy Account ID" inputRef={idRef} />
        </div>
        <input
          ref={idRef}
          readOnly
          id={`account-${accountId}`}
          type="text"
          className="input"
          value={accountId}
        />
      </AccountCard>
      <AccountCard
        title="API Credentials"
        id="api"
        rightContent={
          !showForm &&
          !!tokens.length && (
            <a css={styles.addLink} onClick={() => setShowForm(true)}>
              <SVGIcon icon="#add-circle" extraCss={styles.addIcon} />
              Add token
            </a>
          )
        }>
        <p>
          This is a list of the API access tokens associated with the current
          account. Tokens can only be viewed when creating them. Remove any
          tokens that don&lsquo;t look familiar.
        </p>
        {!tokens.length && (
          <p>You currently have no API keys. Generate one below.</p>
        )}
        <div css={styles.tokens}>
          {(showForm || !tokens.length) && (
            <AddTokenForm
              submitting={addTokenLoading}
              onSubmit={(displayName) => {
                addToken({
                  variables: {
                    displayName,
                    accountId: accountId
                  }
                })
              }}
            />
          )}
          {tokens.map((token) => (
            <Token
              key={`token-${token.id}`}
              token={token}
              onDelete={() => {
                removeToken({
                  variables: {
                    accountId: accountId,
                    keyId: token.id
                  }
                })
                setTokens(tokens.filter((t) => t.id !== token.id))
              }}
            />
          ))}
        </div>
      </AccountCard>
    </AccountLayout>
  )
}

const styles = {
  row: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  addLink: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    ${adjustFontSizeTo('16px')};
    text-decoration: none;
    cursor: pointer;

    &:hover svg {
      fill: ${theme.linkHover};
    }
    &:active svg {
      fill: ${theme.linkActive};
    }
  `,
  addIcon: css`
    fill: ${theme.primary};
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
