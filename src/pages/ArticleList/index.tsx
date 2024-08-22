import * as React from 'react'
import { Switch } from 'antd'

import SearchBar from '../../components/SearchBar'
import ErrorMessage from '../../components/ErrorMessage'
import ArticleDigestList from '../../components/Article/DigestList'
import Divider from '../../components/Divider'
import withArticleList, { ArticleListChildProps } from './withArticleList'
import {
  getSearchKey,
  getFilterSpamKey,
  getCurrentPaginationFromUrl,
  setQS,
} from '../../utils'

import { ArticleDigest } from '../../definitions'

class ArticleList extends React.Component<ArticleListChildProps> {
  private _renderHeader() {
    const checked = getFilterSpamKey()
    const currentPagination = getCurrentPaginationFromUrl()
    return (
      <>
        <h4>只显示垃圾文章</h4>
        <Switch
          defaultChecked={checked}
          onChange={(checked) => {
            setQS({ filterspam: checked ? '1' : '0' })
            this.props.data.refetch({
              input: {
                first: 10,
                after: currentPagination && currentPagination.after,
                filter: {
                  isSpam: checked,
                },
              },
            })
          }}
          disabled={!!getSearchKey()}
        />
        <Divider />
        <h4>搜尋</h4>
        <SearchBar placeholder="請輸入文章標題" />
      </>
    )
  }

  private _renderContent() {
    const {
      data: { oss, search, loading, error, fetchMore, variables },
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    let listData: ArticleDigest[] = []
    let totalCount: number = 0
    if (search) {
      listData = search.edges.map(({ node }) => node)
      totalCount = search.totalCount
    }
    if (oss) {
      listData = oss.articles.edges.map(({ node }) => node)
      totalCount = oss.articles.totalCount
    }

    return (
      <ArticleDigestList
        data={listData}
        loading={loading}
        pagination={{ totalCount, fetchMore, variables }}
      />
    )
  }

  public render() {
    return (
      <>
        {this._renderHeader()}
        {this._renderContent()}
      </>
    )
  }
}

export default withArticleList(ArticleList)
