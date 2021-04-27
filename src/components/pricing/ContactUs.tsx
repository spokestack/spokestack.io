import BlueCard, { BlueCardProps } from '../BlueCard'

import React from 'react'
import SVGIcon from '../SVGIcon'
import { css } from '@emotion/react'

export default function ContactUs(props: Partial<BlueCardProps>) {
  return (
    <BlueCard
      extraCss={styles.card}
      button={
        <a href="/account/create" className="btn btn-primary">
          Contact Us
          <SVGIcon
            icon="#arrow-forward"
            className="icon"
            extraCss={styles.arrowIcon}
          />
        </a>
      }
      id="request"
      title="Need Help Choosing a Plan?"
      text="Let us show you around before you decide."
      {...props}
    />
  )
}

const styles = {
  card: css`
    margin: 0 !important;
    width: 100% !important;
    border-radius: 0;
  `,
  arrowIcon: css`
    width: 20px;
    height: 20px;
    margin-left: 5px;
  `
}
