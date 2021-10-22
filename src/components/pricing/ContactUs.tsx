import BlueCard, { BlueCardProps } from '../BlueCard'

import React from 'react'
import SVGIcon from '../SVGIcon'
import { css } from '@emotion/react'

export default function ContactUs(
  props: Partial<Omit<BlueCardProps, 'children'>>
) {
  return (
    <BlueCard
      id="request"
      title="Need Help Choosing a Plan?"
      text="Let us show you around before you decide."
      {...props}
    >
      <a href="mailto:hello@spokestack.io" className="btn">
        Request demo
        <SVGIcon
          icon="#arrow-forward"
          className="icon"
          extraCss={styles.arrowIcon}
        />
      </a>
    </BlueCard>
  )
}

const styles = {
  arrowIcon: css`
    width: 20px;
    height: 20px;
    margin-left: 5px;
  `
}
