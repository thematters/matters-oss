import * as React from 'react'
import { Select, Modal, message } from 'antd'

import ErrorMessage from '../../ErrorMessage'

import withSetState, { ChildProps } from './withSetState'
import { GQLCampaignApplicationState } from '../../../definitions'

type SetStateState = {
  applicationState?: GQLCampaignApplicationState
  loading: boolean
  error: any
}

const PLACEHOLDER_KEY = 'placeholder'

const COMMENT_STATES: {
  key: GQLCampaignApplicationState
  text: string
  disabled?: boolean
}[] = [
  { key: 'succeeded', text: '已通過' },
  { key: 'pending', text: '審核中' },
  { key: 'rejected', text: '已拒絕' },
]

const ApplicationStateTag = ({
  state,
}: {
  state: GQLCampaignApplicationState
}) => {
  const stateMap = {
    succeeded: '已通過',
    pending: '審核中',
    rejected: '已拒絕',
  }
  return <span>{stateMap[state]}</span>
}

class SetState extends React.Component<ChildProps, SetStateState> {
  state: Readonly<SetStateState> = {
    applicationState: this.props.applicationState,
    loading: false,
    error: null,
  }

  private _onSelectCampaignState = (
    value: GQLCampaignApplicationState | typeof PLACEHOLDER_KEY
  ) => {
    if (!value || value === PLACEHOLDER_KEY) {
      return
    }

    this.setState({ applicationState: value }, () => {
      if (this.props.applicationState !== value) {
        this.preConfirm()
      }
    })
  }

  private _onConfirmChange = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, user, campaign, onSuccess } = this.props
    const { applicationState } = this.state

    if (!applicationState) {
      return
    }

    try {
      await mutate({
        variables: {
          user,
          campaign,
          state: applicationState,
        },
      })
      this.setState({
        applicationState,
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
      title: `確認修改申請狀態？`,
      content: (
        <div style={{ marginTop: 16 }}>
          <span>
            修改後，申請狀態將從&nbsp;&nbsp;
            {this.props.applicationState && (
              <ApplicationStateTag state={this.props.applicationState} />
            )}
            改為&nbsp;&nbsp;
            {this.state.applicationState && (
              <ApplicationStateTag state={this.state.applicationState} />
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
    this.setState({ applicationState: this.props.applicationState })
  }

  public render() {
    const { disabled } = this.props
    const { applicationState, loading, error } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <span>
        <Select
          value={applicationState}
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
