import BlueCard, { BlueCardProps } from '../BlueCard'

import React from 'react'
import SVGIcon from '../SVGIcon'
import { css } from '@emotion/react'

export default function Create(props: Partial<BlueCardProps>) {
  return (
    <BlueCard
      button={
        <a href="/create" className="btn btn-primary">
          Free account
          <SVGIcon
            icon="#arrow-forward"
            className="icon"
            extraCss={styles.createAccountIcon}
          />
        </a>
      }
      id="create"
      title="Create a free Spokestack account"
      text={`Access our collection of synthetic voices and private speech recognition, download offline wakewords, create your own NLU, and more!`}
      {...props}
    />
  )
}

const styles = {
  createAccountIcon: css`
    width: 20px;
    height: 20px;
    margin-left: 5px;
  `
}
