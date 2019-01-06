import * as React from 'react'
import { RouteConfigComponentProps } from 'react-router-config'

import Private from '../components/Private'
import MattersToday from '../pages/Homepage/MattersToday'
import { PATH } from '../constants'

const homepageRoutes = [
  {
    path: PATH.HOMEPAGE_MATTERS_TODAY,
    component: (props: RouteConfigComponentProps) => (
      <Private>
        <MattersToday {...props} />
      </Private>
    )
  }
]

export default homepageRoutes
