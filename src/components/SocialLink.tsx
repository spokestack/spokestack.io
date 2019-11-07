import React from 'react'
import { css } from '@emotion/core'

interface Props {
  href: string
  title: string
  icon: string
}

export default function SocialLink({ href, title, icon }: Props) {
  return (
    <a css={styles.socialLink} href={href} title={title}>
      <svg css={styles.icon}>
        <use xlinkHref={`#${icon}`} />
      </svg>
    </a>
  )
}

const styles = {
  socialLink: css`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: none;
    border-radius: 50%;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      background-image: none;
    }
    &:active {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.7);
    }
  `,
  icon: css`
    width: 17px;
    height: 17px;
    display: inline-block;
    fill: white;
    line-height: 0;
  `
}
