import React from 'react'
import Section from './Section'

export default function Problem() {
  return (
    <Section
      id="problem"
      image={{
        alt: 'A voice interface will be expected',
        url: '/homepage/problem.svg',
        maxWidth: '504px',
        left: true
      }}
      header="More users are relying on voice"
      text={
        <>
          In a recent study,{' '}
          <a href="https://www.nationalpublicmedia.com/insights/reports/smart-audio-report/">
            63% of Americans 18 or older
          </a>{' '}
          use a voice assistant. That means more users will be expecting you to
          respond. Spokestack allows you to add voice to your app and website
          without being restricted by another company&rsquo;s platform.
        </>
      }
    />
  )
}
