import * as theme from '../../utils/theme'

import { Account } from '../../types'
import AccountLayout from './AccountLayout'
import Button from '../Button'
import NluModels from './NluModels'
import React from 'react'
import { RouteComponentProps } from '@reach/router'
import SVGIcon from '../SVGIcon'
import { css } from '@emotion/core'

interface Props extends RouteComponentProps {
  account: Account
}

export default function NLU({ location }: Props) {
  return (
    <AccountLayout location={location}>
      <h2>Language Understanding</h2>
      <p>
        Spokestack Natural Language Understanding (NLU) models use cutting edge
        machine learning techniques to help your app understand speech. Use one
        of our pre-built models for a variety of common use cases or import from
        your Alexa Skill.
      </p>
      <Button large>
        <SVGIcon icon="#nlu" extraCss={styles.icon} />
        Import
      </Button>
      <section css={styles.models}>
        <NluModels />
      </section>
    </AccountLayout>
  )
}

const styles = {
  icon: css`
    fill: ${theme.textDarkBg};
    width: 12px;
    height: 14px;
    margin-right: 10px;
  `,
  models: css`
    margin-top: 50px;
  `
}
