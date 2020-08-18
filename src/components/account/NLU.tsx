import * as theme from '../../styles/theme'

import React, { useState } from 'react'

import { Account } from '../../types'
import AccountLayout from './AccountLayout'
import Dropzone from '../Dropzone'
import LoadingIcon from '../LoadingIcon'
import NluModels from './NluModels'
import { RouteComponentProps } from '@reach/router'
import { css } from '@emotion/core'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

interface Props extends RouteComponentProps {
  account: Account
}

const UPLOAD_MUTATION = gql`
  mutation uploadNluExport($nluExport: Upload!) {
    uploadNluExport(nluExport: $nluExport)
  }
`

export default function NLU({ location }: Props) {
  const [refetch, setRefetch] = useState(false)
  const [uploadExport, { data, loading, error }] = useMutation<{
    uploadNluExport: boolean
  }>(UPLOAD_MUTATION)
  function upload(file: File) {
    console.log(file)
    uploadExport({
      variables: {
        nluExport: file
      }
    }).then(() => setRefetch(true))
  }
  if (error) {
    console.log(error)
  }
  return (
    <AccountLayout location={location}>
      <h2>Language Understanding</h2>
      <p>
        Spokestack Natural Language Understanding (NLU) models use cutting edge
        machine learning techniques to help your app understand speech. Use one
        of our pre-built models for a variety of common use cases or import from
        your Alexa Skill.
      </p>
      {data ? (
        <p css={styles.message} style={{ color: theme.primary }}>
          Model successfully imported!
        </p>
      ) : error ? (
        <p css={styles.message} className="error">
          There was a problem uploading the file. Please try again.
        </p>
      ) : (
        <p css={styles.message}>&nbsp;</p>
      )}
      <div css={styles.uploader}>
        <Dropzone disabled={loading} onFileAdded={upload} />
        {loading && (
          <div css={styles.loading}>
            <LoadingIcon color={theme.textDarkBg} />
          </div>
        )}
      </div>
      <section css={styles.models}>
        <NluModels refetch={refetch} onRefetch={() => setRefetch(false)} />
      </section>
    </AccountLayout>
  )
}

const styles = {
  message: css`
    margin-bottom: 10px;
  `,
  uploader: css`
    position: relative;
  `,
  loading: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 30px;
    background-color: ${theme.primaryColor.fade(0.6).toString()};
  `,
  models: css`
    margin-top: 50px;
  `
}
