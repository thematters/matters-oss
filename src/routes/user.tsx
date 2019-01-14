import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

import Private from '../components/Private'
import UserList from '../pages/UserList'
import UserDetail from '../pages/UserDetail'

import { PATH } from '../constants'

const userRoutes = [
  {
    path: PATH.USER_LIST,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <UserList {...props} />
      </Private>
    )
  },
  {
    path: PATH.USER_DETAIL,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <UserDetail {...props} />
      </Private>
    )
  }
]

export default userRoutes
