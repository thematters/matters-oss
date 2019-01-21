import * as React from 'react'
import { Table } from 'antd'
import jump from 'jump.js'
import { Link } from 'react-router-dom'
import _get from 'lodash/get'
import _compact from 'lodash/compact'

import DateTime from '../../DateTime'
import UserLink from '../../User/Link'
import ToggleLive from '../ToggleLive'
import TogglePublic from '../TogglePublic'
import SetBoost from '../../SetBoost'
import ToggleRecommend from '../ToggleRecommend'
import ArticleStateTag from '../StateTag'

import { ArticleDigest } from '../../../definitions'
import { PATH, PAGE_SIZE } from '../../../constants'
import { pageToCursor } from '../../../utils'

type ArticleDigestListProps = {
  data: ArticleDigest[]
  loading?: boolean
  pagination?: {
    totalCount: number
    pageSize?: number
    fetchMore?: any
    variables?: any
  }
  recommend?: {
    today?: boolean
    icymi?: boolean
    hottest?: boolean
    newest?: boolean
    topic?: boolean
  }
}

class ArticleDigestList extends React.Component<ArticleDigestListProps> {
  private _renderTitleCell(_: any, record: ArticleDigest): React.ReactNode {
    return (
      <Link to={PATH.ARTICLE_DETAIL.replace(':id', record.id)}>
        {record.title}
      </Link>
    )
  }

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

  public render() {
    const { data, loading = false, pagination, recommend } = this.props
    return (
      <Table<ArticleDigest>
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
        <Table.Column<ArticleDigest>
          dataIndex="title"
          title="標題"
          width={400}
          render={this._renderTitleCell}
        />
        <Table.Column<ArticleDigest>
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
        <Table.Column<ArticleDigest>
          dataIndex="state"
          title="狀態"
          width={100}
          render={state => <ArticleStateTag state={state} />}
        />
        {/* <Table.Column<ArticleDigest> dataIndex="MAT" title="MAT 數" /> */}
        <Table.Column<ArticleDigest> dataIndex="commentCount" title="評論數" />
        <Table.Column<ArticleDigest>
          dataIndex="public"
          title="白名單"
          render={(isPublic, record) => (
            <TogglePublic checked={isPublic} articleId={record.id} />
          )}
        />
        {!recommend && (
          <Table.Column<ArticleDigest>
            dataIndex="live"
            title="LIVE"
            render={(live, record) => (
              <ToggleLive checked={live} articleId={record.id} />
            )}
          />
        )}
        <Table.Column<ArticleDigest>
          dataIndex="createdAt"
          title="時間"
          render={createdAt => <DateTime date={createdAt} />}
        />
        {recommend && recommend.today && (
          <Table.Column<ArticleDigest>
            dataIndex="oss.inRecommendToday"
            title="在 Matters Today 顯示"
            render={(inRecommendToday, record) => (
              <ToggleRecommend
                checked={inRecommendToday}
                articleId={record.id}
                type="today"
              />
            )}
          />
        )}
        {recommend && recommend.icymi && (
          <Table.Column<ArticleDigest>
            dataIndex="oss.inRecommendIcymi"
            title="在「不要錯過」顯示"
            render={(inRecommendIcymi, record) => (
              <ToggleRecommend
                checked={inRecommendIcymi}
                articleId={record.id}
                type="icymi"
              />
            )}
          />
        )}
        {recommend && recommend.hottest && (
          <Table.Column<ArticleDigest>
            dataIndex="oss.inRecommendHottest"
            title="在「熱門文章」顯示"
            render={(inRecommendHottest, record) => (
              <ToggleRecommend
                checked={inRecommendHottest}
                articleId={record.id}
                type="hottest"
              />
            )}
          />
        )}
        {recommend && recommend.newest && (
          <Table.Column<ArticleDigest>
            dataIndex="oss.inRecommendNewest"
            title="在「最新發布」顯示"
            render={(inRecommendNewest, record) => (
              <ToggleRecommend
                checked={inRecommendNewest}
                articleId={record.id}
                type="newest"
              />
            )}
          />
        )}
        {recommend && recommend.topic && (
          <Table.Column<ArticleDigest>
            dataIndex="oss.boost"
            title="Boost"
            render={(boost, record) => (
              <SetBoost boost={boost} id={record.id} type="Article" />
            )}
          />
        )}
        {recommend && recommend.topic && (
          <Table.Column<ArticleDigest> dataIndex="oss.score" title="Score" />
        )}
      </Table>
    )
  }
}

export default ArticleDigestList
