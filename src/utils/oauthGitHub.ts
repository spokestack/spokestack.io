import { getStateKey, setAuthToken, setProvider } from './auth'

const clientIds: { [key: string]: string } = {
  'https://www.spokestack.io': process.env.SS_GITHUB_CLIENT_ID,
  'https://beta.spokestack.io': process.env.SS_BETA_GITHUB_CLIENT_ID,
  'http://localhost:8000': process.env.SS_LOCAL_GITHUB_CLIENT_ID
}
const apiUrl = process.env.SS_API_URL

function getClientId() {
  return clientIds[process.env.SITE_URL]
}

export function createLink() {
  let url = 'https://github.com/login/oauth/authorize'
  url += `?client_id=${getClientId()}`
  url += '&scope=read:user,user:email'
  url += `&state=${getStateKey()}`
  return url
}

export async function getAccessToken(
  code: string,
  stateFromGH: string
): Promise<[Error?, string?]> {
  if (stateFromGH !== getStateKey()) {
    return [new Error('State parameter from GitHub does not match')]
  }
  return fetch(`${apiUrl}/authorize/github`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: getClientId(),
      code,
      state: stateFromGH
    })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Received response code ${response.status}.`)
      }
      return response.json()
    })
    .then(
      ({ access_token: accessToken, token_type: tokenType }) => {
        if (!accessToken || !tokenType) {
          throw new Error('Did not receive expected data from GitHub.')
        }
        setProvider('GitHub')
        setAuthToken(accessToken)
        return [null, accessToken]
      },
      (error) => {
        console.error(error)
        return [
          new Error(
            'There was a problem authorizing with GitHub. Please check your network.'
          )
        ]
      }
    )
}
