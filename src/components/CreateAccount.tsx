import React, { FormEvent, useState } from 'react'

import { Account } from '../types'
import AccountCard from './AccountCard'
import Button from './Button'
import Layout from './Layout'
import { RouteComponentProps } from '@reach/router'
import { css } from '@emotion/core'
import gql from 'graphql-tag'
import { navigate } from 'gatsby'
import { rhythm } from '../utils/typography'
import { useMutation } from '@apollo/react-hooks'

const CREATE_ACCOUNT = gql`
  mutation CreateAccount($displayName: String!) {
    createAccount(displayName: $displayName) {
      apiKeys {
        displayName
        id
      }
      id
    }
  }
`

interface CreateAccountMutation {
  createAccount: Account
}

export default function CreateAccount({}: RouteComponentProps) {
  const [accountName, setAccountName] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [createAccount, { error }] = useMutation<CreateAccountMutation>(CREATE_ACCOUNT, {
    onCompleted: (data) => {
      if (data && data.createAccount) {
        navigate('/account/settings')
      }
    }
  })

  function create(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!accountName) {
      setInvalid(true)
      return
    }
    setInvalid(false)
    createAccount({
      variables: {
        displayName: accountName
      }
    })
  }
  return (
    <Layout>
      <div css={styles.container}>
        <AccountCard title="Create project" id="overview">
          {error && <p className="error">{error}</p>}
          <p>Add a project to generate API keys.</p>
          <form css={styles.form} onSubmit={create}>
            <div className="input-wrap">
              <label htmlFor="account-name">Project name</label>
              <input
                id="account-name"
                type="text"
                className={`input${invalid ? ' error' : ''}`}
                value={accountName}
                onChange={(e) => {
                  setAccountName(e.target.value)
                  setInvalid(false)
                }}
              />
            </div>
            <Button primary type="submit" extraCss={styles.button}>
              Create
            </Button>
          </form>
        </AccountCard>
      </div>
    </Layout>
  )
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    padding: ${rhythm(1)} 20px;
  `,
  form: css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  button: css`
    margin-left: 20px;
  `
}
