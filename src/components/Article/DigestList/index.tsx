import * as React from 'react'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import _get from 'lodash/get'
import _compact from 'lodash/compact'

import DateTime from '../../DateTime'
import UserLink from '../../UserLink'
import ToggleLive from '../ToggleLive'
import TogglePublic from '../TogglePublic'
import ArticleStateTag from '../StateTag'

import { PATH } from '../../../constants'
import { ArticleDigest } from '../../../definitions'
import ToggleRecommendToday from '../ToggleRecommendToday'
import ToggleRecommendIcymi from '../ToggleRecommendIcymi'
import ToggleRecommendHottest from '../ToggleRecommendHottest'
import ToggleRecommendNewest from '../ToggleRecommendNewest'
import ToggleRecommendTopic from '../ToggleRecommendTopic'

type ArticleDigestListProps = {
  data: ArticleDigest[]
  loading?: boolean
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

  public render() {
    const { data, loading = false, recommend } = this.props

    return (
      <Table<ArticleDigest>
        bordered
        loading={loading}
        dataSource={_compact(data)}
        pagination={false}
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
        <Table.Column<ArticleDigest>
          dataIndex="state"
          title="狀態"
          render={state => <ArticleStateTag state={state} />}
        />
        {!recommend && (
          <Table.Column<ArticleDigest>
            dataIndex="public"
            title="白名單"
            render={(isPublic, record) => (
              <TogglePublic checked={isPublic} articleId={record.id} />
            )}
          />
        )}
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
              <ToggleRecommendToday
                checked={inRecommendToday}
                articleId={record.id}
              />
            )}
          />
        )}
        {recommend && recommend.icymi && (
          <Table.Column<ArticleDigest>
            dataIndex="oss.inRecommendIcymi"
            title="在「不要錯過」顯示"
            render={(inRecommendIcymi, record) => (
              <ToggleRecommendIcymi
                checked={inRecommendIcymi}
                articleId={record.id}
              />
            )}
          />
        )}
        {recommend && recommend.hottest && (
          <Table.Column<ArticleDigest>
            dataIndex="oss.inRecommendHottest"
            title="在「熱門文章」顯示"
            render={(inRecommendHottest, record) => (
              <ToggleRecommendHottest
                checked={inRecommendHottest}
                articleId={record.id}
              />
            )}
          />
        )}
        {recommend && recommend.newest && (
          <Table.Column<ArticleDigest>
            dataIndex="oss.inRecommendNewest"
            title="在「最新發布」顯示"
            render={(inRecommendNewest, record) => (
              <ToggleRecommendNewest
                checked={inRecommendNewest}
                articleId={record.id}
              />
            )}
          />
        )}
        {recommend && recommend.topic && (
          <Table.Column<ArticleDigest>
            dataIndex="oss.inRecommendTopic"
            title="在「熱議話題」顯示"
            render={(inRecommendTopic, record) => (
              <ToggleRecommendTopic
                checked={inRecommendTopic}
                articleId={record.id}
              />
            )}
          />
        )}
      </Table>
    )
  }
}

export default ArticleDigestList
