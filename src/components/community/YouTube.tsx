import * as theme from '../../styles/theme'

import { graphql, useStaticQuery } from 'gatsby'

import { Query } from '../../utils/graphql'
import React from 'react'
import SVGIcon from '../SVGIcon'
import YouTubeEmbed from '../YouTubeEmbed'
import { css } from '@emotion/react'
import CommunityHeader from './Header'

export default function YouTube() {
  const data = useStaticQuery<Query>(youtubeQuery)
  const firstVideo = data.allYoutubeVideo.nodes[0]!
  return (
    <div className="ie-fix" css={styles.youtube}>
      <CommunityHeader
        href={data.site!.siteMetadata!.social!.youtube!}
        icon={
          <SVGIcon
            icon="#youtube"
            className="icon"
            extraCss={styles.youtubeIcon}
          />
        }
        linkText="Subscribe to Channel"
        text="Level Up Your Skills"
      />
      <div css={styles.present}>
        <div css={styles.video}>
          <YouTubeEmbed
            title={firstVideo.title!}
            videoId={firstVideo.videoId!}
          />
        </div>
        <div css={styles.videoList}>
          <h6>Explore Related Videos on YouTube</h6>
          {data.allYoutubeVideo.nodes.slice(1).map((video) => (
            <a
              key={video.videoId}
              css={styles.videoLink}
              href={`https://www.youtube.com/watch?v=${video.videoId}`}
            >
              <SVGIcon
                icon="#youtube"
                className="icon"
                extraCss={styles.youtubeIcon}
              />
              {video.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  youtube: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${theme.primaryLightest};
    padding: 100px 30px;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      padding: 100px;
    }
  `,
  youtubeIcon: css`
    width: 17px;
    height: 17px;
  `,
  present: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
      justify-content: flex-start;
      max-width: 1240px;
    }
  `,
  video: css`
    width: 100%;
    max-width: 620px;
  `,
  videoList: css`
    display: flex;
    flex-direction: column;
    padding-top: 50px;

    h6 {
      font-style: normal;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      padding: 0 0 0 50px;
    }
  `,
  videoLink: css`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    margin-bottom: 10px;

    .icon {
      margin-right: 7px;
    }

    &:hover {
      text-decoration: underline;
    }
  `
}

const youtubeQuery = graphql`
  query youtubeQuery {
    site {
      siteMetadata {
        social {
          youtube
        }
      }
    }
    allYoutubeVideo {
      nodes {
        title
        videoId
      }
    }
  }
`
