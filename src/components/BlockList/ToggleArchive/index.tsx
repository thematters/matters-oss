import * as React from 'react'
import { Modal, Switch } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../ErrorMessage'
import withToggleArchive, { ChildProps } from './withToggleArchive'

type ToggleArchiveState = {
  checked: boolean
  loading: boolean
  error: any
}

class ToggleArchive extends React.Component<ChildProps, ToggleArchiveState> {
  state: Readonly<ToggleArchiveState> = {
    checked: this.props.checked,
    loading: false,
    error: null
  }

  private _onChange = async () => {
    this.preConfirm()
  }

  private preConfirm = () => {
    const archived = this.state.checked

    Modal.confirm({
      title: archived ? `封鎖該項目？` : `解除封鎖？`,
      content: (
        <div style={{ marginTop: 16 }}>
          <span>
            {!archived && '提醒：解除郵件封鎖時，系統會一併解除其相應的指紋封鎖。'}
          </span>
        </div>
      ),
      cancelText: '取消',
      okText: '確認',
      onOk: () => {
        this._onConfirmChange()
      },
      onCancel: () => {}
    })
  }

  private _onConfirmChange = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, id } = this.props

    try {
      const result = await mutate({
        variables: {
          input: {
            id,
            archived: !this.state.checked
          }
        }
      })
      const archived = _get(result, 'data.putAgentHash.archived')
      this.setState({ checked: archived, loading: false, error: null })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  public render() {
    const { checked, loading, error } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <Switch onChange={this._onChange} checked={checked} loading={loading} />
    )
  }
}

export default withToggleArchive(ToggleArchive)
