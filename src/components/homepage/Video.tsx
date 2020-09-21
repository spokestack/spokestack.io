import * as theme from '../../styles/theme'

import React, { useEffect, useRef, useState } from 'react'

import SVGIcon from '../SVGIcon'
import { css } from '@emotion/core'

export default function Video() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [played, setPlayed] = useState(false)
  useEffect(() => {
    videoRef.current?.addEventListener('playing', () => {
      setPlayed(true)
    })
  }, [])
  return (
    <div
      className="ie-fix"
      css={[
        styles.video,
        played
          ? css`
              padding-top: 216.14%;

              @media (min-width: 415px) {
                padding-top: 810px !important;
              }
            `
          : css`
              padding-top: 129.79%;
            `
      ]}>
      <video
        aria-label="Spokestack Introduction Video"
        ref={videoRef}
        controls={played}
        playsInline={false}
        css={styles.videoElem}
        poster="/poster.svg">
        <source src="/homepage/spokestack-tray-demo.mp4" type="video/mp4" />
        <source src="/homepage/spokestack-tray-demo.webm" type="video/webm" />
      </video>
      <a
        tabIndex={0}
        title="Play video"
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
    width: 100%;
    max-width: 375px;
    height: 0;
  `,
  videoElem: css`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: fill;
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
