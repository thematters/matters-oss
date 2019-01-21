import * as React from 'react'
import { Link } from 'react-router-dom'

import { PATH } from '../../../constants'

type UserLinkProps = {
  id: string
  userName: string
  displayName: string
}

const UserLink: React.FunctionComponent<UserLinkProps> = ({
  id,
  userName,
  displayName
}) => {
  const to = PATH.USER_DETAIL.replace(':id', id)

  return (
    <Link to={to}>
      {displayName} (@{userName})
    </Link>
  )
}

export default UserLink
