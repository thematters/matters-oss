import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

import Layout from '../components/Layout'
import Private from '../components/Private'
import FeatureFlag from '../pages/FeatureFlag'

import { PATH } from '../constants'

const FeatureFlagRoutes = [
  {
    path: PATH.FEATURE_FLAG,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <FeatureFlag {...props} />
        </Layout.Content>
      </Private>
    ),
  },
]

export default FeatureFlagRoutes
