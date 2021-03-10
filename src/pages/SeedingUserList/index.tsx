import * as React from 'react'
import _get from 'lodash/get'

import ErrorMessage from '../../components/ErrorMessage'
import SeedingUserDigestList from '../../components/SeedingUser/DigestList'
import withSeedingUserList, {
  SeedingUsersChildProps,
} from './withSeedingUserList'

import { UserDigest } from '../../definitions'

class SeedingUserList extends React.Component<SeedingUsersChildProps> {
  private _renderContent() {
    const {
      data: { oss, loading, error, fetchMore, variables },
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    let listData: UserDigest[] = []
    let totalCount: number = 0
    if (oss && oss.seedingUsers) {
      listData = oss.seedingUsers.edges.map(({ node }) => node)
      totalCount = oss.seedingUsers.totalCount
    }

    return (
      <SeedingUserDigestList
        data={listData}
        loading={loading}
        pagination={{ totalCount, fetchMore, variables }}
      />
    )
  }

  public render() {
    return <>{this._renderContent()}</>
  }
}

export default withSeedingUserList(SeedingUserList)
