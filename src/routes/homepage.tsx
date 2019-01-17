import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

import Layout from '../components/Layout'
import Private from '../components/Private'
import MattersToday from '../pages/Homepage/MattersToday'
import { PATH } from '../constants'
import MattersChoice from '../pages/Homepage/MattersChoice'
import Hottest from '../pages/Homepage/Hottest'

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
  },
  {
    path: PATH.HOMEPAGE_MATTERS_CHOICE,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <MattersChoice {...props} />
        </Layout.Content>
      </Private>
    )
  },
  {
    path: PATH.HOMEPAGE_HOTTEST,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <Hottest {...props} />
        </Layout.Content>
      </Private>
    )
  }
]

export default homepageRoutes
