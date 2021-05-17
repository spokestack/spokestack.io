import BlueCard, { BlueCardProps } from './BlueCard'

import React from 'react'
import SVGIcon from './SVGIcon'
import { css } from '@emotion/react'
import * as theme from '../styles/theme'

interface Props extends Partial<Omit<BlueCardProps, 'children'>> {
  hidePricing?: boolean
}

export default function Create({ hidePricing, ...props }: Props) {
  return (
    <BlueCard
      id="create"
      title="Create a free Spokestack account"
      text={`Access our collection of synthetic voices and private speech recognition, download offline wake words, create your own NLU, and more!`}
      {...props}>
      <div css={styles.buttons}>
        <a href="/account/create" className="btn">
          Sign up free
          <SVGIcon
            icon="#arrow-forward"
            className="icon"
            extraCss={styles.createAccountIcon}
          />
        </a>
        {!hidePricing && (
          <a href="/pricing" className="btn btn-transparent">
            See pricing
            <SVGIcon
              icon="#arrow-forward"
              className="icon"
              extraCss={styles.createAccountIcon}
            />
          </a>
        )}
      </div>
    </BlueCard>
  )
}

const styles = {
  buttons: css`
    display: flex;
    flex-direction: column;
    align-items: center;

    .btn:first-of-type {
      margin-bottom: 20px;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;

      .btn:first-of-type {
        margin: 0 20px 0 0;
      }
    }
  `,
  createAccountIcon: css`
    width: 20px;
    height: 20px;
    margin-left: 5px;
  `
}
