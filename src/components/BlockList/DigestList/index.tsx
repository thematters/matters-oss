import * as React from 'react'
import { Table } from 'antd'
import _compact from 'lodash/compact'

import DateTime from '../../DateTime'
import ToggleArchive from '../ToggleArchive'

import { BlockListItemDigest } from '../../../definitions'
import { PAGE_SIZE } from '../../../constants'
import { getCurrentPaginationFromUrl, onPaginationChange } from '../../../utils'

type BlockListItemDigestListProps = {
  data: BlockListItemDigest[]
  loading?: boolean
  pagination?: {
    totalCount: number
    pageSize?: number
    fetchMore?: any
    variables?: any
  }
}

class BlockListItemDigestList extends React.Component<BlockListItemDigestListProps> {

  public render() {
    const { data, loading = false, pagination } = this.props
    const currentPagination = getCurrentPaginationFromUrl()

    return (
      <Table<BlockListItemDigest>
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
                onChange: page => onPaginationChange({ pagination, page }),
                showTotal: t => `共 ${t} 項`,
                position: 'both'
              }
            : false
        }
        rowKey={record => record.id}
      >
        <Table.Column<BlockListItemDigest>
          dataIndex="uuid"
          title="UUID"
          width={200}
        />
        <Table.Column<BlockListItemDigest>
          dataIndex="type"
          title="封鎖類型"
          width={120}
          render={type => (
            <>{ type === 'email' ? '郵件' : '指紋' }</>
          )}
        />
        <Table.Column<BlockListItemDigest>
          dataIndex="value"
          title="封鎖資料"
        />
        <Table.Column<BlockListItemDigest>
          dataIndex="archived"
          title="解除封鎖"
          width={100}
          render={(archived, record) => (
            <ToggleArchive checked={archived} id={record.id} />
          )}
        />
        <Table.Column<BlockListItemDigest>
          dataIndex="createdAt"
          title="建立時間"
          width={250}
          render={createdAt => <DateTime date={createdAt} />}
        />
        <Table.Column<BlockListItemDigest>
          dataIndex="updatedAt"
          title="更新時間"
          width={250}
          render={updatedAt => <DateTime date={updatedAt} />}
        />
      </Table>
    )
  }
}

export default BlockListItemDigestList
