import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

import Layout from '../components/Layout'
import Private from '../components/Private'
import LikeCoin from '../pages/LikeCoin'

import { PATH } from '../constants'

const commentRoutes = [
  {
    path: PATH.LIKECOIN,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <LikeCoin />
        </Layout.Content>
      </Private>
    )
  }
]

export default commentRoutes
