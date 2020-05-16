import * as React from 'react'
import { Table, Button, Modal, Tag, Input, Alert, Spin, message } from 'antd'
import _get from 'lodash/get'
import _compact from 'lodash/compact'

import DateTime from '../../DateTime'
import SetBoost from '../../SetBoost'
import TagLink from '../../Tag/Link'
import TagStateTag from '../../Tag/StateTag'
import withTagMutaitons, {
  TagMutationsChildProps,
} from '../../../hocs/withTagMutations'

import { PAGE_SIZE } from '../../../constants'
import { TagDigest } from '../../../definitions'
import {
  onPaginationChange,
  getCurrentPaginationFromUrl,
  setQS,
  getSortKey,
} from '../../../utils'

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
  hasSorter?: boolean
  inRecommendedTagsPage?: boolean
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
    mergeNewTagContent: '',
  }

  _onSelectChange = (
    selectedRowKeys: string[] | number[],
    selectedRows: TagDigest[]
  ) => {
    this.setState({ selectedRowKeys, selectedRows })
  }

  _sync = () => {
    const currentPagination = getCurrentPaginationFromUrl()
    if (this.props.pagination) {
      onPaginationChange({
        pagination: this.props.pagination,
        page: currentPagination ? currentPagination.page : 1,
      })
    }
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
          onChange={(e) => {
            this.setState({ renameNewTagContent: e.target.value })
          }}
        />
      ),
      cancelText: '取消',
      okText: '確認',
      onOk: () => {
        this._onConfirmRenameTags()
      },
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
                content: renameNewTagContent,
              },
            },
          })
          this.setState(
            { mutationLoading: false, selectedRowKeys: [], selectedRows: [] },
            () => {
              message.success('修改成功')
              this._sync()
            }
          )
        } catch (error) {
          this.setState({ mutationLoading: false }, () => {
            message.error('修改失敗')
          })
        }
      },
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
                ids: selectedRowKeys,
              },
            },
          })
          this.setState(
            { mutationLoading: false, selectedRowKeys: [], selectedRows: [] },
            () => {
              message.success('刪除成功')
              this._sync()
            }
          )
        } catch (error) {
          this.setState({ mutationLoading: false }, () => {
            message.error('刪除失敗')
          })
        }
      },
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
          onChange={(e) => {
            this.setState({ mergeNewTagContent: e.target.value })
          }}
        />
      ),
      cancelText: '取消',
      okText: '確認',
      onOk: () => {
        this._onConfirmMergeTags()
      },
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
                content: mergeNewTagContent,
              },
            },
          })
          this.setState(
            { mutationLoading: false, selectedRowKeys: [], selectedRows: [] },
            () => {
              message.success('合併成功')
              this._sync()
            }
          )
        } catch (error) {
          this.setState({ mutationLoading: false }, () => {
            message.error('合併失敗')
          })
        }
      },
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
    const {
      data,
      loading = false,
      recommend,
      pagination,
      hasSorter,
      inRecommendedTagsPage,
    } = this.props

    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this._onSelectChange,
    }
    const currentPagination = getCurrentPaginationFromUrl()
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
                  defaultCurrent: currentPagination && currentPagination.page,
                  pageSize: pagination.pageSize || PAGE_SIZE,
                  total: pagination.totalCount,
                  onChange: (page) => onPaginationChange({ pagination, page }),
                  showTotal: (t) => `共 ${t} 項`,
                  position: 'both',
                }
              : false
          }
          onChange={(pagination, filters, sorter) => {
            if (!hasSorter) {
              return
            }

            const currentSort = getSortKey()

            if (sorter.order === 'descend') {
              if (currentSort !== 'descend') {
                setQS({ sort: 'descend' })
                window.location.reload()
              }
            } else {
              if (currentSort) {
                setQS({ sort: '' })
                window.location.reload()
              }
            }
          }}
          rowKey={(record) => record.id}
        >
          <Table.Column<TagDigest>
            dataIndex="content"
            title="標籤"
            render={(_, record) => (
              <TagLink id={record.id} content={record.content} />
            )}
          />
          {inRecommendedTagsPage && (
            <Table.Column<TagDigest>
              dataIndex="description"
              title="描述"
              width={300}
              render={(_, record) => <span>{record.description}</span>}
            />
          )}
          {inRecommendedTagsPage && (
            <Table.Column<TagDigest>
              dataIndex="state"
              title="狀態"
              width={100}
              render={(_, record) => <TagStateTag deleted={record.deleted} />}
            />
          )}
          <Table.Column<TagDigest>
            dataIndex="articles.totalCount"
            title="文章數"
            width={100}
            {...(hasSorter
              ? {
                  defaultSortOrder: getSortKey() as any,
                  sorter: true,
                  sortDirections: ['descend'],
                }
              : {})}
          />
          <Table.Column<TagDigest>
            dataIndex="createdAt"
            title="時間"
            width={300}
            render={(createdAt) => <DateTime date={createdAt} />}
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
