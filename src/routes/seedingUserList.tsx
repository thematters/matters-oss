import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

import Layout from '../components/Layout'
import Private from '../components/Private'
import SeedingUserList from '../pages/SeedingUserList'

import { PATH } from '../constants'

const seedingUserListRoutes = [
  {
    path: PATH.SEEDING_USER_LIST,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <SeedingUserList {...props} />
        </Layout.Content>
      </Private>
    ),
  },
]

export default seedingUserListRoutes
