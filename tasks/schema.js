const fs = require('fs')
const fetch = require('isomorphic-unfetch')
// Use the same introspection query as graphql
const introspectionQuery = require('graphql').getIntrospectionQuery()

const apiUrl = process.env.SS_API_URL
const githubToken = process.env.SS_DEV_GITHUB_TOKEN
const userToken = `GitHub ${githubToken}`

if (!apiUrl) {
  throw new Error(
    'This script requires SS_API_URL to be set in the environment.'
  )
}

if (!githubToken) {
  throw new Error(
    `This script requires SS_DEV_GITHUB_TOKEN to be set in the environment.
    It is the same as the "spokestack-auth-token" value in localStorage
    after logging in with GitHub.`
  )
}

console.log('API URL: ', apiUrl)
// console.log(introspectionQuery)

function postToCore(url, options = {}) {
  return fetch(`${apiUrl}${url}`, {
    ...options,
    method: 'POST',
    headers: {
      ...options.headers,
      'Content-Type': 'application/json'
    }
  })
}

postToCore('/control', {
  headers: {
    Authorization: userToken
  },
  body: JSON.stringify({
    variables: {},
    query: introspectionQuery
  })
})
  .then((result) => result.json())
  .then((result) => {
    fs.writeFile(
      './src/apollo/schema.json',
      JSON.stringify(result.data, null, '  ') + '\n',
      (err) => {
        if (err) {
          console.error('Error writing schema file', err)
        } else {
          console.log('Remote schema successfully extracted!')
        }
      }
    )
  })
