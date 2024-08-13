import * as React from 'react'

import ErrorMessage from '../../components/ErrorMessage'
import BadgedUserDigestList from '../../components/BadgedUser/DigestList'
import withBadgedUserList, { BadgedUsersChildProps } from './withBadgedUserList'

import { UserDigest } from '../../definitions'

class BadgedUserList extends React.Component<BadgedUsersChildProps> {
  public render() {
    const {
      data: { oss, loading, error, fetchMore, variables },
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    let listData: UserDigest[] = []
    let totalCount: number = 0
    if (oss && oss.badgedUsers) {
      listData = oss.badgedUsers.edges.map(({ node }) => node)
      totalCount = oss.badgedUsers.totalCount
    }

    return (
      <BadgedUserDigestList
        data={listData}
        loading={loading}
        pagination={{ totalCount, fetchMore, variables }}
      />
    )
  }
}

export default withBadgedUserList(BadgedUserList)
