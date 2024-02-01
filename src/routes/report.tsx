import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

import Layout from '../components/Layout'
import Private from '../components/Private'
import ReportList from '../pages/ReportList'

import { PATH } from '../constants'

const reportRoutes = [
  {
    path: PATH.REPORT_LIST,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <ReportList {...props} />
        </Layout.Content>
      </Private>
    ),
  },
]

export default reportRoutes
