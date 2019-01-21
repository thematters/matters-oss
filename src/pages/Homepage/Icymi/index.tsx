import * as React from 'react'
import _get from 'lodash/get'

import SearchBar from '../../../components/SearchBar'
import ErrorMessage from '../../../components/ErrorMessage'
import ArticleDigestList from '../../../components/Article/DigestList'
import withIcymiList, { IcymiListChildProps } from './withIcymiList'

import { ArticleDigest } from '../../../definitions'

class ArticleList extends React.Component<IcymiListChildProps> {
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

    if (loading) {
      return <ArticleDigestList data={[]} loading recommend={{ icymi: true }} />
    }

    let listData: ArticleDigest[] = []
    let totalCount: number = 0

    if (search) {
      listData = search.edges.map(({ node }) => node)
      totalCount = search.totalCount
    }

    if (viewer && viewer.recommendation && viewer.recommendation.icymi) {
      listData = viewer.recommendation.icymi.edges.map(({ node }) => node)
      totalCount = viewer.recommendation.icymi.totalCount
    }

    return (
      <ArticleDigestList
        data={listData}
        recommend={{ icymi: true }}
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

export default withIcymiList(ArticleList)
