import * as React from 'react'
import { Table } from 'antd'
import _compact from 'lodash/compact'

import DateTime from '../../DateTime'
import UserLink from '../../User/Link'
import ArticleLink from '../Link'
import SetBoost from '../../SetBoost'
import ToggleRecommend from '../ToggleRecommend'
import MarkSpam from '../MarkSpam'
import ArticleStateTag from '../StateTag'

import { ArticleDigest } from '../../../definitions'
import { PAGE_SIZE } from '../../../constants'
import { getCurrentPaginationFromUrl, onPaginationChange } from '../../../utils'

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
    icymi?: boolean
    hottest?: boolean
    newest?: boolean
    topic?: boolean
  }
}

class ArticleDigestList extends React.Component<ArticleDigestListProps> {
  private _renderTitleCell(_: any, record: ArticleDigest): React.ReactNode {
    return <ArticleLink id={record.id} title={record.title} />
  }

  private _renderScore(score: number | null): React.ReactNode {
    if (score === null) {
      return 'N/A'
    }
    return score.toFixed(3)
  }

  public render() {
    const { data, loading = false, pagination, recommend } = this.props
    const currentPagination = getCurrentPaginationFromUrl()

    return (
      <Table<ArticleDigest>
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
        <Table.Column<ArticleDigest>
          dataIndex="title"
          title="標題"
          render={this._renderTitleCell}
        />

        {recommend && recommend.icymi && (
          <Table.Column<ArticleDigest>
            dataIndex="oss.inRecommendIcymi"
            title="在「不要錯過」顯示"
            width={100}
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
            width={100}
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
            width={100}
            render={(inRecommendNewest, record) => (
              <ToggleRecommend
                checked={inRecommendNewest}
                articleId={record.id}
                type="newest"
              />
            )}
          />
        )}

        <Table.Column<ArticleDigest>
          dataIndex="author"
          title="作者"
          width={200}
          render={(author) => (
            <UserLink
              id={author.id}
              userName={author.userName}
              displayName={author.displayName}
            />
          )}
        />
        <Table.Column<ArticleDigest>
          dataIndex="oss.spamStatus.score"
          title="垃圾文概率"
          width={120}
          render={this._renderScore}
        />
        <Table.Column<ArticleDigest>
          dataIndex="oss.spamStatus.isSpam"
          title="標記垃圾文"
          width={120}
          render={(isSpam, record) => (
            <MarkSpam isSpam={isSpam} articleId={record.id} />
          )}
        />
        <Table.Column<ArticleDigest>
          dataIndex="state"
          title="狀態"
          width={100}
          render={(state) => <ArticleStateTag state={state} />}
        />
        <Table.Column<ArticleDigest>
          dataIndex="commentCount"
          width={100}
          title="評論數"
        />
        <Table.Column<ArticleDigest>
          dataIndex="createdAt"
          title="時間"
          width={200}
          render={(createdAt) => <DateTime date={createdAt} />}
        />
        {recommend && recommend.topic && (
          <Table.Column<ArticleDigest>
            dataIndex="oss.boost"
            title="Boost"
            width={150}
            render={(boost, record) => (
              <SetBoost boost={boost} id={record.id} type="Article" />
            )}
          />
        )}
      </Table>
    )
  }
}

export default ArticleDigestList
