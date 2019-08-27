import React, { useState } from 'react'
import _get from 'lodash/get'
import { Row, Col, Input, Button } from 'antd'

import ErrorMessage from '../../components/ErrorMessage'
import CommentDigestList from '../../components/Comment/DigestList'
import withCommentList, { CommentListChildProps } from './withCommentList'
import Divider from '../../components/Divider'

import { CommentDigest } from '../../definitions'

class CommentList extends React.Component<CommentListChildProps> {
  state: Readonly<{ inputCommentId: string }> = {
    inputCommentId: ''
  }

  private _renderHeader() {
    const onPress = () => {
      const commentId = this.state.inputCommentId

      if (commentId) {
        window.location.href = `/comments/${commentId}`
      }
    }

    return (
      <>
        <Row>
          <Col offset={0} span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <section className="c-search-bar">
              <Input
                className="input"
                placeholder="輸入站內評論連結"
                onChange={(e: any) => {
                  const commentId = (e.target.value.split('#')[1] || '')
                    .split('-')
                    .slice(-1)[0]
                  if (commentId) {
                    this.setState({ inputCommentId: commentId })
                  } else {
                    this.setState({ inputCommentId: '' })
                  }
                }}
                onPressEnter={onPress}
              />
              <Button onClick={onPress} disabled={!this.state.inputCommentId}>
                跳轉
              </Button>
            </section>
          </Col>
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

    let listData: CommentDigest[] = []
    let totalCount: number = 0

    if (oss) {
      listData = oss.comments.edges.map(({ node }) => node)
      totalCount = oss.comments.totalCount
    }

    return (
      <CommentDigestList
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

export default withCommentList(CommentList)
