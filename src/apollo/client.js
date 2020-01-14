import { getAuthToken, getProvider } from '../utils/auth'
import ApolloClient from 'apollo-boost'
import typeDefs from './typeDefs.graphql'
import fetch from 'isomorphic-unfetch'

export default new ApolloClient({
  fetch,
  uri: `${process.env.SS_API_URL}/control`,
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
