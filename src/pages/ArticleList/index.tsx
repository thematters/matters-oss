import * as React from 'react'
import { Table, Divider, Tag } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import _get from 'lodash/get'

import SearchBar from '../../components/SearchBar'
import ArticleTable from './ArticleTable'
import withArticleList, {
  Article,
  AllChildProps,
  SearchChildProps
} from './withArticleList'

class ArticleList extends React.Component<AllChildProps & SearchChildProps> {
  public render() {
    const {
      data: { articles, search, loading, error, refetch, fetchMore }
    } = this.props

    let articleTableData: Article[] = []

    if (!loading && !error) {
      if (search) {
        articleTableData = search.map(({ node }) => node)
      }

      if (articles) {
        articleTableData = articles
      }
    }

    return (
      <>
        <SearchBar placeholder="請輸入文章標題" />
        <ArticleTable data={articleTableData} loading={loading} />
      </>
    )
  }
}

export default withArticleList(ArticleList)
