import ApolloClient from 'apollo-boost'
import fetch from 'node-fetch'
import { getAuthToken } from '../utils/auth'
import typeDefs from './typeDefs.graphql'

export default new ApolloClient({
  uri: `${process.env.SS_API_URL}/control`,
  fetch,
  request: (operation) => {
    const token = getAuthToken()
    if (token) {
      operation.setContext({
        headers: {
          Authorization: token
        }
      })
    }
  },
  typeDefs
})
