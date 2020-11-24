const darkModeKey = 'spokestack-auth-dark-mode-v1'

export function getDarkModePref() {
  return typeof window !== 'undefined' && !!localStorage.getItem(darkModeKey)
}

export function setDarkModePref(dark: boolean) {
  if (dark) {
    localStorage.setItem(darkModeKey, 'true')
  } else {
    localStorage.removeItem(darkModeKey)
  }
}
