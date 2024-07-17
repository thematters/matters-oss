import * as React from 'react'
import { Table } from 'antd'
import _compact from 'lodash/compact'

import { ReportDigest } from '../../definitions'
import DateTime from '../../components/DateTime'
import { PAGE_SIZE } from '../../constants'
import CommentLink from '../../components/Comment/Link'
import ArticleLink from '../../components/Article/Link'
import CommentSetState from '../../components/Comment/SetState'
import ArticleSetState from '../../components/Article/SetState'
import { getCurrentPaginationFromUrl, onPaginationChange } from '../../utils'
import UserLink from '../../components/User/Link'

type ReportDigestListProps = {
  data: ReportDigest[]
  loading?: boolean
  pagination?: {
    totalCount: number
    pageSize?: number
    fetchMore?: any
    variables?: any
  }
}

type ReportDigestListState = {
  selectedRowKeys: string[] | number[]
  selectedRows: ReportDigest[]
}

class ReportDigestList extends React.Component<
  ReportDigestListProps,
  ReportDigestListState
> {
  state = {
    selectedRowKeys: [],
    selectedRows: [],
  }

  private _renderReasonCell(_: any, record: ReportDigest): React.ReactNode {
    return (
      <span>
        {record.reason === 'tort'
          ? ' 侵權'
          : record.reason === 'illegal_advertising'
          ? '非法廣告'
          : record.reason === 'discrimination_insult_hatred'
          ? '歧視、侮辱或仇恨'
          : record.reason === 'pornography_involving_minors'
          ? '涉及未成年人的色情'
          : '其他'}
      </span>
    )
  }

  private _renderCommentCell(_: any, record: ReportDigest): React.ReactNode {
    return 'content' in record.target ? (
      <CommentLink id={record.target.id} content={record.target.content} />
    ) : null
  }

  private _renderArticleCell(_: any, record: ReportDigest): React.ReactNode {
    return 'title' in record.target ? (
      <ArticleLink id={record.target.id} title={record.target.title} />
    ) : null
  }

  private _renderStateCell(_: any, record: ReportDigest): React.ReactNode {
    return 'title' in record.target ? (
      <ArticleSetState state={record.target.state} id={record.target.id} />
    ) : (
      <CommentSetState
        commentState={record.target.commentState}
        ids={[record.target.id]}
      />
    )
  }

  public render() {
    const { data, loading = false, pagination } = this.props
    const currentPagination = getCurrentPaginationFromUrl()

    return (
      <>
        <Table<ReportDigest>
          bordered
          loading={loading}
          dataSource={_compact(data)}
          scroll={{ x: 1200, y: '70vh' }}
          pagination={
            pagination
              ? {
                  defaultCurrent: currentPagination && currentPagination.page,
                  pageSize: pagination.pageSize || PAGE_SIZE,
                  total: pagination.totalCount,
                  onChange: (page) => onPaginationChange({ pagination, page }),
                  showTotal: (t) => `共 ${t} 項`,
                  position: 'both',
                }
              : false
          }
          rowKey={(record) => record.id}
        >
          <Table.Column<ReportDigest>
            dataIndex="createdAt"
            title="報告時間"
            width={150}
            render={(createdAt) => <DateTime date={createdAt} />}
          />

          <Table.Column<ReportDigest>
            dataIndex="reporter"
            title="報告者"
            width={150}
            render={(author) => (
              <UserLink
                id={author.id}
                userName={author.userName}
                displayName={author.displayName}
              />
            )}
          />

          <Table.Column<ReportDigest>
            dataIndex="reason"
            title="問題類型"
            width={150}
            render={this._renderReasonCell}
          />

          <Table.Column<ReportDigest>
            dataIndex="target.content"
            title="評論"
            width={200}
            render={this._renderCommentCell}
          />

          <Table.Column<ReportDigest>
            dataIndex="target.title"
            title="文章"
            key="id"
            width={200}
            render={this._renderArticleCell}
          />

          <Table.Column<ReportDigest>
            dataIndex="target.author"
            title="評論 / 文章作者"
            width={150}
            render={(author) => (
              <UserLink
                id={author.id}
                userName={author.userName}
                displayName={author.displayName}
              />
            )}
          />

          <Table.Column<ReportDigest>
            dataIndex="target.state"
            title="狀態"
            width={150}
            render={this._renderStateCell}
          />
        </Table>
      </>
    )
  }
}

export default ReportDigestList
