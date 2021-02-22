import { CookieSerializeOptions, serialize } from 'cookie'

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

export function setCookie(
  name: string,
  value: string,
  options: CookieSerializeOptions = {}
) {
  if (typeof document !== 'undefined') {
    if (!('expires' in options)) {
      options.maxAge = 60 * 60 * 24 * 364 // One year
    }

    if ('maxAge' in options) {
      options.expires = new Date(Date.now() + options.maxAge)
    }

    document.cookie = serialize(name, String(value), {
      httpOnly: false,
      sameSite: false,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      ...options
    })
  }
}
