import React from 'react'

export const onRenderBody = ({ setPostBodyComponents }) => {
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
            "url": "https://www.spokestack.io"
          }
        `
      }}
    />
  ])
}
