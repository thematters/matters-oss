import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

import Private from '../components/Private'
import Login from '../pages/Login'

import { PATH } from '../constants'
import homepageRoutes from './homepage'
import userRoutes from './user'
import articleRoutes from './article'
import commentRoutes from './comment'
import reportRoutes from './report'
import { Redirect } from 'react-router'

const routes = [
  {
    path: PATH.HOMEPAGE,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Redirect
        to={{
          pathname: PATH.HOMEPAGE_MATTERS_TODAY
        }}
      />
    )
  },

  {
    path: PATH.LOGIN,
    component: () => <Login />
  },

  ...homepageRoutes,
  ...userRoutes,
  ...articleRoutes,
  ...commentRoutes,
  ...reportRoutes
]

export default routes
