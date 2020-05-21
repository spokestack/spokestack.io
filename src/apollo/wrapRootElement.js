import { ApolloProvider } from '@apollo/react-hooks'
import React from 'react'
import client from './client'

const wrapRootElement = ({ element }) => {
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}

export default wrapRootElement
