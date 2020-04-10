import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

import Layout from '../components/Layout'
import Private from '../components/Private'
import BlockList from '../pages/BlockList'

import { PATH } from '../constants'

const blockListRoutes = [
  {
    path: PATH.BLOCK_LIST,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <BlockList {...props} />
        </Layout.Content>
      </Private>
    )
  },

]

export default blockListRoutes
