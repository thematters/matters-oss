import * as React from 'react'
import _get from 'lodash/get'

import SearchBar from '../../../components/SearchBar'
import ErrorMessage from '../../../components/ErrorMessage'
import ArticleDigestList from '../../../components/Article/DigestList'
import withHottestList, { HottestListChildProps } from './withHottestList'

import { ArticleDigest } from '../../../definitions'

class ArticleList extends React.Component<HottestListChildProps> {
  private _renderHeader() {
    return <SearchBar placeholder="請輸入文章標題" />
  }

  private _renderContent() {
    const {
      data: { viewer, search, loading, error, fetchMore, variables },
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

    if (viewer && viewer.recommendation && viewer.recommendation.hottest) {
      listData = viewer.recommendation.hottest.edges.map(({ node }) => node)
      totalCount = viewer.recommendation.hottest.totalCount
    }

    return (
      <ArticleDigestList
        data={listData}
        loading={loading}
        recommend={{ hottest: true }}
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

export default withHottestList(ArticleList)
