import * as React from 'react'
import { Table, Switch } from 'antd'
import _get from 'lodash/get'
import _compact from 'lodash/compact'

import DateTime from '../../DateTime'
import UserLink from '../../User/Link'
import CommentLink from '../../Comment/Link'
import ArticleLink from '../../Article/Link'
import CommentSetState from '../SetState'

import { PAGE_SIZE } from '../../../constants'
import { CommentDigest } from '../../../definitions'
import { onPaginationChange, getCurrentPaginationFromUrl } from '../../../utils'

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

type CommentDigestListState = {
  selectedRowKeys: string[] | number[]
  selectedRows: CommentDigest[]
}

class CommentDigestList extends React.Component<
  CommentDigestListProps,
  CommentDigestListState
> {
  state = {
    selectedRowKeys: [],
    selectedRows: []
  }

  private _renderContentCell(_: any, record: CommentDigest): React.ReactNode {
    return <CommentLink id={record.id} content={record.content} />
  }

  private _renderTitleCell(_: any, record: CommentDigest): React.ReactNode {
    return <ArticleLink id={record.article.id} title={record.article.title} />
  }

  private _renderStateCell(_: any, record: CommentDigest): React.ReactNode {
    console.log(record.id, record.state)
    return <CommentSetState state={record.state} ids={[record.id]} />
  }

  _onSelectChange = (
    selectedRowKeys: string[] | number[],
    selectedRows: CommentDigest[]
  ) => {
    this.setState({ selectedRowKeys, selectedRows })
  }

  private _renderTableOperators() {
    const { selectedRowKeys } = this.state
    const hasSelected = selectedRowKeys.length > 0

    return (
      <section className="c-table__operators">
        狀態：
        {
          <CommentSetState
            ids={selectedRowKeys}
            disabled={!hasSelected}
            onSuccess={() => {
              window.location.reload()
            }}
          />
        }
        <p style={{ marginTop: '.5rem' }}>(已選 {selectedRowKeys.length} 項)</p>
      </section>
    )
  }

  public render() {
    const { selectedRowKeys } = this.state
    const { data, loading = false, pagination } = this.props
    const currentPagination = getCurrentPaginationFromUrl()

    return (
      <>
        {this._renderTableOperators()}
        <Table<CommentDigest>
          bordered
          loading={loading}
          rowSelection={{
            selectedRowKeys,
            onChange: this._onSelectChange
          }}
          dataSource={_compact(data)}
          scroll={{ x: 1200, y: '70vh' }}
          pagination={
            pagination
              ? {
                  defaultCurrent: currentPagination && currentPagination.page,
                  pageSize: pagination.pageSize || PAGE_SIZE,
                  total: pagination.totalCount,
                  onChange: page => onPaginationChange({ pagination, page }),
                  showTotal: t => `共 ${t} 項`,
                  position: 'both'
                }
              : false
          }
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
            width={150}
            render={author => (
              <UserLink
                id={author.id}
                userName={author.userName}
                displayName={author.displayName}
              />
            )}
          />

          <Table.Column<CommentDigest>
            dataIndex="title"
            title="文章"
            key="id"
            width={300}
            render={this._renderTitleCell}
          />

          <Table.Column<CommentDigest>
            dataIndex="state"
            title="狀態"
            width={150}
            render={this._renderStateCell}
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
      </>
    )
  }
}

export default CommentDigestList
