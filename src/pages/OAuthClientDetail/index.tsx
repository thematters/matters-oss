import * as React from 'react'
import { Skeleton, Empty } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../components/ErrorMessage'

import withOAuthClientDetail, {
  OAuthClientDetailChildProps
} from './withOAuthClientDetail'
import Form from './Form'

class CommentDetail extends React.Component<OAuthClientDetailChildProps> {
  handleSubmit(e: any) {
    e.preventDefault()
    // @ts-ignore
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

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

    // @ts-ignore
    return <Form data={oauthClient} />
  }
}

export default withOAuthClientDetail(CommentDetail)
