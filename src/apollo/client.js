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
  onError: (error = {}) => {
    const graphQLErrors = error.graphQLErrors
    const networkError = error.networkError
    if (graphQLErrors) {
      if (Array.isArray(graphQLErrors)) {
        graphQLErrors.forEach(function({ message, locations, path }) {
          console.warn(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        })
      } else {
        console.log(graphQLErrors)
      }
    }
    if (networkError) {
      console.warn('[Network error]: ' + networkError)
    }
  },
  typeDefs
})
