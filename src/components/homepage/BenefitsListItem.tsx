import * as theme from '../../styles/theme'

import React from 'react'
import SVGIcon from '../SVGIcon'
import { SerializedStyles } from '@emotion/utils'
import { css } from '@emotion/react'

interface CommonProps {
  bgColor?: string
  extraCss?: SerializedStyles | SerializedStyles[]
  iconCss: SerializedStyles | SerializedStyles[]
  imageCss?: SerializedStyles | SerializedStyles[]
  text: string
}

interface PropsWithIcon extends CommonProps {
  icon: string
  iconUrl?: undefined
}

interface PropsWithImage extends CommonProps {
  icon?: undefined
  iconUrl: string
}

type Props = PropsWithIcon | PropsWithImage

export default function BenefitsListItem({
  bgColor = 'black',
  extraCss,
  icon,
  iconCss,
  iconUrl,
  imageCss,
  text
}: Props) {
  return (
    <div css={[styles.listItem].concat(extraCss!)}>
      <div
        css={[styles.image].concat(imageCss!)}
        style={{ backgroundColor: bgColor }}>
        {iconUrl ? (
          <img alt={text} src={iconUrl} css={iconCss} />
        ) : (
          <SVGIcon icon={icon!} extraCss={iconCss} />
        )}
      </div>
      {text}
    </div>
  )
}

const styles = {
  listItem: css`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
    margin-bottom: 15px;

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      font-size: 24px;
    }
  `,
  image: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 15px;
    flex-shrink: 0;
  `
}
