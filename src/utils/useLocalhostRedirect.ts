import { useEffect } from 'react'

const rlocalhost = /^http:\/\/localhost/

export default function useLocalhostRedirect() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  async function redirectIfAvailable(url: string) {
    try {
      const response = await fetch(url, { redirect: 'manual' })
      if (response.ok || response.type === 'opaqueredirect') {
        console.log('Location found on other site. Redirecting...')
        window.location.href = url
      }
    } catch (e) {}
  }
  useEffect(() => {
    // Redirect to the gatsby site in case it's running
    // and the page exists there
    if (rlocalhost.test(window.location.origin)) {
      const url = new URL(window.location.pathname, 'http://localhost:3000')
      redirectIfAvailable(url.href)
    }
  }, [])
}
