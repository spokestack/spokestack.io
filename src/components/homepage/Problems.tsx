import * as theme from '../../styles/theme'

import ProblemCard from './ProblemCard'
import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { css } from '@emotion/react'

export default function Problems() {
  return (
    <div className="ie-fix" id="problems" css={styles.problems}>
      <h2>Building a Voice Interface is Hard</h2>
      <p className="title">
        We know, we&apos;ve done it before! And we&apos;ve heard all about it
        from you too:
      </p>
      <div css={styles.cards}>
        <ProblemCard
          title="Technology Lock-In"
          description="Fragmented voice ecosystems means that you’re either stuck on one platform, or only support one part of voice technology. Only for Android. Only for smart speakers. Only TTS."
          image={
            <StaticImage
              css={styles.absoluteFill}
              height={230}
              alt="Technology Lock-In"
              src="../../images/homepage/technology-lock-in.png"
            />
          }
        />
        <ProblemCard
          title="Specialized Machine Learning Expertise"
          description="Voice AI is a difficult field full of papers with irreproducible results, easy to overlook pitfalls, and undocumented code."
          image={
            <StaticImage
              css={styles.absoluteFill}
              height={230}
              alt="Specialized Machine Learning Expertise"
              src="../../images/homepage/machine-learning.png"
            />
          }
        />
        <ProblemCard
          title="Where to Start?"
          description="So many packages and acronoyms, where to begin..."
          image={
            <StaticImage
              css={styles.absoluteFill}
              height={230}
              alt="Where to Start?"
              src="../../images/homepage/start.png"
            />
          }
        />
        <ProblemCard
          title="Hard To Use Tools"
          description="Spend all day in Jupyter notebooks babysitting training jobs instead of building your killer app! Or spend all day clicking and dragging in a poorly-designed &ldquo;Conversation Designer&rdquo;."
          image={
            <StaticImage
              css={styles.absoluteFill}
              height={230}
              alt="Hard To Use Tools"
              src="../../images/homepage/hard-to-use.png"
            />
          }
        />
        <ProblemCard
          full
          title="Can't Customize"
          description="Can your software listen when a user runs it? Can you only speak to users in &ldquo;Siri Voice&rdquo;? Is the platform wake word the only way to activate your app?"
          image={
            <StaticImage
              css={styles.absoluteFill}
              height={230}
              alt="Can't Customize"
              src="../../images/homepage/cant-customize.png"
            />
          }
        />
      </div>
    </div>
  )
}

const styles = {
  problems: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 100px 20px 0;

    & > p {
      margin: 0;
    }
  `,
  cards: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    column-gap: 50px;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
      max-width: 1090px;
      margin-left: auto;
      margin-right: auto;
    }
  `,
  absoluteFill: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `
}
