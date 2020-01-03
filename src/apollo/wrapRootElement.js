import { ApolloProvider } from '@apollo/react-hooks'
import React from 'react'
import client from './client'

// eslint-disable-next-line react/prop-types
export default function wrapRootElement({ element }) {
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
