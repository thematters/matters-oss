import * as React from 'react'
import { Table } from 'antd'
import _compact from 'lodash/compact'

import UserLink from '../../User/Link'

import { GQLCampaignApplicationState, UserDigest } from '../../../definitions'
import { onPaginationChange, getCurrentPaginationFromUrl } from '../../../utils'
import { PAGE_SIZE } from '../../../constants'
import SetApplicationState from '../SetApplicationState'

type Datum = { node: UserDigest; applicationState: GQLCampaignApplicationState }

type CampaignUserDigestListProps = {
  campaignId: string
  data: Datum[]
  loading?: boolean
  pagination?: {
    totalCount: number
    pageSize?: number
    fetchMore?: any
    variables?: any
  }
}

class CampaignUserDigestList extends React.Component<
  CampaignUserDigestListProps
> {
  private _renderNameCell(_: any, record: Datum): React.ReactNode {
    return (
      <UserLink
        id={record.node.id}
        userName={record.node.userName}
        displayName={record.node.displayName}
      />
    )
  }

  public render() {
    const { data, loading = false, pagination } = this.props
    const currentPagination = getCurrentPaginationFromUrl()

    return (
      <Table<Datum>
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
        rowKey={(record) => record.node.id}
      >
        <Table.Column<Datum>
          dataIndex="node.info.id"
          title="用戶"
          width={200}
          render={this._renderNameCell}
        />

        <Table.Column<Datum>
          dataIndex="applicationState"
          title="申請狀態"
          width={100}
          render={(_: any, record: Datum) => (
            <SetApplicationState
              user={record.node.id}
              campaign={this.props.campaignId}
              applicationState={record.applicationState}
            />
          )}
        />
      </Table>
    )
  }
}

export default CampaignUserDigestList
