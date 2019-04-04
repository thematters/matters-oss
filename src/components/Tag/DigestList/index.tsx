import * as React from 'react'
import { Table, Button, Modal, Tag, Input, Alert, Spin, message } from 'antd'
import jump from 'jump.js'
import { Link } from 'react-router-dom'
import _get from 'lodash/get'
import _compact from 'lodash/compact'

import DateTime from '../../DateTime'
import SetBoost from '../../SetBoost'
import TagLink from '../../Tag/Link'
import withTagMutaitons, {
  TagMutationsChildProps
} from '../../../hocs/withTagMutations'

import { PATH, PAGE_SIZE } from '../../../constants'
import { TagDigest } from '../../../definitions'
import { pageToCursor } from '../../../utils'

type TagDigestListProps = TagMutationsChildProps & {
  data: TagDigest[]
  loading?: boolean
  pagination?: {
    totalCount: number
    pageSize?: number
    fetchMore?: any
    variables?: any
  }
  recommend?: {
    tag?: boolean
  }
}

type TagDigestListState = {
  selectedRowKeys: string[] | number[]
  selectedRows: TagDigest[]
  mutationLoading: boolean
  renameNewTagContent: string
  mergeNewTagContent: string
}

class TagDigestList extends React.Component<
  TagDigestListProps,
  TagDigestListState
