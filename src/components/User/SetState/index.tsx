import * as React from 'react'
import { Select, Button, Modal, Alert } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../ErrorMessage'
import UserStateTag from '../StateTag'

import withSetState, { ChildProps, UserState } from './withSetState'

type SetStateState = {
  userState: UserState
  banDays: string
  loading: boolean
  error: any
}

const USER_STATES: { key: UserState; text: string; disabled?: boolean }[] = [
  { key: 'active', text: '正常' },
  { key: 'archived', text: '註銷', disabled: true },
  { key: 'banned', text: '禁言' },
  { key: 'frozen', text: '凍結' },
  { key: 'onboarding', text: '未激活' }
]
const BAN_DAYS: { key: string; text: string }[] = [
  { key: '-1', text: '一直' },
  { key: '1', text: '1 天' },
  { key: '3', text: '3 天' },
  { key: '7', text: '7 天' },
  { key: '14', text: '14 天' },
  { key: '30', text: '30 天' },
  { key: '60', text: '60 天' },
  { key: '90', text: '90 天' },
  { key: '180', text: '180 天' }
]

class SetState extends React.Component<ChildProps, SetStateState> {
  state: Readonly<SetStateState> = {
    userState: this.props.state,
    banDays: BAN_DAYS[0].key,
    loading: false,
    error: null
  }

  private _onSelectUserState = (value: UserState) => {
    this.setState({ userState: value })
  }

  private _onSelectBanDays = (value: string) => {
    this.setState({ banDays: value })
  }

  private _onConfirmhange = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, id } = this.props
    const { userState } = this.state
    const banDays = parseInt(this.state.banDays, 10)

    try {
      const result = await mutate({
        variables: {
          input: {
            id,
            state: userState,
            banDays: userState === 'banned' && banDays > 0 ? banDays : undefined
          }
        }
      })
      const newUserState = _get(result, 'data.updateUserState.status.state')
      this.setState({ userState: newUserState, loading: false, error: null })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  private _onClickChange = () => {
    Modal.confirm({
      title: `確認修改用戶狀態？`,
      content: (
        <div style={{ marginTop: 16 }}>
          <span>
            修改後，用戶狀態將從&nbsp;&nbsp;
            <UserStateTag state={this.props.state} />
            改為&nbsp;&nbsp;
            <UserStateTag state={this.state.userState} />
          </span>
        </div>
      ),
      cancelText: '取消',
      okText: '確認',
      onOk: () => {
        this._onConfirmhange()
      }
    })
  }

  private _onClickRevertChange = () => {
    this.setState({ userState: this.props.state, banDays: BAN_DAYS[0].key })
  }

  public render() {
    const { userState, banDays, loading, error } = this.state
    const userStateChanged = this.props.state !== userState

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <span>
        <Select
          value={userState}
          onSelect={this._onSelectUserState}
          style={{ marginRight: 8 }}
        >
          {USER_STATES.map(({ key, text, disabled }) => (
            <Select.Option key={key} disabled={disabled}>
              {text}
            </Select.Option>
          ))}
        </Select>
        {userState === 'banned' && (
          <Select
            value={banDays}
            onSelect={this._onSelectBanDays}
            style={{ marginRight: 8 }}
          >
            {BAN_DAYS.map(({ key, text }) => (
              <Select.Option key={key} disabled>{text}</Select.Option>
            ))}
          </Select>
        )}
        {userStateChanged && (
          <Button
            onClick={this._onClickChange}
            type="primary"
            loading={loading}
            disabled={!userStateChanged}
            style={{
              marginRight: 8
            }}
          >
            確認
          </Button>
        )}
        {userStateChanged && (
          <Button
            onClick={this._onClickRevertChange}
            type="default"
            loading={loading}
            disabled={!userStateChanged}
          >
            取消
          </Button>
        )}
      </span>
    )
  }
}

export default withSetState(SetState)
