import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

import Private from '../components/Private'
import Login from '../pages/Login'

import { PATH } from '../constants'
import homepageRoutes from './homepage'
import articleRoutes from './article'

const routes = [
  {
    path: PATH.HOMEPAGE,
    exact: true,
    component: (props: RouteConfigComponentProps) => <Private>Homepage</Private>
  },

  {
    path: PATH.LOGIN,
    component: () => <Login />
  },

  ...homepageRoutes,
  ...articleRoutes
]

export default routes