> {
  state = {
    selectedRowKeys: [],
    selectedRows: [],
    mutationLoading: false,
    renameNewTagContent: '',
    mergeNewTagContent: ''
  }

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

  _onSelectChange = (
    selectedRowKeys: string[] | number[],
    selectedRows: TagDigest[]
  ) => {
    this.setState({ selectedRowKeys, selectedRows })
  }

  /**
   * Rename
   */
  _onRenameTags = () => {
    Modal.confirm({
      title: `請輸入新標籤名：`,
      content: (
        <Input
          style={{ marginTop: 16 }}
          placeholder="標籤名"
          onChange={e => {
            this.setState({ renameNewTagContent: e.target.value })
          }}
        />
      ),
      cancelText: '取消',
      okText: '確認',
      onOk: () => {
        this._onConfirmRenameTags()
      }
    })
  }

  _onConfirmRenameTags = () => {
    const { selectedRowKeys, selectedRows, renameNewTagContent } = this.state
    // @ts-ignore
    const { renameTag } = this.props

    if (!renameNewTagContent) {
      return message.error('請輸入新標籤名')
    }

    Modal.confirm({
      title: `確認修改以下標籤？`,
      content: (
        <div style={{ marginTop: 16 }}>
          {selectedRows.map(({ content }) => (
            <Tag style={{ marginBottom: 8 }}>{content}</Tag>
          ))}
          <Alert
            style={{ marginTop: 16 }}
            message={
              <span>
                修改後，以上標籤將被重命名為 <Tag>{renameNewTagContent}</Tag>
              </span>
            }
            type="warning"
            showIcon
          />
        </div>
      ),
      cancelText: '取消',
      okText: '確認修改',
      okType: 'danger',
      onOk: async () => {
        this.setState({ mutationLoading: true })

        try {
          await renameTag({
            variables: {
              input: {
                id: selectedRowKeys[0],
                content: renameNewTagContent
              }
            }
          })
          this.setState({ mutationLoading: false })
          message.success('修改成功')
        } catch (error) {
          this.setState({ mutationLoading: false })
          message.error('修改失敗')
        }
      }
    })
  }

  /**
   * Delete
   */
  _onDeleteTags = () => {
    const { selectedRowKeys, selectedRows } = this.state
    // @ts-ignore https://github.com/apollographql/react-apollo/pull/862
    const { deleteTags } = this.props

    Modal.confirm({
      title: `確認刪除以下標籤？`,
      content: (
        <div style={{ marginTop: 16 }}>
          {selectedRows.map(({ content }) => (
            <Tag style={{ marginBottom: 8 }}>{content}</Tag>
          ))}
        </div>
      ),
      cancelText: '取消',
      okText: '確認刪除',
      okType: 'danger',
      onOk: async () => {
        this.setState({ mutationLoading: true })

        try {
          await deleteTags({
            variables: {
              input: {
                ids: selectedRowKeys
              }
            }
          })
          this.setState({ mutationLoading: false })
          message.success('刪除成功')
        } catch (error) {
          this.setState({ mutationLoading: false })
          message.error('刪除失敗')
        }
      }
    })
  }

  /**
   * Merge
   */
  _onMergeTags = () => {
    Modal.confirm({
      title: `請輸入新標籤名：`,
      content: (
        <Input
          style={{ marginTop: 16 }}
          placeholder="標籤名"
          onChange={e => {
            this.setState({ mergeNewTagContent: e.target.value })
          }}
        />
      ),
      cancelText: '取消',
      okText: '確認',
      onOk: () => {
        this._onConfirmMergeTags()
      }
    })
  }

  _onConfirmMergeTags = () => {
    const { selectedRowKeys, selectedRows, mergeNewTagContent } = this.state
    // @ts-ignore
    const { mergeTags } = this.props

    if (!mergeNewTagContent) {
      return message.error('請輸入新標籤名')
    }

    Modal.confirm({
      title: `確認合併以下標籤？`,
      content: (
        <div style={{ marginTop: 16 }}>
          {selectedRows.map(({ content }) => (
            <Tag style={{ marginBottom: 8 }}>{content}</Tag>
          ))}
          <Alert
            style={{ marginTop: 16 }}
            message={
              <span>
                合併後，新標籤為 <Tag>{mergeNewTagContent}</Tag>
                ，以上標籤將被刪除
              </span>
            }
            type="warning"
            showIcon
          />
        </div>
      ),
      cancelText: '取消',
      okText: '確認合併',
      okType: 'danger',
      onOk: async () => {
        this.setState({ mutationLoading: true })

        try {
          await mergeTags({
            variables: {
              input: {
                ids: selectedRowKeys,
                content: mergeNewTagContent
              }
            }
          })
          this.setState({ mutationLoading: false })
          message.success('合併成功')
        } catch (error) {
          this.setState({ mutationLoading: false })
          message.error('合併失敗')
        }
      }
    })
  }

  private _renderTableOperators() {
    const { selectedRowKeys, selectedRows, mutationLoading } = this.state
    const hasSelected = selectedRowKeys.length > 0

    return (
      <>
        <section className="c-table__operators">
          <Button
            type="primary"
            onClick={this._onRenameTags}
            disabled={
              selectedRowKeys.length !== 1 || !hasSelected || mutationLoading
            }
          >
            修改
          </Button>
          <Button
            type="primary"
            onClick={this._onDeleteTags}
            disabled={!hasSelected || mutationLoading}
          >
            刪除
          </Button>
          <Button
            type="primary"
            onClick={this._onMergeTags}
            disabled={!hasSelected || mutationLoading}
          >
            合併
          </Button>
          {mutationLoading && <Spin />}
        </section>
        {hasSelected && (
          <section className="c-table__selected-tags">
            <span style={{ marginRight: 8 }}>
              {hasSelected ? `已選 ${selectedRowKeys.length} 項：` : ''}
            </span>
            {selectedRows.map(({ content }) => (
              <Tag>{content}</Tag>
            ))}
          </section>
        )}
      </>
    )
  }

  public render() {
    const { data, loading = false, recommend, pagination } = this.props
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this._onSelectChange
    }

    return (
      <>
        {!recommend && this._renderTableOperators()}
        <Table<TagDigest>
          bordered
          loading={loading}
          rowSelection={recommend ? undefined : rowSelection}
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
          <Table.Column<TagDigest>
            dataIndex="content"
            title="標籤"
            render={(_, record) => (
              <TagLink id={record.id} content={record.content} />
            )}
          />
          <Table.Column<TagDigest>
            dataIndex="count"
            title="文章數"
            width={100}
          />
          <Table.Column<TagDigest>
            dataIndex="createdAt"
            title="時間"
            width={300}
            render={createdAt => <DateTime date={createdAt} />}
          />
          {recommend && recommend.tag && (
            <Table.Column<TagDigest>
              dataIndex="oss.boost"
              title="Boost"
              width={150}
              render={(boost, record) => (
                <SetBoost boost={boost} id={record.id} type="Tag" />
              )}
            />
          )}
          {recommend && recommend.tag && (
            <Table.Column<TagDigest>
              dataIndex="oss.score"
              title="Score"
              width={100}
            />
          )}
        </Table>
      </>
    )
  }
}

export default withTagMutaitons(TagDigestList)
