import { getAuthToken, getProvider } from '../utils/auth'

import ApolloClient from 'apollo-boost'
import fetch from 'node-fetch'
import typeDefs from './typeDefs.graphql'

export default new ApolloClient({
  uri: `${process.env.SS_API_URL}/control`,
  fetch,
  request: (operation) => {
    const provider = getProvider()
    const token = getAuthToken()
    if (provider && token) {
      operation.setContext({
        headers: {
          Authorization: `${provider} ${token}`
        }
      })
    }
  },
  typeDefs
})
