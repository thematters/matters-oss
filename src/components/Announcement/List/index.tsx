import * as React from 'react'

import { Link } from 'react-router-dom'
import { Button, message, Modal, Table } from 'antd'
import _compact from 'lodash/compact'
import _find from 'lodash/find'

import AddButton from '../Controls/AddButton'
import DateTime from '../../DateTime'
import { ANNOUNCEMENT_TYPES, PATH } from '../../../constants'
import withAnnouncementMutations, {
  AnnouncementMutationsChildProps,
} from '../../../hocs/withAnnouncementMutations'
import { Announcement, AnnouncementType } from '../../../definitions'

type ListProps = AnnouncementMutationsChildProps & {
  data: Announcement[]
  refetch: any
  loading?: boolean
}

type ListState = {
  selectedRowKeys: string[] | number[]
  selectedRows: Announcement[]
  mutationLoading: boolean
}

const sharedStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',
  height: '60px',
  borderRadius: '1rem',
  background: 'rgba(0, 0, 0, 0.02)',
  color: '#ccc',
}

const To = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const to = PATH.ANNOUNCEMENT_DETAIL.replace(':id', id)
  return <Link to={to}>{children}</Link>
}

const Cover = ({ cover }: { cover?: string }) => {
  return cover ? (
    <img src={cover} style={sharedStyles} />
  ) : (
    <div style={sharedStyles}>未上傳</div>
  )
}

const TitleCell = (_: any, record: Announcement) => (
  <To id={record.id}>{record.title || '無標題'}</To>
)

const CoverCell = (_: any, record: Announcement) => (
  <To id={record.id}>
    <Cover cover={record.cover} />
  </To>
)

const ContentCell = (_: any, record: Announcement) => (
  <To id={record.id}>{record.content || '無內容'}</To>
)

const LinkCell = (_: any, record: Announcement) => {
  return record.link ? (
    <a href={record.link} target="_blank">
      {record.link}
    </a>
  ) : (
    <p style={{ color: '#ccc' }}>無連結</p>
  )
}

const TypeCell = ({ type }: any) => {
  const item = _find(ANNOUNCEMENT_TYPES, ['key', type])
  return <p>{item?.text || ''}</p>
}

const DeleteCell = (record: Announcement) => {
  const { title, cover } = record
  return (
    <div
      style={{
        ...sharedStyles,
        height: 'auto',
        background: '#fff',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '0.5rem',
        padding: '0.5rem',
        margin: '0.5rem 0',
      }}
    >
      <div
        style={{
          width: '35%',
          color: '#999',
          fontSize: '0.85rem',
          paddingRight: '8px',
        }}
      >
        {title || '無標題'}
      </div>
      <div style={{ width: '65%' }}>
        <Cover cover={cover} />
      </div>
    </div>
  )
}

class List extends React.Component<ListProps, ListState> {
  state = {
    selectedRowKeys: [],
    selectedRows: [],
    mutationLoading: false,
  }

  _sync = () => {
    if (this.props.refetch) {
      this.props.refetch()
    }
  }

  _onSelectChange = (
    selectedRowKeys: string[] | number[],
    selectedRows: Announcement[]
  ) => {
    this.setState({ selectedRowKeys, selectedRows })
  }

  /**
   * Delete
   */
  _onDelete = () => {
    const { selectedRowKeys, selectedRows } = this.state
    // @ts-ignore
    const { deleteAnnouncements } = this.props

    Modal.confirm({
      title: '確認刪除以下公告？',
      content: (
        <div style={{ marginTop: 16 }}>{selectedRows.map(DeleteCell)}</div>
      ),
      cancelText: '取消',
      okText: '確認',
      onOk: async () => {
        this.setState({ mutationLoading: true })

        try {
          await deleteAnnouncements({
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

  private _renderTableOperators() {
    const { selectedRowKeys, selectedRows, mutationLoading } = this.state
    const hasSelected = selectedRowKeys.length > 0
    return (
      <>
        <section className="c-table__operators">
          <AddButton onSuccess={this.props.refetch} />
          <Button
            type="primary"
            onClick={this._onDelete}
            disabled={!hasSelected || mutationLoading}
          >
            刪除
          </Button>
        </section>
      </>
    )
  }

  public render() {
    const { data, loading = false } = this.props
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this._onSelectChange,
    }

    return (
      <>
        {this._renderTableOperators()}

        <Table<Announcement>
          bordered
          loading={loading}
          dataSource={_compact(data)}
          rowKey={(record) => record.id}
          rowSelection={rowSelection}
          pagination={false}
        >
          <Table.Column<Announcement>
            width={100}
            dataIndex="title"
            title="標題"
            render={TitleCell}
          />
          <Table.Column<Announcement>
            width={200}
            dataIndex="content"
            title="內容"
            render={ContentCell}
          />
          <Table.Column<Announcement>
            width={250}
            dataIndex="cover"
            title="圖片"
            render={CoverCell}
          />
          <Table.Column<Announcement>
            width={200}
            dataIndex="link"
            title="連結"
            render={LinkCell}
          />
          <Table.Column<Announcement>
            width={50}
            dataIndex="type"
            title="類別"
            render={(type) => <TypeCell type={type} />}
          />
          <Table.Column<Announcement>
            width={50}
            dataIndex="visible"
            title="顯示"
            render={(visible) => (
              <p style={{ fontSize: '21px' }}>
                {visible === true ? '✅' : '❌'}
              </p>
            )}
          />
          <Table.Column<Announcement>
            width={100}
            dataIndex="createdAt"
            title="建立時間"
            render={(createdAt) => <DateTime date={createdAt} />}
          />
        </Table>
      </>
    )
  }
}

export default withAnnouncementMutations(List)
