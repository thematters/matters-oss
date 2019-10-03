import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'
import { Redirect } from 'react-router'

import Login from '../pages/Login'

import { PATH } from '../constants'
import homepageRoutes from './homepage'
import userRoutes from './user'
import articleRoutes from './article'
import commentRoutes from './comment'
import reportRoutes from './report'
import oauthClientRoutes from './oauthClient'
import likeCoinRoutes from './likecoin'

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
  ...reportRoutes,
  ...oauthClientRoutes,
  ...likeCoinRoutes
]

export default routes
