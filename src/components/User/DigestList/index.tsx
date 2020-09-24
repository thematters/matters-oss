import * as React from 'react'
import { Table } from 'antd'
import _get from 'lodash/get'
import _compact from 'lodash/compact'

import UserStateTag from '../../../components/User/StateTag'
import UserLink from '../../User/Link'
import SetBoost from '../../SetBoost'

import { UserDigest } from '../../../definitions'
import { onPaginationChange, getCurrentPaginationFromUrl } from '../../../utils'
import { PAGE_SIZE } from '../../../constants'
import DateTime from '../../DateTime'

type UserDigestListProps = {
  data: UserDigest[]
  loading?: boolean
  pagination?: {
    totalCount: number
    pageSize?: number
    fetchMore?: any
    variables?: any
  }
  recommend?: {
    author?: boolean
  }
}

class UserDigestList extends React.Component<UserDigestListProps> {
  private _renderNameCell(_: any, record: UserDigest): React.ReactNode {
    return (
      <UserLink
        id={record.id}
        userName={record.userName}
        displayName={record.displayName}
      />
    )
  }

  private _renderCreatedAt(_: any, record: UserDigest): React.ReactNode {
    return <DateTime date={record.info.createdAt} />
  }

  public render() {
    const { data, loading = false, recommend, pagination } = this.props
    const currentPagination = getCurrentPaginationFromUrl()

    return (
      <Table<UserDigest>
        bordered
        loading={loading}
        dataSource={_compact(data)}
        scroll={{ x: 1200, y: '70vh' }}
        pagination={
          pagination
            ? {
                defaultCurrent: currentPagination && currentPagination.page,
                pageSize: pagination.pageSize || PAGE_SIZE,
                total: pagination.totalCount,
                onChange: (page) => onPaginationChange({ pagination, page }),
                showTotal: (t) => `共 ${t} 項`,
                position: 'both',
              }
            : false
        }
        rowKey={(record) => record.id}
      >
        <Table.Column<UserDigest>
          dataIndex="info.id"
          title="用戶"
          render={this._renderNameCell}
        />
        <Table.Column<UserDigest>
          dataIndex="info.createdAt"
          title="註冊時間"
          render={this._renderCreatedAt}
          width={200}
        />
        <Table.Column<UserDigest>
          dataIndex="status.state"
          title="狀態"
          width={100}
          render={(state) => <UserStateTag state={state} />}
        />
        <Table.Column<UserDigest>
          dataIndex="status.articleCount"
          title="文章數"
          width={100}
        />
        <Table.Column<UserDigest>
          dataIndex="status.commentCount"
          title="評論數"
          width={100}
        />
        {recommend && recommend.author && (
          <Table.Column<UserDigest>
            dataIndex="oss.boost"
            title="Boost"
            width={150}
            render={(boost, record) => (
              <SetBoost boost={boost} id={record.id} type="User" />
            )}
          />
        )}
      </Table>
    )
  }
}

export default UserDigestList
