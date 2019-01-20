import * as React from 'react'
import _get from 'lodash/get'

import SearchBar from '../../../components/SearchBar'
import ErrorMessage from '../../../components/ErrorMessage'
import ArticleDigestList from '../../../components/Article/DigestList'
import withMattersTodayList, {
  MattersTodayListChildProps
} from './withMattersTodayList'

import { ArticleDigest } from '../../../definitions'

class ArticleList extends React.Component<MattersTodayListChildProps> {
  private _renderHeader() {
    return <SearchBar placeholder="請輸入文章標題" />
  }

  private _renderContent() {
    const {
      data: { oss, search, loading, error, fetchMore, variables }
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
    if (oss && oss.today) {
      listData = oss.today.edges.map(({ node }) => node)
      totalCount = oss.today.totalCount
    }

    return (
      <ArticleDigestList
        data={listData}
        loading={loading}
        recommend={{ today: true }}
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

export default withMattersTodayList(ArticleList)
