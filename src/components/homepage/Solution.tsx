import React, { useState } from 'react'

import Carousel from '../Carousel'
import { StaticImage } from 'gatsby-plugin-image'
import YouTubeLink from '../YouTubeLink'
import { css } from '@emotion/react'

const carouselBreakpoints = [750, 980, 1080, 1240]

const youTubeLinks = [
  'https://www.youtube.com/watch?v=S9ED1_ET-T4',
  'https://www.youtube.com/watch?v=6nc5Wq7CFPY',
  'https://www.youtube.com/watch?v=AvhQ6-9nCrQ',
  'https://www.youtube.com/watch?v=OmwjXqvYGkc'
]

const learnMoreLinks = [
  '/features/wake-word',
  '/features/keyword',
  '/features/nlu',
  '/features/tts'
]

export default function Solution() {
  const [index, setIndex] = useState(0)
  return (
    <div id="solution" className="ie-fix" css={styles.solution}>
      <h2>Spokestack Maker</h2>
      <p>
        Startups, developers, and hobbyists use Spokestack to prototype projects
        before committing to training a universal wake word/keyword model or
        studio-quality TTS voice.
      </p>
      <Carousel
        keys={['Wake Word', 'Keyword Recognition', 'NLU', 'TTS']}
        maxWidth={1240}
        numSlides={4}
        onSlideChange={(index) => {
          setIndex(index)
        }}>
        <StaticImage
          width={1240}
          quality={100}
          placeholder="dominantColor"
          breakpoints={carouselBreakpoints}
          alt="Wake Word"
          src="../../images/homepage/wake-word.png"
        />
        <StaticImage
          width={1240}
          quality={100}
          placeholder="dominantColor"
          breakpoints={carouselBreakpoints}
          alt="Keyword Recognition"
          src="../../images/homepage/keyword.png"
        />
        <StaticImage
          width={1240}
          quality={100}
          placeholder="dominantColor"
          breakpoints={carouselBreakpoints}
          alt="NLU"
          src="../../images/homepage/nlu.png"
        />
        <StaticImage
          width={1240}
          quality={100}
          placeholder="dominantColor"
          breakpoints={carouselBreakpoints}
          alt="TTS"
          src="../../images/homepage/tts.png"
        />
      </Carousel>
      <div css={styles.links}>
        <YouTubeLink title="See How It Works" href={youTubeLinks[index]} />
        <a css={styles.learnMoreLink} href={learnMoreLinks[index]}>
          Learn more
        </a>
      </div>
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
  `,
  links: css`
    padding: 50px 20px;
  `,
  learnMoreLink: css`
    display: block;
    margin-top: 25px;
    font-weight: 400;
  `
}
