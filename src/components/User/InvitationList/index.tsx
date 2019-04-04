import * as React from 'react'
import { Table } from 'antd'
import _get from 'lodash/get'
import _compact from 'lodash/compact'

import LevelTag, { LevelEnum } from '../../../components/LevelTag'
import DateTime from '../../DateTime'
import UserLink from '../../User/Link'

import { GQLInvitation } from '../../../definitions'

type InvitationListProps = {
  data: GQLInvitation[]
  loading?: boolean
}

class InvitationList extends React.Component<InvitationListProps> {
  private _renderUserCell(_: any, record: GQLInvitation): React.ReactNode {
    if (!record.user) {
      return
    }

    return (
      <UserLink
        id={record.user.id}
        userName={record.user.info.userName}
        displayName={record.user.info.displayName}
      />
    )
  }

  public render() {
    const { data, loading = false } = this.props

    return (
      <Table<GQLInvitation>
        bordered
        loading={loading}
        dataSource={_compact(data)}
        pagination={false}
        scroll={{ x: 1200, y: '70vh' }}
        rowKey={record => record.id}
      >
        <Table.Column<GQLInvitation>
          title="用戶"
          render={this._renderUserCell}
        />
        <Table.Column<GQLInvitation>
          dataIndex="email"
          title="電子信箱"
          width={300}
        />
        <Table.Column<GQLInvitation>
          dataIndex="accepted"
          title="狀態"
          width={150}
          render={accepted => (
            <LevelTag level={accepted ? LevelEnum.SUCCESS : LevelEnum.INFO}>
              {accepted ? '已激活' : '未激活'}
            </LevelTag>
          )}
        />
        <Table.Column<GQLInvitation>
          dataIndex="createdAt"
          title="邀請時間"
          width={150}
          render={createdAt => <DateTime date={createdAt} />}
        />
      </Table>
    )
  }
}

export default InvitationList
