import * as React from 'react'
import _compact from 'lodash/compact'
import { Table } from 'antd'
import UserLink from '../../User/Link'
import { onPaginationChange, getCurrentPaginationFromUrl } from '../../../utils'
import { PAGE_SIZE } from '../../../constants'
import { UserDigest } from '../../../definitions'
import DateTime from '../../DateTime'

type RestrictedUserDigestListProps = {
  data: UserDigest[]
  loading?: boolean
  pagination?: {
    totalCount: number
    pageSize?: number
    fetchMore?: any
    variables?: any
  }
}

class RestrictedUserDigestList extends React.Component<
  RestrictedUserDigestListProps
> {
  private _renderNameCell(_: any, record: UserDigest): React.ReactNode {
    return (
      <UserLink
        id={record.id}
        userName={record.userName}
        displayName={record.displayName}
      />
    )
  }
  private _renderUpdateAt(_: any, record: UserDigest): React.ReactNode {
    const dates = record.oss.restrictions.map(
      ({ createdAt }) => new Date(createdAt)
    )
    const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())))
    return <DateTime date={maxDate} />
  }
  public render() {
    const { data, loading = false, pagination } = this.props
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
          title="設置時間"
          render={this._renderUpdateAt}
          width={200}
        />
      </Table>
    )
  }
}

export default RestrictedUserDigestList
