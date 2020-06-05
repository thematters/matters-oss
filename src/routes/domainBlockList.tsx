import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

import Layout from '../components/Layout'
import Private from '../components/Private'
import DomainBlockList from '../pages/DomainBlockList'

import { PATH } from '../constants'

const DomainBlockListRoutes = [
  {
    path: PATH.BLOCK_LIST_DOMAIN,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <DomainBlockList {...props} />
        </Layout.Content>
      </Private>
    ),
  },
]

export default DomainBlockListRoutes
