// custom typefaces
import 'prismjs/themes/prism-tomorrow.css'

import { ApolloProvider } from '@apollo/react-hooks'
import React from 'react'
import client from './src/apollo/client'

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (typeof window.IntersectionObserver === 'undefined') {
    import('intersection-observer')
    console.log('# IntersectionObserver is polyfilled!')
  }
}

// eslint-disable-next-line react/prop-types
export function wrapRootElement({ element }) {
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
