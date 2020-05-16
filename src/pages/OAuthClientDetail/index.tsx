import * as React from 'react'
import { Skeleton, Empty } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../components/ErrorMessage'

import withOAuthClientDetail, {
  OAuthClientDetailChildProps,
} from './withOAuthClientDetail'
import Form from './Form'

class OAuthClientDetail extends React.Component<OAuthClientDetailChildProps> {
  public render() {
    const {
      data: { oauthClient, loading, error },
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    if (loading) {
      return <Skeleton active />
    }

    if (!oauthClient) {
      return <Empty />
    }

    return <Form data={oauthClient} />
  }
}

export default withOAuthClientDetail(OAuthClientDetail)
