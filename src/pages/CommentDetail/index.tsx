import * as React from 'react'
import { Col, Skeleton, Empty } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../components/ErrorMessage'
import Divider from '../../components/Divider'
import DateTime from '../../components/DateTime'
import UserLink from '../../components/User/Link'
import ArticleLink from '../../components/Article/Link'
import DescriptionList from '../../components/DescriptionList'
import CommentStateTag from '../../components/Comment/StateTag'
import CommentSetState from '../../components/Comment/SetState'

import withCommentDetail, { CommentDetailChildProps } from './withCommentDetail'
import { SITE_DOMIAN } from '../../constants'

const { Description } = DescriptionList

class CommentDetail extends React.Component<CommentDetailChildProps> {
  public render() {
    const {
      data: { comment, loading, error }
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    if (loading) {
      return <Skeleton active />
    }

    if (!comment) {
      return <Empty />
    }

    return (
      <>
        <DescriptionList size="large" title="簡介">
          <Description term="作者">
            <UserLink
              id={comment.author.id}
              userName={comment.author.userName}
              displayName={comment.author.displayName}
            />
          </Description>
          <Description term="日期">
            <DateTime date={comment.createdAt} />
          </Description>
          <Description term="狀態">
            <CommentStateTag state={comment.state} />
          </Description>
          <Description term="讚數">{comment.upvotes}</Description>
          <Description term="踩數">{comment.downvotes}</Description>
          <Description term="文章">
            <ArticleLink
              id={comment.article.id}
              title={comment.article.title}
            />
          </Description>
          <Description term="站內連結">
            <a
              href={`${SITE_DOMIAN}/@${comment.article.author.userName}/${comment.article.slug}-${comment.article.mediaHash}#${comment.id}`}
              target="_blank"
            >
              {comment.article.mediaHash}#{comment.id}
            </a>
          </Description>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="評論內容">
          <Col span={24} style={{ marginBottom: 16 }}>
            <section dangerouslySetInnerHTML={{ __html: comment.content }} />
          </Col>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="設定" col={4}>
          <Description term="狀態">
            <CommentSetState state={comment.state} id={comment.id} />
          </Description>
        </DescriptionList>
        <Divider size="large" />
      </>
    )
  }
}

export default withCommentDetail(CommentDetail)
