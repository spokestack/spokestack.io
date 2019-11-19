import { Global, css } from '@emotion/core'
import React, { useEffect, useRef, useState } from 'react'

import { MIN_TABLET_MEDIA_QUERY } from 'typography-breakpoint-constants'
import SVGIcon from './SVGIcon'
import UsageBubble from './UsageBubble'
import car from '../icons/car.svg'
import phone from '../icons/phone.svg'

export default function UsageMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      function(entries) {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            return setShow(true)
          }
        }
      },
      {
        root: null,
        threshold: 0.7
      }
    )
    observer.observe(containerRef.current)
  }, [])
  return (
    <div ref={containerRef} css={styles.usageMap} className={show ? 'animate' : ''}>
      <Global styles={styles.global} />
      <UsageBubble
        className="usage-bubble smart-speakers"
        extraCss={styles.smartSpeakers}
        text="23% Smart Speakers"
      />
      <UsageBubble
        className="usage-bubble cars"
        extraCss={styles.cars}
        text="45% Cars"
        icon={<SVGIcon icon={car.id} style={{ width: '81px', height: '56px' }} />}
      />
      <UsageBubble
        className="usage-bubble phones"
        extraCss={styles.phones}
        text="58% Smartphones"
        icon={<SVGIcon icon={phone.id} style={{ width: '71px', height: '143px' }} />}
      />
      <header css={styles.header}>
        <h3>
          U.S. Assistant Use by Device <sup>*</sup>
        </h3>
      </header>
      <p css={styles.credit}>
        <sup>*</sup>
        <a href="https://voicebot.ai/">voicebot.ai</a> credit 2018
      </p>
    </div>
  )
}

const styles = {
  global: css`
    @keyframes slideDownLeft {
      from {
        transform: translate(0, 0);
      }
      to {
        transform: translate(-10px, 15px);
      }
    }
    @keyframes slideRight {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(10px);
      }
    }
    @keyframes slideUpLeft {
      from {
        transform: translate(0, 0);
      }
      to {
        transform: translate(-20px, -20px);
      }
    }
    .animate {
      .usage-bubble.smart-speakers {
        animation: slideDownLeft 1s var(--bubble-easing) forwards;
      }
      .usage-bubble.cars {
        animation: slideRight 1s var(--bubble-easing) forwards;
      }
      .usage-bubble.phones {
        animation: slideUpLeft 1s var(--bubble-easing) forwards;
      }
    }
  `,
  usageMap: css`
    position: relative;
    width: 340px;
    margin: 0 auto;
    height: 815px;

    ${MIN_TABLET_MEDIA_QUERY} {
      width: 640px;
      height: 600px;
    }
  `,
  smartSpeakers: css`
    top: 0;
    right: 0;
    width: 124px;
    height: 124px;

    ${MIN_TABLET_MEDIA_QUERY} {
      width: 138px;
      height: 138px;
    }
  `,
  cars: css`
    top: 90px;
    left: 0;

    width: 212px;
    height: 212px;

    ${MIN_TABLET_MEDIA_QUERY} {
      top: 68px;
      width: 270px;
      height: 270px;
    }
  `,
  phones: css`
    top: 340px;
    left: 50%;
    margin-left: -130px;
    width: 300px;
    height: 300px;

    ${MIN_TABLET_MEDIA_QUERY} {
      top: 170px;
      left: 300px;
      margin-left: 0;
      width: 348px;
      height: 348px;
    }
  `,
  header: css`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 80px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    h3 {
      max-width: 230px;
      text-align: center;
    }

    ${MIN_TABLET_MEDIA_QUERY} {
      left: 30px;
      right: auto;
      bottom: 120px;
    }
  `,
  credit: css`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;

    ${MIN_TABLET_MEDIA_QUERY} {
      left: auto;
    }
  `
}
