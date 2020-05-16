import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

import Layout from '../components/Layout'
import Private from '../components/Private'
import OAuthClientList from '../pages/OAuthClientList'
import OAuthClientDetail from '../pages/OAuthClientDetail'

import { PATH } from '../constants'

const commentRoutes = [
  {
    path: PATH.OAUTH_CLIENT_LIST,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <OAuthClientList {...props} />
        </Layout.Content>
      </Private>
    ),
  },
  {
    path: PATH.OAUTH_CLIENT_DETAIL,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <OAuthClientDetail {...props} />
        </Layout.Content>
      </Private>
    ),
  },
]

export default commentRoutes
