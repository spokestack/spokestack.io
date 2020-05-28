import * as theme from '../../styles/theme'

import { MIN_DEFAULT_MEDIA_QUERY } from 'typography-breakpoint-constants'
import React from 'react'
import { css } from '@emotion/core'

export default function Create() {
  return (
    <section id="create" css={styles.create}>
      <h3>Create a free Spokestack account</h3>
      <div className="title">
        Create a free Spokestack account to access our hosted services for model
        import, natural language processing, text-to-speech, and wakeword.
      </div>
      <a href="/login" className="btn btn-primary">
        Get started
      </a>
    </section>
  )
}

const styles = {
  create: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: ${theme.primaryLight};
    border-radius: 7px;
    height: 400px;

    h3 {
      margin-bottom: 15px;
    }

    .title {
      max-width: 815px;
      margin: 0 auto 30px;
    }

    ${MIN_DEFAULT_MEDIA_QUERY} {
      margin: 0 50px;
    }
  `
}
