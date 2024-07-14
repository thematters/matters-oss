import * as React from 'react'
import { Select, Modal, message } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../ErrorMessage'
import CampaignStateTag from '../StateTag'

import withSetState, { ChildProps, CampaignState } from './withSetState'

type SetStateState = {
  campaignState?: CampaignState
  loading: boolean
  error: any
}

const PLACEHOLDER_KEY = 'placeholder'

const COMMENT_STATES: {
  key: CampaignState
  text: string
  disabled?: boolean
}[] = [
  { key: 'active', text: '正常' },
  { key: 'archived', text: '已隱藏', disabled: true },
  { key: 'pending', text: '編輯中' },
  { key: 'finished', text: '已結束' },
]

class SetState extends React.Component<ChildProps, SetStateState> {
  state: Readonly<SetStateState> = {
    campaignState: this.props.campaignState,
    loading: false,
    error: null,
  }

  private _onSelectCampaignState = (
    value: CampaignState | typeof PLACEHOLDER_KEY
  ) => {
    if (!value || value === PLACEHOLDER_KEY) {
      return
    }

    this.setState({ campaignState: value }, () => {
      if (this.props.campaignState !== value) {
        this.preConfirm()
      }
    })
  }

  private _onConfirmChange = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, ids, onSuccess } = this.props
    const { campaignState } = this.state

    if (!campaignState) {
      return
    }

    try {
      const result = await mutate({
        variables: {
          input: {
            ids,
            state: campaignState,
          },
        },
      })
      const newCampaignState = _get(result, 'data.updateCommentsState.0.state')
      this.setState({
        campaignState: newCampaignState,
        loading: false,
        error: null,
      })
      message.success('修改成功', 1, () => {
        if (onSuccess) {
          onSuccess()
        }
      })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  private preConfirm = () => {
    Modal.confirm({
      title: `確認修改評論狀態？`,
      content: (
        <div style={{ marginTop: 16 }}>
          <span>
            修改後，評論狀態將從&nbsp;&nbsp;
            {this.props.campaignState && (
              <CampaignStateTag state={this.props.campaignState} />
            )}
            改為&nbsp;&nbsp;
            {this.state.campaignState && (
              <CampaignStateTag state={this.state.campaignState} />
            )}
          </span>
        </div>
      ),
      cancelText: '取消',
      okText: '確認',
      onOk: () => {
        this._onConfirmChange()
      },
      onCancel: this.revertChange,
    })
  }

  private revertChange = () => {
    this.setState({ campaignState: this.props.campaignState })
  }

  public render() {
    const { disabled } = this.props
    const { campaignState, loading, error } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <span>
        <Select
          value={campaignState}
          onSelect={this._onSelectCampaignState}
          style={{ marginRight: 8, width: 100 }}
          loading={loading}
          disabled={disabled}
        >
          <Select.Option key={PLACEHOLDER_KEY} disabled></Select.Option>
          {COMMENT_STATES.map(({ key, text, disabled }) => (
            <Select.Option key={key} disabled={disabled}>
              {text}
            </Select.Option>
          ))}
        </Select>
      </span>
    )
  }
}

export default withSetState(SetState)
