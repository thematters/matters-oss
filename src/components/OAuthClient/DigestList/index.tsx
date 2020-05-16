import * as React from 'react'
import { Table } from 'antd'
import _get from 'lodash/get'
import _compact from 'lodash/compact'
import { Link } from 'react-router-dom'

import DateTime from '../../DateTime'

import { PAGE_SIZE, PATH } from '../../../constants'
import { OAuthClientDigest } from '../../../definitions'
import { onPaginationChange, getCurrentPaginationFromUrl } from '../../../utils'
import UserLink from '../../User/Link'

type OAuthClientDigestListProps = {
  data: OAuthClientDigest[]
  loading?: boolean
  pagination?: {
    totalCount: number
    pageSize?: number
    fetchMore?: any
    variables?: any
  }
}

class OAuthClientDigestList extends React.Component<
  OAuthClientDigestListProps
> {
  public render() {
    const { data, loading = false, pagination } = this.props
    const currentPagination = getCurrentPaginationFromUrl()

    return (
      <Table<OAuthClientDigest>
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
        <Table.Column<OAuthClientDigest>
          dataIndex="name"
          title="Name"
          render={(name, record) => (
            <Link to={PATH.OAUTH_CLIENT_DETAIL.replace(':id', record.id)}>
              {name}
            </Link>
          )}
        />

        <Table.Column<OAuthClientDigest>
          dataIndex="id"
          title="Client ID"
          width={300}
        />

        <Table.Column<OAuthClientDigest>
          dataIndex="scope"
          title="Scopes"
          width={300}
          render={(scope) =>
            scope ? (
              <ul>
                {scope.map((s: string) => (
                  <li>{s}</li>
                ))}
              </ul>
            ) : null
          }
        />

        <Table.Column<OAuthClientDigest>
          dataIndex="user"
          title="Developer"
          width={150}
          render={(user) =>
            user ? (
              <UserLink
                id={user.id}
                userName={user.userName}
                displayName={user.displayName}
              />
            ) : null
          }
        />

        <Table.Column<OAuthClientDigest>
          dataIndex="website"
          title="Website"
          width={150}
          render={(link) => (
            <a href={link} target="_blank">
              {link}
            </a>
          )}
        />

        <Table.Column<OAuthClientDigest>
          dataIndex="createdAt"
          title="Created At"
          width={150}
          render={(createdAt) => <DateTime date={createdAt} />}
        />
      </Table>
    )
  }
}

export default OAuthClientDigestList
