import { SerializedStyles, css } from '@emotion/core'

import React from 'react'
import SVGIcon from './SVGIcon'
import * as theme from '../styles/theme'

interface Props {
  href: string
  title: string
  icon: string
  extraCss: SerializedStyles
  iconCss: SerializedStyles
}

export default function SocialLink({
  href,
  title,
  icon,
  extraCss,
  iconCss
}: Props) {
  return (
    <a css={[styles.socialLink, extraCss]} href={href} title={title}>
      <SVGIcon icon={icon} extraCss={iconCss} />
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
    margin: 0 5px;
    background-color: ${theme.primary};
    transition: background-color 0.2s ${theme.transitionEasing};

    &:hover {
      background-color: ${theme.primaryColor.darken(0.1).hex()};
    }
    &:active {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.7);
    }

    svg {
      fill: white;
    }
  `,
  title: css`
    display: inline-block;
    margin-left: 15px;
  `
}
