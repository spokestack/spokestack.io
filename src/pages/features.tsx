import Layout from '../components/Layout'
import React from 'react'
import SEO from '../components/SEO'

export default function Features() {
  return (
    <Layout>
      <SEO
        title="Features"
        longTitle="Spokestack Features"
        description={`Discover all of the features Spokestack to make your app fully voice-enabled,
        including Automatic Speech Recognition, Natural Language Processing, Text-to-Speech, and Wakeword.`}
      />
    </Layout>
  )
}
