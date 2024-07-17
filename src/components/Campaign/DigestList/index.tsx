import * as React from 'react'
import { Table } from 'antd'
import _compact from 'lodash/compact'

import DateTime from '../../DateTime'
import CampaignLink from '../Link'
import CampaignSetState from '../SetState'

import { PAGE_SIZE } from '../../../constants'
import { CampaignDigest } from '../../../definitions'
import { onPaginationChange, getCurrentPaginationFromUrl } from '../../../utils'

type CampaignDigestListProps = {
  data: CampaignDigest[]
  loading?: boolean
  pagination?: {
    totalCount: number
    pageSize?: number
    fetchMore?: any
    variables?: any
  }
}

type CampaignDigestListState = {
  selectedRowKeys: string[] | number[]
  selectedRows: CampaignDigest[]
}

class CampaignDigestList extends React.Component<
  CampaignDigestListProps,
  CampaignDigestListState
> {
  state = {
    selectedRowKeys: [],
    selectedRows: [],
  }

  private _renderNameCell(_: any, record: CampaignDigest): React.ReactNode {
    return (
      <CampaignLink
        shortHash={record.shortHash}
        name={record.name || '未命名'}
      />
    )
  }

  private _renderStateCell(_: any, record: CampaignDigest): React.ReactNode {
    return <CampaignSetState campaignState={record.state} id={record.id} />
  }

  private _renderApplicationPeriod(
    _: any,
    record: CampaignDigest
  ): React.ReactNode {
    const { start, end } = record.applicationPeriod || {}
    return (
      <>
        <DateTime date={start} />
        {' ~ '}
        <br />
        {end && <DateTime date={end} />}
      </>
    )
  }

  private _renderWritingPeriod(
    _: any,
    record: CampaignDigest
  ): React.ReactNode {
    const { start, end } = record.writingPeriod || {}
    return (
      <>
        <DateTime date={start} />
        {' ~ '}
        <br />
        {end && <DateTime date={end} />}
      </>
    )
  }

  public render() {
    const { data, loading = false, pagination } = this.props
    const currentPagination = getCurrentPaginationFromUrl()

    return (
      <>
        <Table<CampaignDigest>
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
          <Table.Column<CampaignDigest>
            dataIndex="name"
            title="標題"
            width={300}
            render={this._renderNameCell}
          />

          <Table.Column<CampaignDigest>
            dataIndex="state"
            title="狀態"
            width={150}
            render={this._renderStateCell}
          />

          <Table.Column<CampaignDigest>
            dataIndex="applicationPeriod"
            title="報名期"
            width={200}
            render={this._renderApplicationPeriod}
          />

          <Table.Column<CampaignDigest>
            dataIndex="writingPeriod"
            title="活動期"
            width={200}
            render={this._renderWritingPeriod}
          />
        </Table>
      </>
    )
  }
}

export default CampaignDigestList
