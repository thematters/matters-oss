import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

import Private from '../components/Private'
import Login from '../pages/Login'

import { PATH } from '../constants'
import homepageRoutes from './homepage'
import userRoutes from './user'
import articleRoutes from './article'
import reportRoutes from './report'

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
  ...userRoutes,
  ...articleRoutes,
  ...reportRoutes
]

export default routes
