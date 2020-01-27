import postToCore from './postToCore'
import { v4 } from 'uuid'
import { navigate } from 'gatsby'

const userTokenKey = 'spokestack-user-token-v1'
const authTokenKey = 'spokestack-auth-token-v1'
const providerKey = 'spokestack-auth-provider-v1'
const stateKey = 'spokestack-auth-state-v1'

function getUserToken() {
  return localStorage.getItem(userTokenKey)
}

function setUserToken(token: string) {
  return localStorage.setItem(userTokenKey, token)
}

async function createAnonymousUser() {
  // Create a user token that lives 3 hours
  const [error, response] = await postToCore('/user/v1/login', {
    body: { ttl: 10800 }
  })
  if (error || !response) {
    console.error(error)
    return [new Error('Authorization request failed. Please check your network connection.')]
  }
  const status = response.status
  if (response.ok) {
    const token = response.headers.get('X-Authorization')
    if (token) {
      setUserToken(token)
      return [null, token]
    }
    return [
      new Error(`Authorization response returned status: ${status} with no X-Authorization header`)
    ]
  }
  return [new Error(`Authorization response returned status: ${status}`)]
}

export async function login() {
  // Return the current token if already logged in
  const token = getUserToken()
  if (token) {
    // Verify the token is still valid
    const [error] = await postToCore('/user/v1/login', {
      headers: {
        Authorization: token
      }
    })
    if (!error) {
      return [null, token]
    }
  }
  return createAnonymousUser()
}

export function getAuthToken() {
  return localStorage.getItem(authTokenKey)
}

export function isLoggedIn() {
  return typeof window !== 'undefined' && !!getAuthToken()
}

export function setAuthToken(token: string) {
  return localStorage.setItem(authTokenKey, token)
}

/**
 * Only generate once
 */
export function getStateKey() {
  let state = localStorage.getItem(stateKey)
  if (!state) {
    state = v4()
    localStorage.setItem(stateKey, state)
  }
  return state
}

export function getProvider() {
  return localStorage.getItem(providerKey)
}

export function setProvider(provider: string) {
  return localStorage.setItem(providerKey, provider)
}

export function logout() {
  localStorage.removeItem(userTokenKey)
  localStorage.removeItem(authTokenKey)
  localStorage.removeItem(providerKey)
  localStorage.removeItem(stateKey)
  navigate('/login')
}
