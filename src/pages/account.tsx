import { PageRendererProps, navigate } from 'gatsby'

import CreateAccount from '../components/account/CreateAccount'
import Loadable from '@loadable/component'
import NLU from '../components/account/NLU'
import PrivateRoute from '../components/PrivateRoute'
import React from 'react'
import RouteWithAccount from '../components/account/RouteWithAccount'
import { Router } from '@reach/router'
import SEO from '../components/SEO'
import Settings from '../components/account/Settings'
import TextToSpeech from '../components/account/TextToSpeech'

const raccount = /^\/account\/?$/
const GraphiQL = Loadable(() => import('../components/GraphiQL'))

export default function Account({ location }: PageRendererProps) {
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
          path="/account/services/tts"
          component={TextToSpeech}
        />
        <PrivateRoute path="/account/services/nlu" component={NLU} />
        {process.env.NODE_ENV !== 'production' && (
          <PrivateRoute path="/account/__api" component={GraphiQL} />
        )}
      </Router>
    </>
  )
}
