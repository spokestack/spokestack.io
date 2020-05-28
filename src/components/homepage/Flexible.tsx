import React from 'react'
import Section from './Section'

export default function Flexible() {
  return (
    <Section
      id="flexibility"
      image={{ url: '/homepage/flexible.svg', maxWidth: '503px' }}
      header="Maintain control &amp; flexibility"
      text={`Our framework allows full control of your voice assistant's
      speech pipeline. Want to use Cortana instead of
      Google on Android? Prefer to use Dialogflow to
      understand what your users are saying? Want to use
      our TTS service instead of Amazon Polly? No problem!`}
    />
  )
}
