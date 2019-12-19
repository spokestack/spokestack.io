import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { isLoggedIn } from '../utils/auth'
import { navigate } from 'gatsby'

interface Props extends RouteComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>
}

export default function PrivateRoute({ component: Component, location, ...rest }: Props) {
  if (!isLoggedIn() && location.pathname !== '/login') {
    navigate('/login')
    return null
  }
  return <Component {...rest} />
}
