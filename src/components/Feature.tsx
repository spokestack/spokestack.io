import { SerializedStyles, css } from '@emotion/react'

import React from 'react'
import SVGIcon from './SVGIcon'

interface Props {
  id: string
  icon: string
  iconCss: SerializedStyles | SerializedStyles[]
  name: string
  text: string
}

export default function Feature({ id, icon, iconCss, name, text }: Props) {
  return (
    <div id={id} css={styles.feature}>
      <div css={styles.image}>
        <SVGIcon icon={icon} extraCss={iconCss} />
      </div>
      <div className="ie-fix" css={styles.featureContent}>
        <h3>{name}</h3>
        <p>{text}</p>
      </div>
    </div>
  )
}

const styles = {
  feature: css`
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
  `,
  image: css`
    width: 50px;
    padding-top: 5px;
    margin-right: 10px;
    flex-shrink: 0;
  `,
  featureContent: css`
    display: flex;
    flex-direction: column;
  `
}
