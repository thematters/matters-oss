import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

import Private from '../components/Private'
import ArticleList from '../pages/ArticleList'
import ArticleDetail from '../pages/ArticleDetail'
import TagList from '../pages/TagList'
import TagDetail from '../pages/TagDetail'

import { PATH } from '../constants'

const articleRoutes = [
  {
    path: PATH.ARTICLE_LIST,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <ArticleList {...props} />
      </Private>
    )
  },
  {
    path: PATH.ARTICLE_DETAIL,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <ArticleDetail {...props} />
      </Private>
    )
  },
  {
    path: PATH.TAG_LIST,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <TagList {...props} />
      </Private>
    )
  },
  {
    path: PATH.TAG_DETAIL,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <TagDetail {...props} />
      </Private>
    )
  }
]

export default articleRoutes
