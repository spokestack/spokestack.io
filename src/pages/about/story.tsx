import AboutLayout from '../../components/AboutLayout'
import React from 'react'

export default function Story() {
  return (
    <AboutLayout>
      <h1>Story</h1>
      <p>
        Our team has worked together on voice user interfaces (VUI) for over three years. We started
        off making multi-modal services that worked on Alexa, Google, and Cortana. If you need a 
        <a href="https://thebartender.io">drink</a> or <a href="https://tasted.com">recipe</a>, you
        should try them out.
      </p>
      <p>
        While we were making our smart speaker skills, we released our{' '}
        <a href="/#asr">automatic speech recognition (ASR) manager</a>. We started to see other
        developers experimenting with voice control in their mobile apps, so in the Fall of 2019 we
        decided to focus on enabling voice on mobile apps. Our mission is to give every mobile app a
        voice and make smart phones even smarter. If successful, we will all spend less time looking
        at our phones and getting other things done.
      </p>
      <p>
        Prior to Spokestack, our team has worked for world-class consumer technology companies. We
        are active in open-source projects and communities and are committed to creating an open,
        secure VUI platform for developers.
      </p>
      <p>
        Have more questions? Please email us at{' '}
        <a href="mailto:hello@spokestack.io">hello@spokestack.io</a>.
      </p>
    </AboutLayout>
  )
}
