import * as React from 'react'

import Private from '../components/Private'
import Login from '../pages/Login'

import { PATH } from '../constants'
import homepageRoutes from './homepage'

const routes = [
  {
    path: PATH.HOMEPAGE,
    exact: true,
    component: () => <Private>Homepage</Private>
  },

  {
    path: PATH.LOGIN,
    component: () => <Login />
  },

  ...homepageRoutes
]

export default routes
