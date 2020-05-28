import * as theme from '../../styles/theme'

import React, { useEffect, useRef, useState } from 'react'

import SVGIcon from '../SVGIcon'
import { css } from '@emotion/core'

export default function Video() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [played, setPlayed] = useState(false)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('playing', () => {
        setPlayed(true)
      })
    }
  }, [])
  return (
    <div css={styles.video}>
      <video
        ref={videoRef}
        controls={played}
        css={styles.videoElem}
        poster="/poster_2x.png">
        <source
          src="spokestack-1920x1080.mp4"
          type="video/mp4"
          media="(min-width: 1920px)"
        />
        <source
          src="spokestack-1280x720.mp4"
          type="video/mp4"
          media="(min-width: 1280px)"
        />
        <source
          src="spokestack-960x540.mp4"
          type="video/mp4"
          media="(min-width: 960px)"
        />
        <source
          src="spokestack-640x360.mp4"
          type="video/mp4"
          media="(min-width: 640px)"
        />
        <source src="spokestack-426x240.mp4" type="video/mp4" />
      </video>
      <a
        css={styles.playLink}
        onClick={() => videoRef.current.play()}
        style={played ? { display: 'none' } : null}>
        <div className="play-icon">
          <SVGIcon icon="#play" extraCss={styles.playIcon} />
        </div>
      </a>
    </div>
  )
}

const styles = {
  video: css`
    position: relative;
    border-radius: 10px;
    overflow: hidden;
  `,
  videoElem: css`
    width: 100%;
    max-width: ${theme.MAX_VIDEO_WIDTH};
  `,
  playLink: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .play-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 5px;
      background-color: ${theme.primary};
      transition: transform 0.2s ${theme.transitionEasing};
    }
    &:hover .play-icon {
      transform: scale(1.1);
    }
    &:active .play-icon {
      transform: scale(0.9);
    }
  `,
  playIcon: css`
    fill: white;
    width: 20px;
    height: 22px;
  `
}
