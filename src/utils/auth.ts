import { getCookie, setCookie } from './cookies'

import { v4 } from 'uuid'

export function isLoggedIn() {
  return getCookie('loggedIn') === 'true'
}

/**
 * Ensures that a state cookie is set, in case
 * the login buttons dropdown is used to log in.
 */
export function checkState() {
  const state = getCookie('state')
  if (!state) {
    setCookie('state', v4())
  }
}
