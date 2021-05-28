import * as React from 'react'
import { Empty, Skeleton } from 'antd'

import ErrorMessage from '../../components/ErrorMessage'
import CommentDigestList from '../../components/Comment/DigestList'
import withUserComments, { UserCommentsChildProps } from './withUserComments'

class UserComments extends React.Component<UserCommentsChildProps> {
  public render() {
    const {
      data: { user, loading, error },
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    if (loading) {
      return <Skeleton active />
    }

    if (!user) {
      return <Empty />
    }

    const userComments = user.commentedArticles.edges
      .map(({ node }) => {
        return node.comments.edges.map(({ node: comment }) => comment)
      })
      .flat()

    return <CommentDigestList data={userComments} />
  }
}

export default withUserComments(UserComments)
