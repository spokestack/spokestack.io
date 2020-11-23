import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { isLoggedIn, logout } from '../utils/auth'

const rlogin = /^\/login\/?$/

interface Props extends RouteComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>
}

export default function PrivateRoute({
  component: Component,
  ...props
}: Props) {
  if (!isLoggedIn() && !rlogin.test(props.location.pathname)) {
    if (typeof window !== 'undefined') {
      logout()
    }
    return null
  }
  return <Component {...props} />
}
