import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { RouteConfigComponentProps } from 'react-router-config'

import { PAGE_TITLE } from '../../../constants'

const Header: React.FunctionComponent<RouteConfigComponentProps> = ({
  match,
}) => {
  const pageTitle = PAGE_TITLE[match.path]
  return (
    <>
      <Helmet>
        <title>{pageTitle} ｜ Matters OSS</title>
      </Helmet>

      <h2 style={{ margin: '24px 24px 0' }}>{pageTitle}</h2>
    </>
  )
}

export default withRouter(Header)
