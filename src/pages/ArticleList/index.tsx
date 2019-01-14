import * as React from 'react'
import _get from 'lodash/get'

import SearchBar from '../../components/SearchBar'
import ErrorMessage from '../../components/ErrorMessage'
import ArticleDigestList from '../../components/Article/DigestList'
import withArticleList from './withArticleList'

import { ArticleDigest } from '../../definitions'
import { AllArticlesChildProps, SearchArticlesChildProps } from './type'

class ArticleList extends React.Component<
  AllArticlesChildProps & SearchArticlesChildProps
> {
  private _renderHeader() {
    return <SearchBar placeholder="請輸入文章標題" />
  }

  private _renderContent() {
    const {
      data: { oss, search, loading, error }
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    if (loading) {
      return <ArticleDigestList data={[]} loading />
    }

    let articleTableData: ArticleDigest[] = []
    if (search) {
      articleTableData = search.edges.map(({ node }) => node)
    }
    if (oss && oss.articles) {
      articleTableData = oss.articles.edges.map(({ node }) => node)
    }
    return <ArticleDigestList data={articleTableData} />
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
