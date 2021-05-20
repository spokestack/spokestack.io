import { css } from '@emotion/react'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import Carousel from '../Carousel'

const carouselBreakpoints = [750, 980, 1080, 1120, 1240]

export default function Solution() {
  return (
    <div css={styles.solution}>
      <h2>Spokestack Maker</h2>
      <p>
        Developers and hobbyists use Spokestack to prototype projects before
        committing to training a universal wake word/keyword model or
        studio-quality TTS voice.
      </p>
      <Carousel
        keys={['Wake Word', 'Keyword Recognition', 'NLU', 'TTS']}
        maxWidth={1240}>
        <StaticImage
          width={1240}
          placeholder="dominantColor"
          breakpoints={carouselBreakpoints}
          alt="Wake Word"
          src="../../images/homepage/wake-word.png"
        />
        <StaticImage
          width={1240}
          placeholder="dominantColor"
          breakpoints={carouselBreakpoints}
          alt="Keyword Recognition"
          src="../../images/homepage/keyword.png"
        />
        <StaticImage
          width={1240}
          placeholder="dominantColor"
          breakpoints={carouselBreakpoints}
          alt="NLU"
          src="../../images/homepage/nlu.png"
        />
        <StaticImage
          width={1240}
          placeholder="dominantColor"
          breakpoints={carouselBreakpoints}
          alt="TTS"
          src="../../images/homepage/tts.png"
        />
      </Carousel>
    </div>
  )
}

const styles = {
  solution: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 50px 20px;

    & > p {
      max-width: 760px;
      margin: 0;
    }
  `
}
