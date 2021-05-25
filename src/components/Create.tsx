import * as theme from '../styles/theme'

import BlueCard, { BlueCardProps } from './BlueCard'

import React from 'react'
import SVGIcon from './SVGIcon'
import { css } from '@emotion/react'

interface Props extends Partial<Omit<BlueCardProps, 'children'>> {
  hidePricing?: boolean
}

export default function Create({ hidePricing, ...props }: Props) {
  return (
    <BlueCard
      id="create"
      title={
        <h2 css={styles.title}>
          Become a Spokestack Maker and{' '}
          <a href="https://twitter.com/hashtag/ownyourvoice">#OwnYourVoice</a>
        </h2>
      }
      text="Access our hosted services for model import, natural language processing, text-to-speech, and wakeword."
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
  title: css`
    max-width: 615px;
  `,
  buttons: css`
    display: flex;
    flex-direction: column;
    align-items: center;

    .btn:first-of-type {
      margin-bottom: 20px;
    }

    ${theme.MIN_DEFAULT_MEDIA_QUERY} {
      flex-direction: row;

      .btn {
        width: 225px;

        &:first-of-type {
          margin: 0 20px 0 0;
        }
      }
    }
  `,
  createAccountIcon: css`
    width: 20px;
    height: 20px;
    margin-left: 5px;
  `
}
