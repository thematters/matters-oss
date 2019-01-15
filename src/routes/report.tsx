import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

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
        <ReportList {...props} type="article" />
      </Private>
    )
  },
  {
    path: PATH.REPORT_LIST_COMMENT,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <ReportList {...props} type="comment" />
      </Private>
    )
  },
  {
    path: PATH.REPORT_DETAIL,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <ReportDetail {...props} />
      </Private>
    )
  }
]

export default articleRoutes
