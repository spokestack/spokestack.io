import React from 'react'
import SampleVoices from '../SampleVoices'
import voices from '../../utils/voices'
import AccountLayout from './AccountLayout'
import { RouteComponentProps } from '@reach/router'
import { Account } from '../../types'

interface Props extends RouteComponentProps {
  account: Account
}

export default function TextToSpeech({ location }: Props) {
  return (
    <AccountLayout title="Text to Speech" location={location}>
      <SampleVoices voices={voices} />
    </AccountLayout>
  )
}
