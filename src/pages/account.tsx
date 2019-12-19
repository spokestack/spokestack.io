import AccountLayout from '../components/AccountLayout'
import Billing from '../components/Billing'
import PrivateRoute from '../components/PrivateRoute'
import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { Router } from '@reach/router'
import Settings from '../components/Settings'

const raccount = /^\/account\/?$/

export default function Account({ location }: RouteComponentProps) {
  return (
    <AccountLayout selectFirst={raccount.test(location.pathname)}>
      <Router>
        <PrivateRoute default path="/account/settings" component={Settings} />
        <PrivateRoute path="/account/billing" component={Billing} />
      </Router>
    </AccountLayout>
  )
}
