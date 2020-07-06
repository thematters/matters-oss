import * as React from 'react'
import _get from 'lodash/get'

import SearchBar from '../../components/SearchBar'
import ErrorMessage from '../../components/ErrorMessage'
import UserDigestList from '../../components/User/DigestList'
import withUserList, { UserListChildProps } from './withUserList'

import { UserDigest } from '../../definitions'
import BatchSetUsersState from './BatchSetUsersState'

class UserList extends React.Component<UserListChildProps> {
  private _renderHeader() {
    return (
      <>
        <h4>批量修改</h4>
        <BatchSetUsersState />
        <h4>搜尋</h4>
        <SearchBar placeholder="請輸入 Matters ID 或用戶姓名" />
      </>
    )
  }

  private _renderContent() {
    const {
      data: { oss, search, loading, error, fetchMore, variables },
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
    if (oss && oss.users) {
      listData = oss.users.edges.map(({ node }) => node)
      totalCount = oss.users.totalCount
    }

    return (
      <UserDigestList
        data={listData}
        loading={loading}
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

export default withUserList(UserList)
