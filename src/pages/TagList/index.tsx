import * as React from 'react'
import _get from 'lodash/get'

import SearchBar from '../../components/SearchBar'
import ErrorMessage from '../../components/ErrorMessage'
import TagDigestList from '../../components/Tag/DigestList'
import withTagList from './withTagList'

import { TagDigest } from '../../definitions'
import { AllTagsChildProps, SearchTagsChildProps } from './type'

class TagList extends React.Component<
  AllTagsChildProps & SearchTagsChildProps
> {
  private _renderHeader() {
    return <SearchBar placeholder="請輸入標籤" />
  }

  private _renderContent() {
    const {
      data: { oss, search, loading, error }
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    if (loading) {
      return <TagDigestList data={[]} loading />
    }

    let tagTableData: TagDigest[] = []
    if (search) {
      tagTableData = search.edges.map(({ node }) => node)
    }
    if (oss && oss.tags) {
      tagTableData = oss.tags.edges.map(({ node }) => node)
    }
    return <TagDigestList data={tagTableData} />
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
