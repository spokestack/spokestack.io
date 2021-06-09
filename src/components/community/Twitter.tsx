import * as theme from '../../styles/theme'

import { graphql, useStaticQuery } from 'gatsby'

import { Query } from '../../utils/graphql'
import React from 'react'
import SVGIcon from '../SVGIcon'
import { css } from '@emotion/react'

export default function Twitter() {
  const data = useStaticQuery<Query>(twitterQuery)
  return (
    <div css={styles.twitter}>
      <div css={styles.header}>
        <h2>Stay Up-to-Date on the Latest</h2>
        <a
          href={data.site!.siteMetadata!.social!.twitter!}
          className="btn btn-wide">
          <SVGIcon icon="#twitter" extraCss={styles.twitterIcon} />
          Follow @spokestack
        </a>
      </div>
      <div
        css={styles.tweets}
        dangerouslySetInnerHTML={{
          __html: data.allTwitterStatusesUserTimelineSpokestack.nodes
            .map((node) => node.fields?.html)
            .join('')
        }}
      />
    </div>
  )
}

const styles = {
  twitter: css`
    padding: 100px 30px;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      padding: 100px;
    }
  `,
  header: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 50px;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;

      h2 {
        margin: 0 50px 0 0;
      }
    }
  `,
  twitterIcon: css`
    width: 17px;
    height: 15px;
    fill: white;
    margin-right: 7px;
  `,
  tweets: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .twitter-tweet {
      margin: 0 0 30px !important;
      max-width: 390px !important;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: flex-start;

      .twitter-tweet + .twitter-tweet {
        margin-left: 30px !important;
      }
    }
  `
}

const twitterQuery = graphql`
  query twitterQuery {
    site {
      siteMetadata {
        social {
          twitter
        }
      }
    }
    allTwitterStatusesUserTimelineSpokestack(limit: 3) {
      nodes {
        fields {
          html
        }
      }
    }
  }
`
