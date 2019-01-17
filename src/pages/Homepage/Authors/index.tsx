import * as React from 'react'
import _get from 'lodash/get'

import SearchBar from '../../../components/SearchBar'
import ErrorMessage from '../../../components/ErrorMessage'
import UserDigestList from '../../../components/User/DigestList'
import withAuthorList from './withAuthorList'

import { UserDigest } from '../../../definitions'
import { AuthorsChildProps, SearchUsersChildProps } from './type'

class AuthorList extends React.Component<
  AuthorsChildProps & SearchUsersChildProps
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
      return <UserDigestList data={[]} loading recommend={{ author: true }} />
    }

    let userTableData: UserDigest[] = []
    if (search) {
      userTableData = search.edges.map(({ node }) => node)
    }

    if (viewer && viewer.recommendation && viewer.recommendation.authors) {
      userTableData = viewer.recommendation.authors.edges.map(
        ({ node }) => node
      )
    }
    return <UserDigestList data={userTableData} recommend={{ author: true }} />
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
