import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

import Layout from '../components/Layout'
import Private from '../components/Private'
import MattersToday from '../pages/Homepage/MattersToday'
import { PATH } from '../constants'

const homepageRoutes = [
  {
    path: PATH.HOMEPAGE_MATTERS_TODAY,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <MattersToday {...props} />
        </Layout.Content>
      </Private>
    )
  }
]

export default homepageRoutes
