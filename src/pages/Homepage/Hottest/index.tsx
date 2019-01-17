import * as React from 'react'
import _get from 'lodash/get'

import SearchBar from '../../../components/SearchBar'
import ErrorMessage from '../../../components/ErrorMessage'
import ArticleDigestList from '../../../components/Article/DigestList'
import withHottestList from './withHottestList'

import { ArticleDigest } from '../../../definitions'
import { HottestChildProps, SearchArticlesChildProps } from './type'

class ArticleList extends React.Component<
  HottestChildProps & SearchArticlesChildProps
> {
  private _renderHeader() {
    return <SearchBar placeholder="請輸入文章標題" />
  }

  private _renderContent() {
    const {
      data: { viewer, search, loading, error }
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    if (loading) {
      return (
        <ArticleDigestList data={[]} loading recommend={{ hottest: true }} />
      )
    }

    let articleTableData: ArticleDigest[] = []
    if (search) {
      articleTableData = search.edges.map(({ node }) => node)
    }

    if (viewer && viewer.recommendation && viewer.recommendation.hottest) {
      articleTableData = viewer.recommendation.hottest.edges.map(
        ({ node }) => node
      )
    }
    return (
      <ArticleDigestList
        data={articleTableData}
        recommend={{ hottest: true }}
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
