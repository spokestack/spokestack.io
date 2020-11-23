/**
 * This component uses an iframe
 * to avoid any style collisions or
 * rendering race conditions with graphql in development.
 *
 * Simply using the GraphiQL React component does not render correctly.
 *
 * `npm start` will run both the gatsby develop server and
 * the introspection server for the Spokestack API.
 *
 * Introspection is available at http://localhost:8000/account/graphql
 */
import { Global, css } from '@emotion/core'
import { getAuthToken, getProvider } from '../utils/auth'

import React from 'react'

export default function GraphiQLPage() {
  const userToken = `${getProvider()} ${getAuthToken()}`
  return (
    <>
      <Global
        styles={css`
          body {
            margin: 0;
          }
          html,
          html * {
            width: 100%;
            height: 100vh;
          }
          iframe {
            display: block;
            border: 0;
            margin: 0;
          }
        `}
      />
      <iframe
        src={`http://localhost:5000/?apiUrl=${encodeURIComponent(
          process.env.SS_API_URL
        )}&token=${encodeURIComponent(userToken)}`}
      />
    </>
  )
}
