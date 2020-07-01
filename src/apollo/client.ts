import { ApolloLink, Observable, Operation } from 'apollo-link'
import { getAuthToken, getProvider } from '../utils/auth'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Subscription } from 'apollo-client/util/Observable'
import { createLink } from './absinthe-upload-file'
import fetch from 'isomorphic-unfetch'
import { onError } from 'apollo-link-error'
import schema from './schema.graphql'

console.log('Using API URL', process.env.SS_API_URL)

const cache = new InMemoryCache()

const request = async (operation: Operation) => {
  const provider = getProvider()
  const token = getAuthToken()
  if (provider && token) {
    operation.setContext({
      headers: {
        Authorization: `${provider} ${token}`
      }
    })
  }
}

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: Subscription
      Promise.resolve(operation)
        .then((oper) => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) handle.unsubscribe()
      }
    })
)

export default new ApolloClient({
  cache,
  typeDefs: schema,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        if (Array.isArray(graphQLErrors)) {
          graphQLErrors.forEach(function ({ message, locations, path }) {
            console.error(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          })
        } else {
          console.log(graphQLErrors)
        }
      }
      if (networkError) {
        console.error('[Network error]: ' + networkError)
      }
    }),
    requestLink,
    createLink({
      fetch,
      uri: `${process.env.SS_API_URL}/control`
    })
  ])
})
