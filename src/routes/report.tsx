import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

import Layout from '../components/Layout'
import Private from '../components/Private'
import ReportList from '../pages/ReportList'
import ReportDetail from '../pages/ReportDetail'

import { PATH } from '../constants'

const articleRoutes = [
  {
    path: PATH.REPORT_LIST_ARTICLE,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <ReportList {...props} type="article" />
        </Layout.Content>
      </Private>
    ),
  },
  {
    path: PATH.REPORT_LIST_COMMENT,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <ReportList {...props} type="comment" />
        </Layout.Content>
      </Private>
    ),
  },
  {
    path: PATH.REPORT_DETAIL,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <ReportDetail {...props} />
        </Layout.Content>
      </Private>
    ),
  },
]

export default articleRoutes
