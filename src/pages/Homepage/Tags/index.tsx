import * as React from 'react'
import _get from 'lodash/get'

import SearchBar from '../../../components/SearchBar'
import ErrorMessage from '../../../components/ErrorMessage'
import TagDigestList from '../../../components/Tag/DigestList'
import withTagList from './withTagList'

import { TagDigest } from '../../../definitions'
import { TagsChildProps, SearchTagsChildProps } from './type'

class TagList extends React.Component<TagsChildProps & SearchTagsChildProps> {
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
      return <TagDigestList data={[]} loading recommend={{ tag: true }} />
    }

    let tagTableData: TagDigest[] = []
    if (search) {
      tagTableData = search.edges.map(({ node }) => node)
    }

    if (viewer && viewer.recommendation && viewer.recommendation.tags) {
      tagTableData = viewer.recommendation.tags.edges.map(({ node }) => node)
    }
    return <TagDigestList data={tagTableData} recommend={{ tag: true }} />
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
