import * as React from 'react'
import _compact from 'lodash/compact'
import { Table, Tag } from 'antd'
import { Link } from 'react-router-dom'
import { onPaginationChange, getCurrentPaginationFromUrl } from '../../../utils'
import { PAGE_SIZE } from '../../../constants'
import { IcymiTopicDigest } from '../../../definitions'
import { PATH } from '../../../constants'

const NAME_MAP = {
  published: '已發佈',
  editing: '編輯中',
  archived: '已下架',
}

type IcymiTopicDigestListProps = {
  data: IcymiTopicDigest[]
  loading?: boolean
  pagination?: {
    totalCount: number
    pageSize?: number
    fetchMore?: any
    variables?: any
  }
}

class IcymiTopicDigestList extends React.Component<
  IcymiTopicDigestListProps
> {
  private _renderNameCell(_: any, record: IcymiTopicDigest): React.ReactNode {
    return (
      <Link to={PATH.HOMEPAGE_ICYMI_TOPIC_DETAIL.replace(':id', record.id)}>
        {record.title}
      </Link>
    )
  }
  private _renderState(_: any, record: IcymiTopicDigest): React.ReactNode {
    return <Tag> {NAME_MAP[record.state]}</Tag>
  }
  public render() {
    const { data, loading = false, pagination } = this.props
    const currentPagination = getCurrentPaginationFromUrl()

    return (
      <Table<IcymiTopicDigest>
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
        <Table.Column<IcymiTopicDigest>
          title="專題名稱"
          render={this._renderNameCell}
          width={200}
        />
        <Table.Column<IcymiTopicDigest>
          title="狀態"
          render={this._renderState}
          width={400}
        />
      </Table>
    )
  }
}

export default IcymiTopicDigestList
