import * as React from 'react'
import ErrorMessage from '../../components/ErrorMessage'
import SearchBar from '../../components/SearchBar'
import RestrictedUserDigestList from '../../components/RestrictedUser/DigestList'
import { UserDigest } from '../../definitions'
import withRestrictedUserList, {
  RestrictedUserListChildProps,
} from './withRestrictedUserList'

class RestrictedUserList extends React.Component<RestrictedUserListChildProps> {
  private _renderHeader() {
    return <SearchBar placeholder="請輸入 Matters ID 或用戶姓名" />
  }
  private _renderContent() {
    const {
      data: { oss, search, user, loading, error, fetchMore, variables },
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    let listData: UserDigest[] = []
    let totalCount: number = 0
    if (search) {
      listData = search.edges.map(({ node }) => node)
      totalCount = search.totalCount
      if (totalCount === 0 && user) {
        listData = [user]
        totalCount = 1
      }
    }
    if (oss && oss.restrictedUsers) {
      listData = oss.restrictedUsers.edges.map(({ node }) => node)
      totalCount = oss.restrictedUsers.totalCount
    }

    return (
      <RestrictedUserDigestList
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

export default withRestrictedUserList(RestrictedUserList)
