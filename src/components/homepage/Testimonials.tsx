import * as theme from '../../styles/theme'

import Carousel from '../Carousel'
import React from 'react'
import Testimonial from './Testimonial'
import { css } from '@emotion/react'

export default function Testimonials() {
  return (
    <div id="testimonials" css={styles.testimonials}>
      <h2>Testimonials from Developers like You</h2>
      <Carousel maxWidth={750} numSlides={2} interval={0} showDesktopButtons>
        <Testimonial
          quote="Currently working on our very first MVP in the field of Life Sciences. Just getting started with your technology, amazing stuff! And so well documented! I’m developing our prototype app, and Spokestack is working very well. I sucessfully uploaded a model and am using it, sounds awesome! I have seen that Spokestack fulfills all our current needs for developing an MVP."
          name="Lirry P."
          title="Chief Design Officer, Elementa Labs"
        />
        <Testimonial
          quote="I have been using the wake word training feature and it's working great for my voice. Personal wake words are great for demo projects. Ease of use is superb! Love what you and the Spokestack team have done for wake word and all else."
          name="Prashan"
          title="a•kin AI"
        />
      </Carousel>
    </div>
  )
}

const styles = {
  testimonials: css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 100px 20px;
    background: ${theme.header} url(/homepage/wave.svg) no-repeat bottom center;
    background-size: 1440px 470px;

    h2 {
      color: ${theme.textDarkBg};
      margin-bottom: 50px;
    }

    @media (min-width: 1440px) {
      background-size: 100% 470px;
    }
  `
}
