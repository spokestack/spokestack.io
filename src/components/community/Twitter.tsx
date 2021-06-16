import * as theme from '../../styles/theme'

import { graphql, useStaticQuery } from 'gatsby'

import { Query } from '../../utils/graphql'
import React from 'react'
import SVGIcon from '../SVGIcon'
import { css } from '@emotion/react'
import CommunityHeader from './Header'

export default function Twitter() {
  const data = useStaticQuery<Query>(twitterQuery)
  return (
    <div css={styles.twitter}>
      <CommunityHeader
        href={data.site!.siteMetadata!.social!.twitter!}
        icon={
          <SVGIcon
            icon="#twitter"
            className="icon"
            extraCss={styles.twitterIcon}
          />
        }
        linkText="Follow @spokestack"
        text="Stay Up-to-Date on the Latest"
      />
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
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 30px;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      padding: 100px;
    }
  `,
  twitterIcon: css`
    width: 17px;
    height: 15px;
  `,
  tweets: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;

    .twitter-tweet {
      max-width: 390px !important;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: flex-start;
      max-width: 1240px;
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
