import * as React from 'react'
import { Table, Button, Modal, Tag, Input, Alert } from 'antd'
import { Link } from 'react-router-dom'
import _get from 'lodash/get'
import _compact from 'lodash/compact'

import DateTime from '../../DateTime'

import { PATH } from '../../../constants'
import { TagDigest } from '../../../definitions'
import SetTagBoost from '../SetTagBoost'

type TagDigestListProps = {
  data: TagDigest[]
  loading?: boolean
  recommend?: {
    tag?: boolean
  }
}

type TagDigestListState = {
  renameLoading: boolean
  renameNewTagContent: string
  selectedRowKeys: string[] | number[]
  selectedRows: TagDigest[]
  deleteLoading: boolean
  mergeLoading: boolean
  mergeNewTagContent: string
}

class TagDigestList extends React.Component<
  TagDigestListProps,
  TagDigestListState
> {
  state = {
    selectedRowKeys: [],
    selectedRows: [],
    renameLoading: false,
    renameNewTagContent: '',
    deleteLoading: false,
    mergeLoading: false,
    mergeNewTagContent: ''
  }

  _onSelectChange = (
    selectedRowKeys: string[] | number[],
    selectedRows: TagDigest[]
  ) => {
    this.setState({ selectedRowKeys, selectedRows })
  }

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
      onOk: () => {
        console.log('_onMergeTags', selectedRowKeys)
      }
    })
  }

  _onDeleteTags = () => {
    const { selectedRowKeys, selectedRows } = this.state
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
      onOk() {
        console.log('_onDeleteTags', selectedRowKeys)
      }
    })
  }

  _onConfirmMergeTags = () => {
    const { selectedRowKeys, selectedRows, mergeNewTagContent } = this.state
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
      onOk: () => {
        console.log('_onMergeTags', selectedRowKeys)
      }
    })
  }

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

  private _renderTableOperators() {
    const {
      selectedRowKeys,
      renameLoading,
      deleteLoading,
      mergeLoading
    } = this.state
    const hasSelected = selectedRowKeys.length > 0

    return (
      <section className="c-table__operators">
        <Button
          type="primary"
          onClick={this._onRenameTags}
          disabled={
            selectedRowKeys.length !== 1 || !hasSelected || renameLoading
          }
          loading={renameLoading}
        >
          修改
        </Button>
        <Button
          type="primary"
          onClick={this._onDeleteTags}
          disabled={!hasSelected || deleteLoading}
          loading={deleteLoading}
        >
          刪除
        </Button>
        <Button
          type="primary"
          onClick={this._onMergeTags}
          disabled={!hasSelected || mergeLoading}
          loading={mergeLoading}
        >
          合併
        </Button>
        <span>{hasSelected ? `已選 ${selectedRowKeys.length} 項` : ''}</span>
      </section>
    )
  }

  private _renderContentCell(_: any, record: TagDigest): React.ReactNode {
    return (
      <Link to={PATH.TAG_DETAIL.replace(':id', record.id)}>
        <Tag>{record.content}</Tag>
      </Link>
    )
  }

  public render() {
    const { data, loading = false, recommend } = this.props
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
          pagination={false}
          rowKey={record => record.id}
        >
          <Table.Column<TagDigest>
            dataIndex="content"
            title="標籤"
            render={this._renderContentCell}
          />
          <Table.Column<TagDigest> dataIndex="count" title="文章數" />
          <Table.Column<TagDigest>
            dataIndex="createdAt"
            title="時間"
            render={createdAt => <DateTime date={createdAt} />}
          />
          {recommend && recommend.tag && (
            <Table.Column<TagDigest>
              dataIndex="oss.boost"
              title="Boost"
              render={(boost, record) => (
                <SetTagBoost boost={boost} tagId={record.id} />
              )}
            />
          )}
          {recommend && recommend.tag && (
            <Table.Column<TagDigest> dataIndex="oss.score" title="Score" />
          )}
        </Table>
      </>
    )
  }
}

export default TagDigestList
