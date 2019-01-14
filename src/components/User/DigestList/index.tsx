import * as React from 'react'
import { Table } from 'antd'
import _get from 'lodash/get'
import _compact from 'lodash/compact'

import UserStateTag from '../../../components/User/StateTag'
import UserLink from '../../UserLink'

import { UserDigest } from '../../../definitions'

type UserDigestListProps = {
  data: UserDigest[]
  loading?: boolean
}

class UserDigestList extends React.Component<UserDigestListProps> {
  private _renderEmailCell(_: any, record: UserDigest): React.ReactNode {
    return (
      <UserLink
        id={record.id}
        userName={record.info.userName}
        displayName={record.info.displayName}
      />
    )
  }

  public render() {
    const { data, loading = false } = this.props

    return (
      <Table<UserDigest>
        bordered
        loading={loading}
        dataSource={_compact(data)}
        pagination={false}
        rowKey={record => record.id}
      >
        <Table.Column<UserDigest> title="用戶" render={this._renderEmailCell} />
        <Table.Column<UserDigest>
          // @ts-ignore
          dataIndex="info.email"
          title="電子信箱"
        />
        <Table.Column<UserDigest>
          // @ts-ignore
          dataIndex="status.state"
          title="狀態"
          render={state => <UserStateTag state={state} />}
        />
        <Table.Column<UserDigest>
          // @ts-ignore
          dataIndex="status.articleCount"
          title="文章數"
        />
        <Table.Column<UserDigest>
          // @ts-ignore
          dataIndex="status.commentCount"
          title="評論數"
        />
        <Table.Column<UserDigest>
          // @ts-ignore
          dataIndex="status.MAT.total"
          title="MAT 數"
        />
        <Table.Column<UserDigest>
          // @ts-ignore
          dataIndex="info.description"
          title="自我描述"
        />
      </Table>
    )
  }
}

export default UserDigestList
