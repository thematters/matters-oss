import * as React from 'react'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import _get from 'lodash/get'
import _compact from 'lodash/compact'

import DateTime from '../../DateTime'
import UserLink from '../../UserLink'
import { PATH } from '../../../constants'
import { Report, ArticleDigest, CommentDigest } from '../../../definitions'

type ReportDigestListProps = {
  data: Report[]
  isArticle?: boolean
  isComment?: boolean
  loading?: boolean
}

class ReportDigestList extends React.Component<ReportDigestListProps> {
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
    const { data, isArticle, isComment, loading = false } = this.props

    return (
      <Table<Report>
        bordered
        loading={loading}
        dataSource={_compact(data)}
        pagination={false}
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
