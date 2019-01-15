import * as React from 'react'
import { Table, Switch } from 'antd'
import { Link } from 'react-router-dom'
import _get from 'lodash/get'
import _compact from 'lodash/compact'

import DateTime from '../../DateTime'
import UserLink from '../../UserLink'
import CommentStateTag from '../StateTag'

import { PATH } from '../../../constants'
import { CommentDigest } from '../../../definitions'

type CommentDigestListProps = {
  data: CommentDigest[]
  loading?: boolean
}

class CommentDigestList extends React.Component<CommentDigestListProps> {
  private _renderContentCell(_: any, record: CommentDigest): React.ReactNode {
    return (
      <Link to={PATH.COMMENT_DETAIL.replace(':id', record.id)}>
        {record.content.slice(0, 17)}...
      </Link>
    )
  }

  public render() {
    const { data, loading = false } = this.props

    return (
      <Table<CommentDigest>
        bordered
        loading={loading}
        dataSource={_compact(data)}
        pagination={false}
        rowKey={record => record.id}
      >
        <Table.Column<CommentDigest>
          dataIndex="title"
          title="內容"
          render={this._renderContentCell}
        />
        <Table.Column<CommentDigest>
          dataIndex="author"
          title="作者"
          render={author => (
            <UserLink
              id={author.id}
              userName={author.info.userName}
              displayName={author.info.displayName}
            />
          )}
        />
        <Table.Column<CommentDigest>
          dataIndex="state"
          title="狀態"
          render={state => <CommentStateTag state={state} />}
        />
        <Table.Column<CommentDigest>
          dataIndex="pinned"
          title="置頂"
          render={pinned => <Switch disabled checked={pinned} />}
        />
        <Table.Column<CommentDigest> dataIndex="upvotes" title="讚數" />
        <Table.Column<CommentDigest> dataIndex="downvotes" title="踩數" />
        <Table.Column<CommentDigest>
          dataIndex="createdAt"
          title="時間"
          render={createdAt => <DateTime date={createdAt} />}
        />
      </Table>
    )
  }
}

export default CommentDigestList
