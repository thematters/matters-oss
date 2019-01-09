import * as React from 'react'
import { Link } from 'react-router-dom'

import { PATH } from '../../constants'

type UserLinkProps = {
  id: string
  userName: string
  displayName: string
}

class UserLink extends React.Component<UserLinkProps> {
  public render() {
    const { id, userName, displayName } = this.props
    const to = PATH.USER_DETAIL.replace(':id', id)

    return (
      <Link to={to}>
        {displayName} (@{userName})
      </Link>
    )
  }
}

export default UserLink
