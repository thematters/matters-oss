import * as React from 'react'
import _get from 'lodash/get'

import SearchBar from '../../components/SearchBar'
import ErrorMessage from '../../components/ErrorMessage'
import TagDigestList from '../../components/Tag/DigestList'
import withTagList, { TagListChildProps } from './withTagList'

import { TagDigest } from '../../definitions'

class TagList extends React.Component<TagListChildProps> {
  private _renderHeader() {
    return <SearchBar placeholder="請輸入標籤" />
  }

  private _renderContent() {
    const {
      data: { oss, search, loading, error, fetchMore, variables }
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    let listData: TagDigest[] = []
    let totalCount: number = 0
    if (search) {
      listData = search.edges.map(({ node }) => node)
      totalCount = search.totalCount
    }
    if (oss && oss.tags) {
      listData = oss.tags.edges.map(({ node }) => node)
      totalCount = oss.tags.totalCount
    }

    return (
      <TagDigestList
        data={listData}
        loading={loading}
        pagination={{ totalCount, fetchMore, variables }}
        hasSorter
        inRecommendedTagsPage
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

export default withTagList(TagList)
