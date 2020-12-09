import React, { Fragment } from 'react'

import CreateAccount from '../components/account/CreateAccount'
import Index from '../components/account/Index'
import Loadable from '@loadable/component'
import NLU from '../components/account/NLU'
import PrivateRoute from '../components/PrivateRoute'
import RouteWithAccount from '../components/account/RouteWithAccount'
import { Router } from '@reach/router'
import SEO from '../components/SEO'
import Settings from '../components/account/Settings'
import TextToSpeech from '../components/account/TextToSpeech'

const GraphiQL = Loadable(() => import('../components/GraphiQL'))

export default function Account() {
  return (
    <Fragment>
      <SEO
        title="Account"
        description="Your Spokestack account settings and billing"
      />
      <Router basepath="/account">
        <Index path="/" />
        <PrivateRoute path="/create" component={CreateAccount} />
        <RouteWithAccount path="/settings" component={Settings} />
        <RouteWithAccount path="/services/tts" component={TextToSpeech} />
        <PrivateRoute path="/services/nlu" component={NLU} />
        {process.env.NODE_ENV !== 'production' && (
          <PrivateRoute path="/graphql" component={GraphiQL} />
        )}
      </Router>
    </Fragment>
  )
}
