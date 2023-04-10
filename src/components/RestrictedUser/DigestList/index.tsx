import * as React from 'react'
import _compact from 'lodash/compact'
import { Table, Button } from 'antd'
import UserLink from '../../User/Link'
import { onPaginationChange, getCurrentPaginationFromUrl } from '../../../utils'
import { PAGE_SIZE } from '../../../constants'
import { UserDigest } from '../../../definitions'
import DateTime from '../../DateTime'

import RemoveAllRestrictionButton from '../SetRestriction/removeAllRestrictionButton'

const NAME_MAP = {
  articleNewest: '最新',
  articleHottest: '熱門',
}

const ITEM_MAP = {
  articleNewest: '首頁最新不顯示文章',
  articleHottest: '首頁熱門不顯示文章',
}

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
  private _renderRestrictions(_: any, record: UserDigest): React.ReactNode {
    return (
      record.oss.restrictions.map(({ type }) => NAME_MAP[type]).join('、') ||
      '無'
    )
  }
  private _renderUpdateAt(_: any, record: UserDigest): React.ReactNode {
    if (record.oss.restrictions.length > 0) {
      const dates = record.oss.restrictions.map(
        ({ createdAt }) => new Date(createdAt)
      )
      const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())))
      return <DateTime date={maxDate} />
    } else {
      return '無'
    }
  }
  private _renderButtons(_: any, record: UserDigest): React.ReactNode {
    return (
      <>
        <Button type="primary">修改</Button>
        <RemoveAllRestrictionButton userId={record.id} restrictions={[]} />
      </>
    )
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
          width={200}
        />
        <Table.Column<UserDigest>
          dataIndex="oss.restrictions"
          title="管製項目"
          render={this._renderRestrictions}
          width={400}
        />
        <Table.Column<UserDigest>
          dataIndex="oss.restrictions"
          title="設置時間"
          render={this._renderUpdateAt}
          width={400}
        />
        <Table.Column<UserDigest>
          dataIndex="info.id"
          title="操作"
          render={this._renderButtons}
        />
      </Table>
    )
  }
}

export default RestrictedUserDigestList
