import React from 'react'
import Section from './Section'

export default function Tray() {
  return (
    <Section
      id="tray"
      image={{
        alt: 'Spokestack Tray',
        url: '/homepage/tray.svg',
        maxWidth: '505px',
        left: true
      }}
      header="Add voice search &amp; navigation without overhauling your UI"
      text={`Voice requests can be more efficient than navigating multiple
        visual menus. Receive all the benefits of a voice interface
        that compliments gesture navigation while preserving
        full autonomy and control of your customer's data.`}
    />
  )
}
