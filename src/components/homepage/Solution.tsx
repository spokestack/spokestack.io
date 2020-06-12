import * as theme from '../../styles/theme'

import {
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_LARGE_DISPLAY_MEDIA_QUERY
} from 'typography-breakpoint-constants'

import Callout from '../Callout'
import React from 'react'
import { css } from '@emotion/core'

export default function Solution() {
  return (
    <section id="solution" className="ie-fix" css={styles.container}>
      <div className="ie-fix" css={styles.content}>
        <img
          alt="Independent Voice Assistant"
          src="/homepage/solution.svg"
          css={styles.solutionImage}
        />
        <h3>An independent voice assistant is your solution</h3>
        <p className="title">
          Add it to your mobile app or embed it on your website to get all the
          benefits of a voice interface while preserving full autonomy and
          control.
        </p>
      </div>
      <div css={styles.cases}>
        <Callout extraCss={styles.callout}>
          <h5>Use case</h5>
          <h4>Voice Search</h4>
          <p>
            Quickly give customers what they need. With Spokestack tools and
            services, you can combine voice input with any search engine.
          </p>
        </Callout>
        <Callout extraCss={styles.callout}>
          <h5>Use case</h5>
          <h4>Voice Navigation</h4>
          <p>
            Help users navigate your app by listening to them. Spokestack will
            help you integrate voice in a way that compliments gesture
            navigation.
          </p>
        </Callout>
        <Callout extraCss={styles.callout}>
          <h5>Use case</h5>
          <h4>Custom Voice</h4>
          <p>
            Don’t want to sound like Siri or Google? Respond in your own brand’s
            voice. We provide model training and hosting for branded
            Text-to-Speech (TTS) responses.
          </p>
        </Callout>
      </div>
    </section>
  )
}

const styles = {
  container: css`
    padding: 0 20px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${MIN_LARGE_DISPLAY_MEDIA_QUERY} {
      padding-left: 100px;
      padding-right: 100px;
    }
  `,
  content: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: ${theme.MAX_TEXT_WIDTH};
    margin-bottom: 50px;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      text-align: center;
    }
  `,
  solutionImage: css`
    width: 100%;
    max-width: 139px;
  `,
  cases: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
    }
  `,
  callout: css`
    width: 290px;
    height: 360px;
    padding-top: 50px;
    padding-bottom: 75px;

    & + & {
      margin-top: 20px;
    }

    p {
      margin: 0;
      width: 100%;
    }

    ${MIN_DEFAULT_MEDIA_QUERY} {
      margin: 0 10px !important;
    }
  `
}
