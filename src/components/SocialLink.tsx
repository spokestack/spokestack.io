import { SerializedStyles, css } from '@emotion/core'

import React from 'react'
import SVGIcon from './SVGIcon'
import { transitionEasing } from '../utils/theme'

interface Props {
  href: string
  title: string
  icon: string
  iconSize?: number
  extraCss?: SerializedStyles
  titleCss?: SerializedStyles
}

export default function SocialLink({
  href,
  title,
  icon,
  iconSize = 17,
  extraCss,
  titleCss
}: Props) {
  return (
    <a
      css={[
        styles.socialLink,
        css`
          width: ${iconSize + 20}px;
          height: ${iconSize + 20}px;
        `,
        extraCss
      ]}
      href={href}
      title={title}>
      <SVGIcon
        icon={icon}
        style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
      />
      <span css={[styles.title, titleCss]}>{title}</span>
    </a>
  )
}

const styles = {
  socialLink: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 10px;
    transition: background-color 0.2s ${transitionEasing};

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    &:active {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.7);
    }
  `,
  title: css`
    display: inline-block;
    margin-left: 15px;
  `
}
