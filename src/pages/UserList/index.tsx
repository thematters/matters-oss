import * as React from 'react'
import _get from 'lodash/get'

import SearchBar from '../../components/SearchBar'
import ErrorMessage from '../../components/ErrorMessage'
import UserDigestList from '../../components/User/DigestList'
import withUserList from './withUserList'

import { UserDigest } from '../../definitions'
import { AllUsersChildProps, SearchUsersChildProps } from './type'

class UserList extends React.Component<
  AllUsersChildProps & SearchUsersChildProps
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
      return <UserDigestList data={[]} loading />
    }

    let userTableData: UserDigest[] = []
    if (search) {
      userTableData = search.edges.map(({ node }) => node)
    }

    if (oss && oss.users) {
      userTableData = oss.users.edges.map(({ node }) => node)
    }
    return <UserDigestList data={userTableData} />
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

export default withUserList(UserList)
