import React from 'react'
import { getAccessToken } from '../../utils/oauthGoogle'
import OAuth from '../../components/OAuth'
import parseQuery from '../../utils/parseQuery'
import { PageRendererProps } from 'gatsby'

export default function GoogleOAuth({ location }: PageRendererProps) {
  async function checkAuth() {
    const query = parseQuery(window.location.hash)
    const [authError] = await getAccessToken(
      query.access_token,
      query.token_type,
      query.state
    )
    if (authError) {
      return (
        authError.message ||
        'There was problem authorizing with Google. Please try again.'
      )
    }
  }
  return <OAuth checkAuth={checkAuth} location={location} />
}
