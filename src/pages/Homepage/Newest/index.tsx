import * as React from 'react'
import _get from 'lodash/get'

import SearchBar from '../../../components/SearchBar'
import ErrorMessage from '../../../components/ErrorMessage'
import ArticleDigestList from '../../../components/Article/DigestList'
import withNewestList, { NewestListChildProps } from './withNewestList'

import { ArticleDigest } from '../../../definitions'

class ArticleList extends React.Component<NewestListChildProps> {
  private _renderHeader() {
    return <SearchBar placeholder="請輸入文章標題" />
  }

  private _renderContent() {
    const {
      data: { viewer, search, loading, error, fetchMore, variables }
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
    if (viewer && viewer.recommendation && viewer.recommendation.newest) {
      listData = viewer.recommendation.newest.edges.map(({ node }) => node)
      totalCount = viewer.recommendation.newest.totalCount
    }

    return (
      <ArticleDigestList
        data={listData}
        loading={loading}
        recommend={{ newest: true }}
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

export default withNewestList(ArticleList)
