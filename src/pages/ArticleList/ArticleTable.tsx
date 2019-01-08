import * as React from 'react'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import _get from 'lodash/get'

import ToggleLive from '../../components/Article/ToggleLive'
import TogglePublic from '../../components/Article/TogglePublic'

import { PATH } from '../../constants'
import { ArticleListItem } from './type'

type ArticleTableProps = {
  data: ArticleListItem[]
  loading?: boolean
}

class ArticleTable extends React.Component<ArticleTableProps> {
  private _renderTitleCell(_: any, record: ArticleListItem): React.ReactNode {
    return (
      <Link to={PATH.ARTICLE_DETAIL.replace(':id', record.id)}>
        {record.title}
      </Link>
    )
  }

  private _renderAuthorCell(_: any, record: ArticleListItem): React.ReactNode {
    return (
      <Link to={PATH.USER_DETAIL.replace(':id', record.author.id)}>
        {record.author.info.userName}
      </Link>
    )
  }

  private _renderCreatedAtCell(
    _: any,
    record: ArticleListItem
  ): React.ReactNode {
    return new Date(record.createdAt).toLocaleString()
  }

  public render() {
    const { data, loading = false } = this.props

    return (
      <Table<ArticleListItem>
        bordered
        loading={loading}
        dataSource={data}
        rowKey={record => record.id}
      >
        <Table.Column<ArticleListItem>
          dataIndex="title"
          title="標題"
          render={this._renderTitleCell}
        />
        <Table.Column<ArticleListItem>
          dataIndex="author"
          title="作者"
          render={this._renderAuthorCell}
        />
        <Table.Column<ArticleListItem> dataIndex="publishState" title="狀態" />
        <Table.Column<ArticleListItem>
          dataIndex="public"
          title="白名單（公開）"
          render={(isPublic, record) => (
            <TogglePublic checked={isPublic} articleId={record.id} />
          )}
        />
        <Table.Column<ArticleListItem>
          dataIndex="live"
          title="LIVE"
          render={(live, record) => (
            <ToggleLive checked={live} articleId={record.id} />
          )}
        />
        <Table.Column<ArticleListItem>
          dataIndex="createdAt"
          title="時間"
          render={this._renderCreatedAtCell}
        />
      </Table>
    )
  }
}

export default ArticleTable
