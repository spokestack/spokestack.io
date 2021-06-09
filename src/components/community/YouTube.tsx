import * as theme from '../../styles/theme'

import { graphql, useStaticQuery } from 'gatsby'

import { Query } from '../../utils/graphql'
import React from 'react'
import SVGIcon from '../SVGIcon'
import YouTubeEmbed from '../YouTubeEmbed'
import { css } from '@emotion/react'

export default function YouTube() {
  const data = useStaticQuery<Query>(youtubeQuery)
  const firstVideo = data.allYoutubeVideo.nodes[0]!
  return (
    <div css={styles.youtube}>
      <div css={styles.header}>
        <h2>Level Up Your Skills</h2>
        <a
          href={data.site!.siteMetadata!.social!.youtube!}
          className="btn btn-wide">
          <SVGIcon icon="#youtube" extraCss={styles.youtubeIcon} />
          Subscribe
        </a>
      </div>
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
              href={`https://www.youtube.com/watch?v=${video.videoId}`}>
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
    background-color: ${theme.primaryLightest};
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
  youtubeIcon: css`
    width: 17px;
    height: 17px;
    fill: white;
    margin-right: 7px;
  `,
  present: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;
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
    font-weight: 400;
    margin-bottom: 10px;

    .icon {
      fill: ${theme.primary};
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
