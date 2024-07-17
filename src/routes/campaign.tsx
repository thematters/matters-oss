import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

import Layout from '../components/Layout'
import Private from '../components/Private'
import CampaignList from '../pages/CampaignList'
import CampaignDetail from '../pages/CampaignDetail'

import { PATH } from '../constants'
import CampaignEdit from '../pages/CampaignEdit'

const campaignRoutes = [
  {
    path: PATH.CAMPAIGN_LIST,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <CampaignList {...props} />
        </Layout.Content>
      </Private>
    ),
  },
  {
    path: PATH.CAMPAIGN_DETAIL,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <CampaignDetail {...props} />
        </Layout.Content>
      </Private>
    ),
  },
  {
    path: PATH.CAMPAIGN_EDIT,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <CampaignEdit {...props} />
        </Layout.Content>
      </Private>
    ),
  },
]

export default campaignRoutes
