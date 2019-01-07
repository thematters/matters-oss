import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

import Private from '../components/Private'
import Login from '../pages/Login'
import ArticleList from '../pages/ArticleList'

import { PATH } from '../constants'
import homepageRoutes from './homepage'

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

  {
    path: PATH.ARTICLE_LIST,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <ArticleList {...props} />
      </Private>
    )
  }
]

export default routes
