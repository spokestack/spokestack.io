import { PureComponent } from 'react'
import { RouteComponentProps } from '@reach/router'
import { navigate } from 'gatsby'

export default class Index extends PureComponent<RouteComponentProps> {
  componentDidMount() {
    navigate('/account/settings', { replace: true })
  }

  render(): React.ReactNode {
    return null
  }
}
