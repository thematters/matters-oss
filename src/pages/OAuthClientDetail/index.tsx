import * as React from 'react'
import { Skeleton, Empty } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../components/ErrorMessage'
import Divider from '../../components/Divider'
import DateTime from '../../components/DateTime'
import UserLink from '../../components/User/Link'
import DescriptionList from '../../components/DescriptionList'

import withOAuthClientDetail, {
  OAuthClientDetailChildProps
} from './withOAuthClientDetail'

const { Description } = DescriptionList

class CommentDetail extends React.Component<OAuthClientDetailChildProps> {
  public render() {
    const {
      data: { oauthClient, loading, error }
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

    return (
      <>
        <DescriptionList size="large" title="簡介">
          <Description term="Developer">
            {oauthClient.user ? (
              <UserLink
                id={oauthClient.user.id}
                userName={oauthClient.user.info.userName}
                displayName={oauthClient.user.info.displayName}
              />
            ) : null}
          </Description>
          <Description term="Client ID">{oauthClient.id}</Description>
          <Description term="Client Secrect">{oauthClient.secret}</Description>
          <Description term="Scope">
            <DateTime date={oauthClient.createdAt} />
          </Description>
          <Description term="Created At">
            <DateTime date={oauthClient.createdAt} />
          </Description>

          <Description term="Created At">
            <DateTime date={oauthClient.createdAt} />
          </Description>
        </DescriptionList>
        <Divider size="large" />
      </>
    )
  }
}

export default withOAuthClientDetail(CommentDetail)
