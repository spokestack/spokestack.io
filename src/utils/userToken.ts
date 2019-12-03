const userTokenKey = 'spokestack-user-token-v1'

export function getUserToken() {
  return localStorage.getItem(userTokenKey)
}

export function setUserToken(token: string) {
  return localStorage.setItem(userTokenKey, token)
}
