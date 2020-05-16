import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

import Layout from '../components/Layout'
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
        <Layout.Header />
        <Layout.Content>
          <UserList {...props} />
        </Layout.Content>
      </Private>
    ),
  },
  {
    path: PATH.USER_DETAIL,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <UserDetail {...props} />
        </Layout.Content>
      </Private>
    ),
  },
]

export default userRoutes
