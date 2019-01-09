import * as React from 'react'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import _get from 'lodash/get'

import DateTime from '../../DateTime'
import UserLink from '../../UserLink'
import ToggleLive from '../ToggleLive'
import TogglePublic from '../TogglePublic'

import { PATH } from '../../../constants'
import { ArticleDigest } from '../../../definitions'

type ArticleDigestListProps = {
  data: ArticleDigest[]
  loading?: boolean
}

class ArticleDigestList extends React.Component<ArticleDigestListProps> {
  private _renderTitleCell(_: any, record: ArticleDigest): React.ReactNode {
    return (
      <Link to={PATH.ARTICLE_DETAIL.replace(':id', record.id)}>
        {record.title}
      </Link>
    )
  }

  public render() {
    const { data, loading = false } = this.props

    return (
      <Table<ArticleDigest>
        bordered
        loading={loading}
        dataSource={data}
        rowKey={record => record.id}
      >
        <Table.Column<ArticleDigest>
          dataIndex="title"
          title="標題"
          render={this._renderTitleCell}
        />
        <Table.Column<ArticleDigest>
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
        <Table.Column<ArticleDigest> dataIndex="publishState" title="狀態" />
        <Table.Column<ArticleDigest>
          dataIndex="public"
          title="白名單"
          render={(isPublic, record) => (
            <TogglePublic checked={isPublic} articleId={record.id} />
          )}
        />
        <Table.Column<ArticleDigest>
          dataIndex="live"
          title="LIVE"
          render={(live, record) => (
            <ToggleLive checked={live} articleId={record.id} />
          )}
        />
        <Table.Column<ArticleDigest>
          dataIndex="createdAt"
          title="時間"
          render={createdAt => <DateTime date={createdAt} />}
        />
      </Table>
    )
  }
}

export default ArticleDigestList
