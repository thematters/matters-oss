import * as React from 'react'
import _get from 'lodash/get'

import SearchBar from '../../../components/SearchBar'
import ErrorMessage from '../../../components/ErrorMessage'
import TagDigestList from '../../../components/Tag/DigestList'
import withTagList, { TagListChildProps } from './withTagList'

import { TagDigest } from '../../../definitions'

class TagList extends React.Component<TagListChildProps> {
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

    let tagTableData: TagDigest[] = []
    let totalCount: number = 0
    if (search) {
      tagTableData = search.edges.map(({ node }) => node)
      totalCount = search.totalCount
    }
    if (viewer && viewer.recommendation && viewer.recommendation.tags) {
      tagTableData = viewer.recommendation.tags.edges.map(({ node }) => node)
      totalCount = viewer.recommendation.tags.totalCount
    }

    return (
      <TagDigestList
        data={tagTableData}
        loading={loading}
        recommend={{ tag: true }}
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

export default withTagList(TagList)
