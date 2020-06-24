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
import blockListRoutes from './blocklist'
import domainBlockListRoutes from './domainBlockList'
import featureFlag from './featureFlag'

const routes = [
  {
    path: PATH.HOMEPAGE,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Redirect
        to={{
          pathname: PATH.HOMEPAGE_HOTTEST,
        }}
      />
    ),
  },

  {
    path: PATH.LOGIN,
    component: () => <Login />,
  },

  ...homepageRoutes,
  ...userRoutes,
  ...articleRoutes,
  ...commentRoutes,
  ...reportRoutes,
  ...oauthClientRoutes,
  ...blockListRoutes,
  ...domainBlockListRoutes,
  ...featureFlag,
]

export default routes
