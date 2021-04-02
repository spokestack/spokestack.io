import * as theme from '../../styles/theme'

import React, { useEffect, useRef, useState } from 'react'
import { fullscreenElement, requestFullscreen } from '../../utils/video'

import SVGIcon from '../SVGIcon'
import { css } from '@emotion/react'

export default function Video() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [fullscreen, setFullscreen] = useState(false)
  useEffect(() => {
    function onFSChange() {
      const video = videoRef.current
      if (!video) {
        return
      }
      if (fullscreenElement() === videoRef.current) {
        setFullscreen(true)
        videoRef.current?.play()
      } else {
        setFullscreen(false)
        videoRef.current?.pause()
      }
    }
    document.addEventListener('fullscreenchange', onFSChange)
    document.addEventListener('MSFullscreenChange', onFSChange)

    return () => {
      document.removeEventListener('fullscreenchange', onFSChange)
      document.removeEventListener('MSFullscreenChange', onFSChange)
    }
  }, [])
  return (
    <div css={styles.video}>
      <video
        aria-label="Spokestack Tray Introduction Video"
        ref={videoRef}
        controls
        css={[styles.absoluteFill, styles.videoElem]}
        style={{ display: fullscreen ? 'block' : 'none' }}>
        <source src="/homepage/spokestack-tray-demo.mp4" type="video/mp4" />
        <source src="/homepage/spokestack-tray-demo.webm" type="video/webm" />
      </video>
      <img alt="Spokestack Tray Introduction Video Poster" src="/poster.svg" />
      <a
        tabIndex={0}
        title="Play video"
        css={[styles.absoluteFill, styles.playLink]}
        onClick={async () => {
          try {
            const result = await requestFullscreen(videoRef.current)
            if (result === false) {
              setFullscreen(true)
              videoRef.current?.play()
            }
          } catch (e) {
            console.error(e)
          }
        }}>
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
    width: 100%;
    max-width: 375px;
    line-height: 0;
    margin-top: 20px;
    overflow: hidden;

    img {
      max-width: 100%;
    }
  `,
  absoluteFill: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `,
  videoElem: css`
    display: none;
    line-height: 0;
    width: 100%;
    object-fit: contain;
  `,
  playLink: css`
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
