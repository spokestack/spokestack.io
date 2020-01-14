import React from 'react'
export { default as wrapRootElement } from './src/apollo/wrapRootElement'

export function onRenderBody({ setHeadComponents, setPostBodyComponents }) {
  setPostBodyComponents([
    <script
      key="speakable"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: `
          {
            "@context": "http://schema.org/",
            "@type": "WebPage",
            "name": "Spokestack",
            "speakable": {
              "@type": "SpeakableSpecification",
              "cssSelector": [".spokestack-speakable"]
            },
            "url": "https://spokestack.io"
          }
        `
      }}
    />
  ])
}
