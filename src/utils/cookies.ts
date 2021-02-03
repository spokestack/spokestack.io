const rcolon = /\s*;\s*/g
export function getCookie(name: string) {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(rcolon)
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=')
      if (key === name) {
        return decodeURIComponent(value)
      }
    }
  }
}
