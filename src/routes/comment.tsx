import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

import Layout from '../components/Layout'
import Private from '../components/Private'
import CommentList from '../pages/CommentList'
import CommentDetail from '../pages/CommentDetail'

import { PATH } from '../constants'

const commentRoutes = [
  {
    path: PATH.COMMENT_LIST,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <CommentList {...props} />
        </Layout.Content>
      </Private>
    )
  },
  {
    path: PATH.COMMENT_DETAIL,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <CommentDetail {...props} />
        </Layout.Content>
      </Private>
    )
  }
]

export default commentRoutes
