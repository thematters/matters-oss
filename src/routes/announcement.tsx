import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

import Layout from '../components/Layout'
import Private from '../components/Private'
import AnnouncementDetail from '../pages/AnnouncementDetail'
import Announcements from '../pages/Announcements'

import { PATH } from '../constants'

const AnnouncementRoutes = [
  {
    path: PATH.ANNOUNCEMENTS,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <Announcements {...props} />
        </Layout.Content>
      </Private>
    ),
  },
  {
    path: PATH.ANNOUNCEMENT_DETAIL,
    exact: true,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <Layout.Header />
        <Layout.Content>
          <AnnouncementDetail {...props} />
        </Layout.Content>
      </Private>
    ),
  },
]

export default AnnouncementRoutes
