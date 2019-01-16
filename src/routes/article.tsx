import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

import Layout from '../components/Layout'
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
        <Layout.Header />
        <Layout.Content>
          <ArticleList {...props} />
        </Layout.Content>
      </Private>
    )
  },
  {
    path: PATH.ARTICLE_DETAIL,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <ArticleDetail {...props} />
        </Layout.Content>
      </Private>
    )
  },
  {
    path: PATH.TAG_LIST,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <TagList {...props} />
        </Layout.Content>
      </Private>
    )
  },
  {
    path: PATH.TAG_DETAIL,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <TagDetail {...props} />
        </Layout.Content>
      </Private>
    )
  }
]

export default articleRoutes
