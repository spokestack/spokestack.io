import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client'

let apolloClient: ApolloClient<NormalizedCacheObject>
const rlocalhost = /^http:\/\/localhost/

export default function createClient() {
  // The same client can be shared in the browser
  if (!apolloClient) {
    apolloClient = new ApolloClient({
      uri: rlocalhost.test(window.location.origin)
        ? 'http://localhost:3000/api/v1'
        : '/api/v1',
      cache: new InMemoryCache()
    })
  }
  return apolloClient
}
