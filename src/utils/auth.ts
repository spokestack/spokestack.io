import { getUserToken, setUserToken } from './userToken'

import postToCore from './postToCore'

async function createAnonymousUser() {
  // Create a user token that lives 3 hours
  const [error, response] = await postToCore('/user/v1/login', { body: { ttl: 10800 } })
  if (error || !response) {
    console.error(error)
    return [new Error('Login request failed. Please check your network connection.')]
  }
  const status = response.status
  if (response.ok) {
    const token = response.headers.get('X-Authorization')
    if (token) {
      setUserToken(token)
      return [null, token]
    }
    return [new Error(`Login response returned status: ${status} with no X-Authorization header`)]
  }
  return [new Error(`Login response returned status: ${status}`)]
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
