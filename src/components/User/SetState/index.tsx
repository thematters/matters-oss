import * as React from 'react'
import { Select, Modal, Input, message } from 'antd'
import _get from 'lodash/get'
import { ModalFuncProps } from 'antd/lib/modal'

import ErrorMessage from '../../ErrorMessage'
import UserStateTag from '../StateTag'

import withSetState, { ChildProps, UserState } from './withSetState'
import { getErrorCodes } from '../../../utils'

type SetStateState = {
  userState: UserState
  banDays: string
  password: string
  loading: boolean
  error: any
}

const USER_STATES: { key: UserState; text: string; disabled?: boolean }[] = [
  { key: 'null', text: '無' },
  { key: 'active', text: '正常' },
  { key: 'archived', text: '註銷' },
  { key: 'banned', text: '禁言' },
  { key: 'frozen', text: '凍結' },
  { key: 'onboarding', text: '未激活' },
]
const BAN_DAYS: { key: string; text: string }[] = [
  { key: '1', text: '1 天' },
  { key: '7', text: '7 天' },
  { key: '30', text: '30 天' },
  { key: '90', text: '90 天' },
  { key: '180', text: '180 天' },
  { key: '36500', text: '永久禁言' },
]

interface BanSelectorState {
  banDays: string
}

type BanSelectorProps = BanSelectorState & {
  callback: (banDays: string) => void
}

class BanSelector extends React.Component<BanSelectorProps, BanSelectorState> {
  state: Readonly<{ banDays: string }> = {
    banDays: this.props.banDays,
  }

  private _onSelectBanDays = (value: string) => {
    this.setState({ banDays: value }, () => {
      if (this.props.callback) {
        this.props.callback(value)
      }
    })
  }

  public render() {
    return (
      <div style={{ marginTop: 16 }}>
        <Select
          value={this.state.banDays}
          onSelect={this._onSelectBanDays}
          style={{ marginRight: 8, minWidth: 80 }}
        >
          {BAN_DAYS.map(({ key, text }) => (
            <Select.Option key={key}>{text}</Select.Option>
          ))}
        </Select>
      </div>
    )
  }
}

class SetState extends React.Component<ChildProps, SetStateState> {
  state: Readonly<SetStateState> = {
    userState: this.props.state,
    banDays: BAN_DAYS[0].key,
    password: '',
    loading: false,
    error: null,
  }

  private _onSelectUserState = (value: UserState) => {
    if (value === 'null') {
      return
    }

    this.setState({ userState: value }, () => {
      if (this.props.state !== value) {
        this.preConfirm()
      }
    })
  }

  private _onSelectBanDays = (value: string) => {
    this.setState({ banDays: value })
  }

  private _onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value })
  }

  private _onConfirmhange = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, id, emails } = this.props
    const { userState, password } = this.state
    const banDays = parseInt(this.state.banDays, 10)

    try {
      const result = await mutate({
        variables: {
          input: {
            id,
            state: userState,
            banDays:
              userState === 'banned' && banDays > 0 ? banDays : undefined,
            password,
            emails,
          },
        },
      })
      const newUserState = _get(result, 'data.updateUserState.0.status.state')
      this.setState({ userState: newUserState, loading: false, error: null })
    } catch (error) {
      const errorCodes = getErrorCodes(error)

      if (errorCodes.indexOf('BAD_USER_INPUT') >= 0) {
        message.error('輸入有誤')
        this.setState({ loading: false })
      } else if (errorCodes.indexOf('USER_PASSWORD_INVALID') >= 0) {
        message.error('密碼輸入有誤')
        this.setState({ loading: false })
      } else {
        this.setState({ loading: false, error })
      }
    }
  }

  private preConfirm = () => {
    const { state, userName, emails } = this.props
    const { userState, password, banDays } = this.state
    const isBanned = userState === 'banned'
    const isArchived = userState === 'archived'

    let modalProps: ModalFuncProps = {
      title: `確認修改用戶狀態？`,
      content: (
        <>
          <div style={{ marginTop: 16 }}>
            {emails && <pre>{emails.join('\n')}</pre>}
            <span>
              修改後，用戶狀態將從&nbsp;&nbsp;
              <UserStateTag state={state} />
              改為&nbsp;&nbsp;
              <UserStateTag state={userState} />
            </span>
          </div>

          {isBanned && (
            <BanSelector banDays={banDays} callback={this._onSelectBanDays} />
          )}
        </>
      ),
    }

    if (isArchived) {
      modalProps = {
        title: `註銷用戶 ${userName}`,
        content: (
          <>
            <div style={{ marginTop: 16 }}>
              <span>
                确认注销账户吗？此步骤之后将不可撤回，而且被註銷帳戶（
                <strong>{this.props.userName}</strong>）無法恢復。
              </span>
            </div>

            <div style={{ marginTop: 16 }}>
              <Input.Password
                placeholder="密碼"
                onChange={this._onChangePassword}
              ></Input.Password>
            </div>
          </>
        ),
      }
    }

    Modal.confirm({
      ...modalProps,
      cancelText: '取消',
      okText: '確認',
      onOk: () => {
        this._onConfirmhange()
      },
      onCancel: this.revertChange,
    })
  }

  private revertChange = () => {
    this.setState({ userState: this.props.state, banDays: BAN_DAYS[0].key })
  }

  public render() {
    const { disabled, batch, state } = this.props
    const { userState, error } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    let states = USER_STATES
    if (batch) {
      states = states.filter((s) => s.key !== 'archived')
    }

    return (
      <span>
        <Select
          disabled={disabled || state === 'archived'}
          value={userState}
          onSelect={this._onSelectUserState}
          style={{ marginRight: 8 }}
        >
          {states.map(({ key, text, disabled }) => (
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
