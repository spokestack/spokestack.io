const shell = require('shelljs')
const apiUrl = process.env.SS_API_URL
const githubToken = process.env.SS_DEV_GITHUB_TOKEN
const userToken = `GitHub ${githubToken}`

if (!apiUrl) {
  shell.echo('This script requires SS_API_URL to be set in the environment.')
  shell.exit(1)
}

if (!githubToken) {
  shell.echo(
    `This script requires SS_DEV_GITHUB_TOKEN to be set in the environment.
    It is the same as the "spokestack-auth-token-*" value in localStorage
    after logging in with GitHub.`
  )
  shell.exit(1)
}

console.log('API URL: ', apiUrl)
// console.log(introspectionQuery)

shell.exec(`graphql-inspector diff ./src/apollo/schema.graphql ${apiUrl}/control \
  --header "Authorization:${userToken}"
`)
shell.exec(`graphql-inspector introspect ${apiUrl}/control \
  --header "Authorization:${userToken}" \
  --write ./src/apollo/schema.graphql
`)
