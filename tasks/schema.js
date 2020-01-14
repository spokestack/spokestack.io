const shell = require('shelljs')
const fs = require('fs')
const fetch = require('isomorphic-unfetch')

const apiUrl = process.env.SS_API_URL
const githubToken = process.env.SS_DEV_GITHUB_TOKEN
const userToken = `GitHub ${githubToken}`

if (!apiUrl) {
  shell.echo('This script requires SS_API_URL to be set in the environment.')
  shell.exit(1)
}

if (!githubToken) {
  shell.echo('This script requires SS_DEV_GITHUB_TOKEN to be set in the environment.')
  shell.exit(1)
}

if (!shell.which('graphql')) {
  shell.echo('This script requires graphql-cli (yarn add -D graphql-cli).')
  shell.exit(1)
}

console.log('API URL: ', apiUrl)

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

shell.exec(`graphql get-schema \
  --endpoint ${apiUrl}/control \
  --header Authorization="${userToken}" \
  --output src/apollo/typeDefs.graphql
`)

postToCore('/control', {
  headers: {
    Authorization: userToken
  },
  body: JSON.stringify({
    variables: {},
    query: `
      query IntrospectionQuery {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `
  })
})
  .then((result) => result.json())
  .then((result) => {
    // Filter out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter((type) => type.possibleTypes !== null)
    result.data.__schema.types = filteredData
    fs.writeFile(
      './src/apollo/fragmentTypes.json',
      JSON.stringify(result.data, null, '  ') + '\n',
      (err) => {
        if (err) {
          console.error('Error writing fragmentTypes file', err)
        } else {
          console.log('Fragment types successfully extracted!')
        }
      }
    )
  })
