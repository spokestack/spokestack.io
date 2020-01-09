import { getStateKey, setAuthToken, setProvider } from './auth'

const clientId = process.env.SS_GOOGLE_CLIENT_ID

export function createLink() {
  let url = 'https://accounts.google.com/o/oauth2/v2/auth'
  url += `?client_id=${clientId}`
  url += '&response_type=token'
  // List of scopes: https://developers.google.com/identity/protocols/googlescopes
  url += `&scope=${encodeURIComponent('https://www.googleapis.com/auth/userinfo.email')}`
  url += `&state=${getStateKey()}`
  url += `&redirect_uri=${location.origin}/oauth/google/`
  return url
}

export async function getAccessToken(
  accessToken: string,
  tokenType: string,
  stateFromGoogle: string
): Promise<[Error?, string?]> {
  if (stateFromGoogle !== getStateKey()) {
    return [new Error('State parameter from Google does not match')]
  }
  if (!accessToken || !tokenType) {
    return [new Error('Did not receive expected data from Google.')]
  }
  setProvider('Google')
  setAuthToken(accessToken)
  return [null, accessToken]
}
