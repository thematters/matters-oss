import * as React from 'react'
import { Redirect } from 'react-router-dom'

import { PATH, STORE_JWT_TOKEN } from '../../constants'

class Private extends React.PureComponent {
  render() {
    const isAuthenticated = localStorage.getItem(STORE_JWT_TOKEN)
    const { children } = this.props

    if (isAuthenticated) {
      return children
    }

    return (
      <Redirect
        to={{
          pathname: PATH.LOGIN,
          search: `?next=${window.location.href}`
        }}
      />
    )
  }
}

export default Private
