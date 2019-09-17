import React from 'react'
import _get from 'lodash/get'
import { Row } from 'antd'

import ErrorMessage from '../../components/ErrorMessage'
import OAuthClientDigestList from '../../components/OAuthClient/DigestList'
import withOAuthClientList, {
  OAuthClientListChildProps
} from './withOAuthClientList'

import { OAuthClientDigest } from '../../definitions'
import Divider from '../../components/Divider'
import CreateOAuthClientForm from './CreateOAuthClientForm'

class OAuthClientList extends React.Component<OAuthClientListChildProps> {
  private _renderHeader() {
    return (
      <>
        <Row>
          <CreateOAuthClientForm />
        </Row>
        <Divider size="large" />
      </>
    )
  }

  private _renderContent() {
    const {
      data: { oss, loading, error, fetchMore, variables }
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    let listData: OAuthClientDigest[] = []
    let totalCount: number = 0

    if (oss) {
      listData = oss.oauthClients.edges.map(({ node }) => node)
      totalCount = oss.oauthClients.totalCount
    }

    return (
      <OAuthClientDigestList
        data={listData}
        loading={loading}
        pagination={{ totalCount, fetchMore, variables }}
      />
    )
  }

  public render() {
    return (
      <>
        {this._renderHeader()}
        {this._renderContent()}
      </>
    )
  }
}

export default withOAuthClientList(OAuthClientList)
