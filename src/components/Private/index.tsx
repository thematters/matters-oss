import * as React from 'react'
import { Redirect } from 'react-router-dom'

import { PATH } from '../../constants'
import { ViewerContext } from '../Layout/ViewerProvider'

const Private: React.FC = ({ children }) => {
  const viewer = React.useContext(ViewerContext)

  if (viewer.isAuthed) {
    return <>{children}</>
  }

  return (
    <Redirect
      to={{
        pathname: PATH.LOGIN,
        search: `?next=${window.location.href}`,
      }}
    />
  )
}

export default Private
