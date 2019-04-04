import * as React from 'react'
import { Table, Switch } from 'antd'
import jump from 'jump.js'
import { Link } from 'react-router-dom'
import _get from 'lodash/get'
import _compact from 'lodash/compact'

import DateTime from '../../DateTime'
import UserLink from '../../User/Link'
import CommentStateTag from '../StateTag'

import { PATH, PAGE_SIZE } from '../../../constants'
import { CommentDigest } from '../../../definitions'
import { pageToCursor } from '../../../utils'

type CommentDigestListProps = {
  data: CommentDigest[]
  loading?: boolean
  pagination?: {
    totalCount: number
    pageSize?: number
    fetchMore?: any
    variables?: any
  }
}

class CommentDigestList extends React.Component<CommentDigestListProps> {
  private _onPaginationChange = (page: number, pageSize?: number) => {
    const { pagination } = this.props

    if (!pagination) {
      return
    }

    const cursor = pageToCursor(page, pageSize || 0)

    jump('body')
    pagination.fetchMore({
      variables: {
        input: {
          ...pagination.variables.input,
          after: cursor
        }
      },
      updateQuery: (_: any, { fetchMoreResult }: any) => fetchMoreResult
    })
  }

  private _renderContentCell(_: any, record: CommentDigest): React.ReactNode {
    return (
      <Link to={PATH.COMMENT_DETAIL.replace(':id', record.id)}>
        {record.content.slice(0, 17)}...
      </Link>
    )
  }

  public render() {
    const { data, loading = false, pagination } = this.props

    return (
      <Table<CommentDigest>
        bordered
        loading={loading}
        dataSource={_compact(data)}
        scroll={{ x: 1200, y: '70vh' }}
        pagination={
          pagination
            ? {
                pageSize: pagination.pageSize || PAGE_SIZE,
                total: pagination.totalCount,
                onChange: this._onPaginationChange,
                showTotal: t => `共 ${t} 項`
              }
            : false
        }
        rowKey={record => record.id}
      >
        <Table.Column<CommentDigest>
          dataIndex="title"
          title="內容"
          width={300}
          render={this._renderContentCell}
        />
        <Table.Column<CommentDigest>
          dataIndex="author"
          title="作者"
          width={150}
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
          width={100}
          render={state => <CommentStateTag state={state} />}
        />
        <Table.Column<CommentDigest>
          dataIndex="pinned"
          title="置頂"
          width={150}
          render={pinned => <Switch disabled checked={pinned} />}
        />
        <Table.Column<CommentDigest>
          dataIndex="upvotes"
          title="讚數"
          width={100}
        />
        <Table.Column<CommentDigest>
          dataIndex="downvotes"
          title="踩數"
          width={100}
        />
        <Table.Column<CommentDigest>
          dataIndex="createdAt"
          title="時間"
          width={150}
          render={createdAt => <DateTime date={createdAt} />}
        />
      </Table>
    )
  }
}

export default CommentDigestList
