import * as React from 'react'
import { Table } from 'antd'
import jump from 'jump.js'
import { Link } from 'react-router-dom'
import _get from 'lodash/get'
import _compact from 'lodash/compact'

import DateTime from '../../DateTime'
import UserLink from '../../User/Link'
import { PATH, PAGE_SIZE } from '../../../constants'
import { Report } from '../../../definitions'
import { pageToCursor } from '../../../utils'

type ReportDigestListProps = {
  data: Report[]
  loading?: boolean
  pagination?: {
    totalCount: number
    pageSize?: number
    fetchMore?: any
    variables?: any
  }
  isArticle?: boolean
  isComment?: boolean
}

class ReportDigestList extends React.Component<ReportDigestListProps> {
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

  private _renderArticleTitleCell(title: string, record: any): React.ReactNode {
    return (
      <Link to={PATH.REPORT_DETAIL.replace(':id', record.id)}>{title}</Link>
    )
  }

  private _renderCommentContentCell(
    content: string,
    record: any
  ): React.ReactNode {
    return (
      <Link to={PATH.REPORT_DETAIL.replace(':id', record.id)}>
        {content.slice(0, 17)}...
      </Link>
    )
  }

  public render() {
    const {
      data,
      isArticle,
      isComment,
      loading = false,
      pagination
    } = this.props

    return (
      <Table<Report>
        bordered
        loading={loading}
        dataSource={_compact(data)}
        scroll={{ x: 1200 }}
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
        {isArticle && (
          <Table.Column<Report>
            dataIndex="article.title"
            title="文章標題"
            render={this._renderArticleTitleCell}
          />
        )}
        {isComment && (
          <Table.Column<Report>
            dataIndex="comment.content"
            title="評論內容"
            render={this._renderCommentContentCell}
          />
        )}
        <Table.Column<Report> dataIndex="category" title="舉報原因" />
        <Table.Column<Report>
          dataIndex={isArticle ? 'article.author' : 'comment.author'}
          title={isArticle ? '文章作者' : '評論作者'}
          render={author => (
            <UserLink
              id={author.id}
              userName={author.info.userName}
              displayName={author.info.displayName}
            />
          )}
        />
        <Table.Column<Report>
          dataIndex="user"
          title="舉報人"
          render={user => {
            if (!user) {
              return
            }
            return (
              <UserLink
                id={user.id}
                userName={user.info.userName}
                displayName={user.info.displayName}
              />
            )
          }}
        />
        <Table.Column<Report>
          dataIndex="createdAt"
          title="時間"
          render={createdAt => <DateTime date={createdAt} />}
        />
      </Table>
    )
  }
}

export default ReportDigestList
