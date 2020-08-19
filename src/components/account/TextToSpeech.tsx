import { Account } from '../../types'
import AccountLayout from './AccountLayout'
import React from 'react'
import { RouteComponentProps } from '@reach/router'
import SampleVoices from '../SampleVoices'

interface Props extends RouteComponentProps {
  account: Account
}

export default function TextToSpeech({ account, location }: Props) {
  return (
    <AccountLayout location={location}>
      <h2>Text-to-Speech</h2>
      <SampleVoices account={account} allowDownload />
    </AccountLayout>
  )
}
