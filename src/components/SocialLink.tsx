import React from 'react'
import SVGIcon from './SVGIcon'
import { css } from '@emotion/core'

interface Props {
  href: string
  title: string
  icon: string
  iconSize?: number
}

export default function SocialLink({ href, title, icon, iconSize = 17 }: Props) {
  return (
    <a
      css={styles.socialLink}
      style={{ width: `${iconSize + 20}px`, height: `${iconSize + 20}px` }}
      href={href}
      title={title}>
      <SVGIcon icon={icon} style={{ width: `${iconSize}px`, height: `${iconSize}px` }} />
    </a>
  )
}

const styles = {
  socialLink: css`
    display: flex;
    flex-direction: column;
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
  `
}
