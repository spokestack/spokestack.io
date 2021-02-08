import { getCookie } from './cookies'

export function isLoggedIn() {
  return getCookie('loggedIn') === 'true'
}
