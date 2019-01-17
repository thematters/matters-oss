import * as React from 'react'
import { Table } from 'antd'
import _get from 'lodash/get'
import _compact from 'lodash/compact'

import UserStateTag from '../../../components/User/StateTag'
import UserLink from '../../UserLink'

import { UserDigest } from '../../../definitions'
import SetUserBoost from '../SetUserBoost'

type UserDigestListProps = {
  data: UserDigest[]
  loading?: boolean
  recommend?: {
    author?: boolean
  }
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
    const { data, loading = false, recommend } = this.props

    return (
      <Table<UserDigest>
        bordered
        loading={loading}
        dataSource={_compact(data)}
        pagination={false}
        rowKey={record => record.id}
      >
        <Table.Column<UserDigest> title="用戶" render={this._renderEmailCell} />
        <Table.Column<UserDigest> dataIndex="info.email" title="電子信箱" />
        <Table.Column<UserDigest>
          dataIndex="status.state"
          title="狀態"
          render={state => <UserStateTag state={state} />}
        />
        <Table.Column<UserDigest>
          dataIndex="status.articleCount"
          title="文章數"
        />
        <Table.Column<UserDigest>
          dataIndex="status.commentCount"
          title="評論數"
        />
        <Table.Column<UserDigest> dataIndex="status.MAT.total" title="MAT 數" />
        {/* <Table.Column<UserDigest>
          dataIndex="info.description"
          title="自我描述"
        /> */}
        {recommend && recommend.author && (
          <Table.Column<UserDigest>
            dataIndex="oss.boost"
            title="Boost"
            render={(boost, record) => (
              <SetUserBoost boost={boost} userId={record.id} />
            )}
          />
        )}
        {recommend && recommend.author && (
          <Table.Column<UserDigest> dataIndex="oss.score" title="Score" />
        )}
      </Table>
    )
  }
}

export default UserDigestList
