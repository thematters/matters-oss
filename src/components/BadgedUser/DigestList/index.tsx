import * as React from 'react'
import { Table } from 'antd'
import _compact from 'lodash/compact'
import { Tag } from 'antd'

import UserLink from '../../User/Link'
import { UserDigest } from '../../../definitions'
import { onPaginationChange, getCurrentPaginationFromUrl } from '../../../utils'
import { PAGE_SIZE } from '../../../constants'
import { USER_BADGES } from '../enums'

interface Props {
  data: UserDigest[]
  loading?: boolean
  pagination?: {
    totalCount: number
    pageSize?: number
    fetchMore?: any
    variables?: any
  }
}

interface State {
  selectedRowKeys: string[] | number[]
  selectedRows: UserDigest[]
}

class BadgedUserDigestList extends React.Component<Props, State> {
  state = {
    selectedRowKeys: [],
    selectedRows: [],
  }

  _onSelectChange = (
    selectedRowKeys: string[] | number[],
    selectedRows: UserDigest[]
  ) => {
    this.setState({ selectedRowKeys, selectedRows })
  }

  _sync = () => {
    this.setState({ selectedRowKeys: [], selectedRows: [] }, () => {
      const currentPagination = getCurrentPaginationFromUrl()
      if (this.props.pagination) {
        onPaginationChange({
          pagination: this.props.pagination,
          page: currentPagination ? currentPagination.page : 1,
        })
      }
    })
  }

  private _renderNameCell(_: any, record: UserDigest): React.ReactNode {
    return (
      <UserLink
        id={record.id}
        userName={record.userName}
        displayName={record.displayName}
      />
    )
  }

  private _renderBadgeCell(_: any, record: UserDigest): React.ReactNode {
    return (
      <>
        {record.info.badges.map((badge) => (
          <Tag color={USER_BADGES[badge.type].color}>
            {USER_BADGES[badge.type].text}
          </Tag>
        ))}
      </>
    )
  }

  public render() {
    const { data, loading = false, pagination } = this.props

    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this._onSelectChange,
    }

    const currentPagination = getCurrentPaginationFromUrl()

    return (
      <Table<UserDigest>
        bordered
        loading={loading}
        rowSelection={rowSelection}
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
          dataIndex="info.id"
          title="徽章"
          render={this._renderBadgeCell}
        />
      </Table>
    )
  }
}

export default BadgedUserDigestList
