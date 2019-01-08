import * as React from 'react'
import _get from 'lodash/get'

import SearchBar from '../../components/SearchBar'
import ErrorMessage from '../../components/ErrorMessage'
import ArticleTable from './ArticleTable'
import withArticleList from './withArticleList'
import {
  ArticleListItem,
  AllArticlesChildProps,
  SearchArticlesChildProps
} from './type'

class ArticleList extends React.Component<
  AllArticlesChildProps & SearchArticlesChildProps
> {
  private _renderHeader() {
    return <SearchBar placeholder="請輸入文章標題" />
  }

  private _renderContent() {
    const {
      data: { articles, search, loading, error }
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    if (loading) {
      return <ArticleTable data={[]} loading />
    }

    let articleTableData: ArticleListItem[] = []
    if (search) {
      articleTableData = search.map(({ node }) => node)
    }
    if (articles) {
      articleTableData = articles
    }
    return <ArticleTable data={articleTableData} />
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
