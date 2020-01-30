import * as theme from '../utils/theme'

import {
  DEFAULT_WIDTH,
  MIN_DEFAULT_MEDIA_QUERY
} from 'typography-breakpoint-constants'
import { adjustFontSizeTo, rhythm } from '../utils/typography'
import { graphql, useStaticQuery } from 'gatsby'

import { Query } from '../utils/graphql'
import React from 'react'
import { css } from '@emotion/core'

export default function Events() {
  const {
    site: {
      siteMetadata: { events }
    }
  } = useStaticQuery<Query>(eventsQuery)
  return (
    <div css={styles.container}>
      {events.map((event, i) => (
        <div key={`event-${i}`} css={styles.event} className="event">
          <div css={styles.about}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <a
              className="btn btn-primary btn-large"
              href={event.url}
              css={styles.registerButton}>
              Register
            </a>
          </div>
          <div css={styles.details}>
            <div css={styles.date}>
              <div css={styles.month}>{event.month}</div>
              <div css={styles.day}>{event.day}</div>
            </div>
            <div css={styles.location}>
              <div css={styles.time}>{event.time}</div>
              <div>{event.locationLine1}</div>
              <div>{event.locationLine2}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: ${DEFAULT_WIDTH};
    margin: 0 auto;

    .event + .event {
      border-top: 1px solid ${theme.mainBorder};
    }
  `,
  event: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: ${rhythm(2)} 0;

    ${MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: flex-start;
    }
  `,
  about: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 600px;
    margin-bottom: ${rhythm(2)};

    p {
      margin: 0;
    }

    p,
    h3 {
      width: 100%;
    }

    ${MIN_DEFAULT_MEDIA_QUERY} {
      width: auto;
      align-items: flex-start;
      margin-bottom: 0;
    }
  `,
  registerButton: css`
    width: 200px;
    margin-top: 25px;
  `,
  details: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${theme.primary};
  `,
  date: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 25px;
    font-weight: 700;
    white-space: nowrap;
  `,
  month: css`
    ${adjustFontSizeTo('32px')};
  `,
  day: css`
    ${adjustFontSizeTo('50px')};
  `,
  location: css`
    display: flex;
    flex-direction: column;
  `,
  time: css`
    ${adjustFontSizeTo('25px')};
    font-weight: 700;
    white-space: nowrap;
  `
}

const eventsQuery = graphql`
  query eventsQuery {
    site {
      siteMetadata {
        events {
          day
          description
          locationLine1
          locationLine2
          month
          time
          title
          url
        }
      }
    }
  }
`
