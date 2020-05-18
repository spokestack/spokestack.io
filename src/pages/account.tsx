import Billing from '../components/account/Billing'
import CreateAccount from '../components/account/CreateAccount'
import PrivateRoute from '../components/PrivateRoute'
import React from 'react'
import { RouteComponentProps } from '@reach/router'
import RouteWithAccount from '../components/account/RouteWithAccount'
import { Router } from '@reach/router'
import SEO from '../components/SEO'
import Settings from '../components/account/Settings'
import TextToSpeech from '../components/account/TextToSpeech'
import { navigate } from 'gatsby'

const raccount = /^\/account\/?$/

export default function Account({ location }: RouteComponentProps) {
  if (typeof window !== 'undefined' && raccount.test(location.pathname)) {
    navigate('/account/settings')
  }

  return (
    <>
      <SEO
        title="Account"
        description="Your Spokestack account settings and billing"
      />
      <Router>
        <PrivateRoute path="/account/create" component={CreateAccount} />
        <RouteWithAccount path="/account/settings" component={Settings} />
        <RouteWithAccount
          path="/account/services/text-to-speech"
          component={TextToSpeech}
        />
        <RouteWithAccount path="/account/billing" component={Billing} />
      </Router>
    </>
  )
}
