import * as React from 'react'
import { Table } from 'antd'
import jump from 'jump.js'
import _get from 'lodash/get'
import _compact from 'lodash/compact'

import UserStateTag from '../../../components/User/StateTag'
import UserLink from '../../User/Link'
import SetBoost from '../../SetBoost'

import { UserDigest } from '../../../definitions'
import { pageToCursor } from '../../../utils'
import { PAGE_SIZE } from '../../../constants'

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
  private _onPaginationChange = (page: number, pageSize?: number) => {
    const { pagination } = this.props

    if (!pagination) {
      return
    }

    const cursor = pageToCursor(page, pageSize || 0)

    jump('body')
    pagination.fetchMore({
      variables: {
        input: {
          ...pagination.variables.input,
          after: cursor
        }
      },
      updateQuery: (_: any, { fetchMoreResult }: any) => fetchMoreResult
    })
  }

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
    const { data, loading = false, recommend, pagination } = this.props

    return (
      <Table<UserDigest>
        bordered
        loading={loading}
        dataSource={_compact(data)}
        scroll={{ x: 1200, y: '70vh' }}
        pagination={
          pagination
            ? {
                pageSize: pagination.pageSize || PAGE_SIZE,
                total: pagination.totalCount,
                onChange: this._onPaginationChange,
                showTotal: t => `共 ${t} 項`
              }
            : false
        }
        rowKey={record => record.id}
      >
        <Table.Column<UserDigest>
          dataIndex="info.id"
          title="用戶"
          render={this._renderEmailCell}
        />
        <Table.Column<UserDigest>
          dataIndex="info.email"
          title="電子信箱"
          width={300}
        />
        <Table.Column<UserDigest>
          dataIndex="status.state"
          title="狀態"
          width={100}
          render={state => <UserStateTag state={state} />}
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
        <Table.Column<UserDigest>
          dataIndex="status.MAT.total"
          title="MAT 數"
          width={100}
        />
        {/* <Table.Column<UserDigest>
          dataIndex="info.description"
          title="自我描述"
        /> */}
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
        {recommend && recommend.author && (
          <Table.Column<UserDigest>
            dataIndex="oss.score"
            title="Score"
            width={100}
          />
        )}
      </Table>
    )
  }
}

export default UserDigestList
