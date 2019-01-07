import * as React from 'react'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import _get from 'lodash/get'

import { PATH } from '../../constants'
import { Article } from './withArticleList'

type ArticleTableProps = {
  data: Article[]
  loading: boolean
}

class ArticleTable extends React.Component<ArticleTableProps> {
  private _renderTitleCell(_: any, record: Article): React.ReactNode {
    return (
      <Link to={PATH.ARTICLE_DETAIL.replace(':id', record.id)}>
        {record.title}
      </Link>
    )
  }

  private _renderAuthorCell(_: any, record: Article): React.ReactNode {
    return (
      <Link to={PATH.USER_DETAIL.replace(':id', record.author.id)}>
        {record.author.info.userName}
      </Link>
    )
  }

  private _renderCreatedAtCell(_: any, record: Article): React.ReactNode {
    return new Date(record.createdAt).toLocaleString()
  }

  public render() {
    const { data, loading } = this.props

    return (
      <Table<Article>
        bordered
        loading={loading}
        dataSource={data}
        rowKey={record => record.id}
      >
        <Table.Column<Article>
          dataIndex="title"
          title="標題"
          render={this._renderTitleCell}
        />
        <Table.Column<Article> dataIndex="publishState" title="狀態" />
        <Table.Column<Article>
          dataIndex="author"
          title="作者"
          render={this._renderAuthorCell}
        />
        <Table.Column<Article>
          dataIndex="createdAt"
          title="時間"
          render={this._renderCreatedAtCell}
        />
      </Table>
    )
  }
}

export default ArticleTable
