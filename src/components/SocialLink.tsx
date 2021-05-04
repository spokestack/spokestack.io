import * as theme from '../styles/theme'

import { SerializedStyles, css } from '@emotion/react'

import React from 'react'
import SVGIcon from './SVGIcon'

interface Props {
  href: string
  title: string
  icon: string
  extraCss: SerializedStyles | SerializedStyles[]
  iconCss: SerializedStyles | SerializedStyles[]
  transparent?: boolean
}

export default function SocialLink({
  href,
  title,
  icon,
  extraCss,
  iconCss,
  transparent
}: Props) {
  const style = [styles.socialLink]
  if (transparent) {
    style.push(styles.transparent)
  }
  return (
    <a css={style.concat(extraCss!)} href={href} title={title}>
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
    background-color: ${theme.primary};
    transition: background-color 0.2s ${theme.transitionEasing};
    cursor: pointer;

    &:not(:last-of-type) {
      margin-right: 10px;
    }
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
  transparent: css`
    background-color: transparent;
    border: 1px solid ${theme.primary};

    svg {
      fill: ${theme.primary};
    }

    &:hover {
      svg {
        fill: white;
      }
    }
  `,
  title: css`
    display: inline-block;
    margin-left: 15px;
  `
}
