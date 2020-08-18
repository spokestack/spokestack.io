import React, { useEffect } from 'react'

import LoadingIcon from '../LoadingIcon'
import NluModel from './NluModel'
import { NluModel as NluModelType } from '../../types'
import { css } from '@emotion/core'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const LIST_NLU_MODELS = gql`
  query listNluModels {
    listNluModels {
      id
      insertedAt
      modelUrl
      name
      source
      state
      updatedAt
    }
  }
`

interface Props {
  /** A callback to indicate refetch was called */
  onRefetch: () => void
  /** Force a refetch, like in the case of uploading a new model */
  refetch: boolean
}

export default function NluModels({ onRefetch, refetch }: Props) {
  const result = useQuery<{ listNluModels: NluModelType[] }>(LIST_NLU_MODELS, {
    ssr: false,
    // Refreshes once per min
    pollInterval: 60000,
    fetchPolicy: 'network-only'
  })
  useEffect(() => {
    if (refetch && result.data) {
      result.refetch()
      onRefetch()
    }
  }, [refetch])
  if (result.error) {
    console.error(result.error)
    return (
      <p>
        There was a problem retrieving NLU models. Please refresh and try again.
      </p>
    )
  }
  if (result.loading) {
    return (
      <div css={styles.loading}>
        <LoadingIcon />
      </div>
    )
  }
  return (
    <div css={styles.container}>
      <h2>Available Models</h2>
      {result.data.listNluModels.map((model) => (
        <NluModel key={model.id} model={model} />
      ))}
    </div>
  )
}

const styles = {
  loading: css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
  `,
  container: css`
    display: flex;
    flex-direction: column;
  `
}
