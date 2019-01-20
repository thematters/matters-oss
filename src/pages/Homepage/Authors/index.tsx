import * as React from 'react'
import _get from 'lodash/get'

import SearchBar from '../../../components/SearchBar'
import ErrorMessage from '../../../components/ErrorMessage'
import UserDigestList from '../../../components/User/DigestList'
import withAuthorList, { AuthorListChildProps } from './withAuthorList'

import { UserDigest } from '../../../definitions'

class AuthorList extends React.Component<AuthorListChildProps> {
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

    let listData: UserDigest[] = []
    let totalCount: number = 0
    if (search) {
      listData = search.edges.map(({ node }) => node)
      totalCount = search.totalCount
    }
    if (viewer && viewer.recommendation && viewer.recommendation.authors) {
      listData = viewer.recommendation.authors.edges.map(({ node }) => node)
      totalCount = viewer.recommendation.authors.totalCount
    }
    return (
      <UserDigestList
        data={listData}
        loading={loading}
        recommend={{ author: true }}
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

export default withAuthorList(AuthorList)
